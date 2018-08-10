const path = require('path');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const middleware = () =>
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            // 30 days in milliseconds
            maxAge: 30 * 24 * 60 * 1000,
        },
        name: 'insite.gls',
        // To enable user sessions across server restarts.
        store: new FileStore({
            path: path.join(__dirname, '../../sessions'),
            secret: process.env.SESSION_SECRET,
            retries: 1,
            fileExtension: '',
        }),
    });

module.exports = middleware;
