<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once '../Database.php';

try {
    $readQuery = "SELECT * FROM ca2 ORDER BY name";
    $statement = $conn->query($readQuery);
    $output = [];
    $contacts = $statement->fetchAll(PDO::FETCH_ASSOC);
    for($i = 0; $i < count($contacts); $i++) {
        setlocale(LC_TIME, 'fr_FR.utf8','fra');
        $create_date = strftime("%a %d %b %Y", strtotime($contacts[$i]['dateCreation']));
        $contacts[$i]['dateCreation'] = $create_date;
        $output[] = $contacts[$i];
    }
    echo json_encode($output);
} catch (PDOException $err){
    echo "Une erreur est survenue lors de la requête : " .$err->getMessage();
}
