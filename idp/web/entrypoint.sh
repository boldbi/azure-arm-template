#!/bin/bash

app_data_location="/application/app_data"
puppeteer_location="$app_data_location/bi/dataservice/puppeteer"

dotnet appdatafiles/installutils/installutils.dll

if [ -d "$app_data_location" ]; then
	if [ ! -d "$puppeteer_location/Linux-901912" ]; then
		[ ! -d "$app_data_location/bi" ] && mkdir -p "$app_data_location/bi"
		[ ! -d "$app_data_location/bi/dataservice" ] && mkdir -p "$app_data_location/bi/dataservice"
		[ ! -d "$puppeteer_location" ] && mkdir -p "$puppeteer_location"

		dotnet "/application/utilities/adminutils/Syncfusion.Server.Commands.Utility.dll" "installpuppeteer" -path "$puppeteer_location"
	fi

	if [ -d "$puppeteer_location/Linux-901912" ]; then
		## Removing PhantomJS
		[ -f "$app_data_location/bi/dataservice/phantomjs" ] && rm -rf "$app_data_location/bi/dataservice/phantomjs"
	fi
fi

dotnet Syncfusion.Server.IdentityProvider.Core.dll