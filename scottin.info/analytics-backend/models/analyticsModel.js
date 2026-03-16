const db = require('./db');

async function getIntentionalInteractions() {
  const [rows] = await db.execute(`
    SELECT event_type AS label, COUNT(*) AS total
    FROM collector_events
    WHERE event_type <> 'mousemove'
    GROUP BY event_type
    ORDER BY total DESC, event_type ASC
  `);
  return rows;
}

async function getPageEngagement() {
  const [rows] = await db.execute(`
    SELECT COALESCE(page_url, '(unknown)') AS label, COUNT(*) AS total
    FROM collector_events
    GROUP BY COALESCE(page_url, '(unknown)')
    ORDER BY total DESC, label ASC
  `);
  return rows;
}

async function getExitDistribution() {
  const [rows] = await db.execute(`
    SELECT COALESCE(page_url, '(unknown)') AS label, COUNT(*) AS total
    FROM collector_events
    WHERE event_type = 'page_exit'
    GROUP BY COALESCE(page_url, '(unknown)')
    ORDER BY total DESC, label ASC
  `);
  return rows;
}

module.exports = {
  getIntentionalInteractions,
  getPageEngagement,
  getExitDistribution
};
