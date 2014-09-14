app.hardware.start = function()
{
	// Only start hardware if user has accepted
	if(app.hardware.timer === null)
	{
		app.hardware.accelerometer.start();
		app.hardware.compass.start();
		app.hardware.geolocation.start();

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
			app.user_data.geolocation = (app.io.mode === 'guest') ?
				fake_data.guest.user_data.geolocation :
				fake_data.host.user_data.geolocation;
		}

		app.hardware.timer = setInterval(function(){

			if(app.sharing_data)
			{
				app.socket.emit('send', JSON.stringify(app.user_data));
			}

		}, 100);
	}
	else if(app.legal.accepted.location_sharing === 'disagreed')
	{
		app.notification.alert(
			app.locale.dict('notification', 'sharing_disagreed'),
			function(){},
			app.locale.dict('notification', 'permission_denied_title'),
			app.locale.dict('button', 'ok')
		);
	}
	else if(app.legal.accepted.location_sharing === 'no_choice')
	{
		app.notification.alert(
			app.locale.dict('notification', 'sharing_no_choice'),
			function(){},
			app.locale.dict('notification', 'permission_denied_title'),
			app.locale.dict('button', 'ok')
		);
	}
};