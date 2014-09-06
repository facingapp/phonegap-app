/**
 *
 * @returns {boolean}
 */
app.events.deviceReady = function()
{
    app.stats.event('App', 'Event', 'Device Ready');

	setTimeout(function(){

		if(typeof navigator.splashscreen !== 'undefined')
		{
			navigator.splashscreen.hide();
		}

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

		app.testflight.init(config.test_flight.app_token);

	}, 1000);
};
