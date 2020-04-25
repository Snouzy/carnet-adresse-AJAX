<?php

include_once '../Database.php';

try {
    $id = $_POST['id'];
    $readOneQuery = "SELECT * FROM ca2 WHERE id = :id";
    $statement = $conn->prepare($readOneQuery);
    $statement->execute(array(":id" => $id));
    $statement->execute();
    $contact = $statement->fetch(PDO::FETCH_ASSOC);
    setlocale(LC_TIME, 'fr_FR.utf8','fra');
    $create_date = strftime("%a %d %b %Y", strtotime($contact['dateCreation']));

    $output = [
        'name' => $contact['name'],
        'prenom' => $contact['prenom'],
        'email' => $contact['email'],
        'telephone' => $contact['telephone'],
        'ville' => $contact['ville'],
        'dateCreation' => $create_date
    ];
    echo json_encode($output);

} catch (PDOException $err) {
    echo "Une erreur est survenue " .$err->getMessage();
}