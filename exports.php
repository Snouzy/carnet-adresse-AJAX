<?php
include_once 'Database.php';

if(isset($_POST['export_excel']) || isset($_POST['export_json']) || isset($_POST['export_csv'])) {
    $query = "SELECT * FROM ca2 ORDER BY id";
    $statement = $conn->query($query);

    // Récupération des contacts
    $contacts = $statement->fetchAll(PDO::FETCH_ASSOC);

    // JSON
    if(isset($_POST['export_json'])) {
        echo '<pre>' . print_r(json_encode($contacts), 1) . '</pre>';
    }

    // CSV
    if(isset($_POST['export_csv'])) {
        header("Content-type: text/csv");
        header("Content-Disposition: attachment; filename=contacts_netty.csv");
        $output = fopen("php://output", "w");
        fputcsv($output, array('id', 'name', 'prenom', 'email', 'telephone', 'ville', 'dateCreation'));
        if($contacts) {
            foreach($contacts as $contact) {
                fputcsv($output, $contact);
            }
            fclose($output);
        } else echo 'Aucun contact n\'a été récupéré';
    }

    // XLS
    if(isset($_POST['export_excel'])) {
        // Template
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

        //S'il y a des résultats
        if($contacts) {
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
        } else $output = "Aucun contact à récupérer.";

        $output .= "</table>";

        // Téléchargement
        header("Content-Type: application/xls; charset=utf-8");
        header("Content-Disposition: attachment; filename=netty_contacts.xls");
        echo "\xEF\xBB\xBF"; // UTF-8 fix (bug on the mac...)
        echo $output;
    }
}