// Inject Environment Specific Socket Script
(function(d, script){

	try {
		script = d.createElement('script');
		script.type = 'text/javascript';
		script.src = (config.app.env == 'dev')
			? config.app.dev.socket.js
			: config.app.prod.socket.js;
		script.async = false;

		// Wait for Onload Event Before initializing
		script.onload = function(){
			app.initialize();
		};

		// There was a problem, but we're setup to handle it within the app
		script.onerror = function(){
			app.initialize(false);
		};

		d.getElementsByTagName('head')[0].appendChild(script);
	}
	catch(err)
	{
		app.util.debug('error', err.message);
	}

}(document));

if(config.app.env == 'dev')
{
	document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
}

// Handler for Custom facing:// protocol
function handleOpenURL(url)
{
	// This will set an internal flag to launch during app.initialize
	app.launch_invite_code = url.replace('facing://invite/', '');

	// Check if the app is already initialized ( use might have app running in background before tapping invite link )
	if(app.initialized)
	{
		app.io.joinSpace(app.launch_invite_code, 'guest');
	}
}

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
			|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

window.onbeforeunload = function(){
	if(app.io.space)
	{
		app.io.leaveSpace();
	}
}