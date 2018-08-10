const httpStatus = require('http-status');
const responseService = require('../services/response.service');

/**
 * Called AFTER the successful signup of the user
 */
exports.signup = (req, res) => {
    const { user } = res.locals.signup;
    delete user.meta;
    res.status(httpStatus.OK).json(responseService.userCreated(user));
};

/**
 * Called AFTER the successful login of the user
 */
exports.login = (req, res) => {
    const user = Object.assign({}, req.user);
    // Might want to remove some fields off the user.
    res.status(httpStatus.OK).json(user);
};

/**
 * me and login are essentially the same controllers
 */
exports.me = exports.login;

/**
 * Used to clears session and req.user object using passport's req.logout()
 */
exports.logout = (req, res, next) => {
    // Passport adds a method logout to the req object.
    // Which will clear session as well as req.user object
    req.logout();
    res.status(httpStatus.OK).json(responseService.userLoggedOut());
};

exports.changePassword = (req, res) => {
    req.logout();
    res.status(httpStatus.OK).json(responseService.userPasswordChanged());
};
