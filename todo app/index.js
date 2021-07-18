$(function(){
    getRecipes()
    $('#update-todo').on('click', handleUpdate)
    $('#add-todo').on('click', function(){
        let title = $('#title').val()
        let completed = $('#completed').val().toLowerCase() === 'yes' ? true : false

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            method: 'post',
            data: {title, completed },
            success: (response) => {
                alert('todo added successfully')
                $('#recipes').append(
                    `<div class='underline'>
                        <h3>${response.title}</h3>
                        <div class="row" data-id=${response.id}>
                            <div class="col-10">
                            Completed: <p>${response.completed} </p>
                            </div>
                            <div class="col-2 d-flex justify-content-end">
                                <button class='mb-auto editButton'>Edit</button>
                                <button class='mb-auto deleteButton'>Delete</button>
                            </div>
                        </div>
                    </div>
                `)
                $('.deleteButton').on('click', handleDelete)
                $('.editButton').on('click', showModal)
            },
            error: () => {
                alert('Faild to add recipe! please try again...')
            }
        })
    })

    $('#close-modal').on('click', () => $('.modal').modal('hide'))
})

function getRecipes () {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'get',
        success: loadRecipes,
        error: handleError
    })
}
function loadRecipes(response) {
    $('#recipes').empty()
   if(response.length > 0) {
    $('#recipes').append('<h1>All TODOs</h1>')
   }
   else {
    $('#recipes').append('<h1>No TODO found</h1>')
        return
   }
    response.map(obj => {
        $('#recipes').append(
            `<div class='underline'>
                <h3>${obj.title}</h3>
                <div class="row" data-id=${obj.id}>
                    <div class="col-10">
                       Completed: <p>${obj.completed} </p>
                    </div>
                    <div class="col-2 d-flex justify-content-end">
                        <button class='mb-auto editButton'>Edit</button>
                        <button class='mb-auto deleteButton'>Delete</button>
                    </div>
                </div>
            </div>
        `)
    })
    $('.deleteButton').on('click', handleDelete)
    $('.editButton').on('click', showModal)
}
function handleError() {
    $('#recipes').empty()
    $('#recipes').append('no data found')
}

function handleDelete() {   
    id = $(this).parent().parent()
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/todos/${id.attr('data-id')}`,
        method: 'DELETE',
        success: () => {
            alert('Todo deleted successfully')
            id.closest('.underline').remove()
           
        },
        error: (response) => {
            alert('Failed to delete record!')
        }
    })
}

function showModal() {
    let todo = $(this).closest('.underline')
    let id = todo.find('.row').attr('data-id')
    let title = todo.find('h3').text()
    let completed = todo.find('p').text()
    $('.modal').modal('show')
    $('.modal-body').find('#todo-id').val(id)
    $('.modal-body').find('#title').val(title)
    $('.modal-body').find('#completed').val(completed)
}

function handleUpdate() {
    let id = $('.modal-body').find('#todo-id').val()
    let title = $('.modal-body').find('#title').val()
    let completed = $('.modal-body').find('#completed').val().toLowerCase() === 'true' ? true : false
    
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
        method: 'PUT',
        data: {title, completed, id},
        success: () => {
            alert('TODO Updated successfully!')
            $('.modal').modal('hide')
            let todo = $('div').find(`[data-id='${id}']`).closest('.underline')
            todo.find('h3').text(title)
            todo.find('p').text(completed.toString())

        },
        error: () => {
             alert('Failed to Update TODO!')
        }
    })

}