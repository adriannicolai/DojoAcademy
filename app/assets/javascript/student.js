$(document).ready(function(){
    $(document)
        .on("click", "a", studentCreateEditDestroyListener)                 /* This is a listener for anchor tag with the attributy 'action-type' */
        .on("submit", "#updateStudentForm", submitUpdateStudentForm)        /* This will submit the update student form via ajax request */
        .on("submit", "#createStudentForm", submitCreateStudentForm)        /* This will submit the create student form via ajax request */
})

/**
* DOCU: This function is an event listener for anchor tag with the attribute 'action-type' and will show the edit student modal or sestroy student modal<br>
* Triggered: .on("click", "#newStudent", openNewStudentModal) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Students page
* @author Adrian
*/
function studentCreateEditDestroyListener(e) {
    let action = $(this).attr("action-type");

    if(action == "new_student"){
        e.preventDefault();

        $.get($(this).attr("href"), function(res){
            $("#studentModalBody").html(res.html);
        });

        $("#studentModal").modal("show");
    }
    else if(action == "edit_student") {
        e.preventDefault();

        $.get($(this).attr("href"), function (res) {
            $("#studentModalBody").html(res.html);
        });

        $("#studentModal").modal("show");
    }
    else if (action == "delete_student") {
        e.preventDefault();

        $.get($(this).attr("href"), function (res){
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