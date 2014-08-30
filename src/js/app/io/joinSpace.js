app.io.joinSpace = function(roomName, mode)
{
	// Prepare Socket Connection
	app.io.space = roomName;
	app.io.name = app.uuid;
	app.io.mode = mode;

	if(app.socket && app.socket.emit)
    {
	    app.stats.event('Socket', 'Join', app.io.name + ' joined Server');

	    app.socket.emit('joinRoom', app.io.space, app.io.name, app.io.mode, function(join_response){
		    if(join_response.success === true)
		    {
			    app.stats.event('Socket', 'Join', app.io.name + ' joined ' + app.io.space + ' as ' + app.io.mode);
		    }
		    else
		    {
			    app.stats.event('Socket', 'Join', app.io.name + ' ' + join_response.message);

			    app.notification.alert(join_response.message, function(){}, 'Connection Error', 'OK');
		    }
	    });

    }
};
