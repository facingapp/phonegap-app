var gui = {

    timeout: {},
	counter: {},
    touchEvents: 'tap',
	touchOptions: null,
    currentPanel: 'home',
    base: (config.app.env === 'dev') ? config.app.dev.base : config.app.prod.base
};