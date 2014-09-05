app.notification = {

	alert: function(message, callback, title, button_label)
	{
		app.stats.event('Notification', 'Alert', message);

		if(navigator && typeof navigator.notification !== 'undefined')
		{
			navigator.notification.alert(message, callback, title, button_label);
		}
		// polyfill for browser development
		else
		{
			alert(message);

			if(callback && typeof callback == 'function')
			{
				callback();
			}
		}
	},
	confirm: function(message, callback, title, button_labels)
	{
		app.stats.event('Notification', 'Alert', message);

		if(navigator && typeof navigator.notification !== 'undefined')
		{
			navigator.notification.confirm(message, callback, title, button_labels);
		}
		// polyfill for browser development
		else
		{
			var choice = confirm(message);
			var button_index = (choice) ? 2 : 1;

			if(callback && typeof callback == 'function')
			{
				callback(button_index);
			}
		}
	},
	prompt: function(message, callback, title, button_labels, default_text)
	{
		app.stats.event('Notification', 'Alert', message);

		if(navigator && typeof navigator.notification !== 'undefined')
		{
			navigator.notification.prompt(message, callback, title, button_labels, default_text);
		}
		// polyfill for browser development
		else
		{
			var person = prompt(message, default_text);
			var button_index = (person !== null) ? 2 : 1;
			var results = {
				buttonIndex: button_index,
				input1: person
			};

			if(callback && typeof callback == 'function')
			{
				callback(results);
			}
		}
	},
	beep: function(times)
	{
		app.stats.event('Notification', 'Beep', 'Vibrating Device');

		if(navigator && typeof navigator.notification !== 'undefined')
		{
			navigator.notification.beep(times);
		}
	}
};
