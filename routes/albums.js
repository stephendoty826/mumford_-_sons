
const express = require("express")
const router = express.Router()
let dataFile = require("../data/data.json")

let albums = dataFile.albums

router.get("/albums", (req, res) => {
    res.render("albums", {
        albums: albums,
        pageTitle: "Albums"
    })
})

module.exports = router