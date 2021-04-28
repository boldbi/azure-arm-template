﻿ALTER TABLE [dbo].[TenantLog] ADD OptionalData nvarchar(max) NULL;
Go
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Installer', N'', GetDate(), 1);
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'BuildInstallation', 1)
Go