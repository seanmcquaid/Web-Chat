const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

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

    return res.status(200).send({ ...userInfo });
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

    // encrypt JWT and send it, will revisit model for sending tomorrow

    return res.status(200).send({ ...userInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorMessage: 'There was an issue with registering, please try again!',
    });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const userInfo = await UserModel.findOne({ _id });

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
    const id = req.params.id;
  } catch (error) {}
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const id = req.params.id;
  } catch (error) {}
};

exports.postFriend = async (req, res, next) => {
  try {
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
