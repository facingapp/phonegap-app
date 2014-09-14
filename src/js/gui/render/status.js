gui.render.status = function(message, fadeout, timeout)
{
	var elm = $('#home .message');
	elm.html(message).fadeIn();

	if(fadeout === true)
	{
		if(!timeout)
		{
			timeout = 3000;
		}
		clearTimeout(gui.render.timeout.hideStatus);
		gui.render.timeout.hideStatus = setTimeout(function()
		{
			elm.fadeOut('slow');
		}, timeout);
	}
};
