/**
 *
 */
app.events.networkOffline = function()
{
	app.stats.event('App', 'Event', 'Device Offline');

	clearTimeout(app.timeout.io);
	app.timeout.io = setTimeout(function()
	{
		gui.render.io('<i class="fa fa-exclamation-triangle fa-fw"></i>');
	}, 0);

	app.notification.alert(
		app.locale.dict('notification', 'offline_message'),
		function(){},
		app.locale.dict('notification', 'offline_title'),
		app.locale.dict('button', 'ok')
	);

	app.online = false;
};
