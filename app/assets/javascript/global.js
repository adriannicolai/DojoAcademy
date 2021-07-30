/**
* DOCU: This function will hide the create, edit and delete dojo modals.<br>
* Triggered: .on("click", ".close-modal", hideModals)  <br>
* Last Updated Date: July 29, 2021
* @function1
* @memberOf Dojos page
* @author Adrian
*/
function hideModals() {
    $("#dojoModal").modal("hide");
    $("#studentModal").modal("hide");
}

/**
* DOCU: This function will clear the values all inputs witth the type of text. (usually before opening and closing a modal).<br>
* Triggered: emptyInputs() <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function emptyInputs() {
    let inputs = document.querySelectorAll('input[type=text]');

    for (let index in inputs) {
        inputs[index].value = "";
    }
}


/**
* DOCU: This function will update the dojo count in the dojos page.<br>
* Triggered: updateDojoNumber(update_type) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function updateDojoNumber(updateType) {
    let numberOfDojos = parseInt($("#numberOfDojos").text())

    if (updateType == "add") {
        $("#numberOfDojos").text(numberOfDojos += 1);
    }
    else if (updateType == "subtract") {
        $("#numberOfDojos").text(numberOfDojos -= 1);
    }
}