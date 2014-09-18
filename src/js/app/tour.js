app.tour = {
	gui_reset: true,
	start: function()
	{
		if(app.sharing_data)
		{
			app.notification.alert(
				app.locale.dict('notification', 'no_tour_message'),
				function(){},
				app.locale.dict('notification', 'no_tour_title'),
				app.locale.dict('button', 'ok')
			);

			return false;
		}

		app.giving_tour = true;
		fake_data.contact.name.givenName = app.locale.dict('tour', 'first_name');
		fake_data.contact.name.formatted = app.locale.dict('tour', 'full_name');
		fake_data.contact.name.familyName = app.locale.dict('tour', 'last_name');

		$('.self-marker').css({ top: '25%', left: (gui.screen.width - ( 25 + $('.self-marker').width() ) ) });

		$('#tourbus').tourbus({
			debug: false,
			autoDepart: true,
			onLegStart: function(leg, bus)
			{
				$('.toubus-next').click(function(event)
				{
					event.stopPropagation();
					event.preventDefault();
				});

				if(leg.rawData.autoProgress)
				{
					var currentIndex = leg.index;
					setTimeout(
						function()
						{
							if(bus.currentLegIndex != currentIndex)
							{ return; }
							bus.next();
						},
						leg.rawData.autoProgress
					);
				}

				// highlight where required
				if(leg.rawData.highlight)
				{
					leg.$target.addClass('intro-tour-highlight');
					$('.intro-tour-overlay').show();
				}

				// placeholder to control gui during tour
				if(leg.index == 2)
				{
					clearTimeout(gui.timeout.welcomeIn);
					clearTimeout(gui.timeout.welcomeOut);
					clearInterval(gui.timeout.welcome);

					app.tour.gui_reset = false;

					$('#home .welcome').removeClass('animated fadeInUp fadeOutDown').hide();

					setTimeout(function()
					{
						app.io.friend = fake_data.contact;
						gui.render.contact.update(app.io.friend);
					}, 1000);

				}
				if(leg.index == 3)
				{
					$('#sms').removeClass('animated swing');
					setTimeout(function(){ $('#sms').addClass('animated swing'); }, 100);

					$('#email').removeClass('animated swing');
					setTimeout(function(){ $('#email').addClass('animated swing'); }, 500);

					$('#clipboard').removeClass('animated swing');
					setTimeout(function(){ $('#clipboard').addClass('animated swing'); }, 900);

				}
				if(leg.index == 5)
				{
					gui.render.waitForFiend('Email', '', app.locale.dict('tour', 'first_name'), true);

					setTimeout(function()
					{
						app.io.location.guest = fake_data.guest.user_data;
						app.io.location.host = fake_data.host.user_data;

						gui.render.self.draw();
						gui.render.startGuidance('host');
						$('.connection-status').html(app.locale.dict('direction', 'right'));

						$('.self-marker').css({ top: '25%', left: (gui.screen.width - ( 25 + $('.self-marker').width() ) ) });
					}, 2250);
				}
				if(leg.index == 7)
				{
					$('.self-marker').css({ top: '25%', left: (gui.screen.width - ( 25 + $('.self-marker').width() ) ) });
				}
				if(leg.index == 8)
				{
					$('.self-marker').addClass('slow-move').css({ top: ((gui.screen.height / 2) - ($('.self-marker').height() / 2)), left: ((gui.screen.width / 2) - ($('.self-marker').width() / 2)) });

					setTimeout(function(){
						$('.connection-status').html(app.locale.dict('direction', 'right'));
					}, 0);

					setTimeout(function(){
						$('.connection-status').html(app.locale.dict('direction', 'slight_right'));
					}, 1000);

					setTimeout(function(){
						$('.connection-status').html(app.locale.dict('direction', 'straight_right'));
					}, 2000);

					setTimeout(function(){
						$('.connection-status').html(app.locale.dict('direction', 'straight'));
					}, 3000);
				}
				if(leg.index == 10)
				{
					$('.get-support').hammer(gui.touchOptions).bind(gui.touchEvents, function()
					{
						window.open(config.app.support.website, '_system');
					});

					gui.reset();
					app.tour.gui_reset = true;
				}
			},
			onLegEnd: function(leg)
			{
				// remove highlight when leaving this leg
				if(leg.rawData.highlight)
				{
					leg.$target.removeClass('intro-tour-highlight');
					$('.intro-tour-overlay').hide();
				}
			},
			onDepart: function()
			{
				$('.tourbus-container').fadeIn('slow');
			},
			onStop: function()
			{
				app.tour.stop();
			}
		});
	},
	stop: function()
	{
		$('.tourbus-container').hide().remove();
		$('.intro-tour-highlight').removeClass('intro-tour-highlight');
		$('.intro-tour-overlay').hide();
		$('.self-marker').removeClass('slow-move');

		if(!app.tour.gui_reset && !app.sharing_data)
		{
			gui.reset();
			app.tour.gui_reset = true;
		}

		// Check if there was an invite code at launch, since we needed to give tour first
		if(app.launch_invite_code !== null)
		{
			app.io.joinSpace(app.launch_invite_code, 'guest');
			app.launch_invite_code = null;
		}

		app.giving_tour = false;
		app.sharing_data = false;
	}
};
