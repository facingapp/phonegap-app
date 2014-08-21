app.stats.event = function(category, action, label, value)
{
    if(typeof analytics !== 'undefined')
    {
        app.util.debug('debug', 'Event: ' + category + ' | ' + action + ' | ' + label);
        analytics.trackEvent(category, action, label, value);
    }
};
