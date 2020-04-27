
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
    // Chargement de la bonne liste des contacts en fonction de la page (économise une requête SELECT * non négligeable);
    lastURIElement !== "allContacts.php" ? displayNomsAndPrenoms(): displayTableurVue();

    /**
     * Au click sur "Fermer le formulaire" 
     */
    $("#closeForm").click(function(e) {
        e.preventDefault();
        $("#createForm").fadeOut(() => $("#contact-section").fadeIn());
    });

    /**
     * Au click sur la croix rouge 
     */
    $('#close-coordonnees').click(() => $('#coordonnees-contact').fadeOut())

    /**
     * Au click sur "Ajouter" 
     */
    $("#add").click(function(e){
        e.preventDefault();
        $("#coordonnees-contact").fadeOut();
        $("#contact-section").fadeOut(() => $("#createForm").fadeIn())
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
     * A l'envoi du formulaire 
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
                    $("#createForm").fadeOut("400", function(){
                        $("#contact-section").fadeIn();
                        displayInfo(data.id);
                    });
                    //reset the form
                    $("#create-contact")[0].reset();
                }
            });
        }
    });
});

/**
 * Formate et affiche la vue tableur
 */
async function displayTableurVue() {
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
 * Formate et affiche la vue noms / prénoms
 */
async function displayNomsAndPrenoms() {
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
 * Va chercher tous les contacts depuis readAll qui lui fera la requête
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
 * Permet de faire les vérifs avant de submit le formulaire 
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
 * Permet de vérifier le formulaire avant d'effectivement update les infos
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
        if(!regexp.test(value)) {
            displayAlert(3000, 300, `Le champ ${prop} n'est pas valide`, true);
            return false
        }
    }
    update(target, prop, id);
}

/**
 * Fonction qui est appelée après avoir vérifié les données saisies
 * (rôle de updateValidator())
 * => Met à jour la liste des contacts 
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
 * Supprime et met à jour les listes des contacts 
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
 * Permet d'avoir une preview du contact sélectionné
 * @param {string} id
 */
const displayInfo = id => {
    $('#coordonnees-contact').fadeIn();
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
 * Permet d'afficher une toast notification en fonction de si c'est une erreur ou pas
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
 * Rend un élément éditable 
 * @param {HTMLElement} div
 */
const makeElementEditable = div => $(div).attr("contentEditable", "true")