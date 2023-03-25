var socket = io();

const btn = document.getElementById('btn');

btn.onclick = function () {
    socket.emit('from_client');
}

socket.on('from_server', () => {
    const div = document.createElement('div');
    div.innerText = 'new event from server';
    document.body.appendChild(div);
})