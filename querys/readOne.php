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

    $output =  "
        <div class='form-group'>
            <label for='edit-name' class='col-md-2 control-label'>Nom</label>
            <div class='col-md-10 editable'>
                <input
                id='edit-name'
                onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'name', '{$contact['id']}')\"
                class='form-control'
                type='text'
                required
                value=". $contact['name'] .">
            </div>
        </div>

        <div class='form-group'>
            <label for='edit-prenom' class='col-md-2 control-label'>Prénom</label>
            <div class='col-md-10 editable'>
                <input
                onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'prenom', '{$contact['id']}')\"
                id='edit-prenom'
                class='form-control'
                type='text'
                required
                value=" . $contact['prenom'] .">
            </div>
        </div>
        <div class='form-group'>
            <label for='edit-email' class='col-md-2 control-label'>Email</label>
            <div class='col-md-10 editable'>
                <input 
                onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'email', '{$contact['id']}')\" 
                id='edit-email' 
                class='form-control' 
                type='text' required 
                value=". $contact['email'] ." >
            </div>
        </div>
        <div class='form-group'>
            <label for='edit-telephone' class='col-md-2 control-label'>Tel.</label>
            <div class='col-md-10 editable'>
                <input
                onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'telephone', '{$contact['id']}')\"
                id='edit-telephone'
                class='form-control'
                type='text'
                required
                value=" . $contact['telephone'] .">
            </div>
        </div>
        <div class='form-group'>
            <label for='edit-ville' class='col-md-2 control-label'>Ville</label>
            <div class='col-md-10 editable'>
                <input
                onclick=\"makeElementEditable(this)\"
                onblur=\"updateValidator(this, 'ville', '{$contact['id']}')\"
                id='edit-ville'
                class='form-control'
                type='text'
                required
                value=". $contact['ville'] .">
            </div>
        </div>
        <button
        class='btn btn-danger pull-right'
        id='closeForm'
        onclick=\"deleteContact('{$contact['id']}')\">
            Effacer le contact <i class='fa fa-close'></i>
        </button>
    ";
    echo $output;

} catch (PDOException $err){
    echo "Une erreur est survenue " .$err->getMessage();
}
