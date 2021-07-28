$(document).ready(function() {
    $(document)

        .on("click", ".close-modal", hideModals)                                                                            /* This will hide all modals */
        .on("click", "#newDojo", function(){                                                                                /* This will open the new dojo modal */
            emptyInputs();
            $('#newDojoModal').modal("show");
        })

        .on("click", "#newStudent", function(){
            emptyInputs();

            let dojoHTML = "";
            
            $.get($(this).attr("href"), function(res){
                res.dojo.forEach(function(dojo){

                    if(dojo.id == res.current_dojo){
                        dojoHTML += "<option value='" + dojo.id + "' selected>" + dojo.branch + "</option>";
                    }
                    else{
                        dojoHTML += "<option value='" + dojo.id + "'>" + dojo.branch + "</option>";
                    }

                })

                $("#createStudentDojo").html(dojoHTML);
            })

            $("#newStudentModal").modal("show");
        })

        .on("submit", "#newDojoForm", function(e){
            e.preventDefault();
            $('#newDojoModal').modal("hide");

            $.post($(this).attr('action'), $(this).serialize(), function(res){
                let html = "<tr id='dojo"+ res.dojo.id +"'>";
                html    += "<td>"+ res.dojo.branch +"</td>";
                html    += "<td>" + res.dojo.street + "</td>";
                html    += "<td>" + res.dojo.city + "</td>";
                html    += "<td>" + res.dojo.state + "</td>";
                html    += "<td>";
                html    += "<a class='btn btn-primary' href='/dojos/"+ res.dojo.id +"'>Show</a> ";
                html    += "<a class='btn btn-info' action-type='edit_dojo' href='/dojos/"+ res.dojo.id +"/edit'>Edit</a> ";
                html    += "<a class='btn btn-danger'action-type='delete_dojo' href='/dojos/"+ res.dojo.id +"'>Destroy</a>";
                html    += "</td>";
                html    += "</tr>" ;
                $("tbody").append(html);
                $("#numberrOfDojos").text("Listing " + res.number_of_dojos.length +" Dojos");
                document.querySelectorAll("input[type=text]").forEach(function(input){
                    input.value = "";
                })
            })
        })

        .on("click", "a", function(e){

            let action = $(this).attr("action-type");

            if (action == "edit_dojo"){
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

            else if(action == "delete_dojo"){
                e.preventDefault();
                $("#deleteDojoForm").attr("action", $(this).attr("href"));
                $("#deleteDojoModal").modal("show");
            }

            else if (action == "edit_student"){
                e.preventDefault();

                $.get($(this).attr("href"), function(res){

                    let optionHTML = "";

                    res.dojos.forEach(function(dojo){

                        if(dojo.id == res.student.dojo_id){
                            optionHTML += "<option value='"+ dojo.id +"' selected>"+ dojo.branch +"</option>";
                        }
                        else{
                            optionHTML += "<option value='"+ dojo.id +"'>"+ dojo.branch +"</option>";
                        }

                    })
                    
                    $("#updateStudentForm").attr("action", "/students/"+ res.student.id);
                    $("#editStudentModalTitle").text("Editing "+ res.student.first_name +" "+ res.student.last_name);
                    $("#updateStudentFirstName").val(res.student.first_name);
                    $("#updateStudentLastName").val(res.student.last_name);
                    $("#updateStudentEmail").val(res.student.email);
                    $("#updateStudentDojo").html(optionHTML);
                })

                $("#editStudentModal").modal("show");
            }

        })

        .on("submit", "#updateDojoForm", function(e){
            e.preventDefault();

            $.post($(this).attr("action"), $(this).serialize(), function(res){
                
                if ($("#updateDojoForm :input[name=form_location]").val() == "index"){
                    let dojoHTML = "<td>" + res.branch + "</td>";
                    dojoHTML    += "<td>" + res.street + "</td>";
                    dojoHTML    += "<td>" + res.city + "</td>";
                    dojoHTML    += "<td>" + res.state + "</td>";
                    dojoHTML    += "<td>";
                    dojoHTML    += "<a class='btn btn-primary' href='/dojos/" + res.id + "'>Show</a> ";
                    dojoHTML    += "<a class='btn btn-info' action-type='edit_dojo' href='/dojos/" + res.id + "/edit'>Edit</a> ";
                    dojoHTML    += "<a class='btn btn-danger' action-type='delete_dojo' href='/dojos/" + res.id + "'>Destroy</a>";
                    dojoHTML    += "</td>";
                    $("#dojo" + res.id).html(dojoHTML);
                }
                else if($("#updateDojoForm :input[name=form_location]").val() == "show"){
                    $("#showBranch").text(res.branch);
                    $("#showStreet").text("Address: "+ res.street);
                    $("#showCityAndState").text("City: "+ res.city +" State: "+ res.state);
                }

            })
            $("#editDojoModal").modal("hide");
        })

        .on("submit", "#deleteDojoForm", function(e){
            e.preventDefault();
            $.post($(this).attr("action"), $(this).serialize(), function(res){
                $("#dojo" + res.id).remove();
                $("#numberrOfDojos").text("Listing " + res.number_of_dojos.length + " Dojos");
            });
            $("#deleteDojoModal").modal("hide");
        })

        .on("submit", "#updateStudentForm", function(e){
            e.preventDefault();

            $.post($(this).attr("action"), $(this).serialize(), function(res){
                
                if(res.current_dojo == res.student.dojo_id){
                    let studentHTML = "<td>" + res.student.first_name + "</td>";
                    studentHTML += "<td>" + res.student.last_name + "</td>";
                    studentHTML += "<td>" + res.student.email + "</td>";
                    studentHTML += "<td>";
                    studentHTML += "<a href='/students/" + res.student.id + "'> Show</a> ";
                    studentHTML += "<a action-type='edit_student' href='/students/" + res.student.id + "/edit'> Edit</a>";
                    studentHTML += "</td>";

                    $("#student" + res.student.id).html(studentHTML);
                }
                else{
                    $("#student" + res.student.id).remove();
                }

            })

            $("#editStudentModal").modal("hide");
        })

        .on("submit", "#createStudentForm", function(e){
            e.preventDefault();
            $.post($(this).attr("action"), $(this).serialize(), function(res){

                if(res.student.dojo_id == res.current_dojo){
                    let studentHTML  = "<tr id='student"+ res.student.id +"'>";
                    studentHTML     += "<td>"+ res.student.first_name + "</td>";
                    studentHTML     += "<td>"+ res.student.last_name + "</td>";
                    studentHTML     += "<td>"+ res.student.email + "</td>";
                    studentHTML     += "<td>";
                    studentHTML     += "<a href='/students/"+ res.student.id +"'>Show</a> ";
                    studentHTML     += "<a action-type='edit_student' href='/students/" + res.student.id + "/edit'>Edit</a>";
                    studentHTML     += "</td>";

                    $("tbody").append(studentHTML);
                }

            })
            $("#newStudentModal").modal("hide");
            document.querySelectorAll("input[type=text]").forEach(function (input) {
                input.value = "";
            })
        })
})

function hideModals(){
    $("#newDojoModal").modal("hide");
    $("#editDojoModal").modal("hide");
    $("#deleteDojoModal").modal("hide");
    $("#editStudentModal").modal("hide");
    $("#newStudentModal").modal("hide");
}

function emptyInputs(){
    document.querySelectorAll("input[type=text]").forEach(function (input) {
        input.value = "";
    });
}
