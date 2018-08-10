const express = require('express');
const { routes } = require('manage-users');

const controller = require('../../controllers/user.controller');
const authenticated = require('../../middlewares/authenticated');

const router = express.Router();

router.route('/signup').post(routes.signup(), controller.signup);
router.route('/login').post(routes.login(), controller.login);
router.route('/logout').all(controller.logout);
router.route('/changePassword').post(routes.changePassword(), controller.changePassword);

router.route('/me').all(authenticated, controller.me);

module.exports = router;
