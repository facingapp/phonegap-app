#!/bin/sh

echo " "
echo "PhoneGap Installation:"
echo " "

npm update -g phonegap cordova ios-sim ios-deploy grunt-cli

echo " "
echo "Creating PhoneGap Project:"
echo " "

phonegap create facing com.manifestinteractive.com Facing
cd facing

echo " "
echo "Clone Facing App Repository:"
echo " "

rm -fr www
git clone -b stable https://github.com/facingapp/phonegap-app.git www

echo " "
echo "Setup Grunt:"
echo " "

cd www
npm install
gem install sass
grunt
cd -

echo " "
echo "Copy Config File:"
echo " "

cp www/assets/js/config.dist.js www/assets/js/config.js

echo " "
echo "Adding Platforms:"
echo " "

cordova platform add ios
cordova platform add android

echo " "
echo "Installing Require Plugins:"
echo " "

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
echo "Copy Build Hooks into Project:"
echo " "

cp -R www/build/hooks/* hooks/
chmod 755 hooks/*/*.js

echo " "
echo "Replace iOS Build Files ( modified from default ):"
echo " "

rm platforms/ios/Facing.xcodeproj
rm -fr platforms/ios/Facing/Images.xcassets
rm platforms/ios/Facing/Facing-Info.plist

cp www/build/ios/Facing.xcodeproj platforms/ios/Facing.xcodeproj
cp -R www/build/ios/Images.xcassets platforms/ios/Facing/Images.xcassets
cp www/build/ios/Facing-Info.plist platforms/ios/Facing/Facing-Info.plist

echo " "
echo "Build Application & Launch in iOS Simulator:"
echo " "

cordova emulate ios
