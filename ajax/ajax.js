$(function(){
    $('#ajax').on('click', sendAjaxRequest)
})
function sendAjaxRequest(){
    $.get('text_file.txt',handleResponse)
}
function handleResponse(response){
    $('#result').empty()
    $('#result').append(response)
}