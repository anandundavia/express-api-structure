const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const options = {
	level: 'debug',
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf((info) => `${info.timestamp} ${info.message}`)
	),
	transports: [
		new transports.DailyRotateFile({
			filename: 'logs/client/%DATE%/combined.log',
			datePattern: 'DD-MMM-YYYY',
			level: 'debug',
			format: format.combine(format.uncolorize()),
		}),
	],
};

function process(req) {
	const { body, ip, headers } = req;
	if (body.message) {
		const level = body.level || 'debug';
		const ua = `[${headers['user-agent']}]` || '';
		const message = `[${ip}] ${ua} [${body.timestamp}] [${body.label}]: ${body.message}`;
		this[level](message);
	}
}

const logger = () => {
	const loggerToReturn = createLogger(options);
	loggerToReturn.process = process;
	return loggerToReturn;
};

module.exports = logger;
