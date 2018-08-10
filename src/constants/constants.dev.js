module.exports = {
    logs: 'dev',
    corsOptions: {
        origin: (origin, callback) => {
            const whiteList = ['localhost', '0.0.0.0', '127.0.0.1', 'chrome-extension'];
            const index = whiteList.findIndex((anIP) => origin.includes(anIP));
            if (!origin || index !== -1) {
                callback(null, true);
            } else {
                callback(new Error(`ORIGIN: '${origin}' Not allowed by CORS`));
            }
        },
        credentials: true,
    },
};
