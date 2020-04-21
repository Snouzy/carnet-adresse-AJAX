<?php

include_once '../Database.php';

try {
    $id = $_POST['id'];
    $readOneQuery = "SELECT * FROM ca2 WHERE id = :id";
    $statement = $conn->prepare($readOneQuery);

    $statement->execute(array(":id" => $id));
    $statement->execute();
    $contact = $statement->fetch(PDO::FETCH_ASSOC);
    $create_date = strftime("%b %d, %Y", strtotime($contact['dateCreation']));

    $output = "
    <tr>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"update(this, 'name', '{$contact['id']}')\">" . $contact['name'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"update(this, 'prenom', '{$contact['id']}')\">" . $contact['prenom'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"update(this, 'email', '{$contact['id']}')\">" . $contact['email'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"update(this, 'telephone', '{$contact['id']}')\">" . $contact['telephone'] . "</div>
        </td>
        <td title='Cliquez pour modifier'>
            <div class='editable' onclick=\"makeElementEditable(this)\" 
            onblur=\"update(this, 'ville', '{$contact['id']}')\">" . $contact['ville'] . "</div>
        </td>
        <td> $create_date </td>
        <td style=\"width: 5%;\">
                <button class='btn-danger' onclick=\"deleteTask('{$contact['id']}')\">
                        <i class=\"fa fa-times\"></i>
                </button>
            </td>
    </tr>";
    echo $output;

} catch (PDOException $ex){
    echo "Une erreur est survenue " .$ex->getMessage();
}
