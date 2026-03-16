const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3006;

app.use(express.json({ limit: '1mb' }));

const pool = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: 'root',
  database: 'analyticsdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//returns last 100
app.get('/api/events', async (req, res) => {
  const [rows] = await pool.execute(`
    SELECT id, event_type, session_id, user_id, env, page_url, event_time, received_at, raw_payload 
    FROM collector_events ORDER BY id DESC LIMIT 100
  `);
  res.json(rows);
});

app.get('/api/events/:id', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM collector_events WHERE id = ?', 
    [req.params.id]
  );
  res.json(rows[0]);
});

app.post('/api/events', async (req, res) => {
  const p = req.body;
  const [result] = await pool.execute(
    `INSERT INTO collector_events (event_type, session_id, user_id, env, page_url, raw_payload) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [p.type, p.sessionId, p.userId, p.env, p.url, JSON.stringify(p)]
  );
  res.status(201).json({ id: result.insertId });
});

app.put('/api/events/:id', async (req, res) => {
  const p = req.body;
  await pool.execute(
    `UPDATE collector_events 
     SET event_type=?, session_id=?, user_id=?, env=?, page_url=?, raw_payload=? 
     WHERE id=?`,
    [p.type, p.sessionId, p.userId, p.env, p.url, JSON.stringify(p), req.params.id]
  );
  res.json({ message: 'updated' });
});
app.delete('/api/events/:id', async (req, res) => {
  await pool.execute('DELETE FROM collector_events WHERE id = ?', [req.params.id]);
  res.sendStatus(200);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Reporting API on http://127.0.0.1:${PORT}`);
});
