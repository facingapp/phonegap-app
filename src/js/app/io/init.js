app.io.init = function()
{
	app.util.debug('log', 'Socket Initialized');

	app.socket.on('connect', function()
	{

		clearTimeout(app.timeout.io);
		app.timeout.io = setTimeout(function()
		{
			gui.render.io('<i class="fa fa-check"></i>', true);
		}, 0);

		if(app.uuid === null && typeof device !== 'undefined')
		{
			app.uuid = device.uuid;
		}
		else if(app.uuid === null)
		{
			app.uuid = app.util.generateGUID(); // Fake UUID
		}

		app.io.name = app.uuid;
		app.io.mode = 'guest';

		app.socket.emit('joinserver', app.uuid, app.platform, function(server_response)
		{
			if(server_response.success === false)
			{
				app.stats.event('Socket', 'Error', server_response.message);
				app.notification.alert(
					server_response.message,
					function(){},
					app.locale.dict('notification', 'connection_error_title'),
					app.locale.dict('button', 'ok')
				);
			}
		});

		app.util.debug('log', 'Socket Connected');
		app.stats.event('Socket', 'Status', 'Connected');

		// Once the socket is connected & tour is already taken once, launch any invite codes we might have
		if(app.tour_given && app.launch_invite_code !== null)
		{
			app.io.joinSpace(app.launch_invite_code, 'guest');
			app.launch_invite_code = null;
		}
	});

	app.socket.on('reconnect', function()
	{

		clearTimeout(app.timeout.io);
		app.timeout.io = setTimeout(function()
		{
			gui.render.io('<i class="fa fa-history"></i>', true);
		}, 0);

		app.util.debug('log', 'Socket Reconnected');
		app.stats.event('Socket', 'Status', 'Reconnected');

		if(app.sharing_data && app.io.space && app.io.mode)
		{
			app.io.joinSpace(app.io.space && app.io.mode);
		}
	});

	app.socket.on('disconnect', function()
	{

		clearTimeout(app.timeout.io);
		app.timeout.io = setTimeout(function()
		{
			gui.render.io('<i class="fa fa-times"></i>', true);
		}, 0);

		app.util.debug('log', 'Socket Disconnected');
		app.stats.event('Socket', 'Status', 'Disconnected');
	});

	app.socket.on('reconnecting', function()
	{

		clearTimeout(app.timeout.io);
		app.timeout.io = setTimeout(function()
		{
			gui.render.io('<i class="fa fa-circle-o-notch fa-spin"></i>', true);
		}, 0);

		app.util.debug('log', 'Socket Reconnecting');
		app.stats.event('Socket', 'Status', 'Reconnecting');
	});

	app.socket.on('error', function()
	{

		clearTimeout(app.timeout.io);
		app.timeout.io = setTimeout(function()
		{
			gui.render.io('<i class="fa fa-exclamation-triangle"></i>', true);
		}, 0);

		app.util.debug('error', 'Socket Error');
		app.stats.event('Socket', 'Status', 'Error');
	});

	app.socket.on('sendRoomID', function(data)
	{
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
			gui.render.startGuidance('guest');
		}
		// Guest Joining Hosts App
		else if(space === app.io.space && name !== app.io.name && mode === 'guest')
		{
			app.util.debug('log', 'Guest Joining Hosts App');
			gui.render.startGuidance('host');
		}
	});

	app.socket.on('receiveData', function(user, data)
	{
		/**
		 * Example Data for 'user' who's a guest
		 *
		 *  user = {
		 *      device    : 'mobile'
		 *      inroom    : 'aFDsQ9nKJ5'
		 *      name      : '5CB3CF15-63CD-E56A-6EFD-78D4B3467936'
		 *      owns      : null
		 *      user_id   : '5CB3CF15-63CD-E56A-6EFD-78D4B3467936'
		 *      user_mode : 'guest'
		 *  }
		 *
		 *  Example Data for 'user' who's a host
		 *
		 *  user = {
		 *      device    : 'mobile'
		 *      inroom    : 'aFDsQ9nKJ5'
		 *      name      : '197263FE-5C56-F277-F9D5-004F4C982DAE'
		 *      owns      : 'aFDsQ9nKJ5'
		 *      user_id   : '197263FE-5C56-F277-F9D5-004F4C982DAE'
		 *      user_mode : 'host'
		 *  }
		 */

		var obj = JSON.parse(data);

		if(user.user_mode === 'guest')
		{
			app.io.location.guest = obj;
		}
		else if(user.user_mode === 'host')
		{
			app.io.location.host = obj;
		}

		if((user.user_mode === 'guest' && app.io.mode === 'guest') || (user.user_mode === 'host' && app.io.mode === 'host'))
		{
			gui.render.self.draw();
			gui.render.self.debug();
		}
		else
		{
			gui.render.friend.draw();
			gui.render.friend.debug();
		}
	});
};
