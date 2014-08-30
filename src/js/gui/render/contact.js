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

        // Add data attributes to links for later use
        $('.contact-option').data('invite_code', invite_code);
        $('.contact-option').data('firstname', first_name);

        // Update GUI
        gui.render.status('<i class="fa fa-chevron-down"></i>&nbsp; Contact '+ name +' &nbsp;<i class="fa fa-chevron-down"></i>');

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
	                gui.render.waitForFiend('SMS', invite_code, first_name);
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
	                            app.notification.alert(
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
	                gui.render.waitForFiend('Email', invite_code, first_name);
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

	            app.notification.alert(
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
	            gui.render.waitForFiend('Clipboard', invite_code, first_name);
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
        else if(email !== '')
        {
	        var default_image = encodeURIComponent('https://raw.githubusercontent.com/manifestinteractive/facing-app/stable/assets/img/no-image-350.jpg');

	        contact_image.css('background-image', '');
	        contact_image.addClass('no-image');
	        contact_image.css('background-image', 'url("https://secure.gravatar.com/avatar/'+ md5(email) +'?s=350&r=pg&d='+ default_image +'")');
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
