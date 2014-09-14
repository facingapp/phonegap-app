gui.resize = function()
{
	gui.screen = {
		width: (app.platform === 'desktop') ? window.innerWidth : screen.width,
		height: (app.platform === 'desktop') ? window.innerHeight : screen.height
	};

	// Reset Container Elements
	$('.container, .content, .panel').css({
		width: gui.screen.width,
		height: gui.screen.height
	});

	// Get some initial measurements
	var padding = (gui.screen.height > 480) ? 40 : 25;
	var button_height = $('.find-a-friend').height() - 20; // 20 is for border on button
	var information_top = ( ( gui.screen.height / 2 ) + ( button_height / 2 ) ) + padding;

	// Move UI Elements that need it
	$('.information').css('top', information_top);
	$('.logo').css('top', gui.screen.height * 0.115);
};
