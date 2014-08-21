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
