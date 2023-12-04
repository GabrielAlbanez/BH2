import { io } from 'socket.io-client';

const sockett = io('https://bh2-upl7.onrender.com'); // Substitua pela URL do seu servidor Socket.IO

export default sockett;











// const socket = io('http://localhost:8080');
//     socket.emit('authenticate', User[0]?.cpf);