$(document).ready(function() {
    $(document)
        .on("click", ".close-modal", hideModals)                                         /* This will hide all modals */                       
        .on("submit", "#newDojoForm", submitNewDojo)                                     /* This will send the new dojo form via ajax post */                                                                           
        .on("submit", "#updateDojoForm", sumbitUpdateDojoForm)                           /* This will submit the new dojo form */
        .on("click", "a", dojoNewEditDestroyListener)                                       /* This is an event listener whenever a is pressed and open the corresponding modal */
})

/**
* DOCU: This function is an event listener whenever an anchor tag with 'action-type' attribute is clicked.<br>
* Triggered: .on("click", "a", dojoNewEditDestroyListener) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function dojoNewEditDestroyListener(e){
    let action = $(this).attr("action-type");

    if(action == "new_dojo"){
        e.preventDefault();

        $.get($(this).attr("href"), function(res) {
            $("#modal-body").html(res.html);
        });

        $("#dojoModal").modal("show");
    }
    else if(action == "edit_dojo"){
        e.preventDefault();

        $.get($(this).attr("href"), function(res){
            $("#modal-body").html(res.html);
            $("#modalTitle").text("Editing " + res.dojo.branch);
        });

        $("#dojoModal").modal("show");
    }
    else if (action == "delete_dojo") {
        e.preventDefault();

        $.get($(this).attr("href"), function(){});

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

    $.post($(this).attr('action'), $(this).serialize(), function(res) {
        $("tbody").append(res.html);

        updateDojoNumber("add");

        emptyInputs();
    });
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

    $.post($(this).attr("action"), $(this).serialize(), function(res) {

        if($("#updateDojoForm :input[name=form_location]").val() == "index") {
            $("#dojo" + res.dojo.id).replaceWith(res.html);
        }
        else if($("#updateDojoForm :input[name=form_location]").val() == "show") {
            $("#showBranch").text(res.branch);
            $("#showStreet").text("Address: " + res.street);
            $("#showCityAndState").text("City: " + res.city + " State: " + res.state);
        }
    });

    hideModals();
}