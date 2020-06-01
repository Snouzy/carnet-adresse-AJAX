
/* ==-- Global variables --== */
const lastURIElement = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
const villesPossibles = ["paris", "marseille", "lyon"];
const regexps = {
    'name': new RegExp("^[a-zA-Zéèàêëöîïâûü]+(([' -][a-zA-Zéèàêëöîïâûü ])?[a-zA-Zéèàêëöîïâûü]*)*$"),
    'prenom': new RegExp("^[a-zA-Zéèàêëöîïâûü]+(([' -][a-zA-Zéèàêëöîïâûü ])?[a-zA-Zéèàêëöîïâûü]*)*$"),
    'email': new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
    'telephone': new RegExp("^(([+]{1}[0-9]{2}|0)[0-9]{9})$"),
    'ville' : villesPossibles
}


$(document).ready(function () {
    // Chargement de la bonne liste des contacts en fonction de la page (économise une requête SELECT * non négligeable)
    lastURIElement !== "allContacts.php" ? displayNomsAndPrenoms(): displayTableurVue();

    /**
     * @description Au click sur "Fermer le formulaire", ré-initialise le formulaire et affiche la vue principale
     */
    $("#closeForm").click(function(e) {
        e.preventDefault();
        $("#createForm").fadeOut(() => {$("#contact-section").fadeIn(); resetForm("#create-contact");});
    });

    /**
     * @description Au click sur la croix rouge, désactive la preview du contact
     */
    $('#close-coordonnees').click(() => $('#coordonnees-contact').fadeOut())

    /**
     * @description
     * Au click sur "Ajouter", on reset le formulaire et on affiche seulement le formulaire d'ajout
     */
    $("#add").click(function(e){
        e.preventDefault();
        resetForm("#create-contact");
        $("#coordonnees-contact").fadeOut();
        $("#contact-section").fadeOut(() => $("#createForm").fadeIn())
    });

    /**
     * @description A la perte du focus dans la search bar on reset le champ
     */
    $('#search').blur(function() {
        $('.row-result').fadeOut();
        $(this).val(""); //reset le champ
    });

    /**
     * @description 
     * Quand l'utilisateur tape dans la barre de recherche, on envoie une requête ajax pour récupérer les utilisateurs correspondants
     */
    $('#search').keyup(function() {
        const typedWord = $(this).val();
        if(typedWord !== "") {
            $.ajax({
                url: 'querys/readSearch.php',
                method: 'POST',
                data: { typedWord },
                success: data => {
                    if(data !== "")
                    $('.row-result').fadeIn();
                    $('.results').html(data);
                }
            })
        } else {
            $('.row-result').fadeOut();
        }
    })
    
    /**
     * @description A l'envoi du formulaire 
     */
    $('#create-contact').submit(function (event) {
        event.preventDefault();
        const form = $(this);

        //Si les informations sont valides
        if(checkForm()) {
            const formData = form.serialize();
            $.ajax({
                url: 'querys/create.php',
                method: 'POST',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    displayAlert(3000, 300, data.message);
                    displayTableurVue();
                    displayNomsAndPrenoms();
                    $("#createForm").fadeOut(() => {
                        $("#contact-section").fadeIn();
                        displayInfo(data.id);
                    });
                    //reset le form
                    resetForm("#create-contact");
                }
            });

        }
    });

    /**
     * @description Quand l'utilisateur ajoute ou modifie un contact
     */
    $('.createForm--input, .editForm--input').each(function () {
        $(this).keyup(function() {
            if($(this).attr('id').includes("edit")) checkInstantForm($(this), true); //Si c'est une édition
            else checkInstantForm($(this)); // Si c'est un ajout
        });
        $(this).blur(function() {
            $(`#${$(this).get(0).id}-message`).fadeOut(); //On enlève tous les messages
        });
    })
});

/**
 * @description se charge de réinitialiser le formulaire (valeurs + icônes d'infos)
 * @param {string} formId l'id du formulaire à reset
 */
const resetForm = formId => {
    console.log(formId);
    $(formId)[0].reset();
    //Enlève les messages ainsi que les icônes
    $('.form-info--icon, .form-info--message').each(function(){
        $(this).css("display", "none");
    });
}

/**
 * @description 
 * Rend le visuel en fonction de l'entrée de l'utilisateur qui est valide ou non
 * @param {string} eltId -> L'id de l'input à modifier
 * @param {boolean} isAnError=false -> Le nom de l'icône à afficher ou supprimer
 */
const setVisualOfInput = (eltId, isAnError = false) => {
    let color = '#008000';
    let elementToFadeOut = 'error'
    let elementToFadeIn = 'check'

    //Si c'est une erreur on change les paramètres afin de rendre visuellement la bonne couleur & icon
    if(isAnError) {
        color = '#ff0000';
        elementToFadeOut = 'check';
        elementToFadeIn = 'error';
    } else $(`.${eltId}-message`).fadeOut("fast")

    // Les actions communes aux erreurs et aux succès
    $(`.${eltId}-${elementToFadeOut}-icon`).fadeOut("fast", () => {
        $(`.${eltId}-${elementToFadeIn}-icon`).fadeIn().css({'color': color, 'display':'block'});
    });
    $(`.${eltId}`).css('background-image', `linear-gradient(${color}, ${color}), linear-gradient(rgb(210, 210, 210), rgb(210, 210, 210))`);
}

/**
 * @description Rend en temps réel des informations sur le formulaire (texte et icônes)
 * @param {any} el élément du formulaire
 * @param {any} isEditModeEnabled=false est-ce que c'est une édition
 */
const checkInstantForm = (el, isEditModeEnabled = false) => {
    let propToCheck = el.get(0).id;
    const valToCheck = el.val();

    if(isEditModeEnabled) {
        //On récupère seulement les caractères après le " - " pour effectuer la regex dans l'object global rejexp
        const propToCheckArr = propToCheck.split('');
        const positionToCut = propToCheckArr.indexOf('-');
        propToCheck = propToCheckArr.slice(positionToCut + 1).join('');
        console.log(propToCheck);
    } 
    //Si le champ est vide
    if(valToCheck == "") {
        $(`.${propToCheck}-message`).fadeIn().html('Le champ ci-dessus ne peut être vide.').css('color', 'red');
        setVisualOfInput(propToCheck, true);
        //Evite de rentrer dans la prochaine boucle car valToCheck.length est < 2 s'il est vide
        return; 
    } else if(!regexps[propToCheck].test($(el[0]).val()) || valToCheck.length < 2) { // Si le champ est invalide
        $(`.${propToCheck}-message`).fadeIn("fast").html(`La valeur ${propToCheck} n'est pas valide`).css('color','red');
        setVisualOfInput(propToCheck, true);
    }
    else setVisualOfInput(propToCheck); // Le champ est valide
}

/** 
 * @description Récupère tous les conctacts et formate/affiche la vue tableur
 */
const displayTableurVue = async () => {
    try {
        const data = await getAllContacts();
        let allHtmlData = "";
        for(index in data) {
            allHtmlData += `
            <tr>
                <td title='Cliquez pour modifier'>
                    <input type='text' class='editable editable-tableur' onclick='makeElementEditable(this)' 
                    onblur="updateValidator(this, 'name', ${data[index].id})"
                    value='${data[index].name}'/>
                </td>
                <td title='Cliquez pour modifier'> 
                    <input type='text' class='editable editable-tableur' onclick='makeElementEditable(this)'
                    onblur="updateValidator(this, 'prenom', ${data[index].id})"
                    value='${data[index].prenom}'/>
                </td>
                <td title='Cliquez pour modifier'> 
                    <input type='text' class='editable editable-tableur' onclick='makeElementEditable(this)'
                    onblur="updateValidator(this, 'email', ${data[index].id})"
                    value='${data[index].email}'/>
                </td>
                <td title='Cliquez pour modifier'> 
                    <input type='text' class='editable editable-tableur' onclick='makeElementEditable(this)'
                    onblur="updateValidator(this, 'telephone', ${data[index].id})"
                    value='${data[index].telephone}'/>
                </td>
                <td title='Cliquez pour modifier'> 
                    <input type='text' class='editable editable-tableur' onclick='makeElementEditable(this)'
                    onblur="updateValidator(this, 'ville', ${data[index].id})"
                    value='${data[index].ville}'/>
                </td>
                <td>${data[index].dateCreation}</td>
                <td style=\"width: 5%;\">
                    <button class='btn-danger' onclick="deleteContact(${data[index].id})">
                        <i class=\"fa fa-times\"></i>
                    </button>
                </td>
            <tr>
            `
        }
        $('#all-contact-list').html(allHtmlData);
    } catch (err) {
        $('#all-contact-list').html("Les contacts n'ont pas pu être récupérés.");
        console.log("Les contacts n'ont pas pu être récupérés.", err);
    }
}

/**
 * @description Récupère la liste des contacts et formate/affiche la liste des contacts à l'accueil
 */
const displayNomsAndPrenoms = async() => {
    try {
        const data = await getAllContacts();
        let allHtmlData = "";

        for(index in data) {
            allHtmlData += `
            <tr>
                <td scope='row' title='Voir le contact'>
                    <div
                    class='editable'
                    onclick=displayInfo(${data[index].id}) >
                        ${data[index].name} ${data[index].prenom}
                    </div>
                </td>
            </tr>
            `
        }
        $('#contact-list').html(allHtmlData);
    } catch (err) {
        $('#contact-list').html("Les contacts n'ont pas pu être récupérés.");
        console.log("Les contacts n'ont pas pu être récupérés.", err);
    }
}

