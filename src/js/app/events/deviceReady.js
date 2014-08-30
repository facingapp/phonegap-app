app.events.deviceReady = function()
{
    app.stats.event('App', 'Event', 'Device Ready');

    app.initialized = true;

    if(app.uuid === null && typeof device !== 'undefined')
    {
        app.uuid = device.uuid;
    }
	else if(app.uuid === null)
    {
	    app.uuid = app.util.generateGUID(); // Fake UUID
    }

	if(typeof navigator.splashscreen !== 'undefined')
	{
		setTimeout(function(){
			navigator.splashscreen.hide();
		}, 2000);
	}

    gui.initialize();
};
