<?php

include_once '../Database.php';

if(isset($_POST['name']) && isset($_POST['prenom']) && isset($_POST['email']) && isset($_POST['telephone'])){
    $name = htmlspecialchars($_POST['name']);
    $prenom = htmlspecialchars($_POST['prenom']);
    $email = htmlspecialchars($_POST['email']);
    $telephone = htmlspecialchars($_POST['telephone']);
    if(!isset($_POST['ville'])) $_POST['ville'] = "Paris";
    $ville = htmlspecialchars($_POST['ville']);

    try {
        $createQuery = "INSERT INTO ca2(name, prenom, email, telephone, ville, dateCreation) VALUES(:name, :prenom, :email, :telephone, :ville, now())";

        $statement = $conn->prepare($createQuery);
        $statement->execute(array(":name" => $name, ":prenom" => $prenom, ":email" => $email, ":telephone" => $telephone, ":ville" => $ville));

        if($statement){
            echo "Contact ajouté !";
        }
        
    } catch (PDOException $ex) {
        echo "Une erreur est survenue !" .$ex->getMessage();
    }
}
