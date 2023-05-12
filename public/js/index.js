var socket = io();
let form = document.getElementById('form');
let input = document.getElementById('input');
var messages = document.getElementById('messages');
const allChat = []

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
})




socket.on("connect", () => {
    socket.emit("status:", `${socket.id} connected`)
})

// input.addEventListener("focusin", () => {
//     item.textContent ='typing..'
//     messages.appendChild(item)
// })

socket.on("chat", (msg) => {
    const item = document.createElement("li")
    item.textContent = msg;
    messages.appendChild(item)
})


