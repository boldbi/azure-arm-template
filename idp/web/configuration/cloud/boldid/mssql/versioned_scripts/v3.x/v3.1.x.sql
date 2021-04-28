INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldBIWebsite', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldReportsWebsite', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldSignWebsite', N'', GetDate(), 1)
﻿INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldSignApp', N'', GetDate(), 1)

ALTER TABLE [TenantInfo] ADD [Quantity] int NOT NULL CONSTRAINT df_Quantity default 1

ALTER TABLE [CustomPlan] ADD [PricePerLicense] int Null
