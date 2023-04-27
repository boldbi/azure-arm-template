#!/bin/bash
# command to run this file
# bash install-option-lib.sh install-optional-libs npgsql,mongodb,influxdb

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
if [ -z "$arguments" ]
then
echo "Please pass optional library names as arguments."
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

# check non exist assembly count
if [ ${#nonexistassembly[@]} -ne 0 ]; then
echo "The below optional library names do not exist. Please enter valid library names."

for element in "${nonexistassembly[@]}"
do
echo "$element"
done

else
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
echo "mongodb libraries are installed"
;;
"mysql")
destination=$pluginpath/mysqlserver
yes | cp -rf $clientlibrary/MySqlConnector.dll $destination
echo "mysql libraries are installed"
;;
"influxdb")
destination=$pluginpath/influxdb
yes | cp -rf $clientlibrary/InfluxData.Net.dll $destination
echo "influxdb libraries are installed"
;;
 "snowflake")
destination=$pluginpath/snowflake
yes | cp -rf $clientlibrary/Snowflake.Data.dll $destination
echo "snowflake libraries are installed"
;;
 "oracle")
destination=$pluginpath/oracle
yes | cp -rf $clientlibrary/Oracle.ManagedDataAccess.dll $destination
echo "oracle libraries are installed"
;;
"google")
destination=$pluginpath/google
yes | cp -rf $clientlibrary/Google.Cloud.BigQuery.V2.dll $destination
echo "google libraries are installed"
;;
"clickhouse")
destination=$pluginpath/clickhouse
yes | cp -rf $clientlibrary/ClickHouse.Client.dll $destination
echo "clickhouse libraries are installed"
;;

esac
done
fi
fi
