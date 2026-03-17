const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const analyticsModel = require('../models/analyticsModel');
const puppeteer = require('puppeteer');


function getReportPath(type) {
  if (type === 'pages') return '/backend/reports/pages';
  if (type === 'exits') return '/backend/reports/exits';
  return '/backend/reports';
}


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
      rows,
      reportType: 'intentional'
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
      rows,
      reportType: 'pages'
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
      rows,
      reportType: 'exits'
    });
  } catch (error) {
    res.status(500).send('Failed to load reports data: ' + error.message);
  }
}

async function exportReportsPdf(req, res) {
  const type = req.query.type || 'intentional';
  const reportPath = getReportPath(type);

  const exportsDir = path.join(__dirname, '..', 'exports');
  fs.mkdirSync(exportsDir, { recursive: true });

  const filename = `${type}-report-${Date.now()}.pdf`;
  const filePath = path.join(exportsDir, filename);

  const pageUrl = `http://127.0.0.1:3000${reportPath}`;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  if (req.headers.cookie) {
    await page.setExtraHTTPHeaders({
      cookie: req.headers.cookie
    });
  }

  await page.goto(pageUrl, { waitUntil: 'networkidle2' });
  await page.emulateMediaType('screen');

  await page.pdf({
    path: filePath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });

  await browser.close();
  res.redirect(`/backend/exports/${filename}`);
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
