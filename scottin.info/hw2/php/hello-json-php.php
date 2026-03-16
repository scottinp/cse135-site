<?php
header("Content-Type: application/json; charset=utf-8");

echo json_encode([
  "greeting" => "Hello from Scottin, Tri, Brian",
  "language" => "php",
  "time" => date("c"),
  "ip" => $_SERVER["REMOTE_ADDR"] ?? "unknown"
], JSON_PRETTY_PRINT);

