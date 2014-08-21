gui.reset = function()
{
    app.ad.remove.banner();

    $('.reset-gui').fadeOut();
    $('.logo').removeClass('animated fadeInDown fadeOut');
    $('.find-a-friend').attr('style', '').removeClass('animated flipInX no-image contact');
    $('.contact-options').hide();
    gui.render.status('', true);
    $('.me .acceleration ul').html('');
    $('.me .geolocation ul').html('');
    $('.me .compass ul').html('');
    $('.friend .acceleration ul').html('');
    $('.friend .geolocation ul').html('');
    $('.friend .compass ul').html('');
    $('.welcome').removeClass('animated fadeInUp fadeOutDown').hide();

    setTimeout(function(){
        $('.find-a-friend').addClass('default animated flipInX');
        $('.logo').removeClass('fadeLogo').addClass('animated fadeInDown').show();
    }, 100);

    gui.animate();

    // @todo: kill any open socket connections

    app.util.debug('log', 'GUI Reset');
};
