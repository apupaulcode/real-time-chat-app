const socket = io();
let textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message_area');
const nameBox = document.getElementById('name')
let name;

do{
   name = prompt('Please enter your name: ');
} while(!name);


textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})


function sendMessage(message){
    let msg = {
        user: name,
        message:message.trim(),
    }
    // append message 

    appendMessage(msg,'outgoing');
    textarea.value = '';

    // send to server 

    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    nameBox.innerHTML = name;

    mainDiv.classList.add(className, 'message');

    let markup = `
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
}

// recive message 

socket.on('message',(msg)=>{
    
    appendMessage(msg , 'incoming')
})
