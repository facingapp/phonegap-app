app.io.joinSpace = function(roomName, mode)
{
	// Startup Hardware
	app.hardware.start();

	// Prepare Socket Connection
	app.io.space = roomName;
	app.io.name = app.uuid;
	app.io.mode = mode;

	if(app.socket && app.socket.emit)
    {
        app.socket.emit('joinRoom', app.io.space, app.io.name, app.io.mode);
    }

    app.stats.event('Socket', 'Join', app.io.name + ' joined ' + app.io.space + ' as ' + app.io.mode);
};
