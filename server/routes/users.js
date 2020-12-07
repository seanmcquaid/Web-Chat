const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const checkAuth = require('../middleware/checkAuth');

router
  .post('/login', usersController.postLogin)
  .post('/register', usersController.postRegister)
  .get('/profile/:id', checkAuth, usersController.getProfile)
  .put('/profile/:id', checkAuth, usersController.putProfile)
  .delete('/friends/:id', checkAuth, usersController.deleteFriend)
  .post('/addFriend', checkAuth, usersController.postFriend)
  .get('/getMessages', checkAuth, usersController.getMessages)
  .post('/sendMessage', checkAuth, usersController.postMessage);

module.exports = router;
