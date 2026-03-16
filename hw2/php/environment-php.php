<?php
header("Content-Type: text/plain; charset=utf-8");

echo "environment-php\n";
echo "time=" . date("c") . "\n\n";

foreach ($_SERVER as $k => $v) {
  echo $k . "=" . $v . "\n";
}
