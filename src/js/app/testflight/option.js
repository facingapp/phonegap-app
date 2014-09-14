app.testflight.option = {
	set: function(options)
	{
		if(app.testflight.supported)
		{
			app.testflight.plugin.setOptions(
				app.testflight.option.success,
				app.testflight.option.fail,
				options
			);
		}
	},
	success: function()
	{
		app.util.debug('log', 'TestFlight Option Set');
	},
	fail: function()
	{
		app.util.debug('error', 'TestFlight Failed to Set Option');
	}
};