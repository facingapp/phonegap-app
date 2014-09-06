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
		console.log('TestFlight Logged Remote Message');
	},
	fail: function()
	{
		console.error('TestFlight Failed to Log Remote Message');
	}
};