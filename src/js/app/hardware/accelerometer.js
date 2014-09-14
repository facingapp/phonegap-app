app.hardware.accelerometer = {

	obj: null,
	settings: {
		frequency: 100
	},
	start: function()
	{
		if(typeof navigator.accelerometer === 'undefined')
		{
			app.util.debug('warn', 'No Accelerometer Found');
			app.stats.event('Hardware', 'Missing', 'No Accelerometer Found');
			return false;
		}

		try
		{
			app.hardware.accelerometer.obj = navigator.accelerometer.watchAcceleration(
				app.hardware.accelerometer.success,
				app.hardware.accelerometer.error,
				app.hardware.accelerometer.settings
			);

			app.stats.event('Hardware', 'Watching', 'Accelerometer');
		}
		catch(err)
		{
			app.util.debug('error', err.message);
			app.stats.event('Hardware', 'Error', 'Failed to Watch Accelerometer');
		}
	},
	stop: function()
	{
		try
		{
			navigator.accelerometer.clearWatch(app.hardware.accelerometer.obj);
			app.hardware.accelerometer.obj = null;

			app.stats.event('Hardware', 'Stop Watching', 'Accelerometer');
		}
		catch(err)
		{
			app.util.debug('error', err.message);
		}
	},
	success: function(acceleration)
	{
		app.user_data.acceleration = {
			x: acceleration.x,
			y: acceleration.y,
			z: acceleration.z
		};
	},
	error: function()
	{
		app.util.debug('error', 'Failed to use Accelerometer');
		app.stats.event('Hardware', 'Error', 'Failed to use Accelerometer');
	}
};
