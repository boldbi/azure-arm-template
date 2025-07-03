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
# check optional-libs.txt is present
count=0; file_found=false; while [ $count -lt 3 ]; do if [ -f "$clientlibrary/optional-libs.txt" ]; then echo -e "${Green}info:${NC} optional-libs.txt File present"; file_found=true; break; else sleep 5; count=$((count + 1)); fi; done; if ! $file_found; then echo -e "${Yellow}Warning:${NC} optional-libs.txt File not found"; fi
arguments=$(<$clientlibrary/optional-libs.txt)
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
echo -e "${Yellow}Warning:${NC} Some MongoDB library files were not found in the directory $clientlibrary"
;;
"mysql")
destination=$pluginpath/mysqlserver
[ -f "$clientlibrary/MySqlConnector.dll" ] && cp -rf "$clientlibrary/MySqlConnector.dll" "$destination" && echo -e "${Green}info:${NC} Mysql libraries are installed" || echo -e "${Yellow}Warning:${NC} File MySqlConnector.dll not found in the directory $clientlibrary"
;;
"influxdb")
destination=$pluginpath/influxdb
[ -f "$clientlibrary/InfluxData.Net.dll" ] && cp -rf "$clientlibrary/InfluxData.Net.dll" "$destination" && echo -e "${Green}info:${NC} Influxdb libraries are installed" || echo -e "${Yellow}Warning:${NC} File InfluxData.Net.dll not found in the directory $clientlibrary"
;;
 "snowflake")
destination=$pluginpath/snowflake
[ -f "$clientlibrary/Snowflake.Data.dll" ] && cp -rf "$clientlibrary/Snowflake.Data.dll" "$destination" && echo -e "${Green}info:${NC} Snowflake libraries are installed" || echo -e "${Yellow}Warning:${NC} File Snowflake.Data.dll not found in the directory $clientlibrary"
;;
 "oracle")
destination=$pluginpath/oracle
[ -f "$clientlibrary/Oracle.ManagedDataAccess.dll" ] && cp -rf "$clientlibrary/Oracle.ManagedDataAccess.dll" "$destination" && echo -e "${Green}info:${NC} Oracle libraries are installed" || echo -e "${Yellow}Warning:${NC} File Oracle.ManagedDataAccess.dll not found in the directory $clientlibrary"
;;
"google")
destination=$pluginpath/google
[ -f "$clientlibrary/Google.Cloud.BigQuery.V2.dll" ] && cp -rf "$clientlibrary/Google.Cloud.BigQuery.V2.dll" "$destination" && echo -e "${Green}info:${NC} Google libraries are installed" || echo -e "${Yellow}Warning:${NC} File Google.Cloud.BigQuery.V2.dll not found in the directory $clientlibrary"
;;
"clickhouse")
destination=$pluginpath/clickhouse
[ -f "$clientlibrary/ClickHouse.Client.dll" ] && cp -rf "$clientlibrary/ClickHouse.Client.dll" $destination && echo -e "${Green}info:${NC} Clickhouse libraries are installed" || echo -e "${Yellow}Warning:${NC} File ClickHouse.Client.dll not found in the directory $clientlibrary"
;;

esac
done
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
