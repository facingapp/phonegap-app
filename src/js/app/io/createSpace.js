app.io.createSpace = function(invite_code)
{
    if(app.socket && app.socket.emit)
    {
        app.socket.emit('createSpace', invite_code, app.uuid);
    }

    app.stats.event('Socket', 'Create', 'New Space ' + invite_code + ' created by ' + app.uuid);
};
