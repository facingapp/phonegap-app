/**
 * Fires when an application is retrieved from the background.
 */
app.events.resume = function()
{
    app.stats.event('App', 'Event', 'Application Resumed');

	// @TODO: Make sure socket reconnects since failed heartbeat will likely cause a timeout
};
