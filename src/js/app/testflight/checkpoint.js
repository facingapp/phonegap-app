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
		console.log('TestFlight Take Off Success');
	},
	fail: function()
	{
		console.error('TestFlight Take Off Failed');
	}
};