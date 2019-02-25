const httpStatus = require('http-status');
const responseService = require('../services/response.service');

exports.me = (req, res, next) => {
	try {
		const { name } = req.query;
		const response = responseService.greetUser(name);
		res.status(httpStatus.OK).json(response);
	} catch (e) {
		next(e);
	}
};
