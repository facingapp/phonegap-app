gui.handle.navigation = function()
{

	app.util.debug('log', 'Setting up Navigation');

	var items = $('.slide');
	var content = $('.content');

	$('button.send-feedback').hammer(gui.touchOptions).bind(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		var feedback = $('#feedback-message').val();

		if(feedback !== '')
		{
			app.testflight.feedback.submit(feedback);
			$('#feedback-message').val('').blur();

			if(app.testflight.supported)
			{
				app.notification.alert(
					app.locale.dict('feedback', 'sent_message'),
					function(){},
					app.locale.dict('feedback', 'alert_sent'),
					app.locale.dict('button', 'ok')
				);
			}
			else
			{
				app.notification.alert(
					app.locale.dict('feedback', 'sent_message_email'),
					function(){},
					app.locale.dict('feedback', 'alert_sent_prepared'),
					app.locale.dict('button', 'ok')
				);
			}

		}
		else
		{
			app.notification.alert(
				app.locale.dict('feedback', 'missing_title'),
				function(){},
				app.locale.dict('feedback', 'missing_text'),
				app.locale.dict('button', 'ok')
			);
		}

		app.stats.event('Navigation', 'Button', 'Feedback Sent');

		$(this).blur();

		return false;
	});

	$('button.support-site').hammer(gui.touchOptions).bind(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		app.stats.event('Navigation', 'Button', 'Support Site Opened');

		window.open(config.app.support.website, '_system');

		$(this).blur();

		return false;
	});

	$('button.terms-of-use').hammer(gui.touchOptions).bind(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		app.stats.event('Navigation', 'Button', 'Terms of Use Opened');

		window.open(config.app.support.terms_of_use, '_system');

		$(this).blur();

		return false;
	});

	$('button.privacy-policy').hammer(gui.touchOptions).bind(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		app.stats.event('Navigation', 'Button', 'Privacy Policy Opened');

		window.open(config.app.support.privacy_policy, '_system');

		$(this).blur();

		return false;
	});

	$('button.visit-website').hammer(gui.touchOptions).bind(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		app.stats.event('Navigation', 'Button', 'Website Visited');

		window.open(config.app.support.info, '_system');

		$(this).blur();

		return false;
	});

	$('#navToggle').hammer(gui.touchOptions).bind(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		app.tour.stop();

		if(content.hasClass('open'))
		{
			$(items).removeClass('open').addClass('close');
			app.stats.event('Navigation', 'Menu', 'Close');
		}
		else
		{
			$(items).removeClass('close').addClass('open');
			app.stats.event('Navigation', 'Menu', 'Open');
		}

		return false;
	});

	content.hammer(gui.touchOptions).bind(gui.touchEvents, function()
	{
		if(content.hasClass('open'))
		{
			$(items).removeClass('open').addClass('close');
			app.stats.event('Navigation', 'Menu', 'Closed by Page Tap');
		}
	});

	$('nav a').hammer(gui.touchOptions).bind(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		var panel = $(this).data('panel');
		var id = $(this).attr('id');
		var label = $(this).html();

		// Do nothing if user clicks tab for current panel
		if(id === 'trigger-tour')
		{
			app.tour.stop();

			setTimeout(function()
			{
				app.tour.start();
			}, 500);

			$('nav a').removeClass('active');
			$('.panel').removeClass('active');

			$('#facing-home').addClass('active');
			$('#home').addClass('active');

			$('#navToggle').trigger('press');
			return false;
		}

		// Do nothing if user clicks tab for current panel
		if(panel === gui.currentPanel)
		{
			$('#navToggle').trigger('press');
			return false;
		}

		app.stats.event('Navigation', 'Page Change', panel);

		$('nav a').removeClass('active');
		$('.panel').removeClass('active');

		gui.currentPanel = panel;

		$(this).addClass('active');
		$('#' + panel).addClass('active');

		$('header .label').html(label);

		$('#navToggle').trigger('press');

		if(panel === 'home')
		{
			// reset interface if we're not currently sharing data
			if(app.sharing_data === false)
			{
				gui.reset();
			}
			else
			{
				$('.reset-gui').fadeIn();
			}

			$('.dev').show();
		}
		else
		{
			$('.logo, .reset-gui, .dev').hide();
			app.ad.remove.banner();
		}

		return false;
	});

	$('a.clear-log').hammer(gui.touchOptions).bind(gui.touchEvents, function()
	{
		$('#dev-log .output ul').html('');
		return false;
	});
};
