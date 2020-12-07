const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');

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

app.use('/users', usersRouter);

const port = process.env.PORT || '4000';

const server = http.createServer(app);

io.on('connection', (socket) => {
  message(socket);
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('Connected to Mongo!');
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
