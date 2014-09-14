app.util.debug = function(level, message)
{
	if(app.util.enableDebug)
	{
		switch(level)
		{
			case 'log':
				console.log(message);
				break;

			case 'info':
				console.info(message);
				break;

			case 'debug':
				console.debug(message);
				break;

			case 'warn':
				console.warn(message);
				break;

			case 'error':
				console.error(message);
				break;
		}
	}

	if(typeof message !== 'string')
	{
		message = JSON.stringify(message);
	}

	if(gui && gui.render && gui.render.debug)
	{
		gui.render.debug(level, message);
	}

	app.testflight.log.remote(message, true);
};
