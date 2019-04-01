const router = require('express').Router();

const logger = require('../api/utils/logger')(__filename);
const clientLogger = require('../api/utils/client-logger')();

router.use((req, res) => {
	try {
		clientLogger.process(req);
	} catch (e) {
		logger.error('Error while processing the client logs', e);
	}
	// always send 200 OK to the client
	res.json({ message: 'OK' });
});

module.exports = router;
