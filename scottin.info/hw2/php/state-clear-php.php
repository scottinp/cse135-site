<?php
session_start();
session_destroy();
header("Location: state-set-php.php");
