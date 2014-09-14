gui.initialize = function()
{
	app.util.debug('log', 'Setting up GUI');

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