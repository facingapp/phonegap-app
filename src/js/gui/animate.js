gui.animate = function()
{
	clearTimeout(gui.timeout.message);
	clearTimeout(gui.timeout.welcomeIn);
	clearTimeout(gui.timeout.fadeLogo);
	clearTimeout(gui.timeout.welcomeOut);

	if(!gui.counter.welcome)
	{
		gui.counter.welcome = 0;
	}

	gui.timeout.message = setTimeout(function()
	{
		$('.status .message').fadeOut('slow');
	}, 100);

	gui.timeout.welcomeIn = setTimeout(function()
	{
		gui.counter.welcome++;
		$('.welcome').addClass('animated fadeInUp').show();
	}, 1500);

	gui.timeout.welcomeOut = setTimeout(function()
	{
		$('.welcome').addClass('animated fadeOutDown').show();
	}, 6000);

	gui.timeout.fadeLogo = setTimeout(function()
	{
		$('.logo').addClass('fadeLogo');
	}, 7000);

	clearInterval(gui.timeout.welcome);

	gui.timeout.welcome = setInterval(function()
	{

		if(gui.counter.welcome < 3)
		{
			clearInterval(gui.timeout.welcome);
		}
		else
		{
			gui.counter.welcome++;
		}

		$('.welcome').removeClass('fadeOutDown fadeInUp').addClass('fadeInUp');

		gui.timeout.welcomeOut = setTimeout(function()
		{
			$('.welcome').addClass('animated fadeOutDown').show();
		}, 6000);

	}, 30000);
};
