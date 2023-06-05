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

pluginpath=$root_path/bi/dataservice/Plugins/connections
for element in "${assmeblyarguments[@]}"
do
    case $element in
"mongodb")
destination=$pluginpath/mongodbconnections
yes | cp -rf $clientlibrary/DnsClient.dll $destination
yes | cp -rf $clientlibrary/MongoDB.Bson.dll $destination
yes | cp -rf $clientlibrary/MongoDB.Driver.Core.dll $destination
yes | cp -rf $clientlibrary/MongoDB.Driver.dll $destination
yes | cp -rf $clientlibrary/MongoDB.Driver.Legacy.dll $destination
yes | cp -rf $clientlibrary/MongoDB.Libmongocrypt.dll $destination
echo -e "${Green}info:${NC} Mongodb libraries are installed"
;;
"mysql")
destination=$pluginpath/mysqlserver
yes | cp -rf $clientlibrary/MySqlConnector.dll $destination
echo -e "${Green}info:${NC} Mysql libraries are installed"
;;
"influxdb")
destination=$pluginpath/influxdb
yes | cp -rf $clientlibrary/InfluxData.Net.dll $destination
echo -e "${Green}info:${NC} Influxdb libraries are installed"
;;
 "snowflake")
destination=$pluginpath/snowflake
yes | cp -rf $clientlibrary/Snowflake.Data.dll $destination
echo -e "${Green}info:${NC} Snowflake libraries are installed"
;;
 "oracle")
destination=$pluginpath/oracle
yes | cp -rf $clientlibrary/Oracle.ManagedDataAccess.dll $destination
echo -e "${Green}info:${NC} Oracle libraries are installed"
;;
"google")
destination=$pluginpath/google
yes | cp -rf $clientlibrary/Google.Cloud.BigQuery.V2.dll $destination
echo -e "${Green}info:${NC} Google libraries are installed"
;;
"clickhouse")
destination=$pluginpath/clickhouse
yes | cp -rf $clientlibrary/ClickHouse.Client.dll $destination
echo -e "${Green}info:${NC} Clickhouse libraries are installed"
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
