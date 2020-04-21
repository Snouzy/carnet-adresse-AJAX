<?php

// define("DSN", "mysql:host=nettyitsyydev.mysql.db;dbname=nettyitsyydev");
// define("USERNAME", "nettyitsyydev");
// define("PASSWORD", "GsS1Y4CIujo8");

define("DSN", "mysql:host=localhost;dbname=nettyitsyydev");
define("USERNAME", "root");
define("PASSWORD", "");

$options = array(PDO::ATTR_PERSISTENT => true);

try{
    $conn = new PDO(DSN, USERNAME, PASSWORD, $options);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $err) {
    echo "Une erreur est survenue : ". $err->getMessage();
}