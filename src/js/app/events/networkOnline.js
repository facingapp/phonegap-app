/**
 *
 */
app.events.networkOnline = function()
{
    app.stats.event('App', 'Event', 'Device Online');

    clearTimeout(app.timeout.io);
    app.timeout.io = setTimeout(function(){
        gui.render.io('', true);
    }, 0);

    app.online = true;
};
