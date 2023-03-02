
const socket = io() // access to websocket api

// grab username and message input fields
let chatForm = document.querySelector("form")
let chatUsername = document.querySelector("#name")
let chatMessage = document.querySelector("#message")
let chatMessageContainer = document.querySelector(".chatMessageContainer")

//listen for new incoming messages
socket.on("updateMessage", data => {
    // data {username, message}

    let newMessage = document.createElement("div")
    newMessage.setAttribute("class", "messageContainerChat")

    let htmlBlock = ""

    if(chatUsername.value === data.username){
        htmlBlock = `<p class="chatName sentMessage">${data.username}</p><p class="chatMessage sentMessage">${data.message}</p>`
    }
    else{
        htmlBlock = `<p class="chatName incomingMessage">${data.username}</p><p class="chatMessage incomingMessage">${data.message}</p>`
    }

    newMessage.innerHTML = htmlBlock

    chatMessageContainer.insertBefore(newMessage, chatMessageContainer.firstChild)

})

// send message to server
chatForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(chatUsername.value);
    console.log(chatMessage.value);

    socket.emit("postMessage", {
        username: chatUsername.value,
        message: chatMessage.value
    })
    
    //resets message box after message is sent 
    chatMessage.value = null
})