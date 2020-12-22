const mockRequest = require('../../testUtils.js/mockRequest');
const mockResponse = require('../../testUtils.js/mockResponse');
const mockNext = require('../../testUtils.js/mockNext');
const usersController = require('../usersController');
const UserModel = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('usersController', () => {
  describe('postLogin', () => {
    it('No user found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => null);

      await usersController.postLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage: 'No user exists for this username, please try again!',
      });
    });

    it("Passwords don't match", async () => {
      const body = {
        username: 'testUser',
        password: 'testPassword',
      };
      const req = mockRequest(body);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword1',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);

      await usersController.postLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage: "The passwords don't match, please try again!",
      });
    });

    it('Valid user logs in', async () => {
      const body = {
        username: 'testUser',
        password: 'testPassword',
      };
      const req = mockRequest(body);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'Valid Token');

      jest.spyOn(UserModel, 'save').mockImplementationOnce(() => userInfo);

      await usersController.postLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        token: 'Valid Token',
        isOnline: true,
      });
    });
  });

  describe('postRegister', () => {
    it('User already exists', async () => {
      const body = {
        username: 'testUser',
        password: 'testPassword',
      };
      const req = mockRequest(body);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword1',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      await usersController.postRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage:
          'This user already exists, please try a different username!',
      });
    });

    it('User successfully registers', async () => {
      const body = {
        username: 'testUser',
        password: 'testPassword',
      };
      const req = mockRequest(body);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => null);

      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => 'testPassword');

      jest.spyOn(UserModel, 'create').mockImplementationOnce(() => userInfo);

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'Valid Token');

      await usersController.postRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        token: 'Valid Token',
        isOnline: true,
      });
    });
  });

  it('getUserInfo', async () => {
    const body = {
      username: 'testUser',
      password: 'testPassword',
    };
    const token = {
      id: 1,
    };
    const req = mockRequest(body, {}, {}, token);
    const res = mockResponse();
    const next = mockNext();

    const userInfo = {
      _doc: {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      },
    };

    jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

    await usersController.getUserInfo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      _id: 1,
      username: 'testUser',
      password: 'testPassword',
      isTyping: false,
      isOnline: true,
      friends: [],
      messages: [],
    });
  });

  describe('postFriend', () => {
    it('User tries to add themselves as a friend', async () => {
      const body = {
        name: 'New Friend Name',
      };
      const token = {
        id: 1,
      };
      const req = mockRequest(body, {}, {}, token);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'New Friend Name',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(UserModel, 'hasFriend').mockImplementationOnce(() => true);

      await usersController.postFriend(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage: "You can't add yourself as a friend!",
      });
    });
    it('Friend has already been added', async () => {
      const body = {
        name: 'New Friend Name',
      };
      const token = {
        id: 1,
      };
      const req = mockRequest(body, {}, {}, token);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(UserModel, 'hasFriend').mockImplementationOnce(() => true);

      await usersController.postFriend(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage:
          'This friend has been added previously, please try with a different friend!',
      });
    });

    it('Friend was successfully added', async () => {
      const body = {
        name: 'New Friend Name',
      };
      const token = {
        id: 1,
      };
      const req = mockRequest(body, {}, {}, token);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(UserModel, 'hasFriend').mockImplementationOnce(() => false);

      jest.spyOn(UserModel, 'addFriend').mockImplementationOnce(() => true);

      const updatedUserInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [
          {
            name: 'New Friend Name',
            isOnline: true,
            isTyping: false,
          },
        ],
        messages: [],
      };

      jest
        .spyOn(UserModel, 'findOne')
        .mockImplementationOnce(() => updatedUserInfo);

      await usersController.postFriend(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        ...updatedUserInfo,
      });
    });
  });

  describe('deleteFriend', () => {
    it("Friend hasn't been added", async () => {
      const params = {
        name: 'New Friend Name',
      };
      const token = {
        id: 1,
      };
      const req = mockRequest({}, params, {}, token);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(UserModel, 'hasFriend').mockImplementationOnce(() => false);

      await usersController.deleteFriend(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage:
          "This friend hasn't been added previously, please try with a different friend!",
      });
    });

    it('Friend is successfully deleted', async () => {
      const params = {
        name: 'New Friend Name',
      };
      const token = {
        id: 1,
      };
      const req = mockRequest({}, params, {}, token);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [
          {
            name: 'New Friend Name',
            isOnline: true,
            isTyping: false,
          },
        ],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(UserModel, 'hasFriend').mockImplementationOnce(() => true);

      jest.spyOn(UserModel, 'deleteFriend').mockImplementationOnce(() => true);

      const updatedUserInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest
        .spyOn(UserModel, 'findOne')
        .mockImplementationOnce(() => updatedUserInfo);

      await usersController.deleteFriend(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        ...updatedUserInfo,
      });
    });
  });

  it('postMessage', async () => {
    const body = {
      message: 'Hello there',
      sentTo: 'testUser2',
      sentFrom: 'testUser1',
    };
    const token = {
      id: 1,
    };
    const req = mockRequest(body, {}, {}, token);
    const res = mockResponse();
    const next = mockNext();

    const sendingUserInfo = {
      _id: 1,
      username: 'testUser1',
      password: 'testPassword',
      isTyping: false,
      isOnline: true,
      friends: [
        {
          name: 'testUser2',
          isOnline: true,
          isTyping: false,
        },
      ],
      messages: [],
    };

    const receivingUserInfo = {
      _id: 1,
      username: 'testUser2',
      password: 'testPassword',
      isTyping: false,
      isOnline: true,
      friends: [
        {
          name: 'testUser1',
          isOnline: true,
          isTyping: false,
        },
      ],
      messages: [],
    };

    jest
      .spyOn(UserModel, 'findOne')
      .mockImplementationOnce(() => sendingUserInfo);

    jest
      .spyOn(UserModel, 'findOne')
      .mockImplementationOnce(() => receivingUserInfo);

    jest.spyOn(UserModel, 'addMessage').mockImplementationOnce(() => true);
    jest.spyOn(UserModel, 'addMessage').mockImplementationOnce(() => true);

    const updatedUserInfo = {
      _id: 1,
      username: 'testUser1',
      password: 'testPassword',
      isTyping: false,
      isOnline: true,
      friends: [
        {
          name: 'testUser2',
          isOnline: true,
          isTyping: false,
        },
      ],
      messages: [
        {
          message: 'Hello there',
          sentTo: 'testUser2',
          sentFrom: 'testUser1',
        },
      ],
    };

    jest
      .spyOn(UserModel, 'findOne')
      .mockImplementationOnce(() => updatedUserInfo);

    await usersController.postMessage(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      ...updatedUserInfo,
    });
  });

  it('getAllUsers', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    const users = [
      {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      },
    ];

    jest.spyOn(UserModel, 'find').mockImplementationOnce(() => users);

    await usersController.getAllUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      users,
    });
  });

  it('postLogout', async () => {
    const token = {
      id: 1,
    };
    const req = mockRequest({}, {}, {}, token);

    const userInfo = {
      _id: 1,
      username: 'testUser',
      password: 'testPassword',
      isTyping: false,
      isOnline: true,
      friends: [
        {
          name: 'New Friend Name',
          isOnline: true,
          isTyping: false,
        },
      ],
      messages: [],
    };

    jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

    jest.spyOn(UserModel, 'save').mockImplementationOnce(() => userInfo);

    const updatedUserInfo = {
      _doc: {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: false,
        friends: [
          {
            name: 'New Friend Name',
            isOnline: true,
            isTyping: false,
          },
        ],
        messages: [],
      },
    };

    jest
      .spyOn(UserModel, 'findOne')
      .mockImplementationOnce(() => updatedUserInfo);

    await usersController.postLogout(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      ...updatedUserInfo._doc,
    });
  });
});
