gui.render.io = function(message, fadeout)
{
    var elm = $('#home .io .status');
    elm.html(message).fadeIn();

    if(fadeout === true)
    {
        elm.fadeOut('slow');
    }
};
