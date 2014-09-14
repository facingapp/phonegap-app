app.io.leaveSpace = function()
{
	app.stats.event('Socket', 'Join', app.io.name + ' left ' + app.io.space + ' as ' + app.io.mode);

	if(app.socket && app.socket.emit)
	{
		app.stats.event('Socket', 'Leave', app.io.name + ' left Server');

		app.socket.emit('leaveRoom', app.io.space, app.io.name, app.io.mode, function(leave_response)
		{
			if(leave_response.success === true)
			{
				app.stats.event('Socket', 'Left', app.io.name + ' left ' + app.io.space + ' as ' + app.io.mode);

				app.io.space = null;
				app.io.mode = null;

				// Allow Device to sleep
				if(typeof window.plugins !== 'undefined')
				{
					window.plugins.insomnia.allowSleepAgain();
				}

				window.cancelAnimationFrame(app.hardware.timer);

				// Stop Hardware
				app.hardware.stop();
			}
			else
			{
				app.util.debug('error', leave_response.message);
			}
		});
	}
	else
	{
		app.notification.alert(
			app.locale.dict('notification', 'connection_error_message'),
			function(){},
			app.locale.dict('notification', 'connection_error_title'),
			app.locale.dict('button', 'ok')
		);
	}
};
