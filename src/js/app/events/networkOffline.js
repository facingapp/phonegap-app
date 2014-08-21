app.events.networkOffline = function()
{
    app.stats.event('App', 'Event', 'Device Offline');

    clearTimeout(app.timeout.io);
    app.timeout.io = setTimeout(function(){
        gui.render.io('<i class="fa fa-exclamation-triangle fa-fw"></i>');
    }, 0);

    navigator.notification.alert(
        'You won\'t be able to use Facing without a Network Connecting.',
        function(){},
        'Device Offline',
        'OK'
    );

    app.online = false;
};
