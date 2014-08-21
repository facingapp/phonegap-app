app.events.deviceReady = function()
{
    app.stats.event('App', 'Event', 'Device Ready');

    app.initialized = true;

    if(typeof device !== 'undefined')
    {
        app.uuid = device.uuid;
    }

    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);

    gui.initialize();
    app.hardware.start();
};
