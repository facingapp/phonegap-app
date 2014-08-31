app.hardware.start = function()
{
    if(app.hardware.timer === null)
    {
        app.hardware.accelerometer.start();
        app.hardware.compass.start();
        app.hardware.geolocation.start();

	    window.cancelAnimationFrame(app.hardware.timer);

	    function sendData()
	    {
		    if(typeof app.user_data.accelerometer !== 'undefined' && typeof app.user_data.compass !== 'undefined' && typeof app.user_data.geolocation !== 'undefined')
		    {
			    app.socket.emit('send', JSON.stringify(app.user_data));
		    }
		    else
		    {
			    app.user_data = (app.io.mode === 'guest') ?
				    fake_data.guest.user_data :
				    fake_data.host.user_data;

			    app.socket.emit('send', JSON.stringify(app.user_data));
		    }

		    app.hardware.timer = window.requestAnimationFrame(sendData);
	    }

	    app.hardware.timer = window.requestAnimationFrame(sendData);
    }
};