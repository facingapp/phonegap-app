app.hardware.geolocation = {

	obj: null,
	settings: {
		maximumAge: 100,
		timeout: 90,
		enableHighAccuracy: false
	},
	failed_updates: 0,
	failed_permission: 0,
	max_fail: 50,
	start: function()
	{
		if(typeof navigator.geolocation === 'undefined')
		{
			app.util.debug('warn', 'No GPS Found');
			app.stats.event('Hardware', 'Missing', 'No GPS Found');
			return false;
		}

		app.stats.event('Hardware', 'Watching', 'GPS');

		try
		{
			app.hardware.geolocation.obj = navigator.geolocation.watchPosition(
				app.hardware.geolocation.success,
				app.hardware.geolocation.error,
				app.hardware.geolocation.settings
			);
		}
		catch(err)
		{
			app.util.debug('error', err.message);
			app.stats.event('Hardware', 'Error', 'Failed to Watch GPS');
		}
	},
	stop: function()
	{
		try
		{
			navigator.geolocation.clearWatch(app.hardware.geolocation.obj);
			app.hardware.geolocation.obj = null;

			app.stats.event('Hardware', 'Stop Watching', 'GPS');
		}
		catch(err)
		{
			app.util.debug('error', err.message);
		}
	},
	success: function(position)
	{
		app.util.debug('log', 'Updating Position');

		app.user_data.geolocation = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			altitude: app.hardware.geolocation.distance(position.coords.altitude),
			accuracy: position.coords.accuracy,
			accuracy_formatted: app.hardware.geolocation.distance(position.coords.accuracy),
			heading: app.hardware.compass.direction(position.coords.heading),
			speed: app.hardware.geolocation.speed(position.coords.speed)
		};

		app.hardware.geolocation.failed_updates = 0;
	},
	error: function(error)
	{
		// Returned when users do not allow the app to retrieve position information.
		if(error.PERMISSION_DENIED)
		{
			app.util.debug('error', 'Geolocation Error: Permission Denied');
			app.stats.event('Hardware', 'Error', 'Geolocation Error: Permission Denied');

			app.hardware.geolocation.failed_permission++;

			if(app.hardware.geolocation.failed_permission > 3)
			{
				// Stop Hardware Listening since we can't use it
				app.hardware.stop();

				// Notify User of issue
				app.notification.alert(
					app.locale.dict('notification', 'permission_denied_message'),
					function(){
						gui.reset();
					},
					app.locale.dict('notification', 'permission_denied_title'),
					app.locale.dict('button', 'ok')
				);
			}
		}
		// Returned when the device is unable to retrieve a position.
		// In general, this means the device is not connected to a network or can't get a satellite fix.
		else if(error.POSITION_UNAVAILABLE)
		{
			app.util.debug('error', 'Geolocation Error: Position Unavailable');
			app.stats.event('Hardware', 'Error', 'Geolocation Error: Position Unavailable');

			// Stop Hardware Listening since we can't use it
			app.hardware.stop();

			// Notify User of issue
			app.notification.alert(
				app.locale.dict('notification', 'bad_signal_message'),
				function(){
					gui.reset();
				},
				app.locale.dict('notification', 'bad_signal_title'),
				app.locale.dict('button', 'ok')
			);
		}
		// Returned when the device is unable to retrieve a position within the time specified
		else if(error.TIMEOUT)
		{
			app.util.debug('warn', 'Geolocation Warning: ' + error.message);
			app.stats.event('Hardware', 'Warning', 'Geolocation Warning: ' + error.message);
		}
		// Some other Error has occurred
		else
		{
			app.util.debug('error', 'Geolocation Error: ' + error.message);
			app.stats.event('Hardware', 'Error', 'Geolocation Error: ' + error.message);
		}

		app.hardware.geolocation.failed_updates++;

		if(app.hardware.geolocation.failed_updates >= app.hardware.geolocation.max_fail)
		{
			app.hardware.geolocation.failed_updates = 0;

			// Stop Hardware Listening since we can't use it
			app.hardware.stop();

			// Notify User of issue
			app.notification.alert(
				app.locale.dict('notification', 'bad_signal_message'),
				function(){
					gui.reset();
				},
				app.locale.dict('notification', 'bad_signal_title'),
				app.locale.dict('button', 'ok')
			);
		}
	},
	distance: function(value, use_metric)
	{
		var measure = (use_metric) ?
			+(Math.round(value + "e+2") + "e-2") :
			Math.round(value * 3);

		var unit = (use_metric) ? app.locale.dict('unit', 'meters') : app.locale.dict('unit', 'feet');

		if(measure < 0)
		{
			measure = 0;
		}

		return measure + ' ' + unit;
	},
	speed: function(value, use_metric)
	{
		var measure = (use_metric) ?
			Math.round(value) :
			Math.round(value * 2.23694);
		var unit = (use_metric) ? 'mps' : 'MPH';

		if(measure < 0)
		{
			measure = 0;
		}

		return measure + ' ' + unit;
	}
};
