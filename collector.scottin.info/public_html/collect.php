<?php
header("Access-Control-Allow-Origin: https://test.scottin.info");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

$raw = file_get_contents("php://input");
file_put_contents(
  "/var/www/collector.scottin.info/public_html/beacons.log",
  $raw . "\n",
  FILE_APPEND
);

http_response_code(204);
