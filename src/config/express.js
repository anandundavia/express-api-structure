const express = require('express');
const compress = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
// const expressSession = require('express-session');
const cors = require('cors');
const tmp = require('tmp');
const { config } = require('manage-users');

const { logs, corsOptions } = require('../constants');
const session = require('./session');
/* eslint-disable-next-line no-unused-vars */
const updatedConfig = require('./users')(config);
const routes = require('../api/routes/v1');
const error = require('../api/middlewares/error');

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// This middleware take care of the origin when the origin is undefined.
// origin is undefined when request is local
app.use((req, res, next) => {
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
});
app.use(cors(corsOptions));

app.use(session());

// initialize manage-users config
app.use(config.passport.initialize());
app.use(config.passport.session());

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// temporary files created using tmp will be deleted on UncaughtException
tmp.setGracefulCleanup();

module.exports = app;
