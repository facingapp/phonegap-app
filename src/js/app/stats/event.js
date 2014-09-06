app.stats.event = function(category, action, label, value)
{
    if(typeof analytics !== 'undefined')
    {
        analytics.trackEvent(category, action, label, value);
    }

	app.testflight.checkpoint.set(category + ' ' + action + ' ' + label);

	app.util.debug('debug', 'Event: ' + category + ' | ' + action + ' | ' + label);
};
