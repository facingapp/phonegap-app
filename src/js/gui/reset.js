gui.reset = function()
{
	// Leave Shared Space
	app.io.leaveSpace();

	// Startup Hardware
	app.hardware.stop();

	app.ad.remove.banner();

	if($('#home .background').hasClass('blurIn'))
	{
		$('#home .background').removeClass('blurIn blurOut').addClass('blurOut');
	}

    $('.reset-gui').fadeOut();
    $('.logo').removeClass('animated fadeInDown fadeOut');
    $('.find-a-friend').attr('style', '').removeClass('animated flipInX no-image contact');
    $('.contact-options').removeClass('fadeOut').hide();
    gui.render.status('', true);
    $('.me .acceleration ul').html('');
    $('.me .geolocation ul').html('');
    $('.me .compass ul').html('');
    $('.friend .acceleration ul').html('');
    $('.friend .geolocation ul').html('');
    $('.friend .compass ul').html('');
    $('.welcome').removeClass('animated fadeInUp fadeOutDown').hide();
	$('.location-marker').fadeOut();

    setTimeout(function(){
	    $('#home .background').removeClass('blurIn blurOut');
        $('.find-a-friend').addClass('default animated flipInX');
        $('.logo').removeClass('fadeLogo fadeLogoGuidance').addClass('animated fadeInDown').show();
    }, 100);

    gui.animate();

    app.util.debug('log', 'GUI Reset');
};
