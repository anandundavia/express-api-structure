const httpStatus = require('http-status');
const cors = require('cors');

const APIError = require('../api/utils/APIError');

const options = {
	origin: (origin, callback) => {
		// In dev, allow these origins to access the API
		const whiteList = ['localhost', 'chrome-extension'];
		// We are doing string matching here.
		// For advanced use-case, use regex
		const index = whiteList.findIndex((aWhiteListedOrigin) => origin.includes(aWhiteListedOrigin));
		if (!origin || index !== -1) {
			callback(null, true);
		} else {
			const error = {
				message: `'${origin}' is not allowed to access the specified route/resource`,
				status: httpStatus.FORBIDDEN,
			};
			callback(new APIError(error), false);
		}
	},
	credentials: false,
};

module.exports = () => cors(options);
