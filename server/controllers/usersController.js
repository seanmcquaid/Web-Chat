const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
require('dotenv').config();

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userInfo = await UserModel.findOne({ username });

    if (!userInfo) {
      return res.status(401).send({
        errorMessage: 'No user exists for this username, please try again!',
      });
    }

    const isSamePassword = await bcrypt.compare(userInfo.password, password);

    if (!isSamePassword) {
      return res.status(401).send({
        errorMessage: "The passwords don't match, please try again!",
      });
    }

    const token = jwt.sign(
      { username: userInfo.username, id: userInfo._id },
      process.env.JWT_SECRET
    );

    return res.status(200).send({ token, isOnline: userInfo.isOnline });
  } catch (error) {
    return res.status(500).send({
      errorMessage: 'There was an issue with logging in, please try again!',
    });
  }
};

exports.postRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (await UserModel.findOne({ username })) {
      return res.status(401).send({
        errorMessage:
          'This user already exists, please try a different username!',
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const userInfo = await UserModel.create({
      username,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { username: userInfo.username, id: userInfo._id },
      process.env.JWT_SECRET
    );

    return res.status(200).send({ token, isOnline: userInfo.isOnline });
  } catch (error) {
    return res.status(500).send({
      errorMessage: 'There was an issue with registering, please try again!',
    });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.token;
    const userInfo = await UserModel.findOne({ _id: id });

    return res.status(200).send({ ...userInfo });
  } catch (error) {
    return res.status(500).send({
      errorMessage:
        'There was an issue getting the profile info, please try again!',
    });
  }
};

exports.putProfile = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.postFriend = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const id = req.params?.id;
  } catch (error) {}
};

exports.getMessages = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.postMessage = async (req, res, next) => {
  try {
  } catch (error) {}
};
