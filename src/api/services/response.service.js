class ResponseService {
    static unAuthorized() {
        return { message: 'UNAUTHORIZED' };
    }
    static userCreated(payload) {
        return { message: 'USER_CREATED', user: payload };
    }
    static userLoggedOut() {
        return { message: 'LOGGED_OUT' };
    }
    static userPasswordChanged() {
        return { message: 'PASSWORD_CHANGED. RE-LOGIN' };
    }
    static notEnoughPrivileges() {
        return { message: 'NOT_ENOUGH_PRIVILEGES' };
    }
}

module.exports = ResponseService;
