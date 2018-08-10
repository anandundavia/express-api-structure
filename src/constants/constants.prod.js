module.exports = {
    logs: 'production',
    corsOptions: {
        origin: (origin, callback) => {
            const whiteList = ['localhost'];
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
