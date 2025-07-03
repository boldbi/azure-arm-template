#!/bin/bash

app_data_location="/application/app_data"
puppeteer_location="$app_data_location/bi/dataservice/puppeteer"
product_json_path="$app_data_location/configuration/product.json"
config_xml_path="$app_data_location/configuration/config.xml"
configuration_path="$app_data_location/configuration"

if [ -d "$app_data_location/configuration" ]; then
  echo "Configuration directory exists"
else
  mkdir -p "$app_data_location/configuration" && chmod 777 "$app_data_location/configuration"
fi

#!/bin/bash

# Configuration path
local_service_json_file="$configuration_path/local_service_url.json"


if [ ! -f "$local_service_json_file" ]; then

  if [ "$DEPLOY_MODE" = "ecs_multi_container" ]; then
    # ECS multi-container (provide placeholders for you to modify)
    json_content=$(cat <<EOF
{
  "Idp": "http://id-web-service.boldbi-ns",
  "IdpApi": "http://id-api-service.boldbi-ns/api",
  "Ums": "http://id-ums-service.boldbi-ns/ums",
  "Bi": "http://bi-web-service.boldbi-ns/bi",
  "BiApi": "http://bi-api-service.boldbi-ns/bi/api",
  "BiJob": "http://bi-jobs-service.boldbi-ns/bi/jobs",
  "BiDesigner": "http://bi-designer-service.boldbi-ns/bi/designer",
  "BiDesignerHelper": "http://bi-designer-service.boldbi-ns/bi/designer/helper",
  "Etl": "http://etl-service.boldbi-ns",
  "EtlBlazor": "http://etl-service.boldbi-ns/framework/blazor.server.js",
  "Ai": "http://ai-service.boldbi-ns/aiservice",
  "Reports": "",
  "ReportsApi": "",
  "ReportsJob": "",
  "ReportsService": "",
  "ReportsViewer": ""
}
EOF
)

  elif [ "$DEPLOY_MODE" = "docker_multi_container" ]; then
    # Docker multi-container (upstream container names)
    json_content=$(cat <<EOF
{
  "Idp": "http://id-web",
  "IdpApi": "http://id-api/api",
  "Ums": "http://id-ums/ums",
  "Bi": "http://bi-web/bi",
  "BiApi": "http://bi-api/bi/api",
  "BiJob": "http://bi-jobs/bi/jobs",
  "BiDesigner": "http://bi-dataservice/bi/designer",
  "BiDesignerHelper": "http://bi-dataservice/bi/designer/helper",
  "Etl": "http://bi-etl",
  "EtlBlazor": "http://bi-etl/framework/blazor.server.js",
  "Ai": "http://bold-ai/aiservice",
  "Reports": "",
  "ReportsApi": "",
  "ReportsJob": "",
  "ReportsService": "",
  "ReportsViewer": ""
}
EOF
)

  elif [ "$BOLD_SERVICES_HOSTING_ENVIRONMENT" = "k8s" ]; then
    # Default: Kubernetes ClusterIP services
    json_content=$(cat <<EOF
{
  "Idp": "http://id-web-service:6000",
  "IdpApi": "http://id-api-service:6001/api",
  "Ums": "http://id-ums-service:6002/ums",
  "Bi": "http://bi-web-service:6004/bi",
  "BiApi": "http://bi-api-service:6005/bi/api",
  "BiJob": "http://bi-jobs-service:6006/bi/jobs",
  "BiDesigner": "http://bi-dataservice-service:6007/bi/designer",
  "BiDesignerHelper": "http://bi-dataservice-service:6007/bi/designer/helper",
  "Etl": "http://bold-etl-service:6009",
  "EtlBlazor": "http://bold-etl-service:6009/framework/blazor.server.js",
  "Ai": "http://bold-ai-service:6010/aiservice",
  "Reports": "",
  "ReportsApi": "",
  "ReportsJob": "",
  "ReportsService": "",
  "ReportsViewer": ""
}
EOF
)
  fi

  # Write the content
  echo "$json_content" > "$local_service_json_file"
  echo "Created: $local_service_json_file"
else
  echo "$local_service_json_file already exists. Skipping creation."
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
