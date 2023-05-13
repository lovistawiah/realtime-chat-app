// var socket = io();
let form = document.getElementById('form');
let message = document.getElementById('message');
let username = document.getElementById('username');
var messages = document.getElementById('messages');
const allChat = []
const messageItem = document.createElement("li")
const span = document.createElement("span")
messageItem.classList.add("message-item")
messageItem.textContent = "helflfjdjfldfadhfejee"
span.textContent = "-username"
messageItem.appendChild(span)
console.log(messageItem)
messages.appendChild(messageItem)
// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (message.value && username.value) {
//         const userMessage = {
//             username,
//             message
//         }
//         socket.emit('chat message', userMessage);
//         input.value = '';
//     }
// })




// socket.on("connect", () => {
//     socket.emit("status:", `${socket.id} connected`)
// })

// input.addEventListener("focusin", () => {
//     item.textContent ='typing..'
//     messages.appendChild(item)
// })

// socket.on("chat", (msg) => {
//     const item = document.createElement("li")
//     item.textContent = msg;
//     messages.appendChild(item)
// })


