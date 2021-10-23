
const express = require("express")
const router = express.Router()
let dataFile = require("../data/data.json")

let albums = dataFile.albums

let groupShotArray = ["/images/group_shot_1.jpeg", "/images/group_shot_3.jpeg", "/images/group_shot_4.jpeg", "/images/group_shot_5.jpeg", "/images/group_shot_6.jpeg", "/images/group_shot_7.jpeg"]

router.get("/album/:albumid", (req, res) => {
    let randomGroupShot = groupShotArray[Math.floor(Math.random()*(groupShotArray.length-1))]
    let albumSlug = req.params.albumid
    let album = albums.filter(album =>{
        return albumSlug === album.slug
    })
    res.render("album", {
        album: album[0],
        backgroundImg: randomGroupShot
    })
})

module.exports = router