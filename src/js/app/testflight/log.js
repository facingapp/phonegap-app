app.testflight.log = {
	remote: function(message, async)
	{
		if(app.testflight.supported)
		{
			if(async)
			{
				app.testflight.plugin.remoteLogAsync(
					app.testflight.log.success,
					app.testflight.log.fail,
					message
				);
			}
			else
			{
				app.testflight.plugin.remoteLog(
					app.testflight.log.success,
					app.testflight.log.fail,
					message
				);
			}
		}
	},
	success: function()
	{
		app.util.debug('log', 'TestFlight Logged Remote Message');
	},
	fail: function()
	{
		app.util.debug('error', 'TestFlight Failed to Log Remote Message');
	}
};