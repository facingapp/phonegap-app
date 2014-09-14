var fake_data = {
	host: {
		user_data: {
			acceleration: {
				x: -0.03068618774414063,
				y: 10.06147705078125,
				z: 0.9445358276167188
			},
			compass: {
				direction: 'SSE',
				magnetic_heading: Math.floor(Math.random() * 360),
			},
			geolocation: {
				latitude: 40.71965838912204,
				longitude: -74.0066714632712,
				altitude: '40 Feet',
				accuracy: 30,
				accuracy_formatted: '',
				heading: '--',
				speed: '0 MPH'
			}
		}
	},
	guest: {
		user_data: {
			acceleration: {
				x: -0.2249821472167969,
				y: 9.648036804199219,
				z: 2.396217041015625
			},
			compass: {
				direction: 'NNW',
				magnetic_heading: Math.floor(Math.random() * 360)
			},
			geolocation: {
				latitude: 40.71969146592103,
				longitude: -74.00658612562913,
				altitude: 2.5,
				accuracy: 5,
				heading: 'W',
				speed: 0
			}
		}
	},
	contact: {
		"id": 1,
		"rawId": null,
		"displayName": null,
		"name": {
			"givenName": "Demo",
			"formatted": "Demo User",
			"middleName": null,
			"familyName": "User",
			"honorificPrefix": null,
			"honorificSuffix": null
		},
		"nickname": null,
		"phoneNumbers": [
			{
				"type": "home",
				"value": "(123) 456-7890",
				"id": 0,
				"pref": false
			},
			{
				"type": "work",
				"value": "(987) 654-3210",
				"id": 1,
				"pref": false
			}
		],
		"emails": [
			{
				"type": "home",
				"value": "demo.home.email@gmail.com",
				"id": 0,
				"pref": false
			},
			{
				"type": "work",
				"value": "demo.work.email@gmail.com",
				"id": 1,
				"pref": false
			}
		],
		"addresses": null,
		"ims": null,
		"organizations": null,
		"birthday": null,
		"note": null,
		"photos": null,
		"categories": null,
		"urls": null
	},
	geo: {
		host: {
			bearing: Math.floor(Math.random() * 360),
			formatted_bearing: "283.1888°",
			final_bearing: Math.floor(Math.random() * 360),
			formatted_final_bearing: "283.1879°"
		},
		guest: {
			bearing: Math.floor(Math.random() * 360),
			formatted_bearing: "103.1879°",
			final_bearing: Math.floor(Math.random() * 360),
			formatted_final_bearing: "103.1888°"
		},
		data: {
			distance: {
				length: 0.1337832759960119,
				formatted: "0.1338"
			},
			midpoint: {
				point: {
					height: 0,
					lat: 38.62463445239193,
					lon: -90.18573789856512,
					radius: 6371
				},
				formatted: "38.6246°N, 090.1857°W"
			}
		}
	}
};