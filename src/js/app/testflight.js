app.testflight = {
	supported: false,
	plugin: null,
	init: function(token_name)
    {
	    app.testflight.supported = (typeof TestFlight !== 'undefined');

	    if(app.testflight.supported)
	    {
		    app.testflight.plugin = new TestFlight();
		    app.testflight.plugin.takeOff(app.testflight.success, app.testflight.fail, token_name);
	    }
    },
	success: function()
	{
		console.log('TestFlight Take Off Success');
	},
	fail: function()
	{
		console.error('TestFlight Take Off Failed');
	}
};
