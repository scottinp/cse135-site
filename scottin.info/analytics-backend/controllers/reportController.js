const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const analyticsModel = require('../models/analyticsModel');

function showDashboard(req, res) {
  res.render('dashboard', { user: req.session.user });
}

function buildComment(type, rows) {
  if (!rows || rows.length === 0) {
    return 'No data is available for this report yet.';
  }

  const top = rows[0];

  if (type === 'intentional') {
    return `After excluding mousemove noise, the most common recorded interaction is ${top.label} (${top.total}).`;
  }

  if (type === 'pages') {
    return `The page with the most tracked activity is ${top.label} (${top.total}).`;
  }

  return `The most common exit page is ${top.label} (${top.total}).`;
}

async function showReports(req, res) {
  try {
    const rows = await analyticsModel.getIntentionalInteractions();

    const chartLabels = rows.map(row => row.label);
    const chartValues = rows.map(row => row.total);

    res.render('reports', {
      user: req.session.user,
      events: [],
      chartLabels,
      chartValues,
      title: 'Intentional Interactions',
      comment: buildComment('intentional', rows),
      tableLabelHeader: 'Event Type',
      rows
    });
  } catch (error) {
    res.status(500).send('Failed to load reports data: ' + error.message);
  }
}

async function showPageEngagement(req, res) {
  try {
    const rows = await analyticsModel.getPageEngagement();

    const chartLabels = rows.map(row => row.label);
    const chartValues = rows.map(row => row.total);

    res.render('reports', {
      user: req.session.user,
      events: [],
      chartLabels,
      chartValues,
      title: 'Page Engagement',
      comment: buildComment('pages', rows),
      tableLabelHeader: 'Page URL',
      rows
    });
  } catch (error) {
    res.status(500).send('Failed to load reports data: ' + error.message);
  }
}

async function showExitDistribution(req, res) {
  try {
    const rows = await analyticsModel.getExitDistribution();

    const chartLabels = rows.map(row => row.label);
    const chartValues = rows.map(row => row.total);

    res.render('reports', {
      user: req.session.user,
      events: [],
      chartLabels,
      chartValues,
      title: 'Exit Distribution',
      comment: buildComment('exits', rows),
      tableLabelHeader: 'Page URL',
      rows
    });
  } catch (error) {
    res.status(500).send('Failed to load reports data: ' + error.message);
  }
}

async function exportReportsPdf(req, res) {
  try {
    const events = await analyticsModel.getRecentEvents();

    const exportsDir = path.join(__dirname, '..', 'exports');
    fs.mkdirSync(exportsDir, { recursive: true });

    const filename = `report-${Date.now()}.pdf`;
    const filePath = path.join(exportsDir, filename);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(18).text('Analytics Report');
    doc.moveDown();
    doc.fontSize(12).text(`User: ${req.session.user.username}`);
    doc.text(`Generated: ${new Date().toISOString()}`);
    doc.moveDown();

    events.forEach((event, i) => {
      doc.text(
        `${i + 1}. ${event.event_type} | ${event.page_url || ''} | ${event.event_time}`
      );
      doc.moveDown(0.3);
    });

    doc.end();

    stream.on('finish', () => {
      res.redirect(`/backend/exports/${filename}`);
    });
  } catch (error) {
    res.status(500).send('Failed to export PDF: ' + error.message);
  }
}

function viewExport(req, res) {
  const filePath = path.join(__dirname, '..', 'exports', req.params.filename);
  res.sendFile(filePath);
}

module.exports = {
  showDashboard,
  showReports,
  showPageEngagement,
  showExitDistribution,
  exportReportsPdf,
  viewExport
};
