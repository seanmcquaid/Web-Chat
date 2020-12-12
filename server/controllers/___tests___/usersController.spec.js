const mockRequest = require('../../testUtils.js/mockRequest');
const mockResponse = require('../../testUtils.js/mockResponse');
const mockNext = require('../../testUtils.js/mockNext');
const usersController = require('../usersController');
const UserModel = require('../../models/user');

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

    it("Passwords don't match", () => {});

    it('Valid user logs in', () => {});
  });

  describe('postRegister', () => {
    it('User already exists', () => {});

    it('User successfully registers', () => {});
  });

  it('getUserInfo', () => {});

  describe('postFriend', () => {
    it('Friend has already been added', () => {});

    it('Friend was successfully added', () => {});
  });

  describe('deleteFriend', () => {
    it("Friend hasn't been added", () => {});

    it('Friend is successfully deleted', () => {});
  });

  it('postMessage', () => {});

  it('getAllUsers', () => {});
});
