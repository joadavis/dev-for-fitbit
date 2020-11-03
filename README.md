# dev-for-fitbit
Developing apps and watch faces for the Fitbit line of smart watches and fitness trackers

Repository structure will have a directory for watch faces.
 - SUSE-love is the first attempt at making a watch face using the SUSE "Geeko" chameleon
 - SUSE-2020 is a refreshed design using the latest logo and design guidelines
 - NihongoTimePractice is a help for remembering the Hiragana and Romaji used to tell time in Japanese

If you find that a watch face directory is (nearly) empty, look for a corresponding .zip file in the watch-faces/archives.

Another directory will contain applications (such as games) for smart watches.

# How to manually install code on your Fitbit device

The normal method for installing a watch face or app on a Fitbit device is to select it through the Fitbit Gallery.
However, as the software in this repository is not published through the Gallery (and is provided as-is without warranty), then to use it on your device you will need to load it through the Fitbit Studio in developer mode.

To use the Developer Studio to load an app (or write your own), follow these steps:
 - Download the files for the watchface or app from this GitHub repo
 - Go to https://studio.fitbit.com
 - Sign in with your Fitbit credentials (the same credentials you use for your smartwatch)
 - Create a New Project and name it to maatch the watchface or app
 - Load in the files and code from this repo (or unpack from one of the archives)
 - On your watch, go to Settings, scroll down to the Developer Bridge, and click to activate
 - Wait for the Settings to say Connected
 - In Fitbit Studio, on the top click Select Device and choose your device model
 - Click the Run button to download and activate the watchface or app on your device
 - Once loaded, be sure to go back to Settings and deactivate the Developer Bridge (it will time out automatically if you don't).


# Note
For SUSE brand guidelines and use, see [https://brand.suse.com](https://brand.suse.com).
The SUSE watch faces use the logo in accordance to the branding guidelines, but note that I do not own the images.
