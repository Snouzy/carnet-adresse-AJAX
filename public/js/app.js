/* ==-- Regexps --== */

// minuscules, mieux pour comparer par la suite
var villesPossibles = ["paris", "marseille", "lyon"];
var regexps = {
    'name': new RegExp("^[a-zA-Zéèàêëöîïâûü]+(([' -][a-zA-Zéèàêëöîïâûü ])?[a-zA-Zéèàêëöîïâûü]*)*$"),
    'prenom': new RegExp("^[a-zA-Zéèàêëöîïâûü]+(([' -][a-zA-Zéèàêëöîïâûü ])?[a-zA-Zéèàêëöîïâûü]*)*$"),
    'email': new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
    'telephone': new RegExp("^(([+]{1}[0-9]{2}|0)[0-9]{9})$"),
    'ville' : villesPossibles
}

$(document).ready(function () {
    /**
     * Chargement de la liste des contacts (readNames) et de tous les contacts (allContacts.php)
     */
    $('#all-contact-list').load('querys/readAll.php');
    $('#contact-list').load('querys/readNames.php');

    /**
     * Au click sur "Fermer le formulaire" 
     */
    $("#closeForm").click(function(e) {
        e.preventDefault();
        $("#createForm").fadeOut("400", function(){
            $("#contact-section").fadeIn().delay(800);
        });
    });
    /**
     * Au click sur la croix rouge 
     */
    $('#close-coordonnees').click(function(e) {
        $('#coordonnees-contact').fadeOut();
    })

    /**
     * Au click sur "Ajouter" 
     */
    $("#add").click(function(e){
        e.preventDefault();
        $("#coordonnees-contact").fadeOut();
        $("#contact-section").fadeOut("400", function(){
            $("#createForm").fadeIn().delay(800);
        })
    });

    /**
     * A la perte du focus dans la recherche 
     */
    $('#search').blur(function() {
        $('.row-result').fadeOut();
        $(this).val(""); //reset le champ
    });

    /**
     * Quand l'utilisateur recherche
     */
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

    //! TODO
    //Au click sur la vue tableur 
    // $("a[href='allContacts.php']").click(function() {
    //     $.ajax({
    //         type: "POST",
    //         url: "readAll.php",
    //         dataType: "json",
    //         success: function (data) {
                
    //         }
    //     });
    // })
    
    /**
     * A l'envoi du formulaire 
     */
    $('#create-contact').submit(function (event) {
        event.preventDefault();
        var form = $(this);
        //Si les informations sont valides
        if(checkForm()) {
            var formData = form.serialize();
            $.ajax({
                url: 'querys/create.php',
                method: 'POST',
                data: formData,
                success: function (data) {
                    data = JSON.parse(data);
                    displayAlert(3000, 300, data.message);
                    $('#all-contact-list').load('querys/readAll.php');
                    $('#contact-list').load('querys/readNames.php');
                    $("#createForm").fadeOut("400", function(){
                        $("#contact-section").fadeIn();
                        displayInfo(data.id);
                    });
                    document.getElementById("create-contact").reset();
                }
            });
        }
    });
});

/**
 * Permet de faire les vérifs avant de submit le formulaire 
 * @returns {bool}
 */
function checkForm() {
    const tousLesChamps = ["name", "prenom", "email", "telephone", "ville"];
    //On test chaque champ avec sa regexp correspondante dans l'objet regexps
    for (let el of tousLesChamps) {
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
    }
    return true
}


/**
 * Permet de vérifier le formulaire avant d'effectivement update les infos
 * @param {HTMLElement} target
 * @param {string} prop
 * @param {string} id
 * @returns {bool}
 */
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

/**
 * Fonction qui est appelée après avoir vérifier les données saisies par updateValidator
 * @param {HTMLElement} target
 * @param {string} prop
 * @param {string} id
 * @returns {void} 
 */
function update(target, prop, id) {
    var data = $(target).val();
    target.contentEditable = false;
    $.ajax({
        url: 'querys/update.php',
        method: 'POST',
        data: {[prop]: data, id: id},
        success: function (data) {
            if(data) displayAlert(3000, 300, data);
        }
    });
    $('#contact-list').load('querys/readNames.php');
}

/**
 * Supprime et met à jour les listes des contacts 
 * @param {string} id
 * @returns {bool}
 */
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
                $('#coordonnees-contact').fadeOut();
            }
        });
    }
    return false;
}



/**
 * Permet d'avoir une preview du contact sélectionné
 * @param {string} id
 */
function displayInfo(id) {
    $('#coordonnees-contact').fadeIn();
    $.ajax({
        url: 'querys/readOne.php',
        method: 'POST',
        data: {id: id},
        success: function (data) {
            data = JSON.parse(data);
            var keys = Object.keys(data);
            var numberOfInputs = Object.keys(data).length; 
            //push les données dans les inputs
            for(let i = 0; i < numberOfInputs; i++) {
                $(`#edit-${keys[i]}`).val(data[keys[i]]).attr("onblur", `updateValidator(this, '${keys[i]}', ${id})`)
            }
            $('#deleteContact').attr("onclick", `deleteContact(${id})`)
            $('#dateCreation').html(`Crée le ${data.dateCreation}`)

            displayAlert(1500, 300, "Contact récupéré");
        }
    });
}


/**
 * Permet d'afficher une toast notification en fonction de si c'est une erreur ou pas
 * @param {int} delay
 * @param {int} slideUp
 * @param {string} html
 * @param {bool} isError=false
 */
function displayAlert(delay, slideUp, html, isError = false) {
    if(!isError) {
        $('#ajax_msg').css("display", "block").delay(delay).slideUp(slideUp).html(html);
    } else { //Si c'est une erreur on change la couleur
        $('#ajax_msgerror').css("display", "block").delay(delay).slideUp(slideUp).html(html);
    }
}

/**
 * Rend un élément éditable 
 * @param {HTMLElement} div
 */
function makeElementEditable(div) {
    $(div).attr("contentEditable", "true");
}
