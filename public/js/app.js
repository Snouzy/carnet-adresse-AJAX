/* 
===============
Regexps 
===============*/
const villesPossibles = [];
$('option').each((index, el) => {
    villesPossibles.push(el.value)
});
const regexps = {
    'name': new RegExp("^[a-zA-Zéèàêëöîïâûü]+(([' -][a-zA-Zéèàêëöîïâûü ])?[a-zA-Zéèàêëöîïâûü]*)*$"),
    'prenom': new RegExp("^[a-zA-Zéèàêëöîïâûü]+(([' -][a-zA-Zéèàêëöîïâûü ])?[a-zA-Zéèàêëöîïâûü]*)*$"),
    'email': new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
    'telephone': new RegExp("^(([+]{1}[0-9]{2}|0)[0-9]{9})$"),
    'ville' : villesPossibles
}

$(document).ready(function () {
    //Chargement de la liste des contacts (bloc gauche) et de tous les contacts (allContacts.php)
    $('#all-contact-list').load('querys/readAll.php');
    $('#contact-list').load('querys/readNames.php');

    //Au click sur "fermer le formulaire"
    $("#closeForm").click(function(e) {
        e.preventDefault();
        $("#createForm").fadeOut();
    });

    // Au click sur "Ajouter"
    $("#add").click(function(e){
        e.preventDefault();
        $("#createForm").fadeIn();
    })
    // A la perte du focus dans la recherche
    $('#search').blur(function() {
        $('.row-result').fadeOut();
    });

    // Quand l'utilisateur recherche
    $('#search').keyup(function() {
        var typedWord = $(this).val();
        if(typedWord !== "") {
            $.ajax({
                url: 'querys/readSearch.php',
                method: 'POST',
                data: {word: typedWord},
                success: function(data){
                    if(data !== "")
                    $('.row-result').fadeIn();
                    $('.results').html(data);
                }
            })
        } else {
            $('.row-result').fadeOut();
        }
    })

    // A l'envoi du formulaire
    $('#create-contact').submit(function (event) {
        event.preventDefault();
        var form = $(this);
        //Si les informations sont valides
        if(checkForm()) {
            var formData = form.serialize();
            console.log(formData);
            $.ajax({
                url: 'querys/create.php',
                method: 'POST',
                data: formData,
                success: function (data) {
                    displayAlert(3000, 300, data);
                    $('#all-contact-list').load('querys/readAll.php');
                    $('#contact-list').load('querys/readNames.php');
                    document.getElementById("create-contact").reset();
                    $("#createForm").fadeOut();
                }
            });
        }
    });
});

// Permet de faire les vérifications avant de "submit" le formulaire
function checkForm() {
    const tousLesChamps = ["name", "prenom", "email", "telephone", "ville"];

    //On test chaque champ avec sa regexp correspondante dans l'objet regexps
    tousLesChamps.forEach(el => {
        if(el == "ville") { //particulier car c'est un tableau
            if(!regexps[el].includes($(`#${el}`).val())){
                displayAlert(3000, 300, "La ville n'est pas valide", true);
                return false
            }
        } else {
            if(!regexps[el].test($(`#${el}`).val())) {
                displayAlert(3000, 300, `Le champ ${el} est incorrect`, true);
                return false;
            }
        }
    })
    return true
}

/* 
===============
Vérifications effectuées lors de la modification d'un conctact 
===============*/
function updateValidator(target, prop, id) {
    var regexp = regexps[prop];
    var value = $(target).val();
    if(prop == "ville") {
        if(!regexp.includes(value.toLowerCase())){
            displayAlert(3000, 300, "La ville n'est pas valide", true);
            return false
        }
    } else {
        if(!regexp.test(value)) {
            displayAlert(3000, 300, `Le champ ${prop} n'est pas valide`, true);
            return false
        }
    }
    update(target, prop, id);
}
/*
===============
Fin des vérifications 
===============*/

/* Fonction qui est appelée après avoir vérifier les données saisies */
function update(target, prop, id) {
    var data = $(target).val();
    target.contentEditable = false;
    $.ajax({
        url: 'querys/update.php',
        method: 'POST',
        data: {[prop]: data, id: id},
        success: function (data) {
            displayAlert(3000, 300, data);
        }
    });
    $('#contact-list').load('querys/readNames.php');
}

/* supprime et met à jour les listes */
function deleteContact(id) {
    if(confirm("Voulez-vous vraiment supprimer ce contact ?")){
        $.ajax({
            url: 'querys/delete.php',
            method: 'POST',
            data: {id:id},
            success: function (data) {
                displayAlert(3000, 300, data);
                //Màj des listes
                $('#all-contact-list').load('querys/readAll.php');
                $('#contact-list').load('querys/readNames.php');
                $('#contact-preview').html('');
            }
        });
    }
    return false;
}

/* Permet de preview un contact */
function displayInfo(id) {
    $.ajax({
        url: 'querys/readOne.php',
        method: 'POST',
        data: { id:id },
        success: function (data) {
            displayAlert(1500, 300, "Contact récupéré");
            $("#contact-preview").html(data);
        }
    });
}

/* Toasts notifications en bas à droite */
function displayAlert(delay, slideUp, html, isError = false) {
    if(!isError) {
        $('#ajax_msg').css("display", "block").delay(delay).slideUp(slideUp).html(html);
    } else { //Si c'est une erreur on change la couleur
        $('#ajax_msgerror').css("display", "block").delay(delay).slideUp(slideUp).html(html);
    }
}

/* Rend un élément éditable */
function makeElementEditable(div) {
    $(div).attr("contentEditable", "true");
}
