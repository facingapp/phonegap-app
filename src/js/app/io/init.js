app.io.init = function()
{
    app.util.debug('log', 'Socket Initialized');

    app.socket.on('connect', function(){

        clearTimeout(app.timeout.io);
        app.timeout.io = setTimeout(function(){
            gui.render.io('<i class="fa fa-check"></i>', true);
        }, 0);

        app.util.debug('log', 'Socket Connected');
        app.stats.event('Socket', 'Status', 'Connected');
    });

    app.socket.on('reconnect', function () {

        clearTimeout(app.timeout.io);
        app.timeout.io = setTimeout(function(){
            gui.render.io('<i class="fa fa-history"></i>', true);
        }, 0);

        app.util.debug('log', 'Socket Reconnected');
        app.stats.event('Socket', 'Status', 'Reconnected');
    });

    app.socket.on('disconnect', function () {

        clearTimeout(app.timeout.io);
        app.timeout.io = setTimeout(function(){
            gui.render.io('<i class="fa fa-times"></i>', true);
        }, 0);

        app.util.debug('log', 'Socket Disconnected');
        app.stats.event('Socket', 'Status', 'Disconnected');
    });

    app.socket.on('reconnecting', function () {

        clearTimeout(app.timeout.io);
        app.timeout.io = setTimeout(function(){
            gui.render.io('<i class="fa fa-circle-o-notch fa-spin"></i>', true);
        }, 0);

        app.util.debug('log', 'Socket Reconnecting');
        app.stats.event('Socket', 'Status', 'Reconnecting');
    });

    app.socket.on('error', function () {

        clearTimeout(app.timeout.io);
        app.timeout.io = setTimeout(function(){
            gui.render.io('<i class="fa fa-exclamation-triangle"></i>', true);
        }, 0);

        app.util.debug('error', 'Socket Error');
        app.stats.event('Socket', 'Status', 'Error');
    });

    app.socket.on('receiveData', function(name, data)
    {
        if(name !== app.uuid)
        {
            gui.render.friend(data);

            clearTimeout(app.timeout.io);
            app.timeout.io = setTimeout(function(){
                gui.render.io('<i class="fa fa-map-marker"></i>', true);
            }, 0);

            app.util.debug('log', 'Socket Received Data');
            app.util.debug('log', data);
        }
    });
};
