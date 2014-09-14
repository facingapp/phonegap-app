app.calc.geo = {
	host: {
		bearing: null,
		formatted_bearing: null,
		final_bearing: null,
		formatted_final_bearing: null
	},
	guest: {
		bearing: null,
		formatted_bearing: null,
		final_bearing: null,
		formatted_final_bearing: null
	},
	data: {
		distance: {
			length: null,
			formatted: null
		},
		midpoint: {
			point: null,
			formatted: null
		},
	    formatted: null
	},
	getDistance: function()
	{
		if(app.io.location.guest === null || app.io.location.host === null)
		{
			return false;
		}

		var degree_format = 'd';
		var precision = 16;

		var guest_latitude = Geo.parseDMS(app.io.location.guest.geolocation.latitude);
		var guest_longitude = Geo.parseDMS(app.io.location.guest.geolocation.longitude);
		var guest_point = LatLon(guest_latitude, guest_longitude);

		var host_latitude = Geo.parseDMS(app.io.location.host.geolocation.latitude);
		var host_longitude = Geo.parseDMS(app.io.location.host.geolocation.longitude);
		var host_point = LatLon(host_latitude, host_longitude);

		var guest_bearing = guest_point.bearingTo(host_point);
		var guest_bearing_final = guest_point.finalBearingTo(host_point);

		var host_bearing = host_point.bearingTo(guest_point);
		var host_bearing_final = host_point.finalBearingTo(guest_point);

		var distance = host_point.distanceTo(guest_point, precision);
		var midpoint = host_point.midpointTo(guest_point);

		app.calc.geo.data = {
			distance: {
				length: distance,
				formatted: distance.toPrecisionDecimal(precision)
			},
			midpoint: {
				point: midpoint,
				formatted: midpoint.toString(degree_format)
			}
		};

		app.calc.geo.host = {
			bearing: host_bearing,
			formatted_bearing: Geo.toBrng(host_bearing, degree_format),
			final_bearing: host_bearing_final,
			formatted_final_bearing: Geo.toBrng(host_bearing_final, degree_format)
		};

		app.calc.geo.guest = {
			bearing: guest_bearing,
			formatted_bearing: Geo.toBrng(guest_bearing, degree_format),
			final_bearing: guest_bearing_final,
			formatted_final_bearing: Geo.toBrng(guest_bearing_final, degree_format)
		};
	},
	getOffset: function(correction, current)
	{
		var redirect = ((( 360 - current ) + correction) + 180) % 360;

		return {
			degrees: redirect,
			direction: app.calc.geo.whichWay(redirect)
		};
	},
	whichWay: function(headingDegrees)
	{
		if (headingDegrees < 0 || headingDegrees > 360 || isNaN(headingDegrees) )
		{
			return "";
		}
		else if (headingDegrees >= 0 && headingDegrees <= 11.25)
		{
			return app.locale.dict('direction', 'behind_you');
		}
		else if (headingDegrees > 348.75 && headingDegrees <= 360)
		{
			return app.locale.dict('direction', 'behind_you');
		}
		else if (headingDegrees > 11.25 && headingDegrees <= 33.75)
		{
			return app.locale.dict('direction', 'behind_you_left');
		}
		else if (headingDegrees > 33.75 && headingDegrees <= 56.25)
		{
			return app.locale.dict('direction', 'behind_you_left');
		}
		else if (headingDegrees > 56.25 && headingDegrees <= 78.75)
		{
			return app.locale.dict('direction', 'behind_you_left');
		}
		else if (headingDegrees > 78.75 && headingDegrees <= 101.25)
		{
			return app.locale.dict('direction', 'hard_left');
		}
		else if (headingDegrees > 101.25 && headingDegrees <= 123.75)
		{
			return app.locale.dict('direction', 'left');
		}
		else if (headingDegrees > 123.75 && headingDegrees <= 146.25)
		{
			return app.locale.dict('direction', 'slight_left');
		}
		else if (headingDegrees > 146.25 && headingDegrees <= 168.75)
		{
			return app.locale.dict('direction', 'straight_left');
		}
		else if (headingDegrees > 168.75 && headingDegrees <= 191.25)
		{
			return app.locale.dict('direction', 'straight');
		}
		else if (headingDegrees > 191.25 && headingDegrees <= 213.75)
		{
			return app.locale.dict('direction', 'straight_right');
		}
		else if (headingDegrees > 213.75 && headingDegrees <= 236.25)
		{
			return app.locale.dict('direction', 'slight_right');
		}
		else if (headingDegrees > 236.25 && headingDegrees <= 258.75)
		{
			return app.locale.dict('direction', 'right');
		}
		else if (headingDegrees > 258.75 && headingDegrees <= 281.25)
		{
			return app.locale.dict('direction', 'hard_right');
		}
		else if (headingDegrees > 281.25 && headingDegrees <= 303.75)
		{
			return app.locale.dict('direction', 'behind_you_right');
		}
		else if (headingDegrees > 303.75 && headingDegrees <= 326.25)
		{
			return app.locale.dict('direction', 'behind_you_right');
		}
		else if (headingDegrees > 326.25 && headingDegrees <= 348.75)
		{
			return app.locale.dict('direction', 'behind_you_right');
		}
	}
};