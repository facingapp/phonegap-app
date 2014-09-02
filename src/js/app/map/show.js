app.map.show = {

	init: function(options)
	{
		if(typeof mapKit === 'undefined')
		{
			return false;
		}

		mapKit.showMap(app.map.show.success, app.map.show.error, options);
	},
	error: function()
	{

	},
	success: function()
	{

	}
};