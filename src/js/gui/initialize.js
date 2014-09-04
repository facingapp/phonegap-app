gui.initialize = function()
{
    app.util.debug('log', 'Setting up GUI');

    gui.prepareDevice();
    gui.handle.navigation();
    gui.handle.contacts();
    gui.animate();

	if(app.enable_tour)
	{
		setTimeout(function(){
			app.tour.start();
			app.enable_tour = false;
		}, 500);
	}
};