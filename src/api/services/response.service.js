class ResponseService {
	static notAuthenticated() {
		return { message: 'NOT_AUTHENTICATED' };
	}

	static greetUser(payload) {
		return { message: 'GREET_USER', user: payload };
	}
}

module.exports = ResponseService;
