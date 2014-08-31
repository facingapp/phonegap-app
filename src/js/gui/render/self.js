gui.render.self = {

	// Establish Field of View Degrees from Center ( http://en.wikipedia.org/wiki/Visual_field )
	visualField: {
		left : 100,
		right: 100,
		up   : 60,
		down : 75
	},
	draw: function()
	{
		app.calc.geo.getDistance();

		// self
		var geo = (app.io.mode === 'guest') ?
			app.calc.geo.guest :
			app.calc.geo.host;

		if(geo.bearing === null || app.user_data.compass.magnetic_heading === null)
		{
			return false;
		}

		var correction = app.calc.geo.getOffset(geo.bearing, app.user_data.compass.magnetic_heading);

		// degrees

		var pointer = $('.self-marker');
		var pointer_width = 24;
		var pointer_height = 24;

		var center_x = ( gui.screen.width / 2 );
		var center_y = ( gui.screen.height / 2 );

		var left = 0;
		var top = center_y - ( pointer_height / 2 );

		// User is facing to far left, and needs to turn right
		if(correction.degrees < 0)
		{
			left = center_x - ( Math.abs(correction.degrees) * (center_x/gui.render.self.visualField.right) );
		}
		// User is facing to far right, and needs to turn left
		else if(correction.degrees > 0)
		{
			left = center_x + ( Math.abs(correction.degrees) * (center_x/gui.render.self.visualField.left) );
		}

		// use to animate left and right edge smooshiness
		var max_offscreen = ( 180 * (center_x/gui.render.self.visualField.right)) - center_x;
		var current_offscreen_left = (left < 0) ? Math.abs(left) : 0;
		var current_offscreen_right = (left > gui.screen.width) ? (left - gui.screen.width) : 0;
		var max_squish = 14;


		var width = pointer_width - (max_squish * (max_squish / (max_squish * (max_offscreen/(current_offscreen_left+current_offscreen_right)))));

		// If

		if(left < 0)
		{
			left = 0;
		}
		if(left > ( gui.screen.width - pointer_width ))
		{
			left = ( gui.screen.width - pointer_width );
		}

		pointer.css({
			left  : left + (pointer_width - width),
			top   : top,
			width : width,
			height: pointer_height
		});
	},
	debug: function(user, data)
	{
		if(typeof data.acceleration !== 'undefined')
		{
			var acceleration = '' +
				'<li><strong>X</strong>:&nbsp; ' + data.acceleration.x + '</li>' +
				'<li><strong>Y</strong>:&nbsp; ' + data.acceleration.y + '</li>' +
				'<li><strong>Z</strong>:&nbsp; ' + data.acceleration.z + '</li>';

			$('.me .acceleration ul').html(acceleration);
		}

		if(typeof data.geolocation !== 'undefined')
		{
			var geolocation = '' +
				'<li><strong>Latitude</strong>:&nbsp; ' + data.geolocation.latitude + ' &deg;</li>' +
				'<li><strong>Longitude</strong>:&nbsp; ' + data.geolocation.longitude + ' &deg;</li>' +
				'<li><strong>Altitude</strong>:&nbsp; ' + data.geolocation.altitude + '</li>' +
				'<li><strong>Accuracy</strong>:&nbsp; ' + data.geolocation.accuracy + '</li>' +
				'<li><strong>Heading</strong>:&nbsp; ' + data.geolocation.heading + '</li>' +
				'<li><strong>Speed</strong>:&nbsp; ' + data.geolocation.speed + '</li>';

			$('.me .geolocation ul').html(geolocation);
		}

		if(typeof data.compass !== 'undefined')
		{
			var compass = '' +
				'<li><strong>Direction</strong>:&nbsp; ' + data.compass.direction + '</li>' +
				'<li><strong>Magnetic Heading</strong>:&nbsp; ' + data.compass.magnetic_heading + ' &deg;</li>';

			$('.me .compass ul').html(compass);
		}
	}
};
