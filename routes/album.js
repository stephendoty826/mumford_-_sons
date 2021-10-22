
const express = require("express")
const router = express.Router()

router.get("/album", (req, res) => {
    res.render("album")
})

module.exports = router