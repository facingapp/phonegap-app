gui.render.status = function(message, fadeout)
{
    var elm = $('#home .message');
        elm.html(message).fadeIn();

    if(fadeout === true)
    {
        elm.fadeOut('slow');
    }
};
