
const http = require('http');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');

const users = {};

const port = process.env.PORT || 4500;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New connection');
  
  socket.on('join', ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit('userJoined', {
      user: 'Admin',
      message: `${users[socket.id]} has joined`,
    });
    socket.emit('welcome', {
      user: 'Admin',
      message: `Welcome to chat, ${users[socket.id]}!`,
    });
  });

 
  socket.on('message',({message})=>{
    io.emit('sendmessage',{user:users[socket.id],message,id: socket.id})
   })

  socket.on('disconnect', () => {
    console.log(`${users[socket.id]} has left`);
    socket.broadcast.emit('userLeft', {
      user: 'Admin',
      message: `${users[socket.id]} has left the chat`,
    });
    delete users[socket.id];
  });
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});


// const http = require('http');
// const express = require('express');
// const cors = require('cors');
// const socketio = require('socket.io');

// const users = {};

// const port = process.env.PORT || 4500;

// const app = express();
// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// const server = http.createServer(app);
// const io = socketio(server, { transports: ['websocket'] });

// io.on('connection', (socket) => {
//   console.log('New connection');

//   socket.on('join', ({ user }) => {
//     users[socket.id] = user;
//     console.log(`${user} has joined`);
//     socket.broadcast.emit('userJoined', {
//       user: 'Admin',
//       message: `${users[socket.id]} has joined`,
//     });
//     socket.emit('welcome', {
//       user: 'Admin',
//       message: `Welcome to chat, ${users[socket.id]}!`,
//     });
//   });

//   socket.on('message', ({ message }) => {
//     io.emit('sendmessage', { user: users[socket.id], message, id: socket.id });
//   });

//   socket.on('disconnect', () => {
//     console.log(`${users[socket.id]} has left`);
//     socket.broadcast.emit('userLeft', {
//       user: 'Admin',
//       message: `${users[socket.id]} has left the chat`,
//     });
//     delete users[socket.id];
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is listening on http://localhost:${port}`);
// });
