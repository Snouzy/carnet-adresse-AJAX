<?php

include_once '../Database.php';

if(isset($_POST['typedWord']) && !empty($_POST['typedWord'])) {
    $typedWord = trim(htmlspecialchars($_POST['typedWord']));

    try {
        $searchQuery = "SELECT id, name, prenom
        FROM ca2 
        WHERE lower(prenom)
        LIKE '$typedWord%'
        OR lower(name)
        LIKE '$typedWord%'";

        $statement =  $conn->prepare($searchQuery);
        $statement->execute();
        $contacts = $statement->fetchAll(PDO::FETCH_ASSOC);

        if(count($contacts)) {
            for($i = 0; $i < count($contacts); $i++) {
                echo 
                "<li class='result-contact result-contact-find' onclick=\"displayInfo({$contacts[$i]["id"]})\">"  
                    . $contacts[$i]['name'] . " " . $contacts[$i]['prenom'] . 
                "</li>";
                //Pour que le <hr/> ne soit pas appliqué au dernier élément
                echo $i !== count($contacts) - 1 ? "<hr />" : "";
            }
        } else {
            echo "
            <p class='result-contact'>
                Aucun contact n'a été trouvé.
            </p>";
        }
    } catch(PDOException $err) {
        echo "La recherche n'a pas fonctionnée..." . $err->getMessage();
    }
}