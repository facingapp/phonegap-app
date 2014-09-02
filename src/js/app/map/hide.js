app.map.hide = {

	init: function()
	{
		if(typeof mapKit === 'undefined')
		{
			return false;
		}

		mapKit.hideMap(app.map.hide.success, app.map.hide.error);
	},
	error: function()
	{

	},
	success: function()
	{

	}
};