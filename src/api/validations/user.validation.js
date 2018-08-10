const Joi = require('joi');

module.exports = {
    // POST /v1/user/signup
    // Only name is required,
    // Email, password, confirm is taken care by manage-users
    signup: {
        body: Joi.object()
            .keys({
                name: Joi.string().required(),
            })
            .unknown(true),
    },
};
