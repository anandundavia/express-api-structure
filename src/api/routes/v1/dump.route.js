const express = require('express');

const controller = require('../../controllers/dump.controller');
const authenticated = require('../../middlewares/authenticated');

const router = express.Router();

router.route('/sync').all(authenticated, controller.allowed, controller.sync);

module.exports = router;
