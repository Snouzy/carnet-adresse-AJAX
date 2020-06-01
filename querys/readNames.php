<?php

include_once '../Database.php';

try {
    $readQuery = "SELECT id, name, prenom FROM ca2 ORDER BY name";
    $statement = $conn->query($readQuery);
    $contact = $statement->fetchAll(PDO::FETCH_ASSOC);
    for($i = 0; $i < count($contact); $i++) {
        $output = "
        <tr>
            <td scope='row' title='Voir le contact'>
                <div class='editable'
                onclick=\"displayInfo({$contact[$i]["id"]})\"> " . $contact[$i]['name'] . " " . $contact[$i]['prenom'] . " </div>
            </td>
        </tr>";
        echo $output;
    }

} catch (PDOException $err) {
    echo "Une erreur est survenue : " . $err->getMessage();
}