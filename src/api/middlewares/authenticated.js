const httpStatus = require('http-status');
const responses = require('../services/response.service');

module.exports = (req, res, next) => {
	/**
	 * If the incoming request contains proper cookies,
	 * 'passport' module will parse the cookies and put the
	 * req.user object as the user logged in.
	 *
	 * Note however that this functionality is strictly limited to 'passport'
	 * module which is not included in this boilerplate code.
	 *
	 * Based on your api and session management configurations,
	 * you might want to check req.session.id ( in case of cookies )
	 * or req.headers['x-access-token'] and then validate the request
	 */
	if (req.user) {
		return next();
	}
	return res.status(httpStatus.UNAUTHORIZED).json(responses.notAuthenticated());
};
