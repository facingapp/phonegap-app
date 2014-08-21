app.ad.create = {
    banner: function()
    {
        if(config.app.paidApp === true)
        {
            return false;
        }

        app.stats.event('Advertising', 'Create', 'Creating New Ad Placeholder');

        var ad = ( /(android)/i.test(navigator.userAgent) ) ?
            config.google.admob.ad_units.android :
            config.google.admob.ad_units.ios;

        var options = {
            adSize: AdMob.AD_SIZE.SMART_BANNER,
            isTesting: (config.app.env === 'dev'),
            adExtras:
            {
                color_bg: '00151c',
                color_bg_top: '00151c',
                color_border: '00151c',
                color_link: '5c8064',
                color_text: 'FFFFFF',
                color_url: '5c8064'
            }
        };

        AdMob.setOptions(options);

        AdMob.createBanner(ad.banner, app.ad.create.success, app.ad.create.error);
    },
    success: function()
    {
        app.stats.event('Advertising', 'Create', 'Successfully Created New Ad Placeholder');

        // fix for weird glitch in ad placement
        setTimeout(function(){
            app.ad.display.banner();
        }, 500);

    },
    error: function()
    {
        app.stats.event('Advertising', 'Create', 'Failed to Create New Ad Placeholder');
    }
};
