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

        $.ajax({
            type: "get",
            url: $(this).attr("href"),
            success: function(res){
                $("#modal-body").html(res.html);
            }
        });

        $("#dojoModal").modal("show");
    }
    else if(action == "edit_dojo"){
        e.preventDefault();

        $.ajax({
            type: "get",
            url: $(this).attr("href"),
            success: function (res) {
                $("#modalTitle").text("Editing " + res.dojo.branch);
                $("#modal-body").html(res.html);
            }
        });

        $("#dojoModal").modal("show");
    }
    else if (action == "delete_dojo") {
        e.preventDefault();

        $.ajax({
            type: "get",
            url: $(this).attr("href"),
            success: function (res) {}
        });

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

    $.ajax({
        type: "post",
        url: $(this).attr("action"),
        data: $(this).serialize(),
        success: function(res){
            $("tbody").append(res.html);

            updateDojoNumber("add");

            emptyInputs();
        }
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

    $.ajax({
        type: "post",
        url: $(this).attr("action"),
        data: $(this).serialize(),
        success: function(res){
            $("#dojo" + res.dojo.id).replaceWith(res.html);

        }
    });

    hideModals();
}