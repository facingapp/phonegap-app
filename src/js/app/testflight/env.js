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
		console.log('TestFlight Environment Variable Set');
	},
	fail: function()
	{
		console.error('TestFlight Failed to Set Environment Variable');
	}
};