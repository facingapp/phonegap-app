gui.render.status = function(message, fadeout)
{
	var elm = $('#home .message');
	elm.html(message).fadeIn();

	if(fadeout === true)
	{
		clearTimeout(gui.render.timeout.hideStatus);
		gui.render.timeout.hideStatus = setTimeout(function()
		{
			elm.fadeOut('slow');
		}, 3000);
	}
};
