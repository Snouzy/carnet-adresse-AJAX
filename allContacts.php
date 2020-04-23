<?php $pageTitle = "Gérer les contacts"; ?>

<?php include_once 'commons/header.php';?>

    <div class="container-fluid">
        <section class="col .col-xs-12 .col-sm-6 .col-md-8 col-lg-12 main">
            <h3 class="text-primary">Coordonnées </h3><hr>

            <table class="table table-striped table-bordered table-responsive">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Ville</th>
                    <th>Crée le</th>
                    <th>Actison</th>
                </tr>
                </thead>

                <tbody id="all-contact-list"> </tbody>
            </table>
        </section>
    </div>

<?php include_once 'commons/footer.php'; ?>