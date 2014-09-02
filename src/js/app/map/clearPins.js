app.map.clearPins = {

	init: function()
	{
		if(typeof mapKit === 'undefined')
		{
			return false;
		}

		mapKit.addMapPins(app.map.pins, app.map.clearPins.success, app.map.clearPins.error);
	},
	error: function()
	{

	},
	success: function()
	{

	}
};