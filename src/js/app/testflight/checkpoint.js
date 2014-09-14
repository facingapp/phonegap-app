app.testflight.checkpoint = {
	set: function(name)
	{
		if(app.testflight.supported)
		{
			app.testflight.plugin.passCheckpoint(
				app.testflight.checkpoint.success,
				app.testflight.checkpoint.fail,
				name
			);
		}
	},
	success: function()
	{
		app.util.debug('log', 'TestFlight Take Off Success');
	},
	fail: function()
	{
		app.util.debug('error', 'TestFlight Take Off Failed');
	}
};