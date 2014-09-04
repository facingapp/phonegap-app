#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];

if (rootdir)
{
    console.info('Removing Non Essential Files & Directories');

    // Development Files not needed in Native Mobile App
    var remove_files = [
        "platforms/ios/www/Gruntfile.js",
        "platforms/ios/www/LICENSE",
        "platforms/ios/www/README.md",
        "platforms/ios/www/package.json",
        "platforms/ios/www/assets/js/config.dist.js",
        "platforms/ios/www/assets/js/cordova.fake.js"
    ];

    // Development Folders not needed in Native Mobile App
    var remove_folders = [
        "platforms/ios/www/node_modules",
        "platforms/ios/www/shell_scripts",
        "platforms/ios/www/src"
    ];

    // Loop through each file and remove it
    remove_files.forEach(function(val, index, array) {
        try {
            var filePath = path.join(rootdir, val);
            if (fs.statSync(filePath).isFile())
            {
                fs.unlinkSync(filePath);
                console.info(' - Removed File: ' + val);
            }
            else
            {
                console.error('Unable to delete ' + filePath);
            }
        }
        catch(e)
        {
            return;
        }
    });

    // Loop through each folder and remove files before removing folder
    remove_folders.forEach(function(val, index, array) {
        var fullpath = path.join(rootdir, val);
        rmDir(fullpath);
    });
}

/**
 * Remove Directory and Files Recursively
 * @param string dirPath Absolute Path to Directory
 */
function rmDir(dirPath)
{
    try {
        var files = fs.readdirSync(dirPath);
    }
    catch(e)
    {
        return;
    }

    if (files.length > 0)
    {
        for (var i=0; i<files.length; i++)
        {
            var filePath = dirPath + '/' + files[i];

            if (fs.statSync(filePath).isFile())
            {
                fs.unlinkSync(filePath);
                console.info(' - Removed File: ' + files[i]);
            }
            else
            {
                rmDir(filePath);
                console.info('\nRemoving Folder: ' + filePath + '\n');
            }
        }
    }

    fs.rmdirSync(dirPath);
}
