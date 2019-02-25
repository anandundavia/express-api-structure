module.exports = {
	apps: [
		{
			max_restarts: 20,
			exec_mode: 'cluster',
			max_memory_restart: '200M',
		},
	],
};
