#!/bin/bash

app_data_location="/application/app_data"
puppeteer_location="$app_data_location/bi/dataservice/puppeteer"
product_json_path="$app_data_location/configuration/product.json"
config_xml_path="$app_data_location/configuration/config.xml"

if [ -d "$app_data_location/configuration" ]; then
  echo "Configuration directory exists"
else
  mkdir -p "$app_data_location/configuration" && chmod 777 "$app_data_location/configuration"
fi

echo "Running installutilty..."
dotnet appdatafiles/installutils/installutils.dll

echo "Preparing and organizing upgrade logs for the current version..."
upgrade_log() {
    if [ -f $config_xml_path ]; then

        exclude_folders=("logs" "upgradelogs")

        [ ! -d "$app_data_location/upgradelogs" ] && mkdir -p "$app_data_location/upgradelogs"

        json_file="$product_json_path"

        # Read the JSON file into a variable
        json_data=$(cat "$json_file")

        # Search for the version key and extract the version value
        version=$(echo "$json_data" | grep -o '"Version": "[^"]*' | sed 's/"Version": "//')

        if [ -d "$app_data_location/upgradelogs/$version" ]; then
        rm -r "$app_data_location/upgradelogs/$version"
        fi
        mkdir -p "$app_data_location/upgradelogs/$version"

        find "$app_data_location" -type d \( -name "${exclude_folders[0]}" -o -name "${exclude_folders[1]}" \) -prune -o -print > "$app_data_location/upgradelogs/$version/upgrade_logs.txt"
    fi
}
upgrade_log

echo "Starting Puppeteer package installation process..."
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

echo "Executing ID-Web service..."
dotnet Syncfusion.Server.IdentityProvider.Core.dll --urls=http://0.0.0.0:80
