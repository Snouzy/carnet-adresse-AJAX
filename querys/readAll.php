<?php

include_once '../Database.php';

try {
    $readQuery = "SELECT * FROM ca2 ORDER BY name";
    $statement = $conn->query($readQuery);
    
    while($contact = $statement->fetch(PDO::FETCH_OBJ)) {
        setlocale(LC_TIME, 'fr_FR.utf8','fra');
        $create_date = strftime("%a %d %b %Y", strtotime($contact->dateCreation));
        $output = "
        <tr>
            <td title='Cliquez pour modifier'>
                <input type='text' class='editable' onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'name', '{$contact->id}')\" value='$contact->name'/>
            </td>
            
            <td title='Cliquez pour modifier'> 
                <input type='text' class='editable' onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'prenom', '{$contact->id}')\" value='$contact->prenom'/>
            </td>
            
            <td title='Cliquez pour modifier'> 
                <input type='text' class='editable' onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'email', '{$contact->id}')\" value='$contact->email'/>
            </td>

            <td title='Cliquez pour modifier'> 
                <input type='text' class='editable' onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'telephone', '{$contact->id}')\" value='$contact->telephone'/>
            </td>

            <td title='Cliquez pour modifier'> 
                <input type='text' class='editable' onclick=\"makeElementEditable(this)\" 
                onblur=\"updateValidator(this, 'ville', '{$contact->id}')\" value='$contact->ville'/>
            </td>
            
            <td> $create_date </td>
            
            <td style=\"width: 5%;\">
                <button class='btn-danger' onclick=\"deleteContact('{$contact->id}')\">
                    <i class=\"fa fa-times\"></i>
                </button>
            </td>
        </tr>";
        echo $output;
    }
} catch (PDOException $err){
    echo "Une erreur est survenue " .$err->getMessage();
}
