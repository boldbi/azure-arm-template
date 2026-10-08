<!-- markdownlint-disable MD033 -->
# Bold BI Enterprise Edition

The Bold BI Enterprise Edition is an end-to-end solution for creating, managing, and sharing interactive business dashboards. It includes a powerful dashboard server application for easily composing, managing, and sharing the dashboards.

Bold BI Enterprise Edition can be installed in the following environments.

* [Windows](https://help.boldbi.com/deploying-bold-bi/deploying-on-windows/?utm_source=github&utm_medium=backlinks)
* [New Windows VM - Azure Marketplace](https://help.boldbi.com/deploying-bold-bi/deploying-on-azure/?utm_source=github&utm_medium=backlinks)
* [Linux](https://help.boldbi.com/deploying-bold-bi/deploying-on-linux/?utm_source=github&utm_medium=backlinks)
* [Kubernetes](https://help.boldbi.com/deploying-bold-bi/deploying-on-kubernetes/?utm_source=github&utm_medium=backlinks)
* [Docker](https://help.boldbi.com/deploying-bold-bi/deploying-on-docker/?utm_source=github&utm_medium=backlinks)

## Deploy Bold BI Enterprise Edition in Azure Web App using ARM Template

This repository holds the Azure App Service package of the Bold BI which you can deploy in the Azure using ARM templates to spin a Bold BI Enterprise Edition instance. It holds the package according to the release versions of the main application.

New Bold BI Enterprise Edition Azure App Service deployment can be done by following the instructions from [here](https://github.com/boldbi/azure-arm-template/blob/master/How%20to%20deploy%20Bold%20BI%20Enterprise%20Application%20in%20Azure%20App%20service%20.md).

**Note**: Image and PDF exporting are not supported in Azure App Service deployment.

## Deploy Bold BI Enterprise Edition and Bold Reports Enterprise in Azure Web App using ARM Template

To deploy both Bold BI and Bold Reports on a single Azure App Service, kindly use the following repository. <br/>
<https://github.com/boldbi/bi_and_reports_azure-arm-template>

## Reference Link

* [Documentation](https://help.boldbi.com/application-startup/?utm_source=github&utm_medium=backlinks)

* [Feature tour](https://www.boldbi.com/embedded-analytics?utm_source=github&utm_medium=backlinks)

## Important: Azure App Service Windows Deployment Deprecated

Starting with **Bold BI v17.1**, deployment of Bold BI using **Azure App Service on Windows** is deprecated and is no longer supported for new deployments. All customers deploying Bold BI on Azure App Service are required to use **Azure App Service with Linux containers** starting from **v17.1**.

### What does this mean for existing customers?

If you are currently running Bold BI on **Azure App Service for Windows**, you can continue using your existing deployment. However, when upgrading to **Bold BI v17.1 or later**, you must migrate your Bold BI deployment from the Windows App Service environment to a **Linux container-based Azure App Service deployment**. We recommend planning this migration before upgrading to v17.1 to ensure a smooth transition.

### New Azure App Service deployments

For new Bold BI deployments on Azure App Service, use the **Linux container deployment** method. 

[Deploy Bold BI using Azure App Service Linux Container: ](https://github.com/boldbi/boldbi-server-azure-arm-linux/blob/master/doc/boldbi_appservice.md)

### Migrating an existing Windows App Service deployment

If you are currently using Bold BI on Azure App Service Windows, follow the migration guide to move your existing deployment to Azure App Service Linux containers.

### Migrate from Azure App Service Windows to Linux Container:

[Deploy Bold BI on Azure App Service (Linux Container) with Existing Storage Account (Migration Guide)](https://github.com/boldbi/boldbi-server-azure-arm-linux/blob/master/doc/boldbi_appservice_existing_storage.md)

The migration guide covers the required steps to create the Linux container-based deployment and migrate your existing Bold BI configuration and data.

**Note:** Azure App Service Windows deployment will not be supported for Bold BI v17.1 and later. Customers using the existing Windows App Service deployment should complete the migration to Linux containers before upgrading to v17.1.