
console.log("hello world");
let form = document.querySelector("form")
let feedbackMessages = document.querySelector(".feedbackMessages")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // grab new message elements
    let newMessage = {
        name: document.querySelector("#name").value,
        title: document.querySelector("#title").value,
        message: document.querySelector("#message").value
    }

    // make a fetch call to "/api"
    let result = await fetch("/api", {
        method: "post", 
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(newMessage)
    })

    let messages = await result.json()
    updateFeedback(messages)
})

feedbackMessages.addEventListener("click", async (e) => {
    console.log(e.target.id);
    console.log(e.target);
    if(e.target?.id){
        let result = await fetch("/api", {
            method: "delete", 
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({id: e.target.id})
        })
        let messages = await result.json()
        updateFeedback(messages)
    }
})

const displayMessages = async () => {
    let result = await fetch("/api")
    let messagesArr = await result.json()
    updateFeedback(messagesArr)
}

const updateFeedback = (messagesArr) => {
    let htmlBlock = '<div class="title">Recent Feedback</div>'
    messagesArr.forEach((item, index) =>{

        htmlBlock += `     <div class="messageContainer">`
        htmlBlock += `          <div class="deleteButtonDiv">`
        htmlBlock += `              <button id="${index}" class="btn btn-danger">`
        htmlBlock += `                  <i id="${index}" class="fas fa-trash-alt"></i>`
        htmlBlock += `              </button>`
        htmlBlock += `          </div>`
        htmlBlock += `          <div>`
        htmlBlock += `              <div class="d-flex">`
        htmlBlock += `                  <div class="messageTitle">${item.title}</div>`
        htmlBlock += `                  <div class="messageName">${item.name}</div>`
        htmlBlock += `              </div>`
        htmlBlock += `              <div class="message">${item.message}</div>`
        htmlBlock += `          </div>`
        htmlBlock += `      </div>`
        htmlBlock += `      <hr>`
    })
    
    //attach to a dom element
    feedbackMessages.innerHTML = htmlBlock;
}

displayMessages()