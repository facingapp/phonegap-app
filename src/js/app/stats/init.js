app.stats.init = function()
{
    if(typeof analytics !== 'undefined')
    {
        app.util.debug('debug', 'Initializing Analytics');
        analytics.startTrackerWithId(config.google.analytics);
        analytics.trackView(config.app.title);
        analytics.setUserId(device.uuid);
    }
};
