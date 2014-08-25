var app = {

    timeout: {},
    platform: (typeof device !== 'undefined') ? device.platform : 'desktop',
    socket: null,
    uuid: null,
    initialized: false,
    online: false,
    user_data: {
        app: {
            device: this.platform,
            dataType: 'stream'
        }
    }
};