const http = require("http")
const { Server } = require("socket.io")
const express = require("express");
const fs = require("fs")

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.use('/public', express.static("public/"))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


io.on("connection", (socket) => {
    socket.on("status:", (message) => {
        console.log(message)
    })
    //? fire when socket disconnected 
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })
})

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log(msg)
        socket.emit("chat", msg)
    })
})


server.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})
