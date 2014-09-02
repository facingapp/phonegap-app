app.map.addPins = {

	init: function()
	{
		if(typeof mapKit === 'undefined')
		{
			return false;
		}

		mapKit.addMapPins(app.map.pins, app.map.addPins.success, app.map.addPins.error);
	},
	error: function()
	{

	},
	success: function()
	{

	}
};