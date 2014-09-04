#!/bin/sh
#
# description: Developer SSH file for Common Development
#
# author: Peter Schmalfeldt <manifestinteractive@gmail.com>
#
# Instructions:
# ------------------------------
# git clone this repository to a directory of your choosing, then
# in terminal enter the following command:
#
#    $ cp /path/to/mi-dev-tools/build/scripts/facingapp.sh /Users/`whoami`/.ssh/facingapp.sh
#
# With a local copy of the file, you can make any changes you need before moving onto the next step.
#
# Now, in your ~/.bash_profile or ~/.zshrc file add the following line
#
#    $ source /Users/`whoami`/.ssh/facingapp.sh
#
# Then, in terminal, run the same command ( this makes your alias's work until restart )
#
#    $ source /Users/`whoami`/.ssh/facingapp.sh

# Quickly Jump to Project Directories
alias cd-facing-app="cd /path/to/facingapp/phonegap-app/facing"
alias cd-facing-www="cd /path/to/facingapp/phonegap-app/facing/www"
alias cd-facing-server="cd /path/to/facingapp/node-server"

# Build Commands
alias build-facing="__make_header 'Rebuilding Facing App'; cd-facing-app; cordova build; cd -;"
alias build-facing-ios="__make_header 'Rebuilding Facing App for iOS'; cd-facing-app; cordova build ios; cd -;"
alias build-facing-android="__make_header 'Rebuilding Facing App for Android'; cd-facing-app; cordova build android; cd -;"
alias build-facing-watch="__make_header 'Watching for Changes in Facing App'; open -a LiveReload; cd-facing-www; (grunt watch &); cd -;"

# Emulate Commands
alias emulate-facing-ios-iphone="__make_header 'Launching iPhone Simulator'; killall \"iPhone Simulator\"; cd-facing-app; cordova emulate ios --target=\"iPhone\"; __debug_ios; cd -;"
alias emulate-facing-ios-iphone-retina-3_5-inch="__make_header 'Launching iPhone Retina 3.5 Inch Simulator'; killall \"iPhone Simulator\"; cd-facing-app; cordova emulate ios --target=\"iPhone (Retina 3.5-inch)\"; __debug_ios; cd -;"
alias emulate-facing-ios-iphone-retina-4-inch="__make_header 'Launching iPhone Retina 4 Inch Simulator'; killall \"iPhone Simulator\"; cd-facing-app; cordova emulate ios --target=\"iPhone (Retina 4-inch)\"; __debug_ios; cd -;"
alias emulate-facing-ios-ipad="__make_header 'Launching iPad Simulator'; killall \"iPhone Simulator\"; cd-facing-app; cordova emulate ios --target=\"iPad\"; __debug_ios; cd -;"
alias emulate-facing-ios-ipad-retina="__make_header 'Launching iPad Retina Simulator'; killall \"iPhone Simulator\"; cd-facing-app; cordova emulate ios --target=\"iPad (Retina)\"; __debug_ios; cd -;"
alias emulate-facing-android-nexus7="__make_header 'Launching Android Nexus 7 Emulator'; killall emulator64-arm; cd-facing-app; cordova emulate android --target=\"Nexus7\"; __debug_android; cd -;"
alias emulate-facing-android-galaxy-s5="__make_header 'Launching Android Nexus 7 Emulator'; killall emulator64-arm; cd-facing-app; cordova emulate android --target=\"Galaxy_S5\"; __debug_android; cd -;"

# PhoneGap Coommands
alias phonegap-facing-serve="__make_header 'Starting Facing PhoneGap Server'; cd-facing-app; phonegap serve;"

# Server Commands
alias server-facing-start="__make_header 'Starting Facing Server'; cd-facing-server; forever cleanlogs; forever start -l forever.log -o out.log -e err.log server.js; cd -;"
alias server-facing-stop="__make_header 'Stopping Facing Server'; cd-facing-server; forever stop server.js; cd -;"
alias server-facing-restart="__make_header 'Starting Facing Server'; server-facing-start; server-facing-stop;"
alias server-facing-status="__make_header 'Facing Server Status'; cd-facing-server; forever list; cd -"
alias server-facing-log="__make_header 'Facing Server Log'; cd-facing-server; open .; cd -;"

### Public Functions ========================================

function facingapp()
{
    case "$1" in
        list)
            __facing_app_list_commands
        ;;
        explain)
            __facing_app_explain_alias "$2"
        ;;
        "-h" | "-help" | "--h" | "--help" | help)
            __help
        ;;
        *)
            __error "ERROR: Missing Argument | Usage: $0 { list | explain | help }"
    esac
}

### Private Facing App Functions ========================================

function __facing_app_list_commands()
{
    __make_header "Available Commands"

    ALIASES=`alias | cut -d '=' -f 1`

    __output "Facing Shortcuts:"

    echo "$ALIASES" | sort -u | grep cd-facing-

    __output "Facing Build Commands:"

    echo "$ALIASES" | sort -u | grep build-facing-

    __output "Facing Emulate Commands:"

    echo "$ALIASES" | sort -u | grep emulate-facing-

    __output "Facing PhoneGap Commands:"

    echo "$ALIASES" | sort -u | grep phonegap-facing

    __output "Facing Server Commands:"

    echo "$ALIASES" | sort -u | grep server-facing

    echo ' '
}

function __facing_app_explain_alias()
{
    __make_header "Alias Explanation"

    __output "$1 will execute the following command:"

    type -a "$1" | sed "s/$1 is an alias for //g"

    echo ' '
}

### Private Common Functions ========================================

function __make_header()
{
    echo " "
    echo " "
    echo -e "\e[48;5;22m  Facing › $1  \e[0m"
    echo " "
}

function __output()
{
    echo " "
    echo -e "\e[38;5;34m→ Facing › $1\e[0m"
    echo " "
}

function __notice()
{
    echo " "
    echo -e "\e[38;5;220m→ Facing › $1\e[0m"
    echo " "
}

function __error()
{
    echo " "
    echo -e "\e[38;5;196m→ Facing › $1\e[0m"
    echo " "
}

function __help()
{
    __make_header "Instructions"

    echo -e "\e[38;5;34m$ mi list\e[0m\n"

    echo "    Lists all available aliases for Facing.\n"

    echo -e "\e[38;5;34m$ mi explain {alias}\e[0m\n"

    echo "    This will output what the command is for a specific alias without running it.\n"
    echo -e "    EXAMPLE: \e[38;5;220mfacingapp explain cd-project\e[0m\n"

    echo -e "\e[38;5;34m$ mi help\e[0m\n"

    echo "    Prints this help screen.\n"
}

function __debug_ios()
{
    cd-facing-app
    ./www/build/scripts/open-webinspector.applescript &
}
