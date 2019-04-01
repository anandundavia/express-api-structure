const Joi = require('joi');

module.exports = {
	// POST /v1/user/greet-me?name=<some_name>
	me: {
		query: {
			name: Joi.string().required(),
		},
		// you can write validations for body and param as well
		// body: {
		//     name: Joi.string().required(),
		// },
		// param: {
		//     name: Joi.string().required(),
		// },
	},
};
