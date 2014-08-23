gui.render.startGuidance = function()
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
};