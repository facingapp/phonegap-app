gui.animate = function()
{
    clearTimeout(gui.timeout.message);
    clearTimeout(gui.timeout.welcomeIn);
    clearTimeout(gui.timeout.fadeLogo);
    clearTimeout(gui.timeout.welcomeOut);

    gui.timeout.message = setTimeout(function(){
        $('.status .message').fadeOut('slow');
    }, 100);

    gui.timeout.welcomeIn = setTimeout(function(){
        $('.welcome').addClass('animated fadeInUp').show();
    }, 1500);

    gui.timeout.welcomeOut = setTimeout(function(){
        $('.welcome').addClass('animated fadeOutDown').show();
    }, 6000);

    gui.timeout.fadeLogo = setTimeout(function(){
        $('.logo').addClass('fadeLogo');
    }, 7000);
};
