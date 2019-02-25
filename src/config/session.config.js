const path = require('path');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const options = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		// 30 days in milliseconds
		maxAge: 30 * 24 * 60 * 1000,
	},
	// Make sure you override this value so that cookies
	// saved by the backend does not have default 'connect.sid' name
	name: 'api-structure',
	// To enable user sessions across server restarts.
	// For more stable persistance storage, you might want to use redis or mongodb
	store: new FileStore({
		path: path.join(__dirname, '../../sessions'),
		secret: process.env.SESSION_SECRET,
		retries: 1,
		fileExtension: '',
	}),
};

module.exports = () => expressSession(options);
