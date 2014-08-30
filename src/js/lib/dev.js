var fake_data = {
	host: {
		user_data: {
			acceleration: {
				x: 0.0,
				y: 0.0,
				z: 0.0
			},
			compass: {
				direction: 'N',
				magnetic_heading: 360.000
			},
			geolocation: {
				latitude: 38.6244972,
				longitude: -90.1849882,
				altitude: 5,
				accuracy: 5,
				heading: 'N',
				speed: 0
			}
		}
	},
	guest: {
		user_data: {
			acceleration: {
				x: 0.0,
				y: 0.0,
				z: 0.0
			},
			compass: {
				direction: 'W',
				magnetic_heading: 270.000
			},
			geolocation: {
				latitude: 38.6247717,
				longitude: -90.1864876,
				altitude: 2.5,
				accuracy: 5,
				heading: 'W',
				speed: 0
			}
		}
	},
	contact: {
		"id"           : 1,
		"rawId"        : null,
		"displayName"  : null,
		"name"         : {
			"givenName"      : "John",
			"formatted"      : "John Doe",
			"middleName"     : null,
			"familyName"     : "Doe",
			"honorificPrefix": null,
			"honorificSuffix": null
		},
		"nickname"     : null,
		"phoneNumbers" : [
			{
				"type" : "home",
				"value": "(123) 456-7890",
				"id"   : 0,
				"pref" : false
			},
			{
				"type" : "work",
				"value": "(987) 654-3210",
				"id"   : 1,
				"pref" : false
			}
		],
		"emails"       : [
			{
				"type" : "home",
				"value": "fake.home.email@gmail.com",
				"id"   : 0,
				"pref" : false
			},
			{
				"type" : "work",
				"value": "fake.work.email@gmail.com",
				"id"   : 1,
				"pref" : false
			}
		],
		"addresses"    : null,
		"ims"          : null,
		"organizations": null,
		"birthday"     : null,
		"note"         : null,
		"photos"       : null,
		"categories"   : null,
		"urls"         : null
	},
	geo: {
		host: {
			bearing: 283.18880216858554,
			formatted_bearing: "283.1888°",
			final_bearing: 283.1878662196385,
			formatted_final_bearing: "283.1879°"
		},
		guest: {
			bearing: 103.18786621963852,
			formatted_bearing: "103.1879°",
			final_bearing: 103.18880216858554,
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