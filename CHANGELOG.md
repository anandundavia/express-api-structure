# Changelog

All notable changes to the API Structure will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - January 2019

### Added

-   `/bin` directory. It has two useful binaries.
    1.  `stress-test` -> Used to test the API under load of multiple concurrent requests
    2.  `update-ecosystem` -> A binary which reads the `.env` file and generates `ecosyste.config.json` which is used by PM2
-   `/deployment` directory. It will contain the information related to deployment of the API
    1.  `api.conf` -> A sample nginx configuration file which should directly be included in main `nginx.conf`
    2.  `Dockerfile` -> A file that will build the Docker image of the API
    3.  `ecosystem.default.js` -> Defaults file for PM2 configuration. The configurations from this file will have the higher precedence. Thus, it is the ideal place to define environment variable
-   `/internals` directory

    1.  `.prettierrc` -> A prettier config file which makes sure that the checked code on repository remains consistence regardless of local `.prettierrc`

-   `/logs` directory for date wise logs of client and server

-   `/pkg` directory which contains the tarball of the project. You can directly share it and run `npm install <tarball-name>.tgz`

-   `/config/client-logs.config.js`. An Express Middleware configuration file which receives logs from client

-   `/utils/client-logger.js` A logger file to process incoming logs from client

-   `/config/cors.config.js`. Configuration file for express middleware CORS

### Changed

-   File name changes

    1.  `express.js` to `express.config.js`
    2.  `session.js` to `session.config.js`

-   `/utils/logger.js` The winston version has been updated. A winston module is used to keep the logs for each day

-   `/middleware/error.js` The error now reports IP from where the request is received, timestamp as well as the path

-   `/constants` The trick to avail autocomplete removed. A clean solution is introduced. The merging of constants throws error if no environment is found
