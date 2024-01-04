const socket = io('http://localhost:7000/')

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const typing = document.getElementById('typing');

let previousMessage = '';

form.addEventListener('submit', (e) => {
e.preventDefault();
if (input.value) {
    previousMessage = input.value; 
    const message = document.createElement('div');
    message.textContent = input.value;
    const messageCount = messages.childElementCount;
    message.classList.add('alert', 'alert-info' );
    messages.appendChild(message);
    window.scrollTo(0, document.body.scrollHeight);
    socket.emit('chat message', input.value);
    input.value = '';
}
});

socket.on('chat message', (data) => {
if (data !== previousMessage) { 
    console.log("data from send message to all users: " + data);
    const item = document.createElement('div');
    item.textContent = data;
    const messageCount = messages.childElementCount;
    item.classList.add('alert', 'alert-info');

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}
});













































    //   socket.on('typing', () => {
    //     typing.innerHTML = 'typing...';
    //   });
          
    //   input.addEventListener('input', () => {
    //     socket.emit('typing');
    //   });

    //   socket.on('typing', () => {
    //     typing.innerHTML = 'typing...';
    //   });

    //   input.addEventListener('keyup', () => {
    //     socket.emit('not_typing');
    //   });

    //   socket.on('not_typing', () => {
    //     setTimeout(() => {
    //       typing.innerHTML = '';
    //     }, 2000);
    //   });