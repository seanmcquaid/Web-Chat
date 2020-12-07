const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router
  .post('/login', usersController.login)
  .post('/register', usersController.register)
  .get('/profile/:id')
  .put('/profile/:id')
  .delete('/friends/:id')
  .post('/addFriend');

module.exports = router;
