gui.render.friend = {

	// Establish Field of View Degrees from Center ( http://en.wikipedia.org/wiki/Visual_field )
	visualField: {
		left_right: 100,
		up: 60,
		down: 75
	},
	draw: function(user, data)
    {
	    // Fetch distance between two users
	    app.calc.geo.getDistance();

	    // Fetch Geographic Data for this user ( render opposite of current user mode )
	    var geo = (app.io.mode === 'guest') ?
		    app.calc.geo.host :
		    app.calc.geo.guest;

	    // Fetch Location Data for this user ( render opposite of current user mode )
	    var loc = (app.io.mode === 'guest') ?
		    app.io.location.host :
		    app.io.location.guest;

	    // Do not continue if we do not have data we need
	    if(geo.bearing === null || loc.compass.magnetic_heading === null)
	    {
		    return false;
	    }

	    // We have all the data we need, time to calculate the offset
	    var correction = app.calc.geo.getOffset(geo.bearing, loc.compass.magnetic_heading);

	    // Define which Marker to use
	    var pointer = $('.friend-marker');

	    // Set the original width of our marker
	    if( !pointer.data('original-width'))
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

	    // Calculate Markers Left Position
	    var left = center_x - ( pointer_size / 2 );

	    // User is facing to far left, and needs to turn right
	    if(correction.degrees < 0)
	    {
		    left = ( center_x - ( Math.abs(correction.degrees) * ( center_x / gui.render.self.visualField.left_right ) ) - ( pointer_size / 2 ) );
	    }
	    // User is facing to far right, and needs to turn left
	    else if(correction.degrees > 0)
	    {
		    left = ( center_x + ( Math.abs(correction.degrees) * ( center_x / gui.render.self.visualField.left_right ) ) - ( pointer_size / 2 ) );
	    }

	    // Use to animate left and right edge smooshiness
	    var current_offscreen_left = (left < 0) ? Math.abs(left) : 0;
	    var current_offscreen_right = (left > gui.screen.width) ? (left - gui.screen.width) : 0;

	    // Calculate Marker Width
	    var width = pointer_size - ( max_squish * ( max_squish / ( max_squish * ( max_offscreen / ( current_offscreen_left + current_offscreen_right ) ) ) ) );

	    // Reposition Marker if off screen
	    if(left < 0)
	    {
		    left = 0;
	    }
	    if(left > ( gui.screen.width - pointer_size ))
	    {
		    left = ( gui.screen.width - pointer_size );
	    }

	    // Fix position of marker for when we know we need to add squish
	    if(left > center_x)
	    {
		    left = left + ( pointer_size - width );
	    }

	    // Calculate Markers Top Position
	    var top = center_y - ( pointer_size / 2 );

	    // Screen is tilted towards the sky, correction needed to look down
	    if(loc.acceleration.z >= 0)
	    {
		    // Marker should be above center
		    top = ( center_y - ( ( ( loc.acceleration.z / 10 ) * ( 90 / gui.render.self.visualField.down ) ) * center_y ) - ( pointer_size / 2 ) );
	    }
	    // Screen is tilted towards the ground, correction needed to look up
	    else if(loc.acceleration.z < 0)
	    {
		    // Marker should be below center
		    top = ( center_y - ( ( ( loc.acceleration.z / 10 ) * ( 90 / gui.render.self.visualField.up ) ) * center_y ) - ( pointer_size / 2 ) );
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
		    left  : left,
		    top   : top,
		    width : width,
		    height: height,
		    display: 'block'
	    });
    },
	debug: function()
	{
		// Fetch Location Data for this user
		var data = (app.io.mode === 'guest') ?
			app.io.location.host :
			app.io.location.guest;

		if( !data)
		{
			return false;
		}

		var label = (app.io.mode === 'guest') ? 'Host' : 'Guest';
		$('#friends-data h3 span.mode').text(label);

		if(typeof data.acceleration !== 'undefined')
		{
			var acceleration = '' +
				'<li><strong>X</strong>:&nbsp; ' + data.acceleration.x + '</li>' +
				'<li><strong>Y</strong>:&nbsp; ' + data.acceleration.y + '</li>' +
				'<li><strong>Z</strong>:&nbsp; ' + data.acceleration.z + '</li>';

			$('#friends-data .acceleration ul').html(acceleration);
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

			$('#friends-data .geolocation ul').html(geolocation);
		}

		if(typeof data.compass !== 'undefined')
		{
			var compass = '' +
				'<li><strong>Direction</strong>:&nbsp; ' + data.compass.direction + '</li>' +
				'<li><strong>Heading</strong>:&nbsp; ' + data.compass.magnetic_heading + ' &deg;</li>';

			$('#friends-data .compass ul').html(compass);
		}
	}
};
