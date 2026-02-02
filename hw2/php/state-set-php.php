<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $_SESSION["value"] = $_POST["value"] ?? "";
  header("Location: state-view-php.php");
  exit;
}
?>
<form method="POST">
  <input name="value">
  <button>Save</button>
</form>
