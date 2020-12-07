const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const mongoose = require('mongoose');

const { message } = require('./sockets');

app.use(cors);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || '4000';

const server = http.createServer(app);

const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  message(socket);
});

console.log(process.env);

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true }, (err) => {
  console.log(err);
});

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
