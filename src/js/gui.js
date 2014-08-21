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
