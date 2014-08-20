#!/bin/sh

echo " "
echo "PhoneGap Installation:"
echo " "

sudo npm install -g phonegap cordova ios-sim ios-deploy

echo " "
echo "Creating PhoneGap Project:"
echo " "

cordova create facing com.manifestinteractive.com Facing

echo " "
echo "Installing Require Plugins:"
echo " "

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

echo " "
echo "Clone Facing App Repository:"
echo " "

sudo rm -fr www
git clone -b stable https://github.com/manifestinteractive/facing-app.git www

echo " "
echo "Copy Config File:"
echo " "

cp www/config.dist.js www/config.js

echo " "
echo "Build Application & Launch in iOS Simulator:"
echo " "

cordova build ios
cordova emulate ios
