/**
 *
 * @param info
 */
app.events.batteryCritical = function(info)
{
    app.stats.event('App', 'Event', 'Battery Critical: ' + info.level + '%');

    clearTimeout(app.timeout.io);
    app.timeout.io = setTimeout(function(){
        gui.render.io('<i class="fa fa-bolt fa-fw"></i>');
    }, 0);

	app.notification.alert(
        "Battery Level Critical " + info.level + "%\nRecharge Soon!",
        function(){},
        'Battery Level Critical',
        'OK'
    );
};
