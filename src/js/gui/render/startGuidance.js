gui.render.startGuidance = function(user)
{
	if(user === 'host')
	{
		if(app.io.friend === null)
		{
			return false;
		}

		//
		app.stats.event('Navigation', 'Contact', 'Starting Guidance');
		gui.render.status('<i class="fa fa-check fa-fw"></i> '+ app.io.friend.name.givenName + ' has Connected', true);

		$('#home .background').removeClass('blurIn blurOut').addClass('blurIn');
		$('.pulse1, .pulse2').fadeOut('slow');
		$('.logo').addClass('fadeLogoGuidance');
		$('.location-marker.self').fadeIn();

		app.ad.remove.banner();
	}
	else if(user === 'guest')
	{
		// Allow user to Stop
		$('.reset-gui').fadeIn();

		app.stats.event('Navigation', 'Contact', 'Starting Guidance');
		gui.render.status('<i class="fa fa-check fa-fw"></i> You are Now Connected', true);

		// Update Contact Image
		var contact_image = $('.find-a-friend');
			contact_image.removeClass('no-image default animated flipInX');
			contact_image.css('background-image', '');
			contact_image.addClass('no-image');

		contact_image.removeClass('animated flipInX');

		setTimeout(function(){ $('.find-a-friend').addClass('animated flipInX'); }, 100);

		$('#home .background').removeClass('blurIn blurOut').addClass('blurIn');
		$('.pulse1, .pulse2').fadeOut('slow');
		$('.logo').addClass('fadeLogoGuidance');
		$('.location-marker.self').fadeIn();
	}
};