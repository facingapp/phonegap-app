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
		console.log('TestFlight Option Set');
	},
	fail: function()
	{
		console.error('TestFlight Failed to Set Option');
	}
};