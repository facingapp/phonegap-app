app.testflight.session = {
	start: function()
	{
		if(app.testflight.supported)
		{
			app.testflight.plugin.manuallyStartSession(
				app.testflight.session.success,
				app.testflight.session.fail
			);
		}
	},
	stop: function()
	{
		if(app.testflight.supported)
		{
			app.testflight.plugin.manuallyEndSession(
				app.testflight.session.success,
				app.testflight.session.fail
			);
		}
	},
	success: function()
	{
		console.log('TestFlight Session Success');
	},
	fail: function()
	{
		console.error('TestFlight Session Error');
	}
};