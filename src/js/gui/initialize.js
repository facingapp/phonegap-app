gui.initialize = function()
{
    app.util.debug('log', 'Setting up GUI');

    gui.prepareDevice();
    gui.handle.navigation();
    gui.handle.contacts();
    gui.animate();
};
