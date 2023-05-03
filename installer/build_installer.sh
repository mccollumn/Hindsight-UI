#!/bin/bash
InstallerOutputDir="./installer/Output"
InstallerAppDir="${InstallerOutputDir}/app"
InstallerMsiDir="${InstallerOutputDir}/msi"
InnoSetupDir="./installer/inno_setup_6"
InnoScriptName="wtrui.iss"

echo "*** Building Installer ***"

# Get app version
while getopts v: flag
do
    case "${flag}" in
        v) version=${OPTARG};;
    esac
done
echo "Version: ${version}"

# Clean up the installer output directory
echo -e "\nCleaning up files in ${InstallerOutputDir}..."
rm -rfv ${InstallerOutputDir}

# Compile the installer
echo -e "\nCompiling Inno Setup script ${InnoScriptName}"
# "${InnoSetupDir}/ISCC.exe" /O"${InstallerOutputDir}" /F"wtr_setup${version}" "./installer/${InnoScriptName}"
"${InnoSetupDir}/ISCC.exe" "./installer/${InnoScriptName}"

if [ $? -ne 0 ]
then
    echo "Failed to compile ${InnoScriptName}" >&2
    exit 1
fi

# Copy files to installer output directory
echo -e "\nCopying latest build into installer..."
mkdir -vp ${InstallerAppDir}
mkdir -vp ${InstallerMsiDir}
cp -rv ./build/* ${InstallerAppDir}
cp -v ./installer/web.config ${InstallerAppDir}
cp -v ./installer/readme.txt ${InstallerOutputDir}
cp -v ./installer/rewrite_amd64_en-US.msi ${InstallerMsiDir}
rm -v ${InstallerAppDir}/mockServiceWorker.js
