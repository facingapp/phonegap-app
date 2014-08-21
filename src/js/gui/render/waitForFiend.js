gui.render.waitForFiend = function(button_id, invite_code, firstname)
{
    app.stats.event('Navigation', 'Contact', 'Using '+ button_id + ' Button with ID ' + invite_code);
    gui.render.status('<i class="fa fa-circle-o-notch fa-fw fa-spin"></i> Waiting for '+ firstname + ' to Connect');
    $('.contact-options').fadeOut();

    setTimeout(function(){
        app.ad.create.banner();
    }, 250);
};
