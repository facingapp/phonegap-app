app.bindEvents = function()
{
	// The event fires when Cordova is fully loaded.
	if(typeof device !== 'undefined')
	{
		document.addEventListener('deviceready', app.events.deviceReady, false);

		// The event fires when an application is put into the background.
		document.addEventListener('pause', app.events.pause, false);

		// The event fires when an application is retrieved from the background.
		document.addEventListener('resume', app.events.resume, false);

		document.addEventListener('batterycritical', app.events.batteryCritical, false);

		document.addEventListener('online', app.events.networkOnline, false);
		document.addEventListener('offline', app.events.networkOffline, false);

		/* Ad Specific Event Listeners */
		/*
		 document.addEventListener('onReceiveAd', callback);
		 document.addEventListener('onFailedToReceiveAd', callback);
		 document.addEventListener('onDismissScreen', callback);
		 document.addEventListener('onPresentScreen', callback);
		 document.addEventListener('onLeaveApplication', callback);
		 */
	}
	// this is not a device
	else
	{
		app.events.deviceReady();
	}

};
