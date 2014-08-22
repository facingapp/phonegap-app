![Facing Logo](https://raw.githubusercontent.com/manifestinteractive/facing/master/assets/logo/rectangle/logo_rectangle.jpg)

Requirements
===

* [PhoneGap v3.5+](http://phonegap.com/install/)
* [Xcode](http://docs.phonegap.com/en/3.5.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide)
* [Android SDK](http://docs.phonegap.com/en/3.5.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide)

Facing App Installation
===

To use this repository you will first need to create a PhoneGap application.  You can do so by manually running the commands below in your terminal window, or run the shell script in ./shell_scripts/install.sh which contains the same content.

Automatic Installation ( do you trust me? ):
---

You can install the Facing App via the command line with either `curl` or `wget` which will run this [Shell Script](https://raw.githubusercontent.com/manifestinteractive/facing-app/stable/shell_scripts/install.sh).

### via `curl`:

```bash
cd /your/project/folder
curl -L https://raw.githubusercontent.com/manifestinteractive/facing-app/stable/shell_scripts/install.sh | sh
```

### via `wget`:

```bash
cd /your/project/folder
wget --no-check-certificate https://raw.githubusercontent.com/manifestinteractive/facing-app/stable/shell_scripts/install.sh -O - | sh
```

### NOTE:

You will need to modify `./www/assets/js/config.js` to your projects specifications.  Also, you will still need to make the changes listed below in the __iOS Build Settings__.

Manual Installation:
---

### \#1. PhoneGap Installation:

```bash
cd /your/project/folder
npm update -g phonegap cordova grunt-cli
```

### \#2. Creating PhoneGap Project:

```bash
phonegap create facing com.manifestinteractive.com Facing
cd facing
```

### \#3. Clone Facing App Repository:

```bash
rm -fr www
git clone -b stable https://github.com/manifestinteractive/facing-app.git www
```

### \#4. Setup Grunt:

```bash
cd www
npm install
gem install sass
grunt
cd -
```

### \#5. Copy Config File:

```bash
cp www/assets/js/config.dist.js www/assets/js/config.js
```

__NOTE__: You will need to modify `./www/assets/js/config.js` to your projects specifications.

### \#6. Installing Required Plugins:

```bash
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

### \#7. Build Application & Launch in iOS Simulator:

```bash
cordova emulate ios
```

iOS Build Settings:
---

You will need to make a few minor tweaks in iOS manually to make the app run smoothly.

### \#1. Hide Status Bar:

There seems to be a bug where the status bar flickers even though its set to be hidden.  To fix this, open `./facing/platforms/ios/Facing/Facing-Info.plist` in a text editor ( not in XCode ).  And look for the following code:

```xml
<key>UIStatusBarHidden</key>
<true/>
```

and place the following directly below it:

```xml
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>
```

### \#2. Force Portrait Only Mode & More Status Bar Settings:

Since the device uses Orientation for calculations, things get weird if we do not fix the device to a specific rotation.  The config code is supposed to fix this, but it looks like it only does it for iPhones and NOT iPads... so we need to fix this.

1. Open `./facing/platforms/ios/Facing.xcodeproj`
- In the left column of the XCode window that opens, double click the __Facing__ Project
- On the __General__ tab, expand the __Deployment Info__ if it is not already expanded
- Under the __Devices__ Drop down that should have "Universal" selected, you will find __iPhone__ & __iPad__ buttons, for each of these make the following changes:
- For __Device Orientation__ make sure ONLY __Portrait__ is checked
- For __Status Bar Style__, make sure "Hide during application launch" is checked

### \#3. Building on Actual Devices:

While you are making the changes above, you can also set your Team Identity if you happen to be an iOS developer.  Just select your account from the Team section and this will be used for building on native devices.


Build Tools:
===

### \#1. Automation Scripts:

To help speed up development, there are a few tools in `./shell_scripts` that you might want to check out.

* `facingapp.sh` This is a shell script that adds aliases and commands to automate building & debugging.  See the comments at the top of the file for instructions.
* `install.sh` This is the script to automatically install and build the Facing app for you.
* `open-webinspector.applescript` This applescript will automatically launch Apple's Safari Web Inspector for your iOS Simulator. This is used by facingapp.sh and you wont need to mess with it much.

### \#2. Grunt Development:

This project uses Grunt to package separate development files together.  This makes the development process easier as large components are broken up into logical smaller files.

This also means that you __SHOULD NOT__ be edting files in either `assets/js` or `assets/css` folders as these files are built from grunt.

To take advantage of Grunt during the development process, you just need to run the following command to watch for any file changes setup to rebuild the scripts used in the app.

```bash
cd /path/to/facing/www
grunt watch
```

If you do not want to watch for live file changes, you can use the following to repackage code as needed.

```bash
cd /path/to/facing/www
grunt js
grunt css
```

### \#3. Live Reload:

This project supports Live Reload within the App.  This means that if you are running the device on an emulator, its possible to reload assets without having to relaunch the emulator from scratch.  If you are using the native PhoneGap App, you will not need this functionality as that application already reloads on file change.

License
===

![OSI Approved License](http://opensource.org/trademarks/opensource/OSI-Approved-License-100x137.png "OSI Approved License")

![LGPL v3 license](http://www.gnu.org/graphics/lgplv3-147x51.png "LGPL v3 license")

**Facing** is currently licensed under the LGPL v3 license.
