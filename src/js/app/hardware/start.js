app.hardware.start = function()
{
	// Only start hardware if user has accepted
	if(app.legal.accepted.location_sharing == 'accepted' && app.hardware.timer === null)
    {
        app.hardware.accelerometer.start();
        app.hardware.compass.start();
        app.hardware.geolocation.start();

	    window.cancelAnimationFrame(app.hardware.timer);

	    function sendData()
	    {
		    // fill in missing accelerometer data ( for development )
		    if(typeof app.user_data.acceleration === 'undefined')
		    {
			    app.user_data.acceleration = (app.io.mode === 'guest') ?
				    fake_data.guest.user_data.acceleration :
				    fake_data.host.user_data.acceleration;
		    }

		    // fill in missing compass data ( for development )
		    if(typeof app.user_data.compass === 'undefined')
		    {
			    app.user_data.compass = (app.io.mode === 'guest') ?
				    fake_data.guest.user_data.compass :
				    fake_data.host.user_data.compass;
		    }

		    // fill in missing geolocation data ( for development )
		    if(typeof app.user_data.geolocation === 'undefined')
		    {
			    app.user_data.geolocation= (app.io.mode === 'guest') ?
				    fake_data.guest.user_data.geolocation :
				    fake_data.host.user_data.geolocation;
		    }

			// send data
		    app.socket.emit('send', JSON.stringify(app.user_data));

		    app.hardware.timer = window.requestAnimationFrame(sendData);
	    }

	    app.hardware.timer = window.requestAnimationFrame(sendData);
    }
	else if(app.legal.accepted.location_sharing === 'disagreed')
	{
		app.notification.alert('You disagreed to sharing location data. We are unable to continue.', function(){}, 'Permission Denied', 'OK');
	}
	else if(app.legal.accepted.location_sharing === 'no_choice')
	{
		app.notification.alert('You did not make a choice on whether you agreed to sharing location data. We are unable to continue.', function(){}, 'Permission Denied', 'OK');
	}
};