gui.render.startGuidance = function(user)
{
	if(user === 'host')
	{
		if(app.io.friend === null)
		{
			return false;
		}

		// Setup initial data
		var name = contact.name.formatted;
		var first_name = contact.name.givenName;

		if(first_name === null)
		{
			first_name = name;
		}

		//
		app.stats.event('Navigation', 'Contact', 'Starting Guidance');
		gui.render.status('<i class="fa fa-check fa-fw"></i> '+  app.locale.dict('home', 'friend_connected').replace(/{{NAME}}/g, first_name), true, 1500);

		app.ad.remove.banner();
	}
	else if(user === 'guest')
	{
		// Allow user to Stop
		$('.reset-gui').fadeIn();

		app.stats.event('Navigation', 'Contact', 'Starting Guidance');
		gui.render.status('<i class="fa fa-check fa-fw"></i> ' + app.locale.dict('home', 'you_are_connected'), true, 1500);

		// Update Contact Image
		var contact_image = $('.find-a-friend');
			contact_image.removeClass('no-image default animated flipInX');
			contact_image.css('background-image', '');
			contact_image.addClass('no-image');

		contact_image.removeClass('animated flipInX');

		setTimeout(function(){ $('.find-a-friend').addClass('animated flipInX'); }, 100);
	}

	$('#home .background').removeClass('blurIn blurOut').addClass('blurIn');
	$('#home .clouds').removeClass('blurIn blurOut').addClass('blurIn');

	$('.pulse1, .pulse2').fadeOut('slow');
	$('.logo').addClass('fadeLogoGuidance');
	$('.location-marker.self').fadeIn();
	$('.welcome').hide();

	clearTimeout(gui.timeout.message);
	clearTimeout(gui.timeout.welcomeIn);
	clearTimeout(gui.timeout.welcomeOut);

	app.sharing_data = true;

	setTimeout(function(){
		$('.connection').slideDown();
	}, 1500);
};