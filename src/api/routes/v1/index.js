const express = require('express');

// import all the routes here
const userRoutes = require('./user.route');
const dumpRoutes = require('./dump.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/user', userRoutes);
router.use('/dump', dumpRoutes);

module.exports = router;
