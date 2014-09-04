app.io.leaveSpace = function()
{
    if(app.socket && app.socket.emit)
    {
        app.socket.emit('leaveRoom', app.io.space);
    }

	// Allow Device to sleep
	if(typeof window.plugins !== 'undefined')
	{
		window.plugins.insomnia.allowSleepAgain();
	}

	window.cancelAnimationFrame(app.hardware.timer);

	// Stop Hardware
	app.hardware.stop();

	app.stats.event('Socket', 'Join', app.io.name + ' left ' + app.io.space + ' as ' + app.io.mode);

	app.io.space = null;
	app.io.mode = null;

	app.sharing_data = false;
};
