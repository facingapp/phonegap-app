/**
 *
 * @param info
 */
app.events.batteryCritical = function(info)
{
	app.stats.event('App', 'Event', 'Battery Critical: ' + info.level + '%');

	clearTimeout(app.timeout.io);
	app.timeout.io = setTimeout(function()
	{
		gui.render.io('<i class="fa fa-bolt fa-fw"></i>');
	}, 0);

	app.notification.alert(
		app.locale.dict('notification', 'battery_critical') + info.level + "%",
		function(){},
		app.locale.dict('notification', 'battery_critical'),
		app.locale.dict('button', 'ok')
	);
};
