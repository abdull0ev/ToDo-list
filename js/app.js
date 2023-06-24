const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
const messageCreate = document.getElementById('message-edit')
const dangerMsg = document.getElementById('message-create')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')


let editItemID

let todos = JSON.parse(localStorage.getItem('list'))
    ? JSON.parse(localStorage.getItem('list')) :
    []

if (todos.length) showTodos()


function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}


function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))

    listGroupTodo.innerHTML = ''

    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
          ${item.text}
          <div class="todo-icons d-flex ">
          <span class="opacity-50 me2">${item.time}</span>
            <img onclick=(editTodo(${i})) src="img/edit.svg" width="30">
            <img onclick=(deleteTodo(${i})) src="img/delete.svg" width="30">
            
          </div>
        </li>
        `
    })
}

function getTime() {
    const now = new Date()
    const date = now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
    const year = now.getFullYear()
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()

    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

    const months = [
        'Januare',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Augest',
        'September',
        'Oktober',
        'November',
        'December',
    ]
    const title_month = now.getMonth()
    fullDay.textContent = `${date} ${months[title_month]} ${year}`


    hourEl.textContent = hour
    minuteEl.textContent = minutes
    secondEl.textContent = second
    return (` ${hour}:${minutes}`)
}


setInterval(() => {
    getTime()
}, 100);


function showmessage(where, message) {
    document.getElementById(`${where}`).textContent = message
    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 2500);
}



formCreate.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formCreate['input-create'].value.trim()

    formCreate.reset()

    if (todoText.length) {
        todos.push({ text: todoText, time: getTime(), completed: false })
        console.log(todos);
        setTodos()
        showTodos()
    } else {
        showmessage('message-create', 'please enter some ..text')
    }
})

function deleteTodo(id) {
    const deletedTodos = todos.filter((item, i) => {
        return i !== id
    })

    todos = deletedTodos
    setTodos()
    showTodos()
}

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formEdit['input-edit'].value.trim()

    formEdit.reset()

    if (todoText.length) {
        todos.splice(editItemID, 1, {
            text: todoText,
            time: getTime(),
            completed: false
        })

        setTodos()
        showTodos()
        close()
    } else {
        showmessage('message-edit', 'please enter some ..text')
    }
})

function editTodo(id) {
    open()
    editItemID = id
}

document.addEventListener('keydown', (e) =>{
if (e.which == 27) {
    close()
}
console.log(e);
})


function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)



