const httpStatus = require('http-status');

const responseService = require('../services/response.service');
const {
    dump: { secret },
} = require('../../constants');

exports.allowed = (req, res, next) => {
    if (req.headers['x-dump-secret'] && req.headers['x-dump-secret'] === secret) {
        return next();
    }
    return res.status(httpStatus.FORBIDDEN).json(responseService.notEnoughPrivileges());
};

exports.sync = (req, res, next) => {
    res.send({ message: 'sync started' });
};
