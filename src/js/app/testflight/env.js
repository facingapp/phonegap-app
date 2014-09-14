app.testflight.env = {
	add: function(key, value)
	{
		if(app.testflight.supported)
		{
			app.testflight.plugin.addCustomEnvironmentInformation(
				app.testflight.env.success,
				app.testflight.env.fail,
				key,
				value
			);
		}
	},
	success: function()
	{
		app.util.debug('log', 'TestFlight Environment Variable Set');
	},
	fail: function()
	{
		app.util.debug('error', 'TestFlight Failed to Set Environment Variable');
	}
};