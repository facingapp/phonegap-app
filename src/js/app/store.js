app.store = {
	supported: false,
	init: function()
	{
		app.store.supported = (typeof localStorage !== 'undefined');

		// Let's pre-populate some date
		if(app.store.supported)
		{
			app.tour_given = (app.store.get('tour_given') === 'yes');
			app.legal.accepted.contact_list_access = app.store.get('contact_list_access');
			app.legal.accepted.location_sharing = app.store.get('location_sharing');
		}

		return app.store.supported;
	},
	get: function(key)
	{
		if(app.store.supported && key)
		{
			var value = localStorage.getItem(key);

			// check if we should return an object
			if(value && value.charAt(0) === '{')
			{
				value = JSON.parse(value);
			}

			return value;
		}
		else if( !key)
		{
			app.util.debug('warn', 'No Key Provided');
		}
		else
		{
			app.util.debug('warn', 'Unable to Fetch Local Storage of ' + key);
		}

		return false;
	},
	set: function(key, value)
	{
		if(app.store.supported && key && value)
		{
			// Check if we need to convert the object to a string
			if(typeof value === 'object')
			{
				value = JSON.stringify(value);
			}

			// Set Value
			localStorage.setItem(key, value);
			return true;
		}
		else if( !key)
		{
			app.util.debug('warn', 'No Key Provided');
		}
		else if( !value)
		{
			app.util.debug('warn', 'No Value Provided');
		}
		else
		{
			app.util.debug('warn', 'Unable to Set Local Storage of ' + key);
		}

		return false;
	},
	remove: function(key)
	{
		if(app.store.supported && key)
		{
			// Remove from local storage
			localStorage.removeItem(key);
			return true;
		}
		else if( !key)
		{
			app.util.debug('warn', 'No Key Provided');
		}
		else
		{
			app.util.debug('warn', 'Unable to Remove Local Storage of ' + key);

		}

		return false;
	},
	clear: function()
	{
		if(app.store.supported)
		{
			app.legal.accepted.contact_list_access = false;
			app.legal.accepted.location_sharing = false;
			app.tour_given = false;

			localStorage.clear();
			return true;
		}
		else
		{
			app.util.debug('warn', 'Unable to Clear Local Storage');
		}

		return false;
	}
};
