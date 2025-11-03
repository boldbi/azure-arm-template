#!/bin/bash

set -euo pipefail

# ---------- Constants ----------
app_data_location="/application/app_data"
puppeteer_location="$app_data_location/bi/dataservice/puppeteer"
product_json_path="$app_data_location/configuration/product.json"
config_xml_path="$app_data_location/configuration/config.xml"
configuration_path="$app_data_location/configuration"
local_service_json_file="$configuration_path/local_service_url.json"

sub_path=$(echo "$APP_BASE_URL" | sed 's|.*://[^/]*\(/.*\)$|\1|' || echo "")

# ---------- Logging Helpers ----------
log() { echo -e "[INFO] $1"; }
error() { echo -e "[ERROR] $1" >&2; }
fatal() { error "$1"; exit 1; }

# ---------- Ensure Configuration Directory ----------
if [ ! -d "$configuration_path" ]; then
  log "Creating configuration directory..."
  mkdir -p "$configuration_path" && chmod 777 "$configuration_path"
else
  log "Configuration directory already exists."
fi

# ---------- Prepare local_service_url.json ----------
json_content=""

if [[ "${DEPLOY_MODE:-}" == "ecs_multi_container" ]]; then
  log "Configuring for ECS multi-container..."
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
  "Reports": "http://reports-web-service.boldreports-ns/reporting",
  "ReportsApi": "http://reports-api-service.boldreports-ns/reporting/api",
  "ReportsJob": "http://reports-jobs-service.boldreports-ns/reporting/jobs",
  "ReportsService": "http://reports-designer-service.boldreports-ns/reporting/reportservice",
  "ReportsViewer": "http://reports-viewer-service.boldreports-ns/reporting/viewer"
}
EOF
)

elif [[ "${DEPLOY_MODE:-}" == "docker_multi_container" ]]; then
  log "Configuring for Docker multi-container..."
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
  "Reports": "http://reports-web/reporting",
  "ReportsApi": "http://reports-api/reporting/api",
  "ReportsJob": "http://reports-jobs/reporting/jobs",
  "ReportsService": "http://reports-reportservice/reporting/reportservice",
  "ReportsViewer": "http://reports-viewer/reporting/viewer"
}
EOF
)

elif [ "${BOLD_SERVICES_HOSTING_ENVIRONMENT:-}" == "k8s" ]; then
    if [ "$SUB_APP" = "true" ] && [ -n "$sub_path" ]; then
     json_content=$(cat <<EOF
{
  "Idp": "http://id-web-service:6000$sub_path",
  "IdpApi": "http://id-api-service:6001$sub_path/api",
  "Ums": "http://id-ums-service:6002$sub_path/ums",
  "Bi": "http://bi-web-service:6004$sub_path/bi",
  "BiApi": "http://bi-api-service:6005$sub_path/bi/api",
  "BiJob": "http://bi-jobs-service:6006$sub_path/bi/jobs",
  "BiDesigner": "http://bi-dataservice-service:6007$sub_path/bi/designer",
  "BiDesignerHelper": "http://bi-dataservice-service:6007$sub_path/bi/designer/helper",
  "Etl": "http://bold-etl-service:6009$sub_path",
  "EtlBlazor": "http://bold-etl-service:6009$sub_path/framework/blazor.server.js",
  "Ai": "http://bold-ai-service:6010$sub_path/aiservice",
  "Reports": "http://reports-web-service:6550$sub_path/reporting",
  "ReportsApi": "http://reports-api-service:6551$sub_path/reporting/api",
  "ReportsJob": "http://reports-jobs-service:6552$sub_path/reporting/jobs",
  "ReportsService": "http://reports-reportservice-service:6553$sub_path/reporting/reportservice",
  "ReportsViewer": "http://reports-viewer-service:6554$sub_path/reporting/viewer"
}
EOF
)
 else
      # Original URLs without sub-path
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
  "Reports": "http://reports-web-service:6550/reporting",
  "ReportsApi": "http://reports-api-service:6551/reporting/api",
  "ReportsJob": "http://reports-jobs-service:6552/reporting/jobs",
  "ReportsService": "http://reports-reportservice-service:6553/reporting/reportservice",
  "ReportsViewer": "http://reports-viewer-service:6554/reporting/viewer"
}
EOF
)
    fi
else
  log "No matching DEPLOY_MODE or BOLD_SERVICES_HOSTING_ENVIRONMENT value for JSON content."
fi

# ---------- Conditionally Write JSON ----------
if [[ -n "${DEPLOY_MODE:-}" || -n "${BOLD_SERVICES_HOSTING_ENVIRONMENT:-}" ]]; then
  log "Writing service URLs to $local_service_json_file"
  echo "$json_content" > "$local_service_json_file" || fatal "Failed to write JSON content."
  if command -v jq >/dev/null 2>&1; then
    jq empty "$local_service_json_file" && log "JSON is valid." || fatal "Invalid JSON format!"
  else
    log "jq not available. Skipping validation."
  fi
else
  log "Deployment environment is not defined. Set DEPLOY_MODE or BOLD_SERVICES_HOSTING_ENVIRONMENT. Skipping JSON creation."
fi

# ---------- Run Installation Utility ----------
log "Running install utility..."
dotnet appdatafiles/installutils/installutils.dll

# ---------- Prepare Upgrade Logs ----------
upgrade_log() {
  log "Preparing upgrade logs..."
  if [ -f "$config_xml_path" ]; then
    exclude_folders=("logs" "upgradelogs")
    [ ! -d "$app_data_location/upgradelogs" ] && mkdir -p "$app_data_location/upgradelogs"

    json_file="$product_json_path"
	# Read the JSON file into a variable
    json_data=$(cat "$json_file")
	# Search for the version key and extract the version value
	if [ "${Is_Common_IDP:-false}" = true ]; then
	  version=$(echo "$json_data" | awk '/"Name": "BoldBI"/,/\}/' | grep '"Version":' | head -n1 | sed 's/.*"Version": "\([^"]*\)".*/\1/')
	else
	  version=$(echo "$json_data" | grep -o '"Version": "[^"]*' | sed 's/"Version": "//')
	fi

    if [ -d "$app_data_location/upgradelogs/$version" ]; then
      rm -r "$app_data_location/upgradelogs/$version"
    fi

    mkdir -p "$app_data_location/upgradelogs/$version"
    find "$app_data_location" -type d \( -name "${exclude_folders[0]}" -o -name "${exclude_folders[1]}" \) -prune -o -print > "$app_data_location/upgradelogs/$version/upgrade_logs.txt"
    log "Upgrade logs prepared for version: $version"
  fi
}

if [ "${upgrade_log_enabled:-false}" = true ]; then
  upgrade_log
fi

# ---------- Puppeteer Installation ----------
log "Checking Puppeteer installation..."
if [ ! -d "$puppeteer_location/Linux-901912" ]; then
  mkdir -p "$puppeteer_location"
  log "Installing Puppeteer..."
  dotnet "/application/utilities/adminutils/Syncfusion.Server.Commands.Utility.dll" "installpuppeteer" -path "$puppeteer_location"
fi

if [ -d "$puppeteer_location/Linux-901912" ]; then
  [ -f "$app_data_location/bi/dataservice/phantomjs" ] && rm -rf "$app_data_location/bi/dataservice/phantomjs"
  log "Old PhantomJS binary removed."
fi

# ---------- Start ID-Web Service ----------
log "Starting ID-Web Service..."
exec dotnet Syncfusion.Server.IdentityProvider.Core.dll --urls=http://0.0.0.0:80