class ResponseService {
    static unAuthorized() {
        return { message: 'UNAUTHORIZED' };
    }
    static greetUser(payload) {
        return { message: 'GREET_USER', user: payload };
    }
}

module.exports = ResponseService;
