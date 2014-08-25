app.ad.display = {
    
    banner: function()
    {
        if(typeof AdMob === 'undefined' ||config.app.paidApp === true)
        {
            return false;
        }

        app.stats.event('Advertising', 'Request', 'Requesting New Ad Content');

        AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER, app.ad.display.success, app.ad.display.error);
    },
    success: function()
    {
        app.stats.event('Advertising', 'Request', 'Successfully Received New Ad Content');

        gui.resize();
    },
    error: function()
    {
        app.stats.event('Advertising', 'Request', 'Failed to Receive New Ad Content');
    }
};
