const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.postLogin = async (req, res, next) => {};

exports.postRegister = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(await User.findOne({ username }));
  return res.status(200).send({});
};

exports.getProfile = async (req, res, next) => {};

exports.putProfile = async (req, res, next) => {};

exports.deleteFriend = async (req, res, next) => {};

exports.postFriend = async (req, res, next) => {};

exports.getMessages = async (req, res, next) => {};

exports.postMessage = async (req, res, next) => {};
