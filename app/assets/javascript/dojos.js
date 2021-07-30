$(document).ready(function() {
    $(document)
        .on("click", ".close-modal", hideModals)                                         /* This will hide all modals */                       
        .on("submit", "#newDojoForm", submitNewDojo)                                     /* This will send the new dojo form via ajax post */                                                                           
        .on("submit", "#updateDojoForm", sumbitUpdateDojoForm)                           /* This will submit the new dojo form */
        .on("click", "a", dojoNewEditDestroyListener)                                    /* This is an event listener whenever a is pressed and open the corresponding modal */
        .on("submit", "#getNewDojoForm", getNewDojoForm)                                 /* This will fetch the new dojo form for the mdal to load */
});

/**
* DOCU: This function is an event listener whenever an anchor tag with 'action-type' attribute is clicked.<br>
* Triggered: .on("click", "a", dojoNewEditDestroyListener) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function dojoNewEditDestroyListener(e){
    let action  = $(this).attr("action-type");
    let form    = $(this).closest("form");

    if (action == "show_dojo") {
        e.preventDefault();

        form.attr("action", $(this).attr("href"));

        $.post(form.attr("action"), form.serialize(), function (res) {
            if(res.status){
                window.location.href = res.redirect_url;
            }
        });
    }
    else if(action == "edit_dojo"){
        e.preventDefault();

        form.attr("action", $(this).attr("href"));

        $.post($(this).attr("href"), $(this).serialize(), function (res) {
            $("#modalTitle").text("Editing " + res.dojo.branch);
            $("#modal-body").html(res.html);
        });

        $("#dojoModal").modal("show");
    }
    else if (action == "delete_dojo") {
        e.preventDefault();

        $.post(form.attr("action"), $(this).serialize(), function(res){})

        $(this).closest("tr").remove();

        updateDojoNumber("subtract");
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

    $.post($(this).attr("action"), $(this).serialize(), function (res){
        $("tbody").append(res.html);

        updateDojoNumber("add");

        emptyInputs();
    });
}

/**
* DOCU: This function submit the new new dojo form and fetch the new dojo form for the modal.<br>
* Triggered: .on("submit", "#newDojoForm") <br>
* Last Updated Date: July 30, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function getNewDojoForm(e) {
    e.preventDefault();

    $.post($(this).attr("action"), $(this).serialize(), function(res){
        $("#modal-body").html(res.html);
    });

    $("#dojoModal").modal("show");
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

    $.post($(this).attr("action"), $(this).serialize(), function(res){
        $("#dojo" + res.dojo.id).replaceWith(res.html);
    });

    hideModals();
}