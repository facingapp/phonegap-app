app.locale = {
	language: 'en',
	init: function()
	{
		if(typeof navigator.globalization !== 'undefined')
		{
			navigator.globalization.getLocaleName(
				function(locale)
				{
					app.locale.language = locale.value.substring(0,2);
				},
				function(){}
			);
		}
	},
	dict: function(word_key)
	{
		if(word_key)
		{
			return app.locale[app.locale.language][word_key];
		}
	}
};
