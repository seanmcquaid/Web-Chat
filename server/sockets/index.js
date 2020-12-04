const socketIo = require('socket.io');
const server = require('../index');
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('I am connected!', socket);
});
