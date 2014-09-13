app.initialize = function()
{
	this.bindEvents();

	if(app.socket === null && typeof io !== 'undefined')
	{
		var io_url = (config.app.env === 'dev') ?
			config.app.dev.socket.io :
			config.app.prod.socket.io;

		try
		{
			app.socket = io.connect(io_url);
			app.io.init();

			app.util.debug('debug', 'Connecting to Socket on ' + io_url);
		}
		catch(err)
		{
			app.util.debug('debug', 'Failed to Connect to Socket on ' + io_url);
		}
	}

	app.locale.init();
	app.stats.init();
	app.store.init();
};
