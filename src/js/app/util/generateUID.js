app.util.generateUID = function()
{
    var UID = '';
    var possible = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ';

    for(var i=0; i < 10; i++)
    {
        UID += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return UID;
};
