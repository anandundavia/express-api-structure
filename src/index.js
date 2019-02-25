const { port, env } = require('./constants');
const app = require('./config/express.config');
const logger = require('./api/utils/logger')(__filename);

// listen to requests
app.listen(port, (err) => {
	if (err) {
		return logger.error('server failed to start', err);
	}
	const a = 3;
	return logger.info(`server started [env, port] = [${env}, ${port}]`);
});

/**
 * Exports express
 * @public
 */
module.exports = app;
