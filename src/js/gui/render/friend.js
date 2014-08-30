gui.render.friend = {

    draw: function(user, data)
    {
	    //var user_data = JSON.parse(data);

	    var num = Math.floor(Math.random()*99) + 1; // this will get a number between 1 and 99;
	        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

	    $('.friend-marker').animate({
		    left: '+=' + num,
		    top: '+=' +  + num
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
