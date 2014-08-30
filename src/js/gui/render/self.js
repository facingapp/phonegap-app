gui.render.self = {

    // Establish Field of View Degrees from Center ( http://en.wikipedia.org/wiki/Visual_field )
	visualField: {
		left: 100,
	    right: 100,
	    up: 60,
	    down: 75
    },
	draw: function(user, data)
	{
		app.calc.geo.getDistance();

		// self
		var geo = (app.io.mode === 'guest') ?
			app.calc.geo.guest :
			app.calc.geo.host;

		//console.log(geo);

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

		if(correction.degrees <= 0)
		{
			left = gui.render.self.visualField.right - (center_x - ( pointer_width / 2 )) * ( Math.abs(correction.degrees) / 180 );
		}
		else
		{
			left = gui.render.self.visualField.left + (center_x - ( pointer_width / 2 )) * ( Math.abs(correction.degrees) / 180 );
		}

		if(left < 0)
		{
			left = 0;
		}
		if(left > gui.screen.width)
		{
			left = gui.screen.width;
		}

		console.log(correction.degrees + ' : ' + left);

		var width = pointer_width;
		var height = pointer_height;

		if(left < 5 || left > ((gui.screen.width - pointer_width) - 20))
		{
			width = 10;
		}
		else if(left < 10 || left > ((gui.screen.width - pointer_width) - 40))
		{
			width = 20;
		}

		pointer.stop(true, true).animate({
			left: left,
			top: top,
			width: width,
			height: height
		}, 100);
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
