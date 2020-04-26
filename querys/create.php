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

        /* ==-- get l'id pour le display sur la section preview-contact --== */
        $idQuery = "SELECT max(id) FROM ca2";
        $statement2 = $conn->query($idQuery);
        $res = $statement2->fetch(PDO::FETCH_ASSOC);
        if($statement){
            $output = [
                'message' => "Contact ajouté !",
                'id' => $res['max(id)']
            ];
            echo json_encode($output);
        }
        
    } catch (PDOException $ex) {
        echo "Une erreur est survenue !" .$ex->getMessage();
    }
}
