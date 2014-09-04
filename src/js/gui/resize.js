gui.resize = function()
{
	gui.screen = {
		width: (app.platform === 'desktop') ? window.innerWidth : screen.width,
		height: (app.platform === 'desktop') ? window.innerHeight : screen.height
	};

	$('.container, .content, .panel').width(gui.screen.width);
    $('.container, .content, .panel').height(gui.screen.height);
};
