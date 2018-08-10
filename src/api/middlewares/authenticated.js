const httpStatus = require('http-status');
const responses = require('../services/response.service');

module.exports = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(httpStatus.UNAUTHORIZED).json(responses.unAuthorized());
};
