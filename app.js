
const express = require('express'); 
const port = process.env.PORT || 3000
const app = express()

// static assests
app.use(express.static("public"))

// templates
app.set("view engine", "ejs")

// routes
app.use(require("./routes/index"))
app.use(require("./routes/albums"))
app.use(require("./routes/album"))

// starting server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})