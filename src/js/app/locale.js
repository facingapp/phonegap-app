app.locale = {
	language: 'en',
	init: function()
	{
		// Check the users language
		if(typeof navigator.globalization !== 'undefined')
		{
			navigator.globalization.getLocaleName(
				function(locale)
				{
					// Default to English Language if we don't have the required one
					if(typeof app.locale[app.locale.language] !== 'undefined')
					{
						app.locale.language = locale.value.substring(0, 2);
					}
				},
				function(){}
			);
		}

		// Loop through any data attributes in HTML that need string replacement
		var locate_data = $.find('[data-locale]');
		
		$.each(locate_data, function(index)
		{
			var data = $(this).data('locale');
			data = data.split('|', 2);

			var group = data[0];
			var word_key = data[1];

			$(this).text(app.locale.dict(group, word_key));
		});
	},
	dict: function(group, word_key)
	{
		if(group && word_key)
		{
			return app.locale[app.locale.language][group][word_key];
		}
	}
};
