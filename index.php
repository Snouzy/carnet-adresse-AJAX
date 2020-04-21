<?php $pageTitle = "Carnet d'adresse"; ?>

<?php include_once 'commons/header.php';?>
<body>
    <!--== start Introduction area ==-->
    <div class="container-intro">
        <div class="introduction">
            <div class="text-line"><span>19 AVR. 2020</span></div>
            <h1>Exercice pratique Netty.fr</h1>
            <div class="text-line"><span>BRADICEANU MATHIAS</span></div>
            <p class="resume">Bonjour j'aimerai m'excuser pour le premier torchon que je vous ai rendu. Je ne pouvais pas rester sur un tel echec. Merci à l'équipe de Netty.fr et en particulier à Thomas qui a prit de son temps pour me permettre de réaliser cet exercice. Je reste à votre entière disposition via 
                <a class="underline" href="https://www.linkedin.com/in/mathias-bradiceanu-3410b1ab/">
                    Linkedin
                </a>, sur 
                <a class="underline" href="mailto:mathiasnouzy@gmail.com">
                    mathiasnouzy@gmail.com
                </a> 
                ou au 06 26 66 08 42. Encore désolé.
            </p>
        </div>
</div class="container-intro">
    <!--== end Introduction area ==-->
<div class="container-fluid">
    <div class="s128">
        <form>
            <div class="inner-form">
                <div class="row">
                    <div class="input-field second">
                        <input type="search" placeholder="Prénom du contact" id="search"/>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="row row-contact">
        <section class="col col-xs-12 col-sm-6 col-md-8 col-lg-6 white" id="createForm">
            <h3 class="text-primary">Créer un contact</h3><hr>
            <form id="create-contact" action="" method="post">
                <div class="form-group">
                    <label for="name" class="col-md-2 control-label">Nom</label>
                    <div class="col-md-10">
                        <input name="name" class="form-control" id="name" type="text" required >
                    </div>
                </div>

                <div class="form-group">
                    <label for="prenom" class="col-md-2 control-label">Prénom</label>
                    <div class="col-md-10">
                        <input name="prenom" class="form-control" id="prenom" type="text" required >
                    </div>
                </div>
                <div class="form-group">
                    <label for="email" class="col-md-2 control-label">Email</label>
                    <div class="col-md-10">
                        <input name="email" class="form-control" id="email" type="text" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="telephone" class="col-md-2 control-label">Telephone</label>
                    <div class="col-md-10">
                        <input name="telephone" class="form-control" id="telephone" type="number" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ville" class="col-md-2 control-label">Ville</label>
                    <div class="col-md-10 ">
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option value="paris">Paris</option>
                        <option value="lyon">Lyon</option>
                        <option value="marseille">Marseille</option>
                    </select>
                    </div>
                </div>
                <button type="submit" name="createBtn" class="btn btn-success pull-right">
                    Créer un contact <i class="fa fa-plus"></i>
                </button>
                <button class="btn btn-danger pull-right" id="closeForm">
                   Fermer le formulaire <i class="fa fa-close"></i>
                </button>
            </form>
        </section>
        <!--== Contacts ==-->
        <section class="col col-xs-12 col-sm-6 main">
        <!-- <h3 class="text-primary">Contacts</h3> -->
            <hr>
            
            <div class="actions-bar">
                <a class="customBtn customBtn-1" href="allContacts.php">
                    <svg>
                        <rect x="0" y="0" fill="none" width="100%" height="100%" />
                    </svg>
                    <i class="fa fa-eye-slash"></i>&nbsp; Tous les contacts
                </a>
                <a class="customBtn customBtn-1" id="add">
                    <svg>
                        <rect x="0" y="0" fill="none" width="100%" height="100%" />
                    </svg>
                    Ajouter <i class="fa fa-plus-circle"></i>
                </a>
            </div>
            <div style="height: 40vh; overflow: auto;">
                <table class="table table-striped table-hover" style="border: 1px solid #ddd">
                    <thead >
                        <tr>
                            <td scope="col" id="first-line">
                                <p style="display:inline">
                                    Contacts
                                </p>
                               
                            </td>
                        
                        </tr>
                    </thead>
                    <tbody id="contact-list">
                        
                    </tbody>
                </table>
            </div>
        </section>
        <!--== end Contacts ==-->
        <section class="col col-xs-12 col-sm-6 main">
            <h3>Coordonnées <i class="fa fa-info-circle" style="color:#08A1CA" aria-hidden="true"></i></h3><hr>
            <table class="table table-striped table-bordered table-responsive">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Ville</th>
                    <th>Créer le</th>
                    <th>Effacer</th>
                </tr>
                </thead>

                <tbody id="contact-preview"> </tbody>
            </table>
        </section>

    </div>
</div>

<?php include_once 'commons/footer.php'; ?>
</body>
