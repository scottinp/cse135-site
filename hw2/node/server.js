const express = require("express");
const os = require("os");

const app = express();
app.set("trust proxy", true);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.all("/hello-html-node", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(
    `<h1>Hello (Node)</h1>
     <p>language: node</p>
     <p>datetime: ${new Date().toISOString()}</p>
     <p>ip: ${req.ip}</p>`
  );
});

app.all("/hello-json-node", (req, res) => {
  res.type("json").send(JSON.stringify({
    language: "node",
    datetime: new Date().toISOString(),
    ip: req.ip
  }) + "\n");
});


app.all("/environment-node", (req, res) => {
  res.set("Content-Type", "text/plain");
  let out = "";
  Object.keys(process.env).sort().forEach(k => {
    out += `${k}=${process.env[k]}\n`;
  });
  res.send(out);
});

app.all("/echo-node", (req, res) => {
  res.json({
    language: "node",
    hostname: os.hostname(),
    datetime: new Date().toISOString(),
    ip: req.ip,
    user_agent: req.get("user-agent"),
    method: req.method,
    query: req.query,
    body: req.body
  });
});

app.listen(3001, "127.0.0.1");

