app.io.createSpace = function(roomName)
{
	if(app.legal.accepted.location_sharing === 'accepted' && app.socket && app.socket.emit && app.io.space === null)
	{
		app.socket.emit('check', roomName, function(data)
		{
			if(data.result)
			{
				app.util.debug('log', roomName + ' already exists');
				app.notification.alert(
					app.locale.dict('notification', 'connection_error_message'),
					function(){},
					app.locale.dict('notification', 'connection_error_title'),
					app.locale.dict('button', 'ok')
				);
			}
			else if(roomName.length > 0)
			{
				app.socket.emit('createRoom', roomName, function(data)
				{
					if(data.success)
					{
						// Prepare Socket Connection
						app.io.space = roomName;
						app.io.mode = 'host';

						app.sharing_data = true;

						// Startup Hardware
						app.hardware.start();

						app.stats.event('Socket', 'Create', data.message + ' ' + app.io.name);
					}
					else
					{
						app.stats.event('Socket', 'Create', app.io.name + ', ' + data.message);

						app.notification.alert(
							data.message,
							function(){},
							app.locale.dict('notification', 'connection_error_title'),
							app.locale.dict('button', 'ok')
						);
					}
				});
			}
		});
	}
};
