app.hardware.compass = {

	obj: null,
	settings: {
		frequency: 100
	},
	start: function()
	{
		if(typeof navigator.compass === 'undefined')
		{
			app.util.debug('warn', 'No Compass Found');
			app.stats.event('Hardware', 'Missing', 'No Compass Found');
			return false;
		}

		try
		{
			app.hardware.compass.obj = navigator.compass.watchHeading(
				app.hardware.compass.success,
				app.hardware.compass.error,
				app.hardware.compass.settings
			);

			app.stats.event('Hardware', 'Watching', 'Compass');
		}
		catch(err)
		{
			app.util.debug('error', err.message);
			app.stats.event('Hardware', 'Error', ' Failed to Watch Compass');
		}
	},
	stop: function()
	{
		try
		{
			navigator.compass.clearWatch(app.hardware.compass.obj);
			app.hardware.compass.obj = null;

			app.stats.event('Hardware', 'Stop Watching', 'Compass');
		}
		catch(err)
		{
			app.util.debug('error', err.message);
		}
	},
	success: function(heading)
	{
		app.user_data.compass = {
			direction: app.hardware.compass.direction(heading.magneticHeading),
			magnetic_heading: heading.magneticHeading
		};
	},
	error: function(error)
	{
		if(error.message)
		{
			app.util.debug('error', 'Compass Error: ' + error.message);
			app.stats.event('Hardware', 'Error', 'Compass Error: ' + error.message);
		}
	},
	direction: function(headingDegrees)
	{
		if(headingDegrees < 0 || headingDegrees > 360 || isNaN(headingDegrees))
		{
			return "--";
		}
		else if(headingDegrees >= 0 && headingDegrees <= 11.25)
		{
			return "N";
		}
		else if(headingDegrees > 348.75 && headingDegrees <= 360)
		{
			return "N";
		}
		else if(headingDegrees > 11.25 && headingDegrees <= 33.75)
		{
			return "NNE";
		}
		else if(headingDegrees > 33.75 && headingDegrees <= 56.25)
		{
			return "NE";
		}
		else if(headingDegrees > 56.25 && headingDegrees <= 78.75)
		{
			return "ENE";
		}
		else if(headingDegrees > 78.75 && headingDegrees <= 101.25)
		{
			return "E";
		}
		else if(headingDegrees > 101.25 && headingDegrees <= 123.75)
		{
			return "ESE";
		}
		else if(headingDegrees > 123.75 && headingDegrees <= 146.25)
		{
			return "SE";
		}
		else if(headingDegrees > 146.25 && headingDegrees <= 168.75)
		{
			return "SSE";
		}
		else if(headingDegrees > 168.75 && headingDegrees <= 191.25)
		{
			return "S";
		}
		else if(headingDegrees > 191.25 && headingDegrees <= 213.75)
		{
			return "SSW";
		}
		else if(headingDegrees > 213.75 && headingDegrees <= 236.25)
		{
			return "SW";
		}
		else if(headingDegrees > 236.25 && headingDegrees <= 258.75)
		{
			return "WSW";
		}
		else if(headingDegrees > 258.75 && headingDegrees <= 281.25)
		{
			return "W";
		}
		else if(headingDegrees > 281.25 && headingDegrees <= 303.75)
		{
			return "WNW";
		}
		else if(headingDegrees > 303.75 && headingDegrees <= 326.25)
		{
			return "NW";
		}
		else if(headingDegrees > 326.25 && headingDegrees <= 348.75)
		{
			return "NNW";
		}
	}
};
