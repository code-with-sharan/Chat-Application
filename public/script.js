const socket = io() // I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page.

let textarea = document.getElementById("textarea")
let messageArea = document.querySelector(".message_area")
let name

do {
    name = prompt(`Please enter your name`)
} while (!name); // jab tk user, name type nahi krta prompt m, yb tk use prompt dikhao.


// Front end se message le k backend ko emit (send) kia:
textarea.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append:
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server (backend)
    socket.emit("user-message", msg)

}

function appendMessage(msg, type){ // Dynamically Appending message in message_area
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, 'message') // div pe classes add kr rhe hein.

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Backend se aya hua message :
socket.on('b_message', (msg) => { // 
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}