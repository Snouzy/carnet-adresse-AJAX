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

    $output = "
    <tr>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"updateNomOuPrenom(this, 'name', '{$contact['id']}')\">" . $contact['name'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"updateNomOuPrenom(this, 'prenom', '{$contact['id']}')\">" . $contact['prenom'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"updateMailValidator(this, 'email', '{$contact['id']}')\">" . $contact['email'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"updateTelValidator(this, 'telephone', '{$contact['id']}')\">" . $contact['telephone'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"updateVille(this, 'ville', '{$contact['id']}')\">" . $contact['ville'] . "</div>
        </td>
        <td> $create_date </td>
        <td style=\"width: 5%; text-align:center\">
                <button class='btn-danger' onclick=\"deleteContact('{$contact['id']}')\">
                        <i class=\"fa fa-times\"></i>
                </button>
            </td>
    </tr>";
    echo $output;

} catch (PDOException $err){
    echo "Une erreur est survenue " .$err->getMessage();
}
