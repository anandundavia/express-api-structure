const winston = require('winston');

module.exports = new winston.Logger({
    transports: [
        new winston.transports.Console({
            timestamp: true,
            colorize: true,
            prettyPrint: true,
            label: 'api-structure',
        }),
    ],
});
