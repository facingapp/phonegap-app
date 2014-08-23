var app = {

    timeout: {},
    platform: (typeof device !== 'undefined') ? device.platform : 'desktop',
    socket: null,
    uuid: null,
    initialized: false,
    online: false,
    user_data: {
        app: {
            device: this.platform,
            dataType: 'stream'
        }
    }
};

(function(d, script){

	try {
		script = d.createElement('script');
		script.type = 'text/javascript';
		script.src = (config.app.env == 'dev')
			? config.app.dev.socket.js
			: config.app.prod.socket.js;
		script.async = true;
		script.onload = function(){
			app.initialize();
		};
		script.onerror = function(){
			app.initialize();
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
function handleOpenURL(url) {
	var invite_code = url.replace('facing://invite/', '');
	app.io.joinSpace(invite_code, 'guest');
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

window.onbeforeunload = function(){
	app.io.leaveSpace();
}