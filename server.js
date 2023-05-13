const http = require("http")
const { Server } = require("socket.io")
const express = require("express");


const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use('/public', express.static("public/"))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
let connectionList = []
let receivers = []

io.on("connection", (socket) => {
    // ? add number of sockets 
    connectionList.push(socket)

    // ? returns connected sockets

    console.log(socket.id + " connected")
    const message = {
        "message": `${socket.id} connected`,
        "username": "Admin",
    }
    // sending connected sockets to all users
    io.emit("chat", message)

    // ? sending number of connection
    io.emit("list", connectionList.length)

    //? fire when socket disconnected 
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
        connectionList = connectionList.filter(s => s.id !== socket.id)

        // send message to users when a disconnects
        const message = {
            "message": `${socket.id} disconnected`,
            "username": "Admin",
        }
        io.emit("chat", message)
    })
})
io.on("connection", (socket) => {
    // ? chatting channel
    socket.on("chat message", (userMessage) => {
        // sending message to all users with my name excluding me
        receivers = connectionList.filter(sock => sock.id !== socket.id)
        receivers.forEach((sock) => {
            sock.emit("chat", userMessage)
        })
        // ? sending to sender using me as `username` on the userMessage obj
        let senderName = userMessage.username = "Me"
        let sender = { ...userMessage, senderName }
        socket.emit("chat", sender)

    })

io.on("connection",(socket)=>{
    // sending typing functionality
    socket.on('typing', (userMessage) => {
        console.log(userMessage)
        // remove user 
        receivers = connectionList.filter(sock => sock.id !== socket.id)
        receivers.forEach(sock => {
            console.log(sock.id)
            sock.emit("typing:message",
                {
                    message: userMessage.message,
                    username: userMessage.username
                })
        })
    })
})
})


server.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})
