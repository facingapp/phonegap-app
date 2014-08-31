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
	    app.uuid = app.util.generateGUID(); // Fake UUID
    }

	app.io.name = app.uuid;
	app.io.mode = 'guest';

	if(typeof navigator.splashscreen !== 'undefined')
	{
		setTimeout(function(){
			navigator.splashscreen.hide();
		}, 2000);
	}

    gui.initialize();

	if(app.launch_invite_code !== null)
	{
		setTimeout(function(){
			app.io.joinSpace(app.launch_invite_code, 'guest');
			app.launch_invite_code = null;
		}, 1000);
	}
};
