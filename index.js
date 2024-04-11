// For creating http server:
const http = require("http")
const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 9000

const server = http.createServer(app) // Creates an HTTP server and attaches it to the Express application.

app.use(express.static(path.resolve("./public")))

// handling http requests
app.get("/", (req, res) => {
    res.sendFile("/public/index.html")
})

server.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))

// For creating socket.io server:
const { Server } = require("socket.io")

const io = new Server(server) 
/* 'socket.io' needs an HTTP server to attach to. 'socket.io' works alongside the HTTP 
server to upgrade the connection to a WebSocket when necessary, and to handle other types
of transports in case WebSockets are not supported by the client or server. So, in essence,
both the HTTP server and the socket.io server are running on the same server instance 
(server). This allows you to handle both regular HTTP requests and WebSocket connections 
within the same application.*/

// handling socket.io
io.on("connection", (socket) => { // socket is a client/user. 
    console.log("connected.............")

    socket.on("user-message", (msg) => {
        socket.broadcast.emit("b_message", msg)
    })
})