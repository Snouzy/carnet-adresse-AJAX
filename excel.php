<?php
include_once 'Database.php';


if(isset($_POST['export_excel'])) {
    $query = "SELECT * FROM ca2 ORDER BY id";
    $statement = $conn->query($query);
    $output = '
        <table bordered="1">
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Ville</th>
                <th>Date de création</th>
            </tr>
    ';

    // Récupération des contacts
    $contacts = $statement->fetchAll(PDO::FETCH_ASSOC);
    foreach($contacts as $contact) {
        setlocale(LC_TIME, 'fr_FR.utf8','fra');
        $formattedDate = strftime("%a %d %b %Y", strtotime($contact['dateCreation']));
        $output .= '
            <tr>
                <td>'.$contact['name'].'</td>
                <td>'.$contact['prenom'].'</td>
                <td>'.$contact['email'].'</td>
                <td>'.$contact['telephone'].'</td>
                <td>'.$contact['ville'].'</td>
                <td>'.$formattedDate.'</td>
            </tr>
        ';
    }
    $output .= "</table>";

    // Téléchargement
    header("Content-Type: application/xls; charset=utf-8");
    header("Content-Disposition: attachment; filename=netty_contacts.xls");
    echo "\xEF\xBB\xBF"; // UTF-8 fix (bug on the mac...)
    echo $output;
}