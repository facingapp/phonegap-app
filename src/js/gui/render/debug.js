gui.render.debug = function(level, message)
{
	$('#dev-log .output ul').append('<li class="' + level + '">' + message + '</li>');
};
