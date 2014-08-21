/*! Facing App - Facing App PhoneGap Application
 * @link https://youfacing.me
 * @author Manifest Interactive, LLC, <hello@manifestinteractive.com>
 * @version 0.3.0
 * @license Released under the GPL-2.0+ license
 * @builddate 2014-08-21
 */
var gui = {

    timeout: {},
    touchEvents: 'touchstart mousedown',
    currentPanel: 'home',
    base: (config.app.env === 'dev') ? config.app.dev.base : config.app.prod.base
};

// Handler for Custom facing:// protocol
function handleOpenURL(url) {
    var invite_code = url.replace('facing://invite/', '');
    app.io.joinSpace(invite_code);
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

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

gui.handle = {};

gui.initialize = function()
{
    app.util.debug('log', 'Setting up GUI');

    gui.prepareDevice();
    gui.handle.navigation();
    gui.handle.contacts();
    gui.animate();
};

gui.prepareDevice = function()
{
    app.util.debug('log', 'Preparing Device');

    if(typeof StatusBar !== 'undefined')
    {
        app.util.debug('log', 'Hiding Status Bar');
        StatusBar.hide();
    }

    var platform = (typeof device !== 'undefined' && typeof device.platform !== 'undefined') ?
        device.platform :
        'desktop';

    $('html').addClass(platform.toLowerCase());

    // Force Width & Height on Elements that need it
    gui.resize();

    // reposition some elements for smaller screens
    if(screen.height <= 480)
    {
        $('.logo').css('top', '60px');
        $('.information').css({ 'bottom': '60px', 'height': '60px' });
    }

    if(config.app.env === 'dev')
    {
        $('.content').append('<div class="dev"><\/div>');
    }
};

gui.render = {};

gui.reset = function()
{
    app.ad.remove.banner();

    $('.reset-gui').fadeOut();
    $('.logo').removeClass('animated fadeInDown fadeOut');
    $('.find-a-friend').attr('style', '').removeClass('animated flipInX no-image contact');
    $('.contact-options').hide();
    gui.render.status('', true);
    $('.me .acceleration ul').html('');
    $('.me .geolocation ul').html('');
    $('.me .compass ul').html('');
    $('.friend .acceleration ul').html('');
    $('.friend .geolocation ul').html('');
    $('.friend .compass ul').html('');
    $('.welcome').removeClass('animated fadeInUp fadeOutDown').hide();

    setTimeout(function(){
        $('.find-a-friend').addClass('default animated flipInX');
        $('.logo').removeClass('fadeLogo').addClass('animated fadeInDown').show();
    }, 100);

    gui.animate();

    // @todo: kill any open socket connections

    app.util.debug('log', 'GUI Reset');
};

gui.resize = function()
{
    $('.container, .content, .panel').width(gui.screen.width);
    $('.container, .content, .panel').height(gui.screen.height);
};

gui.screen = {
    width: screen.width,
    height: screen.height
};

gui.handle.contacts = function()
{
    app.util.debug('log', 'Setting up Friend Picker');

    $('.find-a-friend').on(gui.touchEvents, function()
    {
        app.util.debug('log', 'Picking a Friend ...');

        clearTimeout(gui.timeout.welcomeIn);
        clearTimeout(gui.timeout.welcomeOut);

        $('.contact-options').hide();
        $('.contact-option').removeClass('animated swing');

        $('#home .welcome').removeClass('animated fadeInUp fadeOutDown').hide();

        if(typeof navigator.contacts !== 'undefined')
        {
            navigator.contacts.pickContact(function(contact)
            {
                console.log(JSON.stringify(contact));
                gui.render.contact.update(contact);

            }, function(err){ gui.render.contact.reset(err); });

            app.stats.event('Navigation', 'Contact', 'Picking Contact');
        }
        else
        {
            app.util.debug('warn', 'This Device does not support Contacts');
            app.stats.event('Navigation', 'Contact Error', 'Device Does Not Support Contacts');
            app.util.debug('debug', 'Generating Fake Contact for Dev Purposes');

            app.uuid = 'B734FE43-F4FD-C884-A901-3ADD585D0C41'; // Fake GUID

            var fake_contact = {
                "id"           : 1,
                "rawId"        : null,
                "displayName"  : null,
                "name"         : {
                    "givenName"      : "John",
                    "formatted"      : "John Doe",
                    "middleName"     : null,
                    "familyName"     : "Doe",
                    "honorificPrefix": null,
                    "honorificSuffix": null
                },
                "nickname"     : null,
                "phoneNumbers" : [
                    {
                        "type" : "home",
                        "value": "(123) 456-7890",
                        "id"   : 0,
                        "pref" : false
                    },
                    {
                        "type" : "work",
                        "value": "(987) 654-3210",
                        "id"   : 1,
                        "pref" : false
                    }
                ],
                "emails"       : [
                    {
                        "type" : "home",
                        "value": "fake.home.email@gmail.com",
                        "id"   : 0,
                        "pref" : false
                    },
                    {
                        "type" : "work",
                        "value": "fake.work.email@gmail.com",
                        "id"   : 1,
                        "pref" : false
                    }
                ],
                "addresses"    : null,
                "ims"          : null,
                "organizations": null,
                "birthday"     : null,
                "note"         : null,
                "photos"       : null,
                "categories"   : null,
                "urls"         : null
            };

            gui.render.contact.update(fake_contact);
        }

        return false;
    });

    var user_shuffle = 0;
    setInterval(function(){
        var friends = $('.find-a-friend.default');
        var width = friends.width();

        user_shuffle++;

        if(user_shuffle > 9)
        {
            user_shuffle = 0;
        }

        var position = -(user_shuffle * width);

        friends.css({ 'background-position': position + 'px 0' });
    }, 4000);

    $('.force-reset-gui').on(gui.touchEvents, function(){
        app.util.debug('log', 'Resetting GUI ...');
        gui.reset();

        return false;
    });
};

gui.handle.navigation = function()
{

    app.util.debug('log', 'Setting up Navigation');

    var items = $('.slide');
    var content = $('.content');

    $('#navToggle').on(gui.touchEvents, function(event) {
        event.stopPropagation();
        event.preventDefault();

        if (content.hasClass('open'))
        {
            $(items).removeClass('open').addClass('close');
            app.stats.event('Navigation', 'Menu', 'Close');
        }
        else
        {
            $(items).removeClass('close').addClass('open');
            app.stats.event('Navigation', 'Menu', 'Open');
        }

        return false;
    });

    content.on(gui.touchEvents, function(){
        if (content.hasClass('open'))
        {
            $(items).removeClass('open').addClass('close');
            app.stats.event('Navigation', 'Menu', 'Closed by Page Tap');
        }
    });

    $('nav a').on(gui.touchEvents, function(){

        var panel = $(this).data('panel');
        var label = $(this).html();

        // Do nothing if user clicks tab for current panel
        if(panel === gui.currentPanel)
        {
            $('#navToggle').trigger('touchstart');
            return false;
        }

        app.stats.event('Navigation', 'Page Change', panel);

        $('nav a').removeClass('active');
        $('.panel').removeClass('active');

        gui.currentPanel = panel;

        $(this).addClass('active');
        $('#' + panel).addClass('active');

        $('header .label').html(label);

        $('#navToggle').trigger('touchstart');

        if(panel === 'home')
        {
            gui.reset();
        }
        else
        {
            $('.logo').hide();
            app.ad.remove.banner();
        }

        if(panel === 'my-data' || panel === 'friends-data')
        {
            //app.hardware.start();
        }
        else
        {
            //app.hardware.stop();
        }

        return false;
    });

    $('a.clear-log').on(gui.touchEvents, function(){
        $('#dev-log .output ul').html('');
        return false;
    });
};

gui.render.contact = {

    update: function(contact)
    {
        app.stats.event('Navigation', 'Contact', 'Displaying Selected Contact');

        // Allow user to Stop
        $('.reset-gui').fadeIn();

        // Setup initial data
        var name = contact.name.formatted;
        var first_name = contact.name.givenName;
        var invite_code = app.util.generateUID();

        // Leave if there was an issue with the contact
        if(!contact || typeof contact.name === 'undefined' || contact.name.givenName === '')
        {
            app.util.debug('warn', 'Invalid Contact');
            return false;
        }

        // Communicate with Socket that we want to initiate a session
        app.io.createSpace(invite_code);
        app.io.joinSpace(invite_code);

        // Add data attributes to links for later use
        $('.contact-option').data('invite_code', invite_code);
        $('.contact-option').data('firstname', first_name);

        // Update GUI
        gui.render.status('Find ' + name);

        // Remove Previous Event Bindings
        $('#clipboard, #sms, #email').off();

        console.log(JSON.stringify(contact));

        // Fetch Contact Details
        var email = (contact && contact.emails && contact.emails.length > 0) ?
            contact.emails[0].value :
            '';

        var number = (contact && contact.phoneNumbers && contact.phoneNumbers.length > 0) ?
            contact.phoneNumbers[0].value :
            '';

        // Create Messages to Send
        var message = 'Hey ' + first_name + ', can you hop on Facing so I can find you? '+ gui.base +'/invite/' + invite_code;
        var html_message = 'Hey ' + first_name + ',<br><br>Can you hop on Facing so I can find you?<br><br><a href="'+ gui.base +'/invite/' + invite_code + '">'+ gui.base +'/invite/' + invite_code + '</a>';


        // Setup SMS Button
        if(number !== '')
        {
            number = number.replace(/[^0-9]/g, '');

            $('#sms').on(gui.touchEvents, function(){

                $('#sms').removeClass('animated swing');
                setTimeout(function(){ $('#sms').addClass('animated swing'); }, 100);

                if(sms && typeof sms.send !== 'undefined')
                {
                    sms.send(number, message, '', function(){ gui.render.waitForFiend('SMS', invite_code, first_name); }, function(err){});
                }
                else
                {
                    app.util.debug('warn', 'Device Unable to Send SMS');
                }

                return false;
            });

            // Show SMS button if it is hidden
            $('#sms').fadeIn();
        }
        else
        {
            // Hide SMS Button since we can't use it
            $('#sms').hide();
        }


        // Setup Email Button
        if(email !== '')
        {
            $('#email').on(gui.touchEvents, function(){

                $('#email').removeClass('animated swing');
                setTimeout(function(){ $('#email').addClass('animated swing'); }, 100);

                // Code for Devices
                if(window.plugin && typeof window.plugin.email !== 'undefined')
                {
                    // Create Email Contents
                    var email_options = {
                        to: [email],
                        subject: 'Facing App Invite',
                        body: html_message,
                        isHtml: true
                    };

                    // Check if the user has an existing email client
                    window.plugin.email.isServiceAvailable(

                        function (isAvailable)
                        {
                            // User has Email Service
                            if(isAvailable)
                            {
                                window.plugin.email.open(email_options, function(){
                                    console.log('email view dismissed');
                                }, this);

                                gui.render.waitForFiend('Email', invite_code, first_name);
                            }
                            // User has No Email Service, alert them just in case its a new phone or something
                            else
                            {
                                navigator.notification.alert(
                                    'You do not have any Email Clients setup to send Email.',
                                    function(){},
                                    'Unable to Send Email',
                                    'OK'
                                );
                            }
                        }
                    );

                    return false;
                }
                // Fallback for Development
                else
                {
                    $('#email').attr('href', 'mailto:' + email + '?subject=' + encodeURIComponent('Facing App Invite') + '&body=' + encodeURIComponent(message)).show();
                    app.util.debug('warn', 'Device Unable to Send SMS');
                }
            });

            // Show Email button if it is hidden
            $('#email').fadeIn();
        }
        else
        {
            // Hide Email Button since we can't use it
            $('#email').hide();
        }


        // Setup Clipboard Button
        $('#clipboard').on(gui.touchEvents, function(){

            $('#clipboard').removeClass('animated swing');
            setTimeout(function(){ $('#clipboard').addClass('animated swing'); }, 100);

            var text = gui.base + '/invite/' + invite_code;

            if(typeof cordova !== 'undefined')
            {
                cordova.plugins.clipboard.copy(text);

                navigator.notification.alert(
                    text,
                    function(){
                        gui.render.waitForFiend('Clipboard', invite_code, first_name);
                    },
                    'Copied to Clipboard',
                    'OK'
                );
            }
            else
            {
                app.util.debug('warn', 'Unable to Copy to Device Clipboard');
            }

            return false;
        });


        // Update Contact Image
        var contact_image = $('.find-a-friend');
            contact_image.removeClass('no-image default');

        if(contact && contact.photos && contact.photos[0].value !== '')
        {
            contact_image.css('background-image', 'url("' + contact.photos[0].value + '")');
        }
        else
        {
            contact_image.css('background-image', '');
            contact_image.addClass('no-image');
        }

        contact_image.addClass('contact');

        // Fade In Contact Options
        $('.contact-options').show();

        // Update Image
        $('.find-a-friend').removeClass('animated flipInX');
        setTimeout(function(){ $('.find-a-friend').addClass('animated flipInX'); }, 100);
    },
    reset: function(err)
    {
        app.util.debug('log', 'Error: ' + err);
        gui.render.status('<i class="fa fa-times-circle"></i> Error Retrieving Contact', true);
        $('.contact-options').fadeOut();
    }
};

gui.render.debug = function(level, message)
{
    $('#dev-log .output ul').append('<li class="'+ level +'"><i class="fa fa-angle-right"></i>&nbsp; ' + message + '</li>');
};

gui.render.friend = {

    debug: function(data)
    {
        var user_data = JSON.parse(data);

        if(typeof user_data.acceleration !== 'undefined')
        {
            var acceleration = '' +
                '<li><strong>X</strong>:&nbsp; ' + user_data.acceleration.x + '</li>' +
                '<li><strong>Y</strong>:&nbsp; ' + user_data.acceleration.y + '</li>' +
                '<li><strong>Z</strong>:&nbsp; ' + user_data.acceleration.z + '</li>';

            $('.friend .acceleration ul').html(acceleration);
        }

        if(typeof user_data.geolocation !== 'undefined')
        {
            var geolocation = '' +
                '<li><strong>Latitude</strong>:&nbsp; ' + user_data.geolocation.latitude + ' &deg;</li>' +
                '<li><strong>Longitude</strong>:&nbsp; ' + user_data.geolocation.longitude + ' &deg;</li>' +
                '<li><strong>Altitude</strong>:&nbsp; ' + user_data.geolocation.altitude + '</li>' +
                '<li><strong>Accuracy</strong>:&nbsp; ' + user_data.geolocation.accuracy + '</li>' +
                '<li><strong>Heading</strong>:&nbsp; ' + user_data.geolocation.heading + '</li>' +
                '<li><strong>Speed</strong>:&nbsp; ' + user_data.geolocation.speed + '</li>';

            $('.friend .geolocation ul').html(geolocation);
        }

        if(typeof user_data.compass !== 'undefined')
        {
            var compass = '' +
                '<li><strong>Direction</strong>:&nbsp; ' + user_data.compass.direction + '</li>' +
                '<li><strong>Magnetic Heading</strong>:&nbsp; ' + user_data.compass.magnetic_heading + ' &deg;</li>';

            $('.friend .compass ul').html(compass);
        }
    }
};

gui.render.io = function(message, fadeout)
{
    var elm = $('#home .io .status');
    elm.html(message).fadeIn();

    if(fadeout === true)
    {
        elm.fadeOut('slow');
    }
};

gui.render.self = {

    debug: function()
    {
        if(typeof app.user_data.acceleration !== 'undefined')
        {
            var acceleration = '' +
                '<li><strong>X</strong>:&nbsp; ' + app.user_data.acceleration.x + '</li>' +
                '<li><strong>Y</strong>:&nbsp; ' + app.user_data.acceleration.y + '</li>' +
                '<li><strong>Z</strong>:&nbsp; ' + app.user_data.acceleration.z + '</li>';

            $('.me .acceleration ul').html(acceleration);
        }

        if(typeof app.user_data.geolocation !== 'undefined')
        {
            var geolocation = '' +
                '<li><strong>Latitude</strong>:&nbsp; ' + app.user_data.geolocation.latitude + ' &deg;</li>' +
                '<li><strong>Longitude</strong>:&nbsp; ' + app.user_data.geolocation.longitude + ' &deg;</li>' +
                '<li><strong>Altitude</strong>:&nbsp; ' + app.user_data.geolocation.altitude + '</li>' +
                '<li><strong>Accuracy</strong>:&nbsp; ' + app.user_data.geolocation.accuracy + '</li>' +
                '<li><strong>Heading</strong>:&nbsp; ' + app.user_data.geolocation.heading + '</li>' +
                '<li><strong>Speed</strong>:&nbsp; ' + app.user_data.geolocation.speed + '</li>';

            $('.me .geolocation ul').html(geolocation);
        }

        if(typeof app.user_data.compass !== 'undefined')
        {
            var compass = '' +
                '<li><strong>Direction</strong>:&nbsp; ' + app.user_data.compass.direction + '</li>' +
                '<li><strong>Magnetic Heading</strong>:&nbsp; ' + app.user_data.compass.magnetic_heading + ' &deg;</li>';

            $('.me .compass ul').html(compass);
        }
    }
};

gui.render.status = function(message, fadeout)
{
    var elm = $('#home .message');
        elm.html(message).fadeIn();

    if(fadeout === true)
    {
        elm.fadeOut('slow');
    }
};

gui.render.waitForFiend = function(button_id, invite_code, firstname)
{
    app.stats.event('Navigation', 'Contact', 'Using '+ button_id + ' Button with ID ' + invite_code);
    gui.render.status('<i class="fa fa-circle-o-notch fa-fw fa-spin"></i> Waiting for '+ firstname + ' to Connect');
    $('.contact-options').fadeOut();

    setTimeout(function(){
        app.ad.create.banner();
    }, 250);
};
