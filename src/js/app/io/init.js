app.io.init = function()
{
	app.socket.emit('joinserver', app.uuid, app.platform);

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

	app.socket.on('sendRoomID', function (data) {
		app.io.space = data.id;
		app.stats.event('Socket', 'Status', 'Private Room Created ' + app.io.space);
	});

	// We Received an Confirmation that Someone Joined the Private Space
	app.socket.on('joinedSpace', function(space, name, mode)
	{
		app.util.debug('log', name + ' has joined ' + space + ' as ' + mode);

		// Host Joining Their Own App
		if(space === app.io.space && name === app.io.name && mode === 'host')
		{
			app.util.debug('log', 'Host Joining Their Own App');
		}
		// Host Joining Guests App
		else if(space === app.io.space && name !== app.io.name && mode === 'host')
		{
			app.util.debug('log', 'Host Joining Guests App');
		}



		// Guest Joining Their Own App
		if(space === app.io.space && name === app.io.name && mode === 'guest')
		{
			app.util.debug('log', 'Guest Joining Their Own App');
		}
		// Guest Joining Hosts App
		else if(space === app.io.space && name !== app.io.name && mode === 'guest')
		{
			app.util.debug('log', 'Guest Joining Hosts App');
			gui.render.startGuidance();
		}
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
