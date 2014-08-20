![Facing Logo](https://raw.githubusercontent.com/manifestinteractive/facing/master/assets/logo/rectangle/logo_rectangle.jpg)



Facing App Installation
===

To use this repository you will first need to create a PhoneGap application.  You can do so by manually running the commands below in your terminal window, or run the shell script in ./shell_scripts/install.sh which contains the same content.

Automatic Installation ( do you trust me? - _you shouldn't_ )
---

You can install the Facing App via the command line with either `curl` or `wget` which will run this [Shell Script](https://raw.githubusercontent.com/manifestinteractive/facing-app/stable/shell_scripts/install.sh).

### via `curl`

```bash
cd /your/project/folder
curl -L https://raw.githubusercontent.com/manifestinteractive/facing-app/stable/shell_scripts/install.sh | sh
```

### via `wget`

```bash
cd /your/project/folder
wget --no-check-certificate https://raw.githubusercontent.com/manifestinteractive/facing-app/stable/shell_scripts/install.sh -O - | sh
```

Manual Installation
---

### PhoneGap Installation:

```bash
cd /your/project/folder
sudo npm install -g phonegap cordova ios-sim ios-deploy
```

### Creating PhoneGap Project:

```bash
cordova create facing com.manifestinteractive.com Facing
```

### Installing Require Plugins:

```bash
cd facing
cordova platform add ios
cordova platform add android
cordova plugin add com.google.cordova.admob
cordova plugin add org.apache.cordova.battery-status
cordova plugin add org.apache.cordova.console
cordova plugin add org.apache.cordova.contacts
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.device-motion
cordova plugin add org.apache.cordova.device-orientation
cordova plugin add org.apache.cordova.dialogs
cordova plugin add org.apache.cordova.geolocation
cordova plugin add org.apache.cordova.network-information
cordova plugin add org.apache.cordova.splashscreen
cordova plugin add https://github.com/aharris88/phonegap-sms-plugin.git
cordova plugin add https://github.com/danwilson/google-analytics-plugin.git
cordova plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git
cordova plugin add https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin.git
cordova plugin add https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin.git --variable URL_SCHEME=facing
cordova plugin add https://github.com/firassouki/com.cleartag.plugins.EnableBackgroundLocation.git
cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git
cordova plugin add https://github.com/mkuklis/phonegap-websocket
cordova plugin add https://github.com/phonegap-build/StatusBarPlugin.git
cordova plugin add https://github.com/VersoSolutions/CordovaClipboard
```

### Clone Facing App Repository:

```bash
sudo rm -fr www
git clone -b stable https://github.com/manifestinteractive/facing-app.git www
```

### Build Application & Launch in iOS Simulator:

```bash
cordova build ios
cordova emulate ios
```
