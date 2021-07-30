$(document).ready(function(){
    $(document)
        .on("click", "a", studentCreateEditDestroyListener)                 /* This is a listener for anchor tag with the attributy 'action-type' */
        .on("submit", "#updateStudentForm", submitUpdateStudentForm)        /* This will submit the update student form via ajax request */
        .on("submit", "#createStudentForm", submitCreateStudentForm)        /* This will submit the create student form via ajax request */
        .on("submit", "#getNewStudentForm", getNewStudentForm)              /* This will get nthe new student form via ajax post and put it on student modal */
        .on("submit", "#showStudentForm", submitShowStudentForm)            /* This will submit the show student form xia ajax request */
});


/**
* DOCU: This function submit the show dojo form and redirect the page .<br>
* Triggered: .on("submit", "#showStudentForm", submitShowStudentForm) <br>
* Last Updated Date: July 30, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function submitShowStudentForm(e){
    e.preventDefault();

    $.post($(this).attr("action"), $(this).serialize(), function (res) {
        if (res.status) {
            window.location.href = res.redirect_url;
        }
    });
}
/**
* DOCU: This function submit the new new dojo form and fetch the new dojo form for the modal.<br>
* Triggered: .on("submit", "#getNewStudentForm", getNewStudentForm) <br>
* Last Updated Date: July 30, 2021
* @function
* @memberOf Dojos page
* @author Adrian
*/
function getNewStudentForm(e) {
    e.preventDefault();

    $.post($(this).attr("action"), $(this).serialize(), function (res) {
        $("#modal-body").html(res.html);
    });

    $("#studentModal").modal("show");
}

/**
* DOCU: This function is an event listener for anchor tag with the attribute 'action-type' and will show the edit student modal or sestroy student modal<br>
* Triggered: .on("click", "#newStudent", openNewStudentModal) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Students page
* @author Adrian
*/
function studentCreateEditDestroyListener(e) {
    let action  = $(this).attr("action-type");
    let form    = $(this).closest("form");

    if(action == "show_student"){
        e.preventDefault();
        
        form.attr("action", $(this).attr("href"));

        $.post(form.attr("action"), form.serialize(), function (res) {
           if(res.status){
               window.location.href = res.redirect_url;
           }
        });
    }
    else if(action == "edit_student") {
        e.preventDefault();

        form.attr("action", $(this).attr("href"));

        $.post(form.attr("action"), form.serialize(), function (res) {
            console.log(res)
            $("#modal-body").html(res.html);
        });

        $("#studentModal").modal("show");
    }
    else if (action == "delete_student") {
        e.preventDefault();

        $.post(form.attr("action"), form.serialize(), function (res){
            $("#student" + res).remove();
        });
    }
}

/**
* DOCU: This function will submit the update studetn form via ajax request.<br>
* Triggered: .on("submit", "#updateStudentForm", submitUpdateStudentForm) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Students page
* @author Adrian
*/
function submitUpdateStudentForm(e) {
    e.preventDefault();

    $.post($(this).attr("action"), $(this).serialize(), function (res){
        if (res.current_dojo == res.student.dojo_id) {
            $("#student" + res.student.id).replaceWith(res.html);
        }
        else {
            $("#student" + res.student.id).remove();
        }
    });

    hideModals();
}

/**
* DOCU: This function will submit the create student form via ajax request.<br>
* Triggered: .on("submit", "#createStudentForm", submitCreateStudentForm) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Students page
* @author Adrian
*/
function submitCreateStudentForm(e) {
    e.preventDefault();

    $.post($(this).attr("action"), $(this).serialize(), function (res){
        if (res.student.dojo_id == parseInt(res.current_dojo)) {
            $("tbody").append(res.html);
        }
    });

    hideModals();

    emptyInputs();
}