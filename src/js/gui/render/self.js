gui.render.self = {

    // Establish Field of View Degrees from Center ( http://en.wikipedia.org/wiki/Visual_field )
	visualField: {
		left: 100,
	    right: 100,
	    up: 60,
	    down: 75
    },

	debug: function()
    {
        if(typeof app.user_data.acceleration !== 'undefined')
        {
            var acceleration = '' +
                '<li><strong>X</strong>:&nbsp; ' + app.user_data.acceleration.x + '</li>' +
                '<li><strong>Y</strong>:&nbsp; ' + app.user_data.acceleration.y + '</li>' +
                '<li><strong>Z</strong>:&nbsp; ' + app.user_data.acceleration.z + '</li>';

            $('.me .acceleration ul').html(acceleration);
        }

        if(typeof app.user_data.geolocation !== 'undefined')
        {
            var geolocation = '' +
                '<li><strong>Latitude</strong>:&nbsp; ' + app.user_data.geolocation.latitude + ' &deg;</li>' +
                '<li><strong>Longitude</strong>:&nbsp; ' + app.user_data.geolocation.longitude + ' &deg;</li>' +
                '<li><strong>Altitude</strong>:&nbsp; ' + app.user_data.geolocation.altitude + '</li>' +
                '<li><strong>Accuracy</strong>:&nbsp; ' + app.user_data.geolocation.accuracy + '</li>' +
                '<li><strong>Heading</strong>:&nbsp; ' + app.user_data.geolocation.heading + '</li>' +
                '<li><strong>Speed</strong>:&nbsp; ' + app.user_data.geolocation.speed + '</li>';

            $('.me .geolocation ul').html(geolocation);
        }

        if(typeof app.user_data.compass !== 'undefined')
        {
            var compass = '' +
                '<li><strong>Direction</strong>:&nbsp; ' + app.user_data.compass.direction + '</li>' +
                '<li><strong>Magnetic Heading</strong>:&nbsp; ' + app.user_data.compass.magnetic_heading + ' &deg;</li>';

            $('.me .compass ul').html(compass);
        }
    }
};
