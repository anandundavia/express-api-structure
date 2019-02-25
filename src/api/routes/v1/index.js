const express = require('express');

// import all the routes here
const userRoutes = require('./user.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
	});
});

router.use('/user', userRoutes);

module.exports = router;
