
const express = require('express'); 
const port = 3000
const app = express()

// static assests
app.use(express.static("public"))

// templates
app.set("view engine", "ejs")

// routes
app.get("/", (req, res) => {
    res.send("home page")
})

// starting server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})