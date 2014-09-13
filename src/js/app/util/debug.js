app.util.debug = function(level, message)
{
	if(app.util.enableDebug)
	{
		var Debug = Error;

		Debug.prototype.warn = function()
		{
			var args = Array.prototype.slice.call(arguments, 0), suffix = this.lineNumber ? 'line: ' + this.lineNumber : "\n" + this.stack;
			console.warn.apply(console, args.concat([suffix]));
		};

		Debug.prototype.error = function()
		{
			var args = Array.prototype.slice.call(arguments, 0), suffix = this.lineNumber ? 'line: ' + this.lineNumber : "\n" + this.stack;
			console.error.apply(console, args.concat([suffix]));
		};

		switch(level)
		{
			case 'log':
				console.log(message);
				break;

			case 'debug':
				console.debug(message);
				break;

			case 'warn':
				Debug().warn(message);
				break;

			case 'error':
				Debug().error(message);
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
