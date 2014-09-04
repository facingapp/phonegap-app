var app = {

    timeout: {},
    platform: (typeof device !== 'undefined') ? device.platform : 'desktop',
    socket: null,
    uuid: null,
    initialized: false,
	launch_invite_code: null,
    online: false,
	sharing_data: false,
	enable_tour: false,
    user_data: {
        app: {
            device: this.platform,
            dataType: 'stream'
        }
    }
};