#!/bin/bash

bash install-optional.libs.sh

if [ -f "/application/utilities/customwidgetupgrader/CustomWidgetUpgrader.dll" ]; then
    dotnet /application/utilities/customwidgetupgrader/CustomWidgetUpgrader.dll true
fi

dotnet Syncfusion.Dashboard.Designer.Web.Service.dll
