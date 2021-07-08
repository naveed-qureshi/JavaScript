$(function(){
    $("tr:odd").css("background-color","green");
    $("#btn").click(function(){
        notif({
            msg: "<b>Oops!</b> A wild error appeared!",
            type: "success",
            position: "right"
        });
    })
    $('#api-call').on('click', ()=> {
        $.ajax({
            url: 'https://simple-books-api.glitch.me/',
            mode: 'cors',
            method: 'get',
            success: function(response){
               console.log(response.message)
            },
            error: function(){
                console.log("Error while loading data")
            }
        })
    })
})

