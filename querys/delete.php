<?php

include_once '../Database.php';

if(isset($_POST['id'])){
    $id = $_POST['id'];

    try{
        $deleteQuery = "DELETE FROM ca2 WHERE id = :id";

        $statement = $conn->prepare($deleteQuery);
        $statement->execute(array(":id" => $id));

        if($statement){
            echo "Contact supprimé";
        }

    } catch (PDOException $ex){
        echo "Une erreur est survenue" .$ex->getMessage();
    }
}
