gui.initialize = function()
{
	app.util.debug('log', 'Setting up GUI');

	var animation_enabled = false,
		animation_string = 'animation',
		keyframe_prefix = '',
		dom_prefixes = 'Webkit Moz O ms Khtml'.split(' '),
		pfx  = '';

	if( document.body.style.animationName !== undefined ) { animation_enabled = true; }

	if( animation_enabled === false ) {
		for( var i = 0; i < dom_prefixes.length; i++ ) {
			if( document.body.style[ dom_prefixes[i] + 'AnimationName' ] !== undefined ) {
				pfx = dom_prefixes[ i ];
				animation_string = pfx + 'Animation';
				keyframe_prefix = '-' + pfx.toLowerCase() + '-';
				animation_enabled = true;
				break;
			}
		}
	}

	gui.enable_animation = animation_enabled;

	if (gui.enable_animation === false)
	{
		$('html').addClass('disable-animation');
	}

	gui.prepareDevice();
	gui.handle.navigation();
	gui.handle.contacts();
	gui.animate();

	if(!app.tour_given)
	{
		setTimeout(function()
		{
			app.tour.start();
			app.tour_given = true;
			app.store.set('tour_given', 'yes');
		}, 500);
	}
};