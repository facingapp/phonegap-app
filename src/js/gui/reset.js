gui.reset = function()
{
	// Leave Shared Space
	app.io.leaveSpace();

	// Startup Hardware
	app.hardware.stop();

	app.ad.remove.banner();

	gui.render.self.notice.gps = null;
	gui.render.self.notice.distance = null;
	gui.render.self.notice.direction = null;

	if($('#home .background').hasClass('blurIn'))
	{
		$('#home .background').removeClass('blurIn blurOut').addClass('blurOut');
		$('#home .clouds').removeClass('blurIn blurOut').addClass('blurOut');
	}

	$('.reset-gui').fadeOut();
	$('.logo').removeClass('animated fadeInDown fadeOut');
	$('.find-a-friend').attr('style', '').removeClass('animated flipInX no-image contact');
	$('.contact-options').removeClass('fadeOut').hide();
	gui.render.status('', true);
	$('.welcome').removeClass('animated fadeInUp fadeOutDown').hide();
	$('.location-marker').fadeOut();
	$('.connection').hide();
	clearInterval(gui.timeout.connectionStatus);

	setTimeout(function()
	{
		$('#home .background').removeClass('blurIn blurOut');
		$('#home .clouds').removeClass('blurIn blurOut');
		$('.find-a-friend').addClass('default animated flipInX');
		$('.logo').removeClass('fadeLogo fadeLogoGuidance').addClass('animated fadeInDown').show();
		$('.location-marker').hide();
		$('.self-marker').hide();
		$('.friend-marker').hide();
	}, 100);

	gui.animate();

	app.util.debug('log', 'GUI Reset');
};
