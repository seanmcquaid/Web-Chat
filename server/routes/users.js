const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const checkAuth = require('../middleware/checkAuth');

router
  .post('/login', usersController.login)
  .post('/register', usersController.register)
  .get('/profile/:id', checkAuth, usersController.getProfile)
  .put('/profile/:id', checkAuth, usersController.putProfile)
  .delete('/friends/:id', checkAuth, usersController.deleteFriend)
  .post('/addFriend', checkAuth, usersController.postFriend);

module.exports = router;
