/**
 * Fires when an application is retrieved from the background.
 */
app.events.resume = function()
{
	app.stats.event('App', 'Event', 'Application Resumed');

	// Reconnect to Room
	if(app.sharing_data && app.io.space && app.io.mode)
	{
		// Startup Hardware
		app.hardware.start();
	}

	// @TODO: Make sure socket reconnects since failed heartbeat will likely cause a timeout
};
