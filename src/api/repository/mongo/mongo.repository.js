const { MongoClient } = require('mongodb');

const userCollection = require('./collection/user.collection');

const logger = require('../../utils/logger');
const { database } = require('../../../constants');

// Holds the current connection to repository
let db = null;

// Whether any connection opening process in ongoing
// Helps keep track of opening only single connection to database
let connectionIsProgress = false;
let connectionPromise = null;

/**
 * Opens the connection to database and saves the connection in 'db' variable.
 * @returns {Promise} A promise that will be resolved to the database connection if successful
 */
const connect = () =>
    new Promise((resolve, reject) => {
        // Check if another promise is pending.
        if (connectionIsProgress) {
            // Yes there is, just return the previous promise
            logger.info('other attempt to open a connection is ongoing');
            return connectionPromise;
        }
        // No there is no promise pending. Let us create a new one
        connectionIsProgress = true; // setting the flag
        connectionPromise = new Promise(() => {
            MongoClient.connect(
                database.uri,
                (err, client) => {
                    if (err) {
                        connectionIsProgress = false; // unsetting the flag
                        return reject(err);
                    }
                    logger.info('successfully opened a connection to mongo repository');
                    db = client.db(database.database);
                    connectionIsProgress = false; // unsetting the flag
                    return resolve(db);
                }
            );
        });
        return connectionPromise;
    });

// Asynchronously open the connection
(async () => {
    await connect();
    userCollection.setDatabase(db);
})();

module.exports = {
    ...userCollection.queries,
};
