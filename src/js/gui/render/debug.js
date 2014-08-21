gui.render.debug = function(level, message)
{
    $('#dev-log .output ul').append('<li class="'+ level +'"><i class="fa fa-angle-right"></i>&nbsp; ' + message + '</li>');
};
