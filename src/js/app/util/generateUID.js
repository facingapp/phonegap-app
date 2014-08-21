app.util.generateUID = function()
{
    var UID = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < 10; i++)
    {
        UID += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return UID;
};
