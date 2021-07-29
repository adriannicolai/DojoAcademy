$(document).ready(function() {
    $(document)

        .on("click", ".close-modal", hideModals)                                         /* This will hide all modals */
        .on("click", "#newDojo", function(){                                             /* This will open the new dojo modal */
            emptyInputs();
            $('#newDojoModal').modal("show");
        })                               
        .on("submit", "#newDojoForm", submitNewDojo)                                     /* This will send the new dojo form via ajax post */                                                                           
        .on("submit", "#updateDojoForm", sumbitUpdateDojoForm)                           /* This will submit the new dojo form */
        .on("submit", "#deleteDojoForm", submitDeleteDojoForm)                           /* This will submit the delete dojo form */
        .on("click", "a", dojoEditDestroyListener)                                       /* This is an event listener whenever a is pressed and open the corresponding modal */
})

/**
* DOCU: This function is an event listener whenever an anchor tag with 'action-type' attribute is clicked.<br>
* Triggered: .on("click", "a", dojoEditDestroyListener) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function dojoEditDestroyListener(e){
    let action = $(this).attr("action-type");

    if (action == "edit_dojo") {
        e.preventDefault();

        $.get($(this).attr("href"), function (res) {

            $("#updateDojoForm").attr("action", "/dojos/" + res.id);
            $("#editDojoModalTitle").text("Editing " + res.branch);
            $("#editDojoModalBranch").val(res.branch);
            $("#editDojoModalStreet").val(res.street);
            $("#editDojoModalCity").val(res.city);
            $("#editDojoModalState").val(res.state);
        })

        $("#editDojoModal").modal("show");
    }
    else if (action == "delete_dojo") {
        e.preventDefault();

        $.get($(this).attr("get-href"), function (res){
            $("#deleteModalText").text("Are you sure you want to delete " + res.branch + "?")
            $("#deleteDojoModalTitle").text("Delete " + res.branch + "?")
        })

        $("#deleteDojoForm").attr("action", $(this).attr("href"));
        $("#deleteDojoModal").modal("show");
    }
}

/**
* DOCU: This function will hide the create, edit and delete dojo modals.<br>
* Triggered: .on("click", ".close-modal", hideModals)  <br>
* Last Updated Date: July 29, 2021
* @function1
* @memberOf Dojos page
* @author Adrian
*/
function hideModals(){
    $("#newDojoModal").modal("hide");
    $("#editDojoModal").modal("hide");
    $("#deleteDojoModal").modal("hide");
    $("#editStudentModal").modal("hide");
    $("#newStudentModal").modal("hide");
    $("#deleteStudentModal").modal("hide");
}

/**
* DOCU: This function will clear the values all inputs witth the type of text. (usually before opening and closing a modal).<br>
* Triggered: emptyInputs() <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function emptyInputs(){
    let inputs = document.querySelectorAll('input[type=text]');

    for(let index in inputs){
        inputs[index].value = "";
    }
}

/**
* DOCU: This function submit the new dojo form via ajax request.<br>
* Triggered: .on("submit", "#newDojoForm", submitNewDojo) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function submitNewDojo(e){
    e.preventDefault();
    hideModals();

    $.post($(this).attr('action'), $(this).serialize(), function (res) {
        $("tbody").append(res.html);

        updateDojoNumber("add");

        emptyInputs();
    })
}

/**
* DOCU: This function submit the update dojo form via ajax request.<br>
* Triggered: .on("submit", "#updateDojoForm", sumbitUpdateDojoForm) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function sumbitUpdateDojoForm(e){
    e.preventDefault();

    $.post($(this).attr("action"), $(this).serialize(), function (res) {

        if ($("#updateDojoForm :input[name=form_location]").val() == "index") {
            $("#dojo" + res.dojo.id).replaceWith(res.html);
        }
        else if ($("#updateDojoForm :input[name=form_location]").val() == "show") {
            $("#showBranch").text(res.branch);
            $("#showStreet").text("Address: " + res.street);
            $("#showCityAndState").text("City: " + res.city + " State: " + res.state);
        }
    })

    hideModals();
}

/**
* DOCU: This function submit the delete dojo form via ajax request.<br>
* Triggered: .on("submit", "#deleteDojoForm", submitDeleteDojoForm) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function submitDeleteDojoForm(e){
    e.preventDefault();

    $.post($(this).attr("action"), $(this).serialize(), function (res) {
        $("#dojo" + res.id).remove();
        $("#numberrOfDojos").text("Listing " + res.number_of_dojos.length + " Dojos");
    });

    $("#deleteDojoModal").modal("hide");
}

function updateDojoNumber(updateType){
    let numberOfDojos = parseInt($("#numberOfDojos").text())

    if(updateType == "add"){
        $("#numberOfDojos").text(numberOfDojos += 1)
    }
}