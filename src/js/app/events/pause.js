/**
 * Fires when an application is put into the background
 */
app.events.pause = function()
{
    app.stats.event('App', 'Event', 'Application Paused');

	// @TODO: Make sure socket reconnects since failed heartbeat will likely cause a timeout
};
