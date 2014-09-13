app.testflight.feedback = {
	submit: function(feedback)
	{
		if(app.testflight.supported)
		{
			app.testflight.plugin.submitFeedback(
				app.testflight.feedback.success,
				app.testflight.feedback.fail,
				feedback
			);
		}
		else
		{
			// Code for Devices
			if(window.plugin && typeof window.plugin.email !== 'undefined')
			{
				// Create Email Contents
				var email_options = {
					to: [config.app.support.email],
					subject: 'Facing App Feedback',
					body: feedback,
					isHtml: false
				};

				// Check if the user has an existing email client
				window.plugin.email.isServiceAvailable(
					function(isAvailable)
					{
						// User has Email Service
						if(isAvailable)
						{
							window.plugin.email.open(email_options, function()
							{
								console.log('email view dismissed');
							}, this);
						}
						// User has No Email Service, alert them just in case its a new phone or something
						else
						{
							app.notification.alert(
								'You do not have any Email Clients setup to send Email.',
								function(){},
								'Unable to Send Email',
								'OK'
							);
						}
					}
				);

				return false;
			}
			// Fallback for Development
			else
			{
				window.location.href = 'mailto:' + config.app.support.email + '?subject=' + encodeURIComponent('Facing App Feedback') + '&body=' + encodeURIComponent(feedback);
			}
		}
	},
	success: function()
	{
		console.log('TestFlight Feedback Submitted');
	},
	fail: function()
	{
		console.error('TestFlight Failed to Submit Feedback');
	}
};