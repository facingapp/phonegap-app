gui.prepareDevice = function()
{
    app.util.debug('log', 'Preparing Device');

	var random = Math.floor((Math.random() * 5) + 1);
	$('.background').addClass('bg' + random);

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

    // reposition some elements for smaller screens
    if(screen.height <= 480)
    {
        $('.logo').css('top', '60px');
        $('.information').css({ 'bottom': '60px', 'height': '60px' });
    }

    if(config.app.env === 'dev')
    {
        $('.content').append('<div class="dev"><\/div>');
    }
};
