
const express = require('express'); 
const port = process.env.PORT || 3000
const app = express()
const socket = require("socket.io")

// static assests
app.use(express.static("public"))

// templates
app.set("view engine", "ejs")

// routes
app.use(require("./routes/index"))
app.use(require("./routes/albums"))
app.use(require("./routes/album"))
app.use(require("./routes/aboutus"))
app.use(require("./routes/contactus"))
app.use(require("./routes/chat"))

const server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

let io = socket(server)

io.on("connection", socket => {
    socket.on("postMessage", (messageFromClient) => { // listending for incoming chat messages
        io.emit("updateMessage", messageFromClient) // broadcast back out to all clients
    })
})