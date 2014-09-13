gui.prepareDevice = function()
{
	app.util.debug('log', 'Preparing Device');

	if(typeof StatusBar !== 'undefined')
	{
		app.util.debug('log', 'Hiding Status Bar');
		StatusBar.hide();
	}

	var platform = (typeof device !== 'undefined' && typeof device.platform !== 'undefined') ?
		device.platform :
		'desktop';

	$('html').addClass(platform.toLowerCase());

	// Force Width & Height on Elements that need it
	gui.resize();

	$(window).resize(function()
	{
		gui.resize();
	});

	// reposition some elements for smaller screens
	if(screen.height <= 480)
	{
		$('.logo').css('top', '60px');
		$('.information').css({ 'bottom': '60px', 'height': '60px' });
	}

	if(config.app.env === 'dev')
	{
		$('.content').append('<div class="dev" id="dev-btn"><\/div>');
		$('#dev-btn').on(gui.touchEvents, function()
		{
			$('#navToggle').trigger('mousedown');
			$('#trigger-console').trigger('mousedown');
			return false;
		});
	}
};
