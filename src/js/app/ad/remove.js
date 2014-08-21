app.ad.remove = {
    
    banner: function()
    {
        if(config.app.paidApp === true)
        {
            return false;
        }

        app.stats.event('Advertising', 'Remove', 'Removing Ad Placeholder');

        if(typeof AdMob !== 'undefined')
        {
            AdMob.removeBanner(app.ad.remove.success, app.ad.remove.error);
        }
    },
    success: function()
    {
        app.stats.event('Advertising', 'Remove', 'Successfully Removed Ad Placeholder');
    },
    error: function()
    {
        app.stats.event('Advertising', 'Remove', 'Failed to Remove Ad Placeholder');
    }
};
