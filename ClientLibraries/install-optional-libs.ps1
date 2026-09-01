##########################################################################
# This the powershell script to move client libraries in boldbi dataservice
##########################################################################


[CmdletBinding()]
Param(	
	[string]$ClientLibraries,
	[string]$clientlibraryextractpath = "Libraries",
	[string]$pluginpath = "../bi/dataservice/Plugins/connections"
	
)

$Clientcollection = $ClientLibraries.Split(",")
Foreach ($name in $Clientcollection)

{
Switch ($name)
{
"mongodb"
{
$destination="$pluginpath/mongodbconnections"
Copy-Item -Path $clientlibraryextractpath/DnsClient.dll -Destination $destination
Copy-Item -Path $clientlibraryextractpath/MongoDB.Bson.dll -Destination $destination
Copy-Item -Path $clientlibraryextractpath/MongoDB.Driver.Core.dll -Destination $destination
Copy-Item -Path $clientlibraryextractpath/MongoDB.Driver.dll -Destination $destination
Copy-Item -Path $clientlibraryextractpath/MongoDB.Driver.Legacy.dll -Destination $destination
Copy-Item -Path $clientlibraryextractpath/MongoDB.Libmongocrypt.dll -Destination $destination
echo "mongodb libraries are installed"
}
"mysql"{
$destination="$pluginpath/mysqlserver"
Copy-Item -Path $clientlibraryextractpath/MySqlConnector.dll -Destination $destination
echo "mysql libraries are installed"
}
"influxdb" {
$destination="$pluginpath/influxdb"
Copy-Item -Path $clientlibraryextractpath/InfluxData.Net.dll -Destination $destination
echo "influxdb libraries are installed"
}
 "snowflake" {
$destination="$pluginpath/snowflake"
Copy-Item -Path $clientlibraryextractpath/Snowflake.Data.dll -Destination $destination
echo "snowflake libraries are installed"
}
 "oracle" {
$destination="$pluginpath/oracle"
Copy-Item -Path $clientlibraryextractpath/Oracle.ManagedDataAccess.dll -Destination $destination
echo "oracle libraries are installed"
}
"npgsql"{
$destination="$pluginpath/postgresql"
Copy-Item -Path $clientlibraryextractpath/Npgsql.dll -Destination $destination
echo "postgresql libraries are installed"
}
"google"{
$destination="$pluginpath/google"
Copy-Item -Path $clientlibraryextractpath/Google.Cloud.BigQuery.V2.dll -Destination $destination
echo "google libraries libraries are installed"
}
"clickhouse"{
$destination="$pluginpath/clickhouse"
Copy-Item -Path $clientlibraryextractpath/ClickHouse.Client.dll -Destination $destination
echo "clickhouse libraries are installed" 
}
}
}