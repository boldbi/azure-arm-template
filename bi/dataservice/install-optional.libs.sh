#!/bin/bash
# command to run this file
# bash install-option-lib.sh install-optional-libs npgsql,mongodb,influxdb

Yellow='\033[0;33m'
Green='\033[0;32m'
NC='\033[0m'

root_path=""

if [ -d "/boldbi" ]; then
        root_path="/boldbi"
else
        root_path="/application"
fi

app_data_path=$root_path/app_data
clientlibrary=$app_data_path/optional-libs

arguments=""

if [[ -n "${INSTALL_OPTIONAL_LIBS:-}" ]]; then
    echo -e "${Green}info:${NC} Optional libs list obtained from environment variable."
    arguments="$INSTALL_OPTIONAL_LIBS"
else
    # If environment variable not set, wait and retry checking.
    count=0
    file_found=false
    while [[ $count -lt 3 ]]; do
        if [[ -f "$clientlibrary/optional-libs.txt" ]]; then
            arguments=$(<"$clientlibrary/optional-libs.txt")
            file_found=true
            break
        else
            sleep 10
            ((count++))
        fi
    done

    # If file is still missing after 3 retries, show a warning message
    if [[ "$file_found" = false ]]; then
        echo -e "${Yellow}Warning:${NC} optional-libs.txt not found and INSTALL_OPTIONAL_LIBS is not set"
    fi
fi

# Show the final list of optional libraries that will be used
if [[ -n "$arguments" ]]; then
    echo -e "${Green}info:${NC} List of Optional libs passed: $arguments"
else
    echo -e "${Yellow}Warning:${NC} No optional libraries found."
fi

# check empty assembly names
if [ -z "$arguments" ] || [ ${#arguments} -eq 3 ]
then
echo -e "${Green}info:${NC} Bold BI supports the following optional libraries. To install them, please pass their names as environment variables." >&2
echo "mongodb,mysql,influxdb,snowflake,oracle,clickhouse,google"
else

# split assembly name into array
IFS=', ' read -r -a assmeblyarguments <<< "$arguments"
assembly=("mongodb" "mysql" "influxdb" "snowflake" "oracle" "google" "clickhouse")
nonexistassembly=()

# create  invalid assembly array
for element in "${assmeblyarguments[@]}"
do
    if [[ ! " ${assembly[@]} " =~ " ${element} " ]]; then
    nonexistassembly+=("$element")
fi
done
# check optional-libs is present
files=("DnsClient.dll" "MongoDB.Bson.dll" "MongoDB.Driver.Core.dll" "MongoDB.Driver.dll" "MongoDB.Driver.Legacy.dll" "MongoDB.Libmongocrypt.dll" "MySqlConnector.dll" "InfluxData.Net.dll" "Snowflake.Data.dll" "Oracle.ManagedDataAccess.dll" "Google.Cloud.BigQuery.V2.dll" "ClickHouse.Client.dll")

# Count of elements in the files array
expected_count=${#files[@]}

attempts=0

while [ $attempts -lt 3 ]; do
    actual_count=0
    for file in "${files[@]}"; do
        if [ -f "$clientlibrary/$file" ]; then
            actual_count=$((actual_count + 1))
        fi
    done

    if [ $actual_count -eq $expected_count ]; then
        echo -e "${Green}info:${NC} All clientlibrary files are present"
        break
    else
        sleep 5
        attempts=$((attempts + 1))
    fi
done

if [ $actual_count -ne $expected_count ]; then
    echo -e "${Yellow}Warning:${NC} Some clientlibrary files are missing."
fi

pluginpath=$root_path/bi/dataservice/Plugins/connections
missing_dll=true
retry_count=0
max_retries=3   # you can increase this if needed

while [ "$missing_dll" = true ] && [ $retry_count -lt $max_retries ]; do
    missing_dll=false
    echo -e "${Green}info:${NC} Checking required libraries (attempt $((retry_count+1))/$max_retries)..."

    for element in "${assmeblyarguments[@]}"
    do
        case $element in
        "mongodb")
            destination=$pluginpath/mongodbconnections
            [ -f "$clientlibrary/DnsClient.dll" ] && cp -rf "$clientlibrary/DnsClient.dll" $destination && \
            [ -f "$clientlibrary/MongoDB.Bson.dll" ] && cp -rf "$clientlibrary/MongoDB.Bson.dll" $destination && \
            [ -f "$clientlibrary/MongoDB.Driver.Core.dll" ] && cp -rf "$clientlibrary/MongoDB.Driver.Core.dll" $destination && \
            [ -f "$clientlibrary/MongoDB.Driver.dll" ] && cp -rf "$clientlibrary/MongoDB.Driver.dll" $destination && \
            [ -f "$clientlibrary/MongoDB.Driver.Legacy.dll" ] && cp -rf "$clientlibrary/MongoDB.Driver.Legacy.dll" $destination && \
            [ -f "$clientlibrary/MongoDB.Libmongocrypt.dll" ] && cp -rf "$clientlibrary/MongoDB.Libmongocrypt.dll" $destination && \
            echo -e "${Green}info:${NC} Mongodb libraries are installed" || \
            { echo -e "${Yellow}Warning:${NC} Some MongoDB library files were not found in the directory $clientlibrary"; missing_dll=true; } 
        ;;
        "mysql")
            destination=$pluginpath/mysqlserver
            [ -f "$clientlibrary/MySqlConnector.dll" ] && cp -rf "$clientlibrary/MySqlConnector.dll" "$destination" && echo -e "${Green}info:${NC} Mysql libraries are installed" || { echo -e "${Yellow}Warning:${NC} File MySqlConnector.dll not found in the directory $clientlibrary"; missing_dll=true; } 
        ;;
        "influxdb")
            destination=$pluginpath/influxdb
            [ -f "$clientlibrary/InfluxData.Net.dll" ] && cp -rf "$clientlibrary/InfluxData.Net.dll" "$destination" && echo -e "${Green}info:${NC} Influxdb libraries are installed" || { echo -e "${Yellow}Warning:${NC} File InfluxData.Net.dll not found in the directory $clientlibrary"; missing_dll=true; } 
        ;;
        "snowflake")
            destination=$pluginpath/snowflake
            [ -f "$clientlibrary/Snowflake.Data.dll" ] && cp -rf "$clientlibrary/Snowflake.Data.dll" "$destination" && echo -e "${Green}info:${NC} Snowflake libraries are installed" || { echo -e "${Yellow}Warning:${NC} File Snowflake.Data.dll not found in the directory $clientlibrary"; missing_dll=true; } 
        ;;
        "oracle")
            destination=$pluginpath/oracle
            [ -f "$clientlibrary/Oracle.ManagedDataAccess.dll" ] && cp -rf "$clientlibrary/Oracle.ManagedDataAccess.dll" "$destination" && echo -e "${Green}info:${NC} Oracle libraries are installed" || { echo -e "${Yellow}Warning:${NC} File Oracle.ManagedDataAccess.dll not found in the directory $clientlibrary"; missing_dll=true; } 
        ;;
        "google")
            destination=$pluginpath/google
            [ -f "$clientlibrary/Google.Cloud.BigQuery.V2.dll" ] && cp -rf "$clientlibrary/Google.Cloud.BigQuery.V2.dll" "$destination" && echo -e "${Green}info:${NC} Google libraries are installed" || { echo -e "${Yellow}Warning:${NC} File Google.Cloud.BigQuery.V2.dll not found in the directory $clientlibrary"; missing_dll=true; } 
        ;;
        "clickhouse")
            destination=$pluginpath/clickhouse
            [ -f "$clientlibrary/ClickHouse.Client.dll" ] && cp -rf "$clientlibrary/ClickHouse.Client.dll" $destination && echo -e "${Green}info:${NC} Clickhouse libraries are installed" || { echo -e "${Yellow}Warning:${NC} File ClickHouse.Client.dll not found in the directory $clientlibrary"; missing_dll=true; }        
        ;;
        esac
    done

    if [ "$missing_dll" = true ]; then
        retry_count=$((retry_count+1))
        if [ $retry_count -lt $max_retries ]; then
            echo -e "${Yellow}Warning:${NC} Missing DLLs detected. Retrying... (attempt $retry_count/$max_retries)"
            sleep 15
        fi
    fi
done
if [ "$missing_dll" = true ]; then
    echo -e "${Yellow}Warning:${NC} Missing required assemblies after $max_retries attempts."
else
    echo -e "${Green}Success:${NC} All required libraries are installed."
fi
fi

sleep 1
n=1
# check empty & non exist elament
if [ ${#nonexistassembly[@]} -ne 0 ]; then
for element in "${nonexistassembly[@]}"
do
if [[ ! -z "$element" ]]; then
if [ "$n" -eq 1  ]; then
echo -e "${Yellow}Warning:${NC} The below optional library names do not exist. Please enter valid library names." >&2
((n++))
fi
echo "$element"
fi
done
fi