<?php

// define("DSN", "mysql:host=snouzycoba289.mysql.db;dbname=snouzycoba289");
// define("USERNAME", "snouzycoba289");
// define("PASSWORD", "Justbeageek1997");
define("DSN", "mysql:host=localhost;dbname=nettyitsyydev");
define("USERNAME", "root");
define("PASSWORD", "root");

$options = array(PDO::ATTR_PERSISTENT => true); //mise en cache

try {
    $conn = new PDO(DSN, USERNAME, PASSWORD, $options);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $err) {
    echo "Une erreur est survenue : ". $err->getMessage();
}