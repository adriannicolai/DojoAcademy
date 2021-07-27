$(document).ready(function() {
    $(document).on('click', '#newDojo', function(){
        $('#newDojoModal').modal("show")
    })
    $(document).on("click", ".close-modal", function(){
        $('#newDojoModal').modal("hide")
    })
    $(document).on("submit", "#newDojoForm", function(e){
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
    })
})
