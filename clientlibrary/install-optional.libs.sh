#!/bin/bash
# command to run this file
# bash install-optional.libs.sh install-optional-libs npgsql,mongodb,influxdb,google,clickhouse
command=$1
arguments=$2
root_path=$3
installoptionlibs="install-optional-libs"
if [ -z "$root_path" ]
then
root_path="/var/www/bold-services"
fi
clientlibrary=$root_path/clientlibrary
clientlibraryzip=$clientlibrary/clientlibrary.zip
clientlibraryextractpath=$clientlibrary/temp
pluginpath=$root_path/application/bi/dataservice/Plugins/connections

# Colours used in this script
Yellow='\033[0;33m'
Green='\033[0;32m'
NC='\033[0m'

# check empty command 
if [ -z "$command" ]
then
echo -e  "${Yellow}Warning:${NC}Please enter the valid command." >&2
echo -e "${Green}info:${NC} Ex: bash install-optional.libs.sh install-optional-libs "mongodb,influxdb,snowflake,mysql,oracle,google,clickhouse"." >&2

# check valid command
elif [ $command != "$installoptionlibs" ];
then
echo -e  "${Yellow}Warning:${NC}Please enter the valid command." >&2
echo -e "${Green}info:${NC} Ex: bash install-optional.libs.sh install-optional-libs "mongodb,influxdb,snowflake,mysql,oracle,google,clickhouse"." >&2

# copy optionlib block
else

# check empty assembly names
if [ -z "$arguments" ]
then
echo -e  "${Yellow}Warning:${NC}No optional libraries were chosen. Please pass the names of the optional libraries as arguments." >&2
echo -e "${Green}info:${NC} Bold BI supports the following optional libraries. To install them, please pass their names as environment variables." >&2
echo "mongodb,mysql,influxdb,snowflake,oracle,clickhouse,google"
else

# copy the optional libraries names
if [ -f "$root_path/optional-lib.txt" ]
then
        rm -rf "$root_path/optional-lib.txt"
        echo $2 >>"$root_path/optional-lib.txt"
else
        echo $2 >>"$root_path/optional-lib.txt"
fi

# Eliminate special characters and spaces.
arguments=$(echo "$arguments" | tr -dc '[:alpha:],')
# Eliminate any extra commas if there are any available.
arguments=$(echo "$arguments" | sed 's/,\+/,/g')

# split assembly name into array
IFS=', ' read -r -a assmeblyarguments <<< "$arguments"
assembly=("mongodb" "mysql" "influxdb" "snowflake" "oracle" "clickhouse" "google")
nonexistassembly=()

# create  invalid assembly array
for element in "${assmeblyarguments[@]}"
do
    if [[ ! " ${assembly[@]} " =~ " ${element} " ]]; then
    nonexistassembly+=("$element")
fi
done

# Remove old client libs file if it exists.
if [ -d "$clientlibraryextractpath" ]; then
  rm -r "$clientlibraryextractpath"
fi

# Recreate the temp folder.
mkdir -p "$clientlibraryextractpath"

if [ $arguments != "phantomjs" ]
then
unzip -q $root_path/clientlibrary/clientlibrary.zip -d $clientlibraryextractpath
fi
pluginpath=$root_path/application/bi/dataservice/Plugins/connections
for element in "${assmeblyarguments[@]}"
do
    case $element in
"mongodb")
destination=$pluginpath/mongodbconnections
yes | cp -rf $clientlibraryextractpath/DnsClient.dll $destination
yes | cp -rf $clientlibraryextractpath/MongoDB.Bson.dll $destination
yes | cp -rf $clientlibraryextractpath/MongoDB.Driver.Core.dll $destination
yes | cp -rf $clientlibraryextractpath/MongoDB.Driver.dll $destination
yes | cp -rf $clientlibraryextractpath/MongoDB.Driver.Legacy.dll $destination
yes | cp -rf $clientlibraryextractpath/MongoDB.Libmongocrypt.dll $destination
echo -e "${Green}info:${NC} Mongodb libraries are installed"
;;
"mysql")
destination=$pluginpath/mysqlserver
yes | cp -rf $clientlibraryextractpath/MySqlConnector.dll $destination
echo -e "${Green}info:${NC} Mysql libraries are installed"
;;
"influxdb")
destination=$pluginpath/influxdb
yes | cp -rf $clientlibraryextractpath/InfluxData.Net.dll $destination
echo -e "${Green}info:${NC} Influxdb libraries are installed"
;;
 "snowflake")
destination=$pluginpath/snowflake
yes | cp -rf $clientlibraryextractpath/Snowflake.Data.dll $destination
echo -e "${Green}info:${NC} Snowflake libraries are installed"
;;
 "oracle")
destination=$pluginpath/oracle
yes | cp -rf $clientlibraryextractpath/Oracle.ManagedDataAccess.dll $destination
echo -e "${Green}info:${NC} Oracle libraries are installed"
;;
"google")
destination=$pluginpath/google
yes | cp -rf $clientlibraryextractpath/Google.Cloud.BigQuery.V2.dll $destination
echo -e "${Green}info:${NC} Google libraries are installed"
;;
"clickhouse")
destination=$pluginpath/clickhouse
yes | cp -rf $clientlibraryextractpath/ClickHouse.Client.dll $destination
echo -e "${Green}info:${NC} Clickhouse libraries are installed"
;;
esac
done
rm -r $clientlibraryextractpath
fi
# check non exist assembly count
if [ ${#nonexistassembly[@]} -ne 0 ]; then
echo -e "${Yellow}Warning:${NC}The below optional library names do not exist. Please enter valid library names." >&2
for element in "${nonexistassembly[@]}"
do
echo "$element"
done
echo "The supported client library names are mongodb,mysql,influxdb,snowflake,oracle,google,clickhouse."
fi
fi
