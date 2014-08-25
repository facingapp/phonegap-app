app.io.createSpace = function(roomName)
{
	// Prepare Socket Connection
	app.io.space = roomName;
	app.io.name = app.uuid;
	app.io.mode = 'host';

	if(app.socket && app.socket.emit)
    {
	    app.socket.emit('check', roomName, function(data) {
		    if(data.result)
		    {
			    app.util.debug('log', roomName + ' already exists');
		    }
		    else if (roomName.length > 0)
			{
				app.socket.emit('createRoom', roomName, function(data){
					if(data.success)
					{
						app.stats.event('Socket', 'Create', data.message + ' ' + app.io.name);
					}
					else
					{
						app.stats.event('Socket', 'Create', app.io.name + ', ' + data.message);
					}
				});
		    }
	    });
    }
};
