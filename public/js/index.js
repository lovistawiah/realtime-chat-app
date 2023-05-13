var socket = io();
const form = document.getElementById('form');
const message = document.getElementById('message');
const username = document.getElementById('username');
const messages = document.getElementById('messages');
const indicator = document.getElementById("indicator");
const connectionList = document.getElementById("connection")
const messageItem = document.createElement("li")
const span = document.createElement("span")

messageItem.classList.add("message-item")
const allChat = []


function submitForm() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (message.value && username.value) {
            const userMessage = {
                "username": username.value,
                "message": message.value,
                "date": Date.now(),
                "socket": socket.id
            }
            // ? chatting channel
            socket.emit('chat message', userMessage);
            message.value = '';
        }
    })
}
username.addEventListener("blur", () => {
    let value = ""
    value = username.value
    message.addEventListener("focusin", (e) => {
        socket.emit('typing', { "message": "typing...", "username": value })
    })
})

socket.on("typing:message", (message) => {
    messageItem.textContent = message.message
    span.textContent = "-" + message.username
    messageItem.appendChild(span)
    messages.appendChild(messageItem)
})

socket.on("connect", () => {
    indicator.textContent = "🟢"
})

socket.on("list", (connectionItems) => {
    connectionList.textContent = connectionItems
})


socket.on("chat", (message) => {
    messageItem.textContent = message.message
    span.textContent = "-" + message.username
    messageItem.appendChild(span)
    messages.appendChild(messageItem)

})

submitForm()

