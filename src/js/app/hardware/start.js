app.hardware.start = function()
{
    if(app.hardware.timer === null)
    {
        app.hardware.accelerometer.start();
        app.hardware.compass.start();
        app.hardware.geolocation.start();

        app.hardware.timer = setInterval(function(){

            if(typeof app.user_data.accelerometer !== 'undefined' && typeof app.user_data.compass !== 'undefined' && typeof app.user_data.geolocation !== 'undefined')
            {
                app.sendData();
            }

            gui.render.self.debug();

        }, 1000);
    }
};
