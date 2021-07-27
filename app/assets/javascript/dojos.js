$(document).ready(function() {
    $(document)
        .on('click', '#newDojo', function(){
            $('#newDojoModal').modal("show")
        })
        .on("click", ".close-modal", function(){
            $('#newDojoModal').modal("hide")
            $('#editDojoModal').modal("hide")
            $("#deleteDojoModal").modal("hide")
        })
        .on("submit", "#newDojoForm", function(e){
            e.preventDefault()
            $('#newDojoModal').modal("hide")
            $.post($(this).attr('action'), $(this).serialize(), function(res){
                let html = "<tr id='dojo"+ res.dojo.id +"'>"
                html    += "<td>"+ res.dojo.branch +"</td>"
                html    += "<td>" + res.dojo.street + "</td>"
                html    += "<td>" + res.dojo.city + "</td>"
                html    += "<td>" + res.dojo.state + "</td>"
                html    += "<td>"
                html    += "<a href='/dojos/" + res.dojo.id + "'>Show</a> "
                html    += "<a href='/dojos/" + res.dojo.id + "/edit'>Edit</a> "
                html    += "<a href='/dojos/" + res.dojo.id + "'>Destroy</a>"
                html    += "</td>"
                html    += "</tr>" 
                $("tbody").append(html)
                $("#numberrOfDojos").text("Listing " + res.number_of_dojos.length +" Dojos")
                document.querySelectorAll("input[type=text]").forEach(function(input){
                    input.value = ""
                })
            })
        })
        .on("click", "a", function(e){
            if($(this).text() == "Edit"){
                e.preventDefault()
                $.get($(this).attr("href"), function (res) {
                    $("#editDojoModalTitle").text("Editing " + res.branch)
                    $("#updateDojoForm").attr("action", "/dojos/"+ res.id)
                    $("#editDojoModalBranch").val(res.branch)
                    $("#editDojoModalStreet").val(res.street)
                    $("#editDojoModalCity").val(res.city)
                    $("#editDojoModalState").val(res.state)
                })
                $("#editDojoModal").modal("show")
            }
            else if($(this).text() == "Destroy"){
                e.preventDefault()
                $("#deleteDojoForm").attr("action", $(this).attr("href"))
                $("#deleteDojoModal").modal("show")
            }
        })
        .on("submit", "#updateDojoForm", function(e){
            e.preventDefault()
            $.post($(this).attr("action"), $(this).serialize(), function(res){
                let html  = "<td>" + res.branch +"</td>"
                html     += "<td>" + res.street + "</td>"
                html     += "<td>" + res.city + "</td>"
                html     += "<td>" + res.state + "</td>"
                html     += "<td>"
                html     += "<a href='/dojos/"+ res.id +"'>Show</a> "
                html     += "<a href='/dojos/"+ res.id +"/edit'>Edit</a> "
                html     += "<a href='/dojos/"+ res.id +"'>Destroy</a>"
                html     += "</td>"
                $("#dojo"+ res.id).html(html)
            })
            $("#editDojoModal").modal("hide")
        })
        .on("submit", "#deleteDojoForm", function(e){
            e.preventDefault()
            $.post($(this).attr("action"), $(this).serialize(), function(res){
                $("#dojo" + res.id).remove()
                $("#numberrOfDojos").text("Listing " + res.number_of_dojos.length + " Dojos")
            })
            $("#deleteDojoModal").modal("hide")
        })
})
