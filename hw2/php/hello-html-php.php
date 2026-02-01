<?php
$team = "Scottin, Tri, Brian";
$lang = "php";
$time = date("c");
$ip = $_SERVER["REMOTE_ADDR"] ?? "unknown";
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>hello-html-php</title>
</head>
<body>
  <h1>Hello from <?= htmlspecialchars($team) ?></h1>
  <ul>
    <li>Language: <?= $lang ?></li>
    <li>Generated: <?= $time ?></li>
    <li>Your IP: <?= htmlspecialchars($ip) ?></li>
  </ul>
</body>
</html>

