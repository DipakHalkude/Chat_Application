const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageinput = document.getElementById('messagein');
const messagecontainer = document.querySelector('.container');
var audio = new Audio("imsg.mp3");

const append = (message, position) => {
   const messageelement = document.createElement('div');
   messageelement.innerText = message;
   messageelement.classList.add('message');
   messageelement.classList.add(position);
   messagecontainer.append(messageelement);
   if (position == 'left') {
      audio.play();
   }

}

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const message = messageinput.value;
   append(`you:${message}`, 'right');
   socket.emit('send', message);
   messageinput.value = "";
})
const name = prompt("Enter your name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
   append(`${name} joined the chat`, 'right');
})

socket.on('receive', data=> {
   append(`${data.name}:${data.message}`, 'left');
})

socket.on('left', name => {
   append(`${name} left the chat`, 'left');
})

