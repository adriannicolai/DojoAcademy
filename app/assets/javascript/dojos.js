$(document).ready(function() {
    $(document)
        .on('click', '#newDojo', function(){
            $('#newDojoModal').modal("show")
        })
        .on("click", ".close-modal", function(){
            $('#newDojoModal').modal("hide")
            $('#editDojoModal').modal("hide")
        })
        .on("submit", "#newDojoForm", function(e){
            e.preventDefault()
            $('#newDojoModal').modal("hide")
            $.post($(this).attr('action'), $(this).serialize(), function(){
                let html = "<tr>"
                html    += "<td>"+ $("#input_branch") +"</td>"
                html    += "<td>" + $("#input_street") + "</td>"
                html    += "<td>" + $("#input_city") + "</td>"
                html    += "<td>" + $("#input_state") + "</td>"
                html    += "</tr>" 
                $("tbody").append(html)
            })
            return false
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
        })
        .on("submit", "#updateDojoForm", function(e){
            e.preventDefault()
            $.post($(this).attr("action"), $(this).serialize(), function(res){
                console.log(res)
                let html  = "<td>" + res.branch +"</td>"
                html     += "<td>" + res.street + "</td>"
                html     += "<td>" + res.city + "</td>"
                html     += "<td>" + res.state + "</td>"
                html     += "<td>"
                html     += "<a href='/dojos/"+ res.id +"'>Show</a> "
                html     += "<a href='/dojos/"+ res.id +"/edit'>Edit</a> "
                html     += "<a href='/dojos/"+ res.id +"/destroy'>Destroy</a>"
                html     += "</td>"
                $("#dojo"+ res.id).html(html)
            })
            $("#editDojoModal").modal("hide")
        })

})
