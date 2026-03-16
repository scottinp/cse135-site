<?php
session_start();
$value = $_SESSION["value"] ?? "(none)";
?>
<p>Saved value: <?= htmlspecialchars($value) ?></p>
<a href="state-clear-php.php">Clear</a>
