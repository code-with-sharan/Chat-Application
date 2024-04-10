const http = require("http")
const express = require("express")
const path = require("path")
const { Server } = require("socket.io")
const { Socket } = require("dgram")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// handling socket.io
io.on("connection", (socket) => { // socket is a client/user. 
    socket.on("user-message", (message) => {
        io.emit("message", message) // agar front end se koi message aata hai to sabhi ko de do
    })
})

app.use(express.static(path.resolve("./public")))

// handling http requests
app.get("/", (req, res) => {
    res.sendFile("/public/index.html")
})

server.listen(9000, () => console.log("Server started at PORT: 9000"))