app.io.createSpace = function(roomName)
{
	if(app.socket && app.socket.emit && app.io.space === null)
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
						// Prepare Socket Connection
						app.io.space = roomName;
						app.io.name = app.uuid;
						app.io.mode = 'host';

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
