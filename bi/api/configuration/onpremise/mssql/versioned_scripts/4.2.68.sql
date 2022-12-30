ALTER TABLE [BOLDBI_ScheduleDetail] ADD [ScheduleExportInfo] [nvarchar](max) NULL
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 10,N'DashboardSettings.UsageAnalytics',N'DashboardSettings.UsageAnalytics',GETDATE(),1
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'DashboardSettings.UsageAnalytics')
;
ALTER TABLE [BOLDBI_DeploymentDashboards] ADD [ItemInfo] [nvarchar](max) NULL
;
ALTER TABLE [BOLDBI_ItemLog] ADD [EventTypeId] [int] NOT NULL  DEFAULT(0)
;
ALTER TABLE [BOLDBI_Item] ADD [UnlistedCode] [nvarchar](20) NULL
;
ALTER TABLE [BOLDBI_Item] ADD [IsUnlisted] Bit Not Null default '0'
;
ALTER TABLE [BOLDBI_Comment] ADD [ParentItemId] [uniqueidentifier] NULL
;
ALTER TABLE [BOLDBI_ItemWatch] ADD [ParentItemId] [uniqueidentifier] NULL
;

ALTER TABLE [BOLDBI_Comment] ADD FOREIGN KEY([ParentItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemWatch] ADD FOREIGN KEY([ParentItemId]) REFERENCES [BOLDBI_Item] ([Id])
;

CREATE TABLE [BOLDBI_SettingsType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Site Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Site Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Dashboard Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Dashboard Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Embed Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Embed Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Data Store Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Data Store Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Connectors', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Connectors')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Email Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Email Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Accounts Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Accounts Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'User Directory Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'User Directory Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Authentication Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Authentication Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Notification Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Notification Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Manage License', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Manage License')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Support Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Support Settings')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Subscription', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Subscription')
;
INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Payments', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Payments')
;

ALTER TABLE [BOLDBI_UserPermission] ADD [SettingsTypeId] int NULL
;
ALTER TABLE [BOLDBI_UserPermission] ADD [ScopeGroupId] int NULL
;
ALTER TABLE [BOLDBI_UserPermission] ADD [ItemTypeId] int NULL
;

ALTER TABLE [BOLDBI_GroupPermission] ADD [SettingsTypeId] int NULL
;
ALTER TABLE [BOLDBI_GroupPermission] ADD [ScopeGroupId] int NULL
;
ALTER TABLE [BOLDBI_GroupPermission] ADD [ItemTypeId] int NULL
;

ALTER TABLE [BOLDBI_UserPermission] ADD FOREIGN KEY([SettingsTypeId]) REFERENCES [BOLDBI_SettingsType] ([Id]) 
;
ALTER TABLE [BOLDBI_UserPermission]  ADD FOREIGN KEY([ScopeGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_UserPermission]  ADD  FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;

ALTER TABLE [BOLDBI_GroupPermission] ADD FOREIGN KEY([SettingsTypeId]) REFERENCES [BOLDBI_SettingsType] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermission]  ADD FOREIGN KEY([ScopeGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermission]  ADD  FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;

INSERT INTO [BOLDBI_ItemType] (Name, IsActive) SELECT 'Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_ItemType] WHERE Name = 'Settings')
;
INSERT INTO [BOLDBI_ItemType] (Name, IsActive) SELECT 'User Management', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_ItemType] WHERE Name = 'User Management')
;
INSERT INTO [BOLDBI_ItemType] (Name, IsActive) SELECT 'Permissions', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_ItemType] WHERE Name = 'Permissions')
;

INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'Specific Settings', 0, 11, 1
WHERE NOT EXISTS (SELECT [Name] FROM [BOLDBI_PermissionEntity] WHERE Name = 'Specific Settings')
;
INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'All Settings', 1, 11, 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_PermissionEntity] WHERE Name = 'All Settings')
;
INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'Specific Group', 0, 12, 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_PermissionEntity] WHERE Name = 'Specific Group')
;
INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'Users and Groups', 1, 12, 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_PermissionEntity] WHERE Name = 'Users and Groups')
;
INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'Specific Permissions', 0, 13, 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_PermissionEntity] WHERE Name = 'Specific Permissions')
;
INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'All Permissions', 1, 13, 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_PermissionEntity] WHERE Name = 'All Permissions')
;
INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'All Groups', 1, 12, 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_PermissionEntity] WHERE Name = 'All Groups')
;

INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 23, 3, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 23 AND PermissionAccessId = 3)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 24, 3, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 24 AND PermissionAccessId = 3)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 25, 3, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 25 AND PermissionAccessId = 3)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 26, 3, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 26 AND PermissionAccessId = 3)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 27, 3, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 27 AND PermissionAccessId = 3)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 28, 3, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 28 AND PermissionAccessId = 3)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 29, 1, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 29 AND PermissionAccessId = 1)
;