$(document).ready(function() {
    $(document).on('click', '#newDojo', function(){
        $('#newDojoModal').modal("show")
    })
    $(document).on("click", ".close-modal", function(){
        $('#newDojoModal').modal("hide")
    })
})
