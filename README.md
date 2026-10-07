<!-- markdownlint-disable MD033 -->
# Bold BI Enterprise Edition

The Bold BI Enterprise Edition is an end-to-end solution for creating, managing, and sharing interactive business dashboards. It includes a powerful dashboard server application for easily composing, managing, and sharing the dashboards.

## Important Notice

Windows-based Azure App Service deployment for Bold BI Enterprise Edition has been deprecated and is no longer recommended for new deployments.

For all new deployments, we recommend using Bold BI on Azure App Service (Linux Container).

Please refer to the following guides:

1. [Deploy Bold BI on Azure App Service (Linux Container)](./doc/boldbi_appservice.md)
2. [Deploy Bold BI on Azure App Service (Linux Container) with Existing Storage Account (Migration Guide)](./doc/boldbi_appservice_existing_storage.md)

If you are an existing user of the Windows-based Azure App Service deployment, we recommend planning your migration to the Linux Container-based deployment.

> **Important:** The deployment guidance below applies only to Bold BI versions up to v16.3. For versions later than v16.3, Windows-based Azure App Service deployment is no longer supported. Please use Bold BI on Azure App Service (Linux Container) instead.


## Deploy Bold BI Enterprise Edition in Azure Web App using ARM Template

This repository contains the Azure App Service package for Bold BI, which can be deployed in Azure using ARM templates to provision a Bold BI Enterprise Edition instance.

For Bold BI versions up to v16.3, Azure App Service deployment can be done by following the instructions from [here](https://github.com/boldbi/azure-arm-template/blob/master/How%20to%20deploy%20Bold%20BI%20Enterprise%20Application%20in%20Azure%20App%20service%20.md).

**Note**: Image and PDF exporting are not supported in Azure App Service deployment.

## Deploy Bold BI Enterprise Edition and Bold Reports Enterprise in Azure Web App using ARM Template

For deployments up to Bold BI v16.3, to deploy both Bold BI and Bold Reports on a single Azure App Service, kindly use the following repository. <br/>
<https://github.com/boldbi/bi_and_reports_azure-arm-template>

## Reference Link

* [Documentation](https://help.boldbi.com/application-startup/?utm_source=github&utm_medium=backlinks)

* [Feature tour](https://www.boldbi.com/embedded-analytics?utm_source=github&utm_medium=backlinks)
