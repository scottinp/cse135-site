const express = require("express");
const os = require("os");

const sessions = {};
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
});i

app.all("/state-set-node", (req, res) => {
  const sid = req.headers.cookie?.replace("sid=","") || Math.random().toString(36);
  if (req.method === "POST") {
    sessions[sid] = req.body.value || "";
    res.setHeader("Set-Cookie", `sid=${sid}`);
    res.redirect("/hw2/node/state-view-node");
  } else {
    res.send('<form method="POST"><input name="value"><button>Save</button></form>');
  }
});

app.get("/state-view-node", (req, res) => {
  const sid = req.headers.cookie?.replace("sid=","");
  res.send(`<p>Saved value: ${sessions[sid] || "(none)"}</p>
            <a href="/hw2/node/state-clear-node">Clear</a>`);
});

app.get("/state-clear-node", (req, res) => {
  const sid = req.headers.cookie?.replace("sid=","");
  delete sessions[sid];
  res.setHeader("Set-Cookie","sid=; Max-Age=0");
  res.redirect("/hw2/node/state-set-node");
});


app.listen(3001, "127.0.0.1");

