# beaconbase_app
A base project with iBeacon integration

# some usefull commands for you
rrent log
    adb logcat -c

   //reading ionic log only
   adb logcat -s "chromium"
}

//Building for Android VM
{
    //CHANGE GLOBAL GIT CONFIG 1st!!
    git config --global user.name
    git config --global user.email

    //Git reset passwords
    git config --global --unset user.password

    //Get back from black screen in ubuntu
    crlt+alt+F1

    //Find device
    ls /dev/tty.*
}

//Git Know-How
{
    //Add Remote
    git remote add <shortname> <url>

    //Remove Remote
    git remote remove paul

    //Show all Remotes
    git remote -v

    //Rename Remote
    git remote rename OLD_NAME NEW_NAME

    //Show all branches (incl. remote branches)
    git branch -a

    //Show commit history (short)
    git log --peretty=oneline

    //Rolback to Commit e.g. 8hd726
    git reset --hard 8hd726

    //Remove untracked files AND folders

}


//Ionic know how
{
    //If anything goes mysteriously wron, try removing and adding back your target platform!
    //Adding android platform (IMPORTANT: DONT USE ANDROID 7.0.0 or later!)
    ionic cordova platform add android@6.4.0

    //Removing android platform
    ionic cordova platform remove android

    // Adding a ionic plugin
    ionic cordova plugin add https://github.com/HenningBertsch/cordova-plugin-ibeacon.git
    // Deleting an ionic plugin
    ionic cordova plugin rm https://github.com/HenningBertsch/cordova-plugin-ibeacon.git

    // Installing the added ionic plugin and saving it into the project dependencies
    npm install --save
    // Removing the added ionic plugin and removing it from the project dependencies
    npm uninstall --save

    //Building for android
    ionic cordova build android --debug

    //Building for android and push to device
    ionic cordova build android --debug --device
}
