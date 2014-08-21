gui.render.friend = {

    debug: function(data)
    {
        var user_data = JSON.parse(data);

        if(typeof user_data.acceleration !== 'undefined')
        {
            var acceleration = '' +
                '<li><strong>X</strong>:&nbsp; ' + user_data.acceleration.x + '</li>' +
                '<li><strong>Y</strong>:&nbsp; ' + user_data.acceleration.y + '</li>' +
                '<li><strong>Z</strong>:&nbsp; ' + user_data.acceleration.z + '</li>';

            $('.friend .acceleration ul').html(acceleration);
        }

        if(typeof user_data.geolocation !== 'undefined')
        {
            var geolocation = '' +
                '<li><strong>Latitude</strong>:&nbsp; ' + user_data.geolocation.latitude + ' &deg;</li>' +
                '<li><strong>Longitude</strong>:&nbsp; ' + user_data.geolocation.longitude + ' &deg;</li>' +
                '<li><strong>Altitude</strong>:&nbsp; ' + user_data.geolocation.altitude + '</li>' +
                '<li><strong>Accuracy</strong>:&nbsp; ' + user_data.geolocation.accuracy + '</li>' +
                '<li><strong>Heading</strong>:&nbsp; ' + user_data.geolocation.heading + '</li>' +
                '<li><strong>Speed</strong>:&nbsp; ' + user_data.geolocation.speed + '</li>';

            $('.friend .geolocation ul').html(geolocation);
        }

        if(typeof user_data.compass !== 'undefined')
        {
            var compass = '' +
                '<li><strong>Direction</strong>:&nbsp; ' + user_data.compass.direction + '</li>' +
                '<li><strong>Magnetic Heading</strong>:&nbsp; ' + user_data.compass.magnetic_heading + ' &deg;</li>';

            $('.friend .compass ul').html(compass);
        }
    }
};
