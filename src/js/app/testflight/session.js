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
		app.util.debug('log', 'TestFlight Session Success');
	},
	fail: function()
	{
		app.util.debug('error', 'TestFlight Session Error');
	}
};