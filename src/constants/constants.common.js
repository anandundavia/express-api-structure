/**
 * This trick will get the intellisense to pick up
 * the dynamically defined constants.
 * We do not require any value here, just the shape of the object.
 * Do not worry about the values as they will be overridden by the
 * constant.[env].js variables
 */
const shape = {
    logs: undefined,
    corsOptions: {
        origin: undefined,
        credentials: undefined,
    },
};

/**
 * Common constants across all the environments (dev, staging, prod)
 */
module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,

    database: {
        uri: process.env.DB_URI,
        database: process.env.DB_DB_NAME,
        collections: {
            user: process.env.DB_USER_COLLECTION,
        },
    },

    dump: {
        secret: process.env.DUMP_SECRET,
    },

    ...shape,
};
