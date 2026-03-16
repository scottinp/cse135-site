const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3005;
const LOG_FILE = path.join(__dirname, 'analytics.jsonl');

const pool = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: 'root',
  database: 'analyticsdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin === 'https://test.scottin.info') {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: '50kb' }));

app.post('/collect', async (req, res) => {
  const p = req.body;

  //test
  console.log('COLLECT HIT:', p.type, p.url, new Date().toISOString());

  await pool.execute(
    `INSERT INTO collector_events (event_type, session_id, user_id, env, page_url, raw_payload)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      p.type || null,
      p.session || p.sessionId || null,
      p.userId || null,
      p.env || p.customData?.env || null,
      p.url || null,
      JSON.stringify(p)
    ]
  );

  res.sendStatus(204);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Endpoint on http://127.0.0.1:${PORT}`);
});