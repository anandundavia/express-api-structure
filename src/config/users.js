const { database } = require('../constants');

module.exports = (config) => {
    config
        .userSchemaBuilder()
        .isUniqueKeyEmail(true)
        .setUniqueKeyName('email')
        .build();
    config
        .repositorySchemaBuilder()
        .setRepository('mongo')
        .setUri(database.uri)
        .setDatabaseName(database.database)
        .setCollectionName(database.collections.user)
        .build();

    return config;
};
