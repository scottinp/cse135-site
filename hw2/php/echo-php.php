<?php
header("Content-Type: application/json; charset=utf-8");

$method = $_SERVER["REQUEST_METHOD"] ?? "UNKNOWN";
$ip = $_SERVER["REMOTE_ADDR"] ?? "unknown";
$hostname = gethostname();
$time = date("c");
$userAgent = $_SERVER["HTTP_USER_AGENT"] ?? "";
$contentType = $_SERVER["CONTENT_TYPE"] ?? "";

$rawBody = file_get_contents("php://input");

if (stripos($contentType, "application/json") !== false) {
  $body = json_decode($rawBody, true);
} else {
  parse_str($rawBody, $body);
}

echo json_encode([
  "hostname" => $hostname,
  "time" => $time,
  "ip" => $ip,
  "userAgent" => $userAgent,
  "method" => $method,
  "contentType" => $contentType,
  "query" => $_GET,
  "body" => $body,
  "raw" => $rawBody
]);
