
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
                    $('#ajax_msg').css("display", "block").delay(3000).slideUp(300).html(data);
                    $('#all-contact-list').load('querys/readAll.php');
                    $('#contact-list').load('querys/readNames.php');
                    document.getElementById("create-contact").reset();
                    $("#createForm").fadeOut();
                }
            });
        }
    });
    
});

// Prends toutes les possibilités des villes instanciées, afin de voir si la réponse est contenu dans l'un de ces indexs du tableau (pour eviter de changer la "value")
const possibilites = [];
$('option').each((index, el) => {
    possibilites.push(el.value)
});

// Permet de faire les vérifications avant de "submit" le formulaire
function checkForm() {
    var nomEtPrenomValidator = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if(!nomEtPrenomValidator.test($("#name").val()) || !nomEtPrenomValidator.test($("#prenom").val())) {
        $('#ajax_msgerror').css("display", "block").delay(5000).slideUp(300).html("Les noms et prénoms ne peuvent être composés que de caractères valides !");
        return false
    }

    var emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!emailValidator.test($("#email").val())) {
        $('#ajax_msgerror').css("display", "block").delay(5000).slideUp(300).html("L'email n'est pas valide");
        return false
    }

    var telValidator = /^(([+]{1}[0-9]{2}|0)[0-9]{9})$/;
    if(!telValidator.test($("#telephone").val())) {
        $('#ajax_msgerror').css("display", "block").delay(5000).slideUp(300).html("Le numéro de téléphone n'est pas valide");
        return false
    }
    
    if(!possibilites.includes($(exampleFormControlSelect1).val())){
        $('#ajax_msgerror').css("display", "block").delay(5000).slideUp(300).html("La ville n'est pas valide");
        return false
    }

    // validation success
    return true;
}

function makeElementEditable(div) {
    div.style.border = "1px solid lavender";
    div.style.padding = "5px";
    div.style.background = "white";
    div.contentEditable = true;
}

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
            $('#ajax_msg').css("display", "block").delay(150000).slideUp(300).html(data);
        }
    });
    $('#contact-list').load('querys/readNames.php');
}

function deleteTask(taskId) {
    if(confirm("Voulez-vous vraiment supprimer ce contact ?")){
        $.ajax({
            url: 'querys/delete.php',
            method: 'POST',
            data: {id:taskId},
            success: function (data) {
                $('#ajax_msg').css("display", "block").delay(3000).slideUp(300).html(data);
                //Màj des listes
                $('#all-contact-list').load('querys/readAll.php');
                $('#contact-list').load('querys/readNames.php');
            }
        });
    }
    return false;
}

function displayInfo(taskId) {
    $.ajax({
        url: 'querys/readOne.php',
        method: 'POST',
        data: { id:taskId },
        success: function (data) {
            $('#ajax_msg').css("display", "block").delay(3000).slideUp(300).html("Contact récupéré");
            $("#contact-preview").html(data);
        }
    });
}