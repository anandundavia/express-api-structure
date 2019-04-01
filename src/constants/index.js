const path = require('path');
// import .env variables
require('dotenv-safe').load({
	path: path.join(__dirname, '../../.env'),
});

const common = require('./constants.common');

const getEnvironmentSpecificConstants = (env) => {
	/* eslint-disable indent, global-require */
	switch (env) {
		case 'development': {
			return require('./constants.dev');
		}
		case 'production': {
			return require('./constants.prod');
		}
		default: {
			throw new Error(`no matching constants file found for env '${env}'`);
		}
	}
	/* eslint-enable indent, global-require */
};

module.exports = Object.assign(common, getEnvironmentSpecificConstants(process.env.NODE_ENV));
