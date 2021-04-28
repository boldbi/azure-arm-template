UPDATE [SaasPLan] SET [SetupName] = 'BoldBIEnterpriseEdition' WHERE [TenantTypeId] = '3'

UPDATE [SaasPlan] SET [IsArchived] = 1 WHERE [TenantTypeId] = '4'

UPDATE [SaasPlan] SET [IsArchived] = 0 WHERE [TenantTypeId] = '4' AND [Id] IN ('76','33','42','78','46','47','50','51','54','55','64','65','66','67')

UPDATE [SaasPlan] SET IsInternal = 0 WHERE [Id] IN ('76','78')

﻿ALTER TABLE [SaasPlan] ADD [PlanAdditionalData] nvarchar(max) Null

UPDATE [SaasPlan] SET [PlanAdditionalData] = '{"Embed":"true"}' WHERE [Id] IN ('21','22','23','26','77','60','61','62','63','27','28','34','37','38','64','65','66','67','78')

UPDATE [SaasPlan] SET [PlanAdditionalData] = '{"Embed":"false"}' WHERE [Id] NOT IN ('21','22','23','26','77','60','61','62','63','27','28','34','37','38','64','65','66','67','78')

ALTER TABLE [SaasPlan] ADD [Description] nvarchar(max) NULL;

Update [SaaSPlan] set [Description] = 'A plan for individual users with 1GB storage limit and access to 85+ data sources to create unlimited dashboards.' where Id = 10
Update [SaaSPlan] set [Description] = 'A starter plan for business teams of 5 creators and unlimited users with 5 GB storage limit, 15 minutes data refresh, and more.' where Id = 68
Update [SaaSPlan] set [Description] = 'A business plan for teams and organizations of 10 creators and unlimited users with 10 GB storage limit, 15 minutes data refresh, and more.' where Id = 8
Update [SaaSPlan] set [Description] = 'A premium plan for large teams and organizations of unlimited creators and users with 25 GB storage limit, 5 minutes data refresh, and more.' where Id = 69

Update [SaaSPlan] set [Description] = 'A plan for individual users with 30+ easy-to-use drag and drop widgets to create unlimited reports.' where Id = 70
Update [SaaSPlan] set [Description] = 'A starter plan for business teams of 5 creators and unlimited users with custom branding and more.' where Id = 71
Update [SaaSPlan] set [Description] = 'A business plan for teams and organizations of 10 creators and unlimited users with custom branding and more.' where Id = 72
Update [SaaSPlan] set [Description] = 'A premium plan for large teams and organizations of unlimited creators and users with custom branding, and more.' where Id = 73

