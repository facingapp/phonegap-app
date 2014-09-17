app.locale = {
	language: null,
	init: function()
	{
		// Exit if we have already set the language
		if(app.locale.language !== null)
		{
			return false;
		}

		// Check the users language
		if(typeof navigator.globalization !== 'undefined')
		{
			navigator.globalization.getPreferredLanguage(
				function(locale)
				{
					var language_code = locale.value.substring(0, 2).toLowerCase();

					// Default to English Language if we don't have the required one
					if(typeof app.locale[language_code] !== 'undefined')
					{
						app.locale.language = language_code;
					}
					else
					{
						app.locale.language = 'en';
					}

					app.locale.update();
				},
				function(){}
			);
		}
		else if(typeof navigator.languages !== 'undefined')
		{
			var language_code = navigator.languages[0].substring(0, 2).toLowerCase();

			// Default to English Language if we don't have the required one
			if(typeof app.locale[language_code] !== 'undefined')
			{
				app.locale.language = language_code;
			}
			else
			{
				app.locale.language = 'en';
			}

			app.locale.update();
		}
		else
		{
			app.locale.language = 'en';

			app.locale.update();
		}
	},
	update: function()
	{
		// Loop through any data attributes in HTML that need string replacement
		var locate_data = $.find('[data-locale]');

		$.each(locate_data, function()
		{
			var data = $(this).data('locale');
			data = data.split('|', 2);

			var group = data[0];
			var word_key = data[1];

			$(this).text(app.locale.dict(group, word_key));
		});

		// Loop through any data attributes in HTML that need string replacement
		var locate_data_placeholder = $.find('[data-locale-placeholder]');

		$.each(locate_data_placeholder, function()
		{
			var data = $(this).data('locale-placeholder');
			data = data.split('|', 2);

			var group = data[0];
			var word_key = data[1];

			$(this).attr('placeholder', app.locale.dict(group, word_key));
		});
	},
	dict: function(group, word_key)
	{
		if(app.locale.language === null)
		{
			return '';
		}

		if(group && word_key)
		{
			return app.locale[app.locale.language][group][word_key];
		}
	}
};
