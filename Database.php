<?php

define("DSN", "mysql:host=localhost;dbname=nettyitsyydev");
define("USERNAME", "root");
define("PASSWORD", "");

$options = array(PDO::ATTR_PERSISTENT => true); //mise en cache

try {
    $conn = new PDO(DSN, USERNAME, PASSWORD, $options);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $err) {
    echo "Une erreur est survenue : ". $err->getMessage();
}