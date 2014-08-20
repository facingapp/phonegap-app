/* Copy and Rename file to config.js */

var config = {

	/* General Application Settings */
	app:
	{
		/* Name of Application */
		title: 'Facing App',

		/* Development Environment [ dev | prod ] */
		env: 'dev',

		/* If this is a Paid App, no ads will show */
		paidApp: false,

		/* Settings for Development */
		dev: {

			/* URL Base used for Invite URL ( separate just in case you wanted to alias it for shorter URL ) */
			base: 'http://127.0.0.1:4000',

			/* Socket IO */
			socket: {

				/* URL for Socket IO JavaScript File */
				js: 'http://127.0.0.1:4000/socket.io/socket.io.js',

				/* URL for Socket Server ( requires both host & port ) */
				io: 'http://127.0.0.1:4000'
			}
		},
		/* Settings for Production ( same descriptions as above ) */
		prod: {
			base: 'https://app.mywebsite.com',
			socket: {
				js: 'https://app.mywebsite.com/socket.io/socket.io.js',
				io: 'https://app.mywebsite.com:443'
			}
		}
	},

	/* Google Settings */
	google: {

		/* Analytics Code for Mobile App */
		analytics: 'UA-XXXXXXXX-X',

		/* AdMod Settings */
		admob: {

			/* Ad Units */
			ad_units: {
				ios : {
					banner: 'ca-app-pub-0123456789012345/0123456789'
				},
				android : {
					banner: 'ca-app-pub-9876543210987654/9876543210'
				}
			}
		}
	}
};