app.hardware.stop = function()
{
    if(app.hardware.accelerometer.obj)
    {
        app.hardware.accelerometer.stop();
    }
    if(app.hardware.compass.obj)
    {
        app.hardware.compass.stop();
    }
    if(app.hardware.geolocation.obj)
    {
        app.hardware.geolocation.stop();
    }

	window.cancelAnimationFrame(app.hardware.timer);
    app.hardware.timer = null;
};
