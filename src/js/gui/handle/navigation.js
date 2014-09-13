gui.handle.navigation = function()
{

	app.util.debug('log', 'Setting up Navigation');

	var items = $('.slide');
	var content = $('.content');

	$('button.send-feedback').on(gui.touchEvents, function(event)
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
	});

	$('button.support-site').on(gui.touchEvents, function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		window.open(config.app.support.website, '_system');
	});

	$('#navToggle').on(gui.touchEvents, function(event)
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

	$('#trigger-tour').on(gui.touchEvents, function()
	{

		setTimeout(function()
		{
			app.tour.start();
		}, 500);

		$('nav a').removeClass('active');
		$('.panel').removeClass('active');

		$('#facing-home').addClass('active');
		$('#home').addClass('active');

		return false;
	});

	content.on(gui.touchEvents, function()
	{
		if(content.hasClass('open'))
		{
			$(items).removeClass('open').addClass('close');
			app.stats.event('Navigation', 'Menu', 'Closed by Page Tap');
		}
	});

	$('nav a').on(gui.touchEvents, function()
	{

		var panel = $(this).data('panel');
		var tour = $(this).data('tour');
		var label = $(this).html();

		// Do nothing if user clicks tab for current panel
		if(panel === gui.currentPanel)
		{
			$('#navToggle').trigger('touchstart');
			return false;
		}

		app.stats.event('Navigation', 'Page Change', panel);

		$('nav a').removeClass('active');
		$('.panel').removeClass('active');

		gui.currentPanel = panel;

		$(this).addClass('active');
		$('#' + panel).addClass('active');

		$('header .label').html(label);

		$('#navToggle').trigger('touchstart');

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

	$('a.clear-log').on(gui.touchEvents, function()
	{
		$('#dev-log .output ul').html('');
		return false;
	});
};
