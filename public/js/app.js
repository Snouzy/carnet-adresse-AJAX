
var emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var nomEtPrenomValidator = /^[a-zA-Zéèàêëöîïâûü]+(([' -][a-zA-Zéèàêëöîïâûü ])?[a-zA-Zéèàêëöîïâûü]*)*$/;
var telValidator = /^(([+]{1}[0-9]{2}|0)[0-9]{9})$/;
// Prends toutes les possibilités des villes instanciées, afin de voir si la réponse est contenu dans l'un de ces indexs du tableau (pour eviter de changer la "value")
const possibilites = [];
$('option').each((index, el) => {
    possibilites.push(el.value)
});

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
    if(!nomEtPrenomValidator.test($("#name").val()) || !nomEtPrenomValidator.test($("#prenom").val())) {
        displayAlert(3000, 300, "Les noms et prénoms ne peuvent être composés que de caractères valides !", true);
        return false
    }
    if(!emailValidator.test($("#email").val())) {
        displayAlert(3000, 300, "L'email n'est pas valide", true);
        return false
    }

    if(!telValidator.test($("#telephone").val())) {
        displayAlert(3000, 300, "Le numéro de téléphone n'est pas valide", true);
        return false
    }
    
    if(!possibilites.includes($(exampleFormControlSelect1).val())){
        displayAlert(3000, 300, "La ville n'est pas valide", true);
        return false
    }
    // validation success
    return true;
}

function makeElementEditable(div) {
    $(div).css({
        "border": "1px solid lavender",
        "padding" : "5px",
        "background": "white"
    })
    .attr("contentEditable", "true");
}

function updateVille(target, telephone, id) {
    console.log(possibilites);
    if(!possibilites.includes($(target).html().toLowerCase())){
        displayAlert(3000, 300, "La ville n'est pas valide", true);
        return false
    }
    update(target, telephone, id);
}

function updateNomOuPrenom(target, telephone, id) {
    if(!nomEtPrenomValidator.test($(target).html())) {
        displayAlert(1000, 300, "Les noms et prénoms ne peuvent être composés que de caractères valides !", true);
        return false
    }
    update(target, telephone, id);
}
function updateTelValidator(target, telephone, id) {
    if(!telValidator.test($(target).html())) {
        displayAlert(1000, 300, "Le numéro de téléphone n'est pas valide", true);
        return false
    }
    update(target, telephone, id);
}

function updateMailValidator(target, email, id) {
    if(!emailValidator.test($(target).html())) {
        displayAlert(1000, 300, "L'email n'est pas valide", true);
        return false
    }
    update(target, email, id);
}

/* Fonction générique qui est appelée après avoir vérifier les données saisies */
function update(target, props, id) {
    var data =target.textContent;
    console.log(arguments);
    target.style.border = "none";
    target.style.padding = "0px";
    target.style.background = "#ececec";
    target.contentEditable = false;
    
    $.ajax({
        url: 'querys/update.php',
        method: 'POST',
        data: {[props]: data, id: id},
        success: function (data) {
            displayAlert(1500, 300, data);
        }
    });
    $('#contact-list').load('querys/readNames.php');
}
/* */
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

function displayAlert(delay, slideUp, html, isError = false) {
    if(!isError) {
        $('#ajax_msg').css("display", "block").delay(delay).slideUp(slideUp).html(html);
    } else {
        $('#ajax_msgerror').css("display", "block").delay(delay).slideUp(slideUp).html(html);
    }
}
