/**
 *
 * @returns {boolean}
 */
app.events.deviceReady = function()
{
    app.stats.event('App', 'Event', 'Device Ready');

	if(app.initialized === true)
	{
		return false;
	}

    app.initialized = true;

    if(app.uuid === null && typeof device !== 'undefined')
    {
        app.uuid = device.uuid;
    }
	else if(app.uuid === null)
    {
	    app.uuid = app.util.generateGUID();
    }

	app.io.name = app.uuid;
	app.io.mode = 'guest';

    gui.initialize();
};
