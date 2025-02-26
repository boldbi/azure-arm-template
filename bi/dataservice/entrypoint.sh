#!/bin/bash

echo "Installing optional libraries..."
bash install-optional.libs.sh


if [ -f "/application/utilities/customwidgetupgrader/CustomWidgetUpgrader.dll" ]; then
    echo "Running Custom Widget Upgrader..."
    dotnet /application/utilities/customwidgetupgrader/CustomWidgetUpgrader.dll true
fi

echo "Executing Designer Web Service..."
dotnet Syncfusion.Dashboard.Designer.Web.Service.dll --urls=http://0.0.0.0:80

