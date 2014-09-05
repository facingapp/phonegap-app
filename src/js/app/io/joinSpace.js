app.io.joinSpace = function(roomName, mode)
{
	var permission = app.legal.location_sharing_permission();
	if(permission !== 'accepted')
	{
		app.util.debug('log', 'User did not allow us to share location data');

		return false;
	}

	clearInterval(gui.timeout.welcome);
	clearTimeout(gui.render.timeout.hideStatus);

	// Prevent Device from sleeping
	if(typeof window.plugins !== 'undefined')
	{
		window.plugins.insomnia.keepAwake();
	}

	// Prepare Socket Connection
	app.io.space = roomName;
	app.io.name = app.uuid;
	app.io.mode = mode;

	// Startup Hardware
	app.hardware.start();

	if(app.legal.accepted.location_sharing === 'accepted' && app.socket && app.socket.emit)
    {
	    app.stats.event('Socket', 'Join', app.io.name + ' joined Server');

	    app.socket.emit('joinRoom', app.io.space, app.io.name, app.io.mode, function(join_response){
		    if(join_response.success === true)
		    {
			    app.stats.event('Socket', 'Join', app.io.name + ' joined ' + app.io.space + ' as ' + app.io.mode);

			    app.sharing_data = true;
		    }
		    else
		    {
			    app.stats.event('Socket', 'Join', app.io.name + ' ' + join_response.message);

			    app.notification.alert(join_response.message, function(){}, 'Connection Error', 'OK');
		    }
	    });
    }
	else
	{
		app.notification.alert('Unable to Connect to Friend.', function(){}, 'Connection Error', 'OK');
	}
};
