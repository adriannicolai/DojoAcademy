$(document).ready(function(){
    $(document)
        .on("click", "#newStudent", openNewStudentModal)                    /* This will open the new student modal*/
        .on("click", "a", studentEditDestroyListener)                       /* This is a listener for anchor tag with the attributy 'action-type' */
        .on("submit", "#updateStudentForm", submitUpdateStudentForm)        /* This will submit the update student form via ajax request */
        .on("submit", "#createStudentForm", submitCreateStudentForm)        /* This will submit the create student form via ajax request */
        .on("submit", "#deleteDojoForm", submitDeleteDojoForm)              /* This will submit the delete dojo form via ajax request */
})

/**
* DOCU: This function will clear the values all inputs witth the type of text. (usually before opening and closing a modal).<br>
* Triggered: emptyInputs() <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Students page
* @author Adrian
*/
function emptyInputs() {
    let inputs = document.querySelectorAll('input[type=text]');

    for (let index in inputs) {
        inputs[index].value = "";
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

    $.post($(this).attr("action"), $(this).serialize(), function (res) {
        if (res.current_dojo == res.student.dojo_id) {
            let studentHTML = "<td>" + res.student.first_name + "</td>";
            studentHTML += "<td>" + res.student.last_name + "</td>";
            studentHTML += "<td>" + res.student.email + "</td>";
            studentHTML += "<td>";
            studentHTML += "<a class='btn btn-primary' href='/students/" + res.student.id + "'> Show</a> ";
            studentHTML += "<a class='btn btn-info' action-type='edit_student' href='/students/" + res.student.id + "/edit'> Edit</a> ";
            studentHTML += "<a class='btn btn-danger' action-type='delete_student' get-href='/students/" + res.student.id + "/edit' href='students/"+ res.student.id + "/delete'> Delete</a>";
            studentHTML += "</td>";

            $("#student" + res.student.id).html(studentHTML);
        }
        else {
            $("#student" + res.student.id).remove();
        }
    })

    hideModals()
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
    $.post($(this).attr("action"), $(this).serialize(), function (res) {

        if (res.student.dojo_id == res.current_dojo) {
            let studentHTML = "<tr id='student" + res.student.id + "'>";
            studentHTML += "<td>" + res.student.first_name + "</td>";
            studentHTML += "<td>" + res.student.last_name + "</td>";
            studentHTML += "<td>" + res.student.email + "</td>";
            studentHTML += "<td>";
            studentHTML += "<a class='btn btn-primary' href='/students/" + res.student.id + "'>Show</a> ";
            studentHTML += "</td>";

            $("tbody").append(studentHTML);
        }

    })

    $("#newStudentModal").modal("hide");

    document.querySelectorAll("input[type=text]").forEach(function (input) {
        input.value = "";
    })
}

/**
* DOCU: This function will open the create student form and sends an ajax request to get all of the dojos.<br>
* Triggered: .on("click", "#newStudent", openNewStudentModal) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Students page
* @author Adrian
*/
function openNewStudentModal() {
    emptyInputs();

    let dojoHTML = "";

    $.get($(this).attr("href"), function (res) {
        res.dojo.forEach(function (dojo) {

            if (dojo.id == res.current_dojo) {
                dojoHTML += "<option value='" + dojo.id + "' selected>" + dojo.branch + "</option>";
            }
            else {
                dojoHTML += "<option value='" + dojo.id + "'>" + dojo.branch + "</option>";
            }

        })

        $("#createStudentDojo").html(dojoHTML);
    })

    $("#newStudentModal").modal("show");
}

/**
* DOCU: This function is an event listener for anchor tag with the attribute 'action-type' and will show the edit student modal or sestroy student modal<br>
* Triggered: .on("click", "#newStudent", openNewStudentModal) <br>
* Last Updated Date: July 29, 2021
* @function
* @memberOf Students page
* @author Adrian
*/
function studentEditDestroyListener(e) {
    let action = $(this).attr("action-type");

    if (action == "edit_student") {
        e.preventDefault();

        $.get($(this).attr("href"), function (res) {
            let optionHTML = "";

            res.dojos.forEach(function (dojo) {

                if (dojo.id == res.student.dojo_id) {
                    optionHTML += "<option value='" + dojo.id + "' selected>" + dojo.branch + "</option>";
                }
                else {
                    optionHTML += "<option value='" + dojo.id + "'>" + dojo.branch + "</option>";
                }
            })

            $("#updateStudentForm").attr("action", "/students/" + res.student.id);
            $("#editStudentModalTitle").text("Editing " + res.student.first_name + " " + res.student.last_name);
            $("#updateStudentFirstName").val(res.student.first_name);
            $("#updateStudentLastName").val(res.student.last_name);
            $("#updateStudentEmail").val(res.student.email);
            $("#updateStudentDojo").html(optionHTML);
        })

        $("#editStudentModal").modal("show");
    }
    else if(action == "delete_student"){
        e.preventDefault();

        $.get($(this).attr("get-href"), function (res){
            $("#deleteDojoForm").attr("action", "/students/" + res.student.id )
            $("#deleteStudentModalTitle").text("Delete " + res.student.first_name + " " + res.student.last_name + "?")
            $("#deleteStudentModalText").text("Are you sure you want to delete " + res.student.first_name + " " + res.student.last_name + "?")
        })

        $("#deleteStudentModal").modal("show")
    }
}

function submitDeleteDojoForm(e){
    e.preventDefault()

    $.post($(this).attr("action"), $(this).serialize(), function (res){
        $("#student" + res).remove()
        hideModals()
    })
}