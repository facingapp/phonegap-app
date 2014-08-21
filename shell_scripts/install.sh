#!/bin/sh

echo " "
echo "PhoneGap Installation:"
echo " "

sudo npm update -g phonegap cordova ios-sim ios-deploy grunt-cli

echo " "
echo "Creating PhoneGap Project:"
echo " "

phonegap create facing com.manifestinteractive.com Facing
cd facing

echo " "
echo "Clone Facing App Repository:"
echo " "

sudo rm -fr www
git clone -b stable https://github.com/manifestinteractive/facing-app.git www

echo " "
echo "Setup Grunt:"
echo " "

cd www
npm install grunt-contrib-watch --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-jshint --save-dev
npm install jshint-stylish --save-dev 
cd ../

echo " "
echo "Copy Config File:"
echo " "

cp www/js/config.dist.js www/js/config.js

echo " "
echo "Installing Require Plugins:"
echo " "

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
echo "Build Application & Launch in iOS Simulator:"
echo " "

cordova emulate ios
