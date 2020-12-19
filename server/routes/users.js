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
  .post('/sendMessage', checkAuth, usersController.postMessage)
  .get('/getAllUsers', checkAuth, usersController.getAllUsers)
  .post('/logout', checkAuth, usersController.postLogout);

module.exports = router;
