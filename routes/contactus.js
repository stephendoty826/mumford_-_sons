const express = require('express');
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))

//read and write to file
const fs = require("fs")

const feedbackData = require("../data/feedback.json") // converted to js object | format is [{}, {}, {}]

const saveResponses = () => {
    fs.writeFile("data/feedback.json", JSON.stringify(feedbackData), "utf8", (error) => {
        
        if(error){
            console.log(error);
        }
        console.log("feedback.json file has been updated")
    })
}

router.get("/contactus", (req, res) => {
    res.render("contactus")
})

// get all the message from feedback.json
router.get("/api", (req, res) => {
    res.json(feedbackData)
})

router.post("/api", (req, res) => {

    // grab the data from the header (body parser)
    let {name, title, message} = req.body

    // push it to the feedbackData obj
    feedbackData.unshift({
        name: name,
        title: title,
        message: message
    })

    // save the data to feedback.json file to persist data
    saveResponses()

    // send back all the messages with new messages attached
    res.json(feedbackData)
})

router.delete("/api", (req, res) => {
    // delete particular feedback via an index using splice() array method
    feedbackData.splice(req.body.id, 1)

    // save to feedback.json file
    saveResponses()

    // send back updated messages
    res.json(feedbackData)
})

module.exports = router