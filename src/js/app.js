var app = {

    timeout: {},
    platform: (typeof device !== 'undefined') ? device.platform : 'desktop',
    socket: null,
    uuid: null,
    initialized: false,
	launch_invite_code: null,
    online: false,
	sharing_data: false,
	tour_given: false,
	legal: {
		accepted: {
			location_sharing: false
		},
		location_sharing_permission: function()
		{
			if(app.legal.accepted.location_sharing !== 'accepted')
			{
				// request user permission to share location data
				app.notification.confirm(
					app.locale.dict('notification', 'location_sharing_message'),
					function(results){

						// Check which button was clicked ( 1 = Disagree, 2 = Agree, 3 = Closed Without Choice )

						// User did not agree
						if(results == 1)
						{
							app.store.set('location_sharing', 'disagreed');
							app.stats.event('Legal', 'Location Sharing', 'User Disagreed');
							app.legal.accepted.location_sharing = 'disagreed';

							return 'disagreed';
						}
						// User agreed
						else if(results == 2)
						{
							app.store.set('location_sharing', 'accepted');
							app.stats.event('Legal', 'Location Sharing', 'User Agreed');
							app.legal.accepted.location_sharing = 'accepted';

							return 'accepted';

						}
						// User did not make a choice
						else if(results == 3)
						{
							app.store.set('location_sharing', 'no_choice');
							app.stats.event('Legal', 'Location Sharing', 'User Ignored Choices');
							app.legal.accepted.location_sharing = 'no_choice';

							return 'no_choice';

						}
					},
					app.locale.dict('notification', 'permission_request'),
					[
						app.locale.dict('button', 'disagree'),
						app.locale.dict('button', 'agree')
					]
				);
			}

			return app.legal.accepted.location_sharing;
		}
	},
    user_data: {
        app: {
            device: this.platform,
            dataType: 'stream'
        }
    }
};