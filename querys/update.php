<?php
include_once '../Database.php';

if(isset($_POST['id'])) {
    $id = $_POST['id'];

    if(isset($_POST['name'])){
        $name = trim($_POST['name']);
        try {
            $updateQuery = "UPDATE ca2 SET name = :name WHERE id = :id";
            $statement = $conn->prepare($updateQuery);
            $statement->execute(array(":name" => $name, ":id" => $id));
            displayAlert($statement, "Le nom du contact a été modifié");
    
        } catch (PDOException $ex){
            displayError($err);
        }
    }
    
    else if(isset($_POST['prenom'])){
        $prenom = htmlspecialchars(trim($_POST['prenom']));
        try {
            $updateQuery = "UPDATE ca2 SET prenom = :prenom WHERE id = :id";
            $statement = $conn->prepare($updateQuery);
            $statement->execute(array(":prenom" => $prenom, ":id" => $id));
            displayAlert($statement, "Le prénom du contact a été modifié");
    
        } catch (PDOException $err) {
            displayError($err);
        }
    }
    
    else if(isset($_POST['email'])){
        $email = htmlspecialchars(trim($_POST['email']));
        try {
            $updateQuery = "UPDATE ca2 SET email = :email WHERE id = :id";
            $statement = $conn->prepare($updateQuery);
            $statement->execute(array(":email" => $email, ":id" => $id));
            displayAlert($statement, "Email modifié avec succès");
        } catch (PDOException $err){
            displayError($err);
        }
    }
    
    else if(isset($_POST['telephone'])){
        $telephone = htmlspecialchars(trim($_POST['telephone']));
        try {
            $updateQuery = "UPDATE ca2 SET telephone = :telephone WHERE id = :id";
            $statement = $conn->prepare($updateQuery);
            $statement->execute(array(":telephone" => $telephone, ":id" => $id));
            displayAlert($statement, "Le numéro de téléphone a été modifié avec succès");
        } catch (PDOException $err) {
            displayError($err);
        }
    }
    
    else if(isset($_POST['ville'])){
        $ville = htmlspecialchars(trim($_POST['ville']));
        try {
            $updateQuery = "UPDATE ca2 SET ville = :ville WHERE id = :id";
            $statement = $conn->prepare($updateQuery);
            $statement->execute(array(":ville" => $ville, ":id" => $id));
            displayAlert($statement, "La ville a été mise à jour");
        } catch (PDOException $err) {
            displayError($err);
        }
    }
} else {
    echo "Impossible de récupérer le contact";
}

//Fonctions utiles
function displayAlert($statement, $text) {
    if($statement->rowCount() === 1) {
        echo $text;
    } else {
        echo "Aucun changement effectué";
    }
}

function displayError($err) {
    echo "Une erreur est survenue :" . $err->getMessage();
}