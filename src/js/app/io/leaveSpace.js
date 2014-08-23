app.io.leaveSpace = function()
{
    if(app.socket && app.socket.emit)
    {
        app.socket.emit('leaveRoom', app.io.space);
    }

	app.stats.event('Socket', 'Join', app.io.name + ' left ' + app.io.space + ' as ' + app.io.mode);

	app.io.space = null;
	app.io.mode = null;
};
