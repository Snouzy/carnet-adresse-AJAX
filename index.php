<?php $pageTitle = "Carnet d'adresse"; ?>

<?php include_once 'commons/header.php';?>
<body>
    <!--== start Introduction  ==-->
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
    <!--== end Introduction  ==-->
    <div class="container">
        <!--== start searchBar  ==-->
        <div class="s128">
            <div class="container-search">
                <div class="inner-form">
                    <div class="row row-search">
                        <div class="col-sm-12 results-field search">
                            <input type="search" placeholder="Contact à rechercher..." id="search"/>
                        </div>
                        
                    </div>
                    <div class="row row-result">
                        <div class="col-sm-12 results-field result">
                            <ul class="results">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--== end searchBar  ==-->
        <div class="row row-contact">
            <!--== start Forumlaire d'ajout ==-->
            <section class="col col-xs-10 col-sm-9 col-lg-6 white" id="createForm">
                <div>
                    <div class="box-tab"></div>
                    <h3>Créer un contact</h3><hr>
                </div>
                <form id="create-contact" action="" method="post">
                    <div class="form-group">
                        <label for="name" class="col-md-2 control-label">Nom</label>
                        <div class="col-md-10">
                            <div class="row createForm--row">
                                <input name="name" class="form-control createForm--input name" id="name" type="text" required >
                                <i id="name-check-icon" class="name-check-icon form-info--icon check-icon fa fa-check"></i>
                                <i id="name-error-icon" class="name-error-icon form-info--icon error-icon fa fa-times"></i>
                            </div>
                            <div class="row">
                                <span class="form-info--message name-message" id="name-message"></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="prenom" class="col-md-2 control-label">Prénom</label>
                        <div class="col-md-10">
                            <div class="row createForm--row">
                                <input name="prenom" class="form-control createForm--input prenom" id="prenom" type="text" required >
                                <i id="prenom-check-icon" class="prenom-check-icon form-info--icon check-icon fa fa-check"></i>
                                <i id="prenom-error-icon" class="prenom-error-icon form-info--icon error-icon fa fa-times"></i>
                            </div>
                            <div class="row">
                                <span class="form-info--message prenom-message" id="prenom-message"></span>
                            </div>      
                        </div>                      
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-md-2 control-label">Email</label>
                        <div class="col-md-10">
                        <div class="row createForm--row">
                                <input name="email" class="form-control createForm--input email" id="email" type="text" required >
                                <i id="email-check-icon" class="email-check-icon form-info--icon check-icon fa fa-check"></i>
                                <i id="email-error-icon" class="email-error-icon form-info--icon error-icon fa fa-times"></i>
                            </div>
                            <div class="row">
                                <span class="form-info--message email-message" id="email-message"></span>
                            </div>      
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="telephone" class="col-md-2 control-label">Telephone</label>
                        <div class="col-md-10">
                            <div class="row createForm--row">
                                <input name="telephone" class="form-control createForm--input telephone" id="telephone" type="text" required >
                                <i id="telephone-check-icon" class="telephone-check-icon form-info--icon check-icon fa fa-check"></i>
                                <i id="telephone-error-icon" class="telephone-error-icon form-info--icon error-icon fa fa-times"></i>
                            </div>
                            <div class="row">
                                <span class="form-info--message telephone-message" id="telephone-message"></span>
                            </div>      
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="ville" class="col-md-2 control-label">Ville</label>
                        <div class="col-md-10 ">
                        <select class="form-control" id="ville" required>
                            <option value="paris">Paris</option>
                            <option value="lyon">Lyon</option>
                            <option value="marseille">Marseille</option>
                        </select>
                        </div>
                    </div>
                    <div class="row createForm-row--endButtons">
                        <button class="btn btn-danger pull-right" id="closeForm">
                        Fermer le formulaire <i class="fa fa-close"></i>
                        </button>
                        <button type="submit" name="createBtn" class="btn btn-success pull-right">
                            Créer un contact <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </form>
            </section>
            <!--== end Forumlaire d'ajout ==-->

            <!--== start Contacts list ==-->
            <section class="col col-xs-10 col-sm-9 col-lg-6 main white" id="contact-section">
                <div class="actions-bar">
                    <a class="customBtn customBtn-1" href="allContacts.php">
                        <svg>
                            <rect x="0" y="0" fill="none" width="100%" height="100%" />
                        </svg>
                        <i class="fa fa-eye-slash"></i>&nbsp; Vue tableur
                    </a>
                    <a class="customBtn customBtn-1" id="add">
                        <svg>
                            <rect x="0" y="0" fill="none" width="100%" height="100%" />
                        </svg>
                        Ajouter 
                        <i class="fa fa-plus-circle"></i>
                    </a>
                </div>
                <div class="table-names">
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
            <!--== end Contacts list ==-->

            <!--== start Coordoonnées du contact ==-->
            <section class="col col-xs-10 col-sm-9 col-lg-6 main white" id="coordonnees-contact">
                <!--== start header des coordonnées ==-->
                <div class="coordonnees-contact--row">
                    <div class="coordonnees-contact--title">
                        <div class="box-tab"></div>
                        <h3>Coordonnées</h3><hr class="contact-line">
                    </div>
                    <div>
                        <i class="fa fa-times-circle" id="close-coordonnees"></i>
                    </div>
                </div>
                <!--== end header des coordonnées ==-->

                <!--== start body des coordonnées ==-->
                    <div id="contact-preview">
                        <div class='form-group'>
                            <label for='edit-name' class='col-md-2 control-label'>Nom</label>
                            <div class='col-md-10 editable-name'>
                                <div class="row editForm--row">
                                    <input
                                        id='edit-name'
                                        onclick='makeElementEditable(this)'
                                        class='form-control editForm--input name'
                                        type='text'
                                        required
                                    />
                                    <i id="" class="name-check-icon form-info--icon check-icon fa fa-check"></i>
                                    <i id="" class="name-error-icon form-info--icon error-icon fa fa-times"></i>
                                </div>
                                <div class="row">
                                    <span class="form-info--message name-message" id=""></span>
                                </div>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label for='edit-prenom' class='col-md-2 control-label'>Prenom</label>
                            <div class='col-md-10 editable-prenom'>
                                <div class="row editForm--row">
                                    <input
                                        id='edit-prenom'
                                        onclick='makeElementEditable(this)'
                                        class='form-control editForm--input prenom'
                                        type='text'
                                        required
                                    />
                                    <i id="" class="prenom-check-icon form-info--icon check-icon fa fa-check"></i>
                                    <i id="" class="prenom-error-icon form-info--icon error-icon fa fa-times"></i>
                                </div>
                                <div class="row">
                                    <span class="form-info--message prenom-message" id=""></span>
                                </div> 
                            </div>
                        </div>
                        <div class='form-group'>
                            <label for='edit-email' class='col-md-2 control-label'>Email</label>
                            <div class='col-md-10 editable-email'>
                            <div class="row editForm--row">
                                    <input
                                        id='edit-email'
                                        onclick='makeElementEditable(this)'
                                        class='form-control editForm--input email'
                                        type='text'
                                        required
                                    />
                                    <i id="" class="email-check-icon form-info--icon check-icon fa fa-check"></i>
                                    <i id="" class="email-error-icon form-info--icon error-icon fa fa-times"></i>
                                </div>
                                <div class="row">
                                    <span class="form-info--message email-message" id=""></span>
                                </div>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label for='edit-telephone' class='col-md-2 control-label'>Tel.</label>
                            <div class='col-md-10 editable-telephone'>
                                <div class="row editForm--row">
                                    <input
                                        id='edit-telephone'
                                        onclick='makeElementEditable(this)'
                                        class='form-control editForm--input telephone'
                                        type='text'
                                        required
                                    />
                                    <i class="telephone-check-icon form-info--icon check-icon fa fa-check"></i>
                                    <i class="telephone-error-icon form-info--icon error-icon fa fa-times"></i>
                                </div>
                                <div class="row">
                                    <span class="form-info--message telephone-message"></span>
                                </div>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label for='edit-ville' class='col-md-2 control-label'>Ville</label>
                            <div class='col-md-10 editable-ville'>
                                <select id="edit-ville" class="form-control">
                                    <option class="edit-option" value="Paris">Paris</option>
                                    <option class="edit-option" value="Marseille">Marseille</option>
                                    <option class="edit-option"  value="Lyon">Lyon</option>
                                </select>
                            </div>
                        </div>
                        <div class="editForm-row--endButtons">
                            <button
                                class='btn btn-danger pull-right' id='deleteContact'>
                                Effacer le contact <i class='fa fa-close'></i>
                            </button>
                            <button
                            class='btn btn-date pull-right' id='dateCreation' disabled>
                            </button>
                        </div>
                    </div>
                <!--== end body des coordonnées ==-->
            </section>
        </div>
        <!--== end Coordoonnées du contact area ==-->
    </div>

    <?php include_once 'commons/footer.php'; ?>
</body>
