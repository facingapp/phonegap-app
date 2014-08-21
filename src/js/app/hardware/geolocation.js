app.hardware.geolocation = {

    obj: null,
    settings:
    {
        maximumAge: 1000,
        timeout: 30000,
        enableHighAccuracy: true
    },
    start: function()
    {
        if(typeof navigator.geolocation === 'undefined')
        {
            app.util.debug('warn', 'No GPS Found');
            app.stats.event('Hardware', 'Missing', 'No GPS Found');
            return false;
        }

        try
        {
            app.hardware.geolocation.obj = navigator.geolocation.watchPosition(
                app.hardware.geolocation.success,
                app.hardware.geolocation.error,
                app.hardware.geolocation.settings
            );

            app.stats.event('Hardware', 'Watching', 'GPS');
        }
        catch(err)
        {
            app.util.debug('error', err.message);
            app.stats.event('Hardware', 'Error', 'Failed to Watch GPS');
        }
    },
    stop: function()
    {
        try
        {
            navigator.geolocation.clearWatch(app.hardware.geolocation.obj);
            app.hardware.geolocation.obj = null;

            app.stats.event('Hardware', 'Stop Watching', 'GPS');
        }
        catch(err)
        {
            app.util.debug('error', err.message);
        }
    },
    success: function(position)
    {
        app.user_data.geolocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: app.hardware.geolocation.distance( position.coords.altitude ),
            accuracy: app.hardware.geolocation.distance( position.coords.accuracy ),
            heading: app.hardware.compass.direction(position.coords.heading),
            speed: app.hardware.geolocation.speed( position.coords.speed )
        };
    },
    error: function(error)
    {
        app.util.debug('error', 'Geolocation Error: ' + error.message);
        app.stats.event('Hardware', 'Error', 'Geolocation Error: ' + error.message);
    },
    distance: function(value, use_metric)
    {
        var measure = (use_metric) ?
            +(Math.round(value + "e+2")  + "e-2") :
            Math.round( value * 3 );

        var unit = (use_metric) ? 'Meters' : 'Feet';

        if(measure < 0)
        {
            measure = 0;
        }

        return measure + ' ' + unit;
    },
    speed: function(value, use_metric)
    {
        var measure = (use_metric) ?
            Math.round(value) :
            Math.round( value * 2.23694 );
        var unit = (use_metric) ? 'mps' : 'MPH';

        if(measure < 0)
        {
            measure = 0;
        }

        return measure + ' ' + unit;
    }
};
