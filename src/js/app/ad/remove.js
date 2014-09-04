app.ad.remove = {
    
    banner: function()
    {
        if(typeof AdMob === 'undefined' || config.app.paidApp === true)
        {
            return false;
        }

        app.stats.event('Advertising', 'Remove', 'Removing Ad Placeholder');

        AdMob.removeBanner(app.ad.remove.success, app.ad.remove.error);
    },
    success: function()
    {
        app.stats.event('Advertising', 'Remove', 'Successfully Removed Ad Placeholder');

	    gui.resize();
    },
    error: function()
    {
        app.stats.event('Advertising', 'Remove', 'Failed to Remove Ad Placeholder');

	    gui.resize();
    }
};
