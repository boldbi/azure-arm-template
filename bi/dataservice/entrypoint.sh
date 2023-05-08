#!/bin/bash

bash install-optional.libs.sh

if [ -d "/application/app_data/bi/dataservice/CustomWidgets" ]; then
    if [ -f "/application/utilities/customwidgetupgrader/CustomWidgetUpgrader.dll" ]; then
	    dotnet /application/utilities/customwidgetupgrader/CustomWidgetUpgrader.dll true
	fi
fi

dotnet Syncfusion.Dashboard.Designer.Web.Service.dll