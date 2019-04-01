const userCollection = require('./collection/user.collection');

// Holds the current connection to repository
let db = null;

/**
 * Opens the connection to database and saves the connection in 'db' variable.
 * @returns {Promise} A promise that will be resolved to the database connection if successful
 */
const connect = () =>
	new Promise((resolve, reject) => {
		// logic to open a connection to database
		// once the connection is open, save the instance in db variable here
	});

// Asynchronously open the connection
(async () => {
	await connect();
	userCollection.setDatabase(db);
})();

module.exports = {
	...userCollection.queries,
};
