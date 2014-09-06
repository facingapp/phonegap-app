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

		var guest_bearing = host_point.bearingTo(guest_point);
		var guest_bearing_final = host_point.finalBearingTo(guest_point);

		var host_bearing = guest_point.bearingTo(host_point);
		var host_bearing_final = guest_point.finalBearingTo(host_point);

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
		var redirect = (( 360 - current ) + correction) % 360;

		if(redirect >= 180)
		{
			redirect -= 360;
		}

		return {
			degrees: redirect,
			direction: (redirect > 0) ? 'right' : 'left'
		};
	}
};