gui.render.self = {

	// Establish Field of View Degrees from Center ( http://en.wikipedia.org/wiki/Visual_field )
	visualField: {
		left_right: 100,
		up: 60,
		down: 75
	},
	notice:
	{
		gps: null,
		distance: null,
		direction: null
	},
	draw: function()
	{
		// Fetch distance between two users
		app.calc.geo.getDistance();

		if(typeof app.user_data.correction === 'undefined')
		{
			app.user_data.correction = {};
		}

		// Fetch Geographic Data for this user
		app.user_data.correction.geo = (app.io.mode === 'guest') ?
			app.calc.geo.guest :
			app.calc.geo.host;

		// Do not continue if we do not have data we need
		if(typeof app.user_data.correction.geo.bearing === 'undefined' || typeof app.user_data.compass === 'undefined')
		{
			console.error('Missing Data');
			return false;
		}

		// We have all the data we need, time to calculate the offset
		app.user_data.correction = app.calc.geo.getOffset(app.user_data.correction.geo.bearing, app.user_data.compass.magnetic_heading);

		// Define which Marker to use
		var pointer = $('.self-marker');

		// Set the original width of our marker
		if(!pointer.data('original-width'))
		{
			pointer.data('original-width', pointer.width())
		}

		// Set dynamic pointer size ( different resolutions have different size markers )
		var pointer_size = pointer.data('original-width');

		// Setup Center Screen
		var center_x = ( gui.screen.width / 2 );
		var center_y = ( gui.screen.height / 2 );

		// Setup Common Variables
		var max_offscreen = ( 180 * ( center_x / gui.render.self.visualField.left_right ) ) - center_x;

		// Set the maximum we can shrink the pointer to 1/4 of its size
		var max_squish = ( pointer_size * 0.75 );

		var left = ((((( app.user_data.correction.degrees / 180 ) * center_x) / ( center_x / gui.render.self.visualField.left_right ) ) / gui.render.self.visualField.left_right ) * center_x) - ( pointer_size / 2 );

		// Calculate Markers Top Position
		var top = center_y - ( pointer_size / 2 );

		// Screen is tilted towards the sky, correction needed to look down
		if(app.user_data.acceleration.z >= 0)
		{
			// Marker should be above center
			top = ( center_y - ( ( ( app.user_data.acceleration.z / 10 ) * ( 90 / gui.render.self.visualField.down ) ) * center_y ) - ( pointer_size / 2 ) );
		}
		// Screen is tilted towards the ground, correction needed to look up
		else if(app.user_data.acceleration.z < 0)
		{
			// Marker should be below center
			top = ( center_y - ( ( ( app.user_data.acceleration.z / 10 ) * ( 90 / gui.render.self.visualField.up ) ) * center_y ) - ( pointer_size / 2 ) );
		}

		// Use to animate left and right edge smooshiness
		var current_offscreen_top = (top < 0) ? Math.abs(top) : 0;
		var current_offscreen_bottom = (top > gui.screen.height) ? (top - gui.screen.height) : 0;

		// Calculate Marker Width
		var height = pointer_size - ( max_squish * ( max_squish / ( max_squish * ( max_offscreen / ( current_offscreen_top + current_offscreen_bottom ) ) ) ) );

		// Reposition Marker if off screen
		if(top < 0)
		{
			top = 0;
		}
		if(top > ( gui.screen.height - pointer_size ))
		{
			top = ( gui.screen.height - pointer_size );
		}

		// Fix position of marker for when we know we need to add squish
		if(top > center_y)
		{
			top = top + ( pointer_size - height );
		}

		pointer.css({
			left: left,
			top: top,
			width: pointer_size,
			height: height,
			display: 'block'
		});

		var strength_class = 'one-bar';

		if(app.user_data.geolocation.accuracy > 300)
		{
			strength_class = 'one-bar';
		}
		if(app.user_data.geolocation.accuracy > 200)
		{
			strength_class = 'two-bars';
		}
		if(app.user_data.geolocation.accuracy > 100)
		{
			strength_class = 'three-bars';
		}
		if(app.user_data.geolocation.accuracy > 25)
		{
			strength_class = 'four-bars';
		}
		if(app.user_data.geolocation.accuracy > 0)
		{
			strength_class = 'five-bars';
		}

		var message = '';
		var date = new Date();
		var now = date.getTime();

		var max_signal_strength = 4;
		var max_distance = 4;
		var max_direction = 30;
		var reset = 30;

		if(gui.render.self.notice.gps === null)
		{
			gui.render.self.notice.gps = now;
		}

		if(gui.render.self.notice.distance === null)
		{
			gui.render.self.notice.distance = now;
		}

		if(gui.render.self.notice.direction === null)
		{
			gui.render.self.notice.direction = now;
		}

		var time_signal_strength = (now - gui.render.self.notice.gps) / 1000;
		var time_distance = ((now - gui.render.self.notice.distance) / 1000) - max_signal_strength;
		var time_direction = ((now - gui.render.self.notice.direction) / 1000) - max_distance;

		var show_signal_strength = (time_signal_strength <= max_signal_strength);
		var show_distance = ( !show_signal_strength && time_distance <= max_distance);
		var show_direction = ( !show_signal_strength && !show_distance && time_direction <= max_direction);

		if(time_direction >= reset)
		{
			gui.render.self.notice.gps = null;
			gui.render.self.notice.distance = null;
			gui.render.self.notice.direction = null;
		}

		if(show_signal_strength)
		{
			message = '<div class="signal-strength"><i class="fa fa-signal over '+ strength_class +'"></i><i class="fa fa-signal under"></i></div>&nbsp; GPS Accuracy <span id="gps-accuracy">'+ app.user_data.geolocation.accuracy_formatted +'</span>';
		}

		if(show_distance)
		{
			message = 'Your Friend is <span id="distance-away">'+ app.hardware.geolocation.distance(app.calc.geo.data.distance.length) +' Away</span>';
		}

		if(show_direction)
		{
			message = app.user_data.correction.direction;
		}

		if(message !== '')
		{
			$('.connection-status').html(message);
		}
	},
	debug: function()
	{
		if(!app.user_data)
		{
			return false;
		}

		var label = (app.io.mode === 'guest') ? 'Guest' : 'Host';
		$('#my-data h3 span.mode').text(label);

		var degrees = (typeof app.user_data.correction !== 'undefined') ?
			app.user_data.correction.degrees :
			0;

		var bearing = (typeof app.user_data.correction !== 'undefined' && typeof app.user_data.correction.geo !== 'undefined') ?
			app.user_data.correction.geo.bearing :
			0;

		var direction = (typeof app.user_data.correction !== 'undefined') ?
			app.user_data.correction.direction :
			'Unknown';

		var position = '' +
			'<li><strong>Correction</strong>:&nbsp; ' + degrees + '</li>' +
			'<li><strong>Bearing</strong>:&nbsp; ' + bearing + '</li>' +
			'<li><strong>Direction</strong>:&nbsp; ' + direction + '</li>';

		$('#my-data .position ul').html(position);

		if(typeof app.user_data.acceleration !== 'undefined')
		{
			var acceleration = '' +
				'<li><strong>Z</strong>:&nbsp; ' + app.user_data.acceleration.z + '</li>';

			$('#my-data .acceleration ul').html(acceleration);
		}

		if(typeof app.user_data.geolocation !== 'undefined')
		{
			var geolocation = '' +
				'<li><strong>Latitude</strong>:&nbsp; ' + app.user_data.geolocation.latitude + ' &deg;</li>' +
				'<li><strong>Longitude</strong>:&nbsp; ' + app.user_data.geolocation.longitude + ' &deg;</li>' +
				'<li><strong>Altitude</strong>:&nbsp; ' + app.user_data.geolocation.altitude + '</li>' +
				'<li><strong>Accuracy</strong>:&nbsp; ' + app.user_data.geolocation.accuracy + '</li>';

			$('#my-data .geolocation ul').html(geolocation);
		}

		if(typeof app.user_data.compass !== 'undefined')
		{
			var compass = '' +
				'<li><strong>Direction</strong>:&nbsp; ' + app.user_data.compass.direction + '</li>' +
				'<li><strong>Heading</strong>:&nbsp; ' + app.user_data.compass.magnetic_heading + ' &deg;</li>';

			$('#my-data .compass ul').html(compass);
		}
	}
};
