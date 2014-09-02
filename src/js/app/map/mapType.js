app.map.mapType = {

	change: function(type)
	{
		if(typeof mapKit === 'undefined')
		{
			return false;
		}

		switch(type)
		{
			case 'none':
				app.map.type = mapKit.mapType.MAP_TYPE_NONE;
				break;

			case 'normal':
				app.map.type = mapKit.mapType.MAP_TYPE_NORMAL;
				break;

			case 'satellite':
				app.map.type = mapKit.mapType.MAP_TYPE_SATELLITE;
				break;

			case 'terrain':
				app.map.type = mapKit.mapType.MAP_TYPE_TERRAIN;
				break;

			case 'hybrid':
				app.map.type = mapKit.mapType.MAP_TYPE_HYBRID;
				break;
		}

		mapKit.mapType(app.map.type, app.map.mapType.success, app.map.mapType.error);
	},
	error: function()
	{

	},
	success: function()
	{

	}
};