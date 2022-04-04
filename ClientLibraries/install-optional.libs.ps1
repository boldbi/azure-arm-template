##########################################################################
# This the powershell script to move client libraries 
# .\install-optional-libs.ps1 -ClientLibraries "mongodb,snowflake,oracle,npgsql,mysql,influxdb,phantomjs"
##########################################################################

[CmdletBinding()]
Param(
    [string]$ClientLibraries
)

$rootPath ="/var/www/bold-services"
$clientlibrary="${rootPath}/clientlibrary"
$clientlibraryzip="${clientlibrary}/clientlibrary.zip"
$clientlibraryextractpath="${clientlibrary}/temp"
$pluginpath="${rootPath}/application/bi/dataservice/Plugins/connections"

# check non exist assembly
$Clientcollection = $ClientLibraries.Split(",")
$assembly="phantomjs","mongodb","mysql","influxdb","snowflake","oracle","npgsql"
$c = Compare-Object -ReferenceObject $Clientcollection  -DifferenceObject $assembly -PassThru
if(-not ([string]::IsNullOrEmpty($c))){
$wronglibrary = Compare-Object -IncludeEqual -ExcludeDifferent $c $Clientcollection -PassThru
}
if(-not ([string]::IsNullOrEmpty($wronglibrary)))
{
echo "Please enter a valide optional libraries name : $wronglibrary"
}
try {
Foreach ($name in $Clientcollection)
{
	Expand-Archive $clientlibraryzip -f -Destination $clientlibraryextractpath
	
Switch ($name)
{
	"mongodb"{
		$destination= "$pluginpath/mongodbconnections"
		Copy-Item -Path $clientlibraryextractpath/DnsClient.dll -Destination $destination
		Copy-Item -Path $clientlibraryextractpath/MongoDB.Bson.dll -Destination $destination
		Copy-Item -Path $clientlibraryextractpath/MongoDB.Driver.Core.dll -Destination $destination
		Copy-Item -Path $clientlibraryextractpath/MongoDB.Driver.dll -Destination $destination
		Copy-Item -Path $clientlibraryextractpath/MongoDB.Driver.Legacy.dll -Destination $destination
        echo "mongodb libraries are installed"
	}
	"mysql"{
		$destination= "$pluginpath/mysqlserver"
		Copy-Item -Path $clientlibraryextractpath/MySqlConnector.dll -Destination $destination
        echo "mysql libraries are installed"
	}
	"influxdb"{
		$destination= "$pluginpath/influxdb"
		Copy-Item -Path $clientlibraryextractpath/InfluxData.Net.dll -Destination $destination
        echo "influxdb libraries are installed"
	}
	"snowflake"{
		$destination= "$pluginpath/snowflake"
		Copy-Item -Path $clientlibraryextractpath/Snowflake.Data.dll -Destination $destination
        echo "snowflake libraries are installed"
	}
	"oracle"{
		$destination= "$pluginpath/oracle"
		Copy-Item -Path $clientlibraryextractpath/Oracle.ManagedDataAccess.dll -Destination $destination
        echo "oracle libraries are installed"
	}
	"npgsql"{
		$destination= "$pluginpath/postgresql"
		Copy-Item -Path $clientlibraryextractpath/Npgsql.dll -Destination $destination
        echo "postgresql libraries are installed"
	}
	"phantomjs"{
	wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.0.0-windows.zip -OutFile phantomjs-2.0.0-windows.zip
    Expand-Archive -f phantomjs-2.0.0-windows.zip
    $dataservicepath="${rootPath}/application/app_data/bi/dataservice"	
    $phantomjspath="${clientlibrary}/phantomjs-2.0.0-windows/phantomjs-2.0.0-windows/bin/phantomjs.exe"
	Copy-Item  -Path  $phantomjspath  -Destination $dataservicepath
	echo "phantomjs libraries are installed"
    rm -r phantomjs-2.0.0-windows.zip
    rm -r phantomjs-2.0.0-windows
	}
}
}
}
catch {
     echo 'File Lock Exception Occurred: Please stop the site and try it'  
}