const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
require('dotenv').config();

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req?.body;
    const userInfo = await UserModel.findOne({ username });

    if (!userInfo) {
      return res.status(401).send({
        errorMessage: 'No user exists for this username, please try again!',
      });
    }

    const isSamePassword = await bcrypt.compare(password, userInfo.password);

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
    const { username, password } = req?.body;

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

exports.getUserInfo = async (req, res, next) => {
  try {
    const { id } = req?.token;
    const userInfo = await UserModel.findOne({ _id: id });

    return res.status(200).send({ ...userInfo._doc });
  } catch (error) {
    return res.status(500).send({
      errorMessage:
        'There was an issue getting the user info, please try again!',
    });
  }
};

exports.postFriend = async (req, res, next) => {
  try {
    const { name } = req?.body;
    const { id } = req?.token;

    const userInfo = await UserModel.findOne({ _id: id });

    if (userInfo.username === name) {
      return res.status(401).send({
        errorMessage: "You can't add yourself as a friend!",
      });
    }

    const hasFriendBeenAdded = await userInfo.hasFriend(name);

    if (hasFriendBeenAdded) {
      return res.status(401).send({
        errorMessage:
          'This friend has been added previously, please try with a different friend!',
      });
    }

    const friendInfo = await UserModel.findOne({ username: name });

    await userInfo.addFriend(friendInfo.name, friendInfo.isOnline);

    const updatedUserInfo = await UserModel.findOne({ _id: id });
    return res.status(200).send({ ...updatedUserInfo._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorMessage: 'There was an issue adding a friend, please try again!',
    });
  }
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const friendName = req?.params?.name;
    const { id } = req?.token;

    const userInfo = await UserModel.findOne({ _id: id });
    const hasFriendBeenAdded = await UserModel.hasFriend(friendName);

    if (!hasFriendBeenAdded) {
      return res.status(401).send({
        errorMessage:
          "This friend hasn't been added previously, please try with a different friend!",
      });
    }

    await userInfo.deleteFriend(friendName);

    const updatedUserInfo = await UserModel.findOne({ _id: id });

    return res.status(200).send({ ...updatedUserInfo._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorMessage: 'There was an issue deleting a friend, please try again!',
    });
  }
};

exports.postMessage = async (req, res, next) => {
  try {
    const { id } = req?.token;
    const { message, sentTo, sentFrom } = req?.body;
    const time = new Date();

    const sendingUserInfo = await UserModel.findOne({ _id: id });
    const receivingUserInfo = await UserModel.findOne({ username: sentTo });

    const messageInfo = { message, sentTo, sentFrom, time };

    await sendingUserInfo.addMessage(messageInfo);
    await receivingUserInfo.addMessage(messageInfo);

    const updatedUserInfo = await UserModel.findOne({ _id: id });

    return res.status(200).send({ ...updatedUserInfo._doc });
  } catch (error) {
    return res.status(500).send({
      errorMessage: 'There was an issue sending a message, please try again!',
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const filter = {};
    const users = await UserModel.find(filter);

    return res.status(200).send({
      users,
    });
  } catch (error) {
    return res.status(500).send({
      errorMessage: 'There was an issue getting all users, please try again!',
    });
  }
};

exports.postLogout = async (req, res, next) => {
  const { id } = req?.token;

  const userInfo = await UserModel.findOne({ _id: id });

  userInfo.isOnline = false;
  userInfo.isTyping = false;
  req.token = null;

  userInfo.save();

  // sketched out solution for now
};
