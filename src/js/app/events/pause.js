/**
 * Fires when an application is put into the background
 */
app.events.pause = function()
{
	app.stats.event('App', 'Event', 'Application Paused');

	// Reconnect to Room
	if(app.sharing_data && app.io.space && app.io.mode)
	{
		// Startup Hardware
		app.hardware.stop();
	}

	// @TODO: Make sure socket reconnects since failed heartbeat will likely cause a timeout
};