/**
 * @description Va chercher tous les contacts depuis readAll.php qui lui fera la requête
 * @returns {promise}
 */
function getAllContacts() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "querys/readAll.php",
            dataType: "json",
            success: data => resolve(data),
            error: err => reject(err)
        })
    });
}

/**
 * @description Permet de refaire les vérifs avant de submit le formulaire (2 sécurisation valent mieux qu'une !)
 * @returns {bool} //true : le formulaire est valide, false : invalide
 */
const checkForm = () => {
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
 * @description Permet de vérifier le formulaire avant d'effectivement update les infos
 * @param {HTMLElement} target
 * @param {string} prop
 * @param {string} id
 * @returns {bool}
 */
const updateValidator = (target, prop, id) => {
    const regexp = regexps[prop];
    const value = $(target).val();
    if(prop == "ville") {
        if(!regexp.includes(value.toLowerCase())){
            displayAlert(3000, 300, "La ville n'est pas valide", true);
            return false
        }
    } else {
        if(!regexp.test(value) || value.length < 2) {
            displayAlert(3000, 300, `Le champ ${prop} n'est pas valide`, true);
            return false
        }
    }
    update(target, prop, id);
}

/**
 * @description s'occupe d'envoyer les données à mettre à jour dans la DB
 * @param {HTMLElement} target
 * @param {string} prop
 * @param {string} id
 * @returns {void} 
 */
const update = (target, prop, id) => {
    const data = $(target).val();
    target.contentEditable = false;
    $.ajax({
        url: 'querys/update.php',
        method: 'POST',
        data: { [prop]: data, id },
        success: data => {
            if(data) {
                displayAlert(3000, 300, data);
                displayNomsAndPrenoms();
            }
        }
    });
}

/**
 * @description Supprime et met à jour les listes des contacts 
 * @param {string} id
 * @returns {bool}
 */
const deleteContact = id => {
    if(confirm("Voulez-vous vraiment supprimer ce contact ?")) {
        $.ajax({
            url: 'querys/delete.php',
            method: 'POST',
            data: { id },
            success:  data => {
                displayAlert(3000, 300, data);
                //Màj des listes
                displayTableurVue();
                displayNomsAndPrenoms();
                $('#coordonnees-contact').fadeOut();
            }
        });
    }
    return false;
}

/**
 * @description Permet d'avoir une preview du contact sélectionné - cliqué
 * @param {string} id
 */
const displayInfo = id => {
    if($('.contact-line').hasClass('active')) {
        $('.contact-line').removeClass('active');
    }
    // Permet de ré-initialiser les messages et icônes d'information pour chaque contact
    const tousLesChamps = ["name", "prenom", "email", "telephone"];
    for(let el of tousLesChamps) {
        $(`.${el}-message, .${el}-check-icon, .${el}-error-icon`).css("display","none");
    }
    // Puis on commence 
    $('#coordonnees-contact').fadeIn(() => {
        $('.contact-line').addClass('active');
    });
    $.ajax({
        url: 'querys/readOne.php',
        method: 'POST',
        data: {id: id},
        dataType: 'json',
        success: data => {
            const keys = Object.keys(data);
            const numberOfInputs = Object.keys(data).length; 

            //Reset l'attribut selected de tout le monde car sinon il garde l'ancien en mémoire
            $('.edit-option').each(function(){$(this).removeAttr('selected')});

            // Push des données du contact récupéré dans les inputs/select
            for(let i = 0; i < numberOfInputs; i++) {
                if(keys[i] == 'ville') { //select
                    $(`.edit-option[value='${data.ville}']`).attr('selected', 'selected')
                    $("#edit-ville").attr('onchange', `updateValidator(this, '${keys[i]}', ${id})`).val(data.ville);
                } 
                else $(`#edit-${keys[i]}`).val(data[keys[i]]).attr("onblur", `updateValidator(this, '${keys[i]}', ${id})`);
            }

            // Footer du contact
            $('#deleteContact').attr("onclick", `deleteContact(${id})`)
            $('#dateCreation').html(`Crée le ${data.dateCreation}`)
            
            displayAlert(1500, 300, "Contact récupéré");
        }
    });
}

/**
 * @description Permet d'afficher une toast notification en fonction de si c'est une erreur ou pas
 * @param {int} delay
 * @param {int} slideUp
 * @param {string} html
 * @param {bool} isError=false
 */
const displayAlert = (delay, slideUp, html, isError = false) => {
    if(!isError)
        $('#ajax_msg').css("display", "block").delay(delay).slideUp(slideUp).html(html);
    else //Si c'est une erreur on change la couleur
        $('#ajax_msgerror').css("display", "block").delay(delay).slideUp(slideUp).html(html);
}

/**
 * @description Rends un élément éditable 
 * @param {HTMLElement} div
 */
const makeElementEditable = div => $(div).attr("contentEditable", "true")