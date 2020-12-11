const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const checkAuth = require('../middleware/checkAuth');

router
  .post('/login', usersController.postLogin)
  .post('/register', usersController.postRegister)
  .get('/getUserInfo', checkAuth, usersController.getUserInfo)
  .delete('/friends/:name', checkAuth, usersController.deleteFriend)
  .post('/addFriend', checkAuth, usersController.postFriend)
  .get('/getMessages', checkAuth, usersController.getMessages)
  .post('/sendMessage', checkAuth, usersController.postMessage)
  .get('/getAllUsers', checkAuth, usersController.getAllUsers);

module.exports = router;
