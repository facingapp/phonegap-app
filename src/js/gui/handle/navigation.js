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
				app.notification.alert('Thanks for sending your feedback. You are Awesome.', function(){}, 'Feedback Sent', 'OK');
			}
			else
			{
				app.notification.alert('Thanks for the Feedback. We\'re going to open a pre-populated email message now... just hit send :)', function(){}, 'Feedback Sent', 'High Five');
			}

		}
		else
		{
			app.notification.alert('Looks like the Feedback was left blank. Once there is a message, we\'ll send it.', function(){}, 'Missing Feedback', 'OK');
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

			$('#navToggle').trigger(gui.touchEvents);
			return false;
		}

		// Do nothing if user clicks tab for current panel
		if(panel === gui.currentPanel)
		{
			$('#navToggle').trigger(gui.touchEvents);
			return false;
		}

		app.stats.event('Navigation', 'Page Change', panel);

		$('nav a').removeClass('active');
		$('.panel').removeClass('active');

		gui.currentPanel = panel;

		$(this).addClass('active');
		$('#' + panel).addClass('active');

		$('header .label').html(label);

		$('#navToggle').trigger(gui.touchEvents);

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
