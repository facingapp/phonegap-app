var gui = {
    timeout: {},
	counter: {},
    touchEvents: 'tap press',
	touchOptions: null,
    currentPanel: 'home',
	enable_animation: true,
    base: (config.app.env === 'dev') ? config.app.dev.base : config.app.prod.base
};