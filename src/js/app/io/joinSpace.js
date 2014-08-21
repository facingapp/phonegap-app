app.io.joinSpace = function(invite_code)
{
    if(app.socket && app.socket.emit)
    {
        app.socket.emit('switchSpace', invite_code, app.uuid);
    }

    app.stats.event('Socket', 'Join', app.uuid + ' joined ' + invite_code);
};
