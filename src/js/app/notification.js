app.notification = {

	alert: function(message, callback, title, button_label)
	{
		app.stats.event('Notification', 'Alert', message);

		if(navigator && typeof navigator.notification !== 'undefined')
		{
			navigator.notification.alert(message, callback, title, button_label);
		}
		else
		{
			alert(message);
		}
	},
	flash: function(message)
	{
		app.stats.event('Notification', 'Flash', message);
	},
	buzz: function(message)
	{
		app.stats.event('Notification', 'Buzz', message);
	}
};
