var gui = {

    timeout: {},
	counter: {},
    touchEvents: 'touchstart mousedown',
    currentPanel: 'home',
    base: (config.app.env === 'dev') ? config.app.dev.base : config.app.prod.base
};

if(config.app.env == 'dev')
{
	$('.devonly').css('visibility', 'visible');
}