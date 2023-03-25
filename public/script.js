var socket = io();

const inputMsg = document.getElementById('sendmsg');
const btn = document.getElementById('btn');
const list = document.getElementById('listmsg');

btn.onclick = function execute() {
    socket.emit('send_msg', {
        msg:inputMsg.value
    });
}

socket.on('mssg_rcvd', (data) => {
    const listMsg = document.createElement('li');
    listMsg.innerText = data.msg;
    list.appendChild(listMsg);
});