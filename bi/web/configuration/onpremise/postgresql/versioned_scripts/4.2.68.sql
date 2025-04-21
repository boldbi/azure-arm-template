ALTER TABLE SyncDS_ScheduleDetail ADD ScheduleExportInfo text NULL
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 10,N'DashboardSettings.UsageAnalytics',N'DashboardSettings.UsageAnalytics',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'DashboardSettings.UsageAnalytics')
;
ALTER TABLE SyncDS_DeploymentDashboards ADD ItemInfo text NULL
;
ALTER TABLE SyncDS_SystemSettings ALTER COLUMN value type text
;
ALTER TABLE SyncDS_ItemLog ADD EventTypeId int NOT NULL DEFAULT 0
;
ALTER TABLE SyncDS_Item ADD COLUMN IsUnlisted smallint NOT NULL default 0
;
ALTER TABLE SyncDS_Item ADD COLUMN UnlistedCode varchar(20) NULL
;
ALTER TABLE SyncDS_Comment ADD COLUMN ParentItemId uuid NULL
;
ALTER TABLE SyncDS_ItemWatch ADD COLUMN ParentItemId uuid NULL
;

ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(ParentItemId) REFERENCES SyncDS_Item (Id) 
;
ALTER TABLE SyncDS_ItemWatch ADD FOREIGN KEY(ParentItemId) REFERENCES SyncDS_Item (Id)
;

CREATE TABLE SyncDS_SettingsType(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NULL)
;

INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Site Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Site Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Dashboard Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Dashboard Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Embed Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Embed Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Data Process', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Data Process')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Connectors', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Connectors')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Email Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Email Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Accounts Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Accounts Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'User Directory Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'User Directory Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Authentication Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Authentication Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Notification Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Notification Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Manage License', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Manage License')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Support Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Support Settings')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Subscription', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Subscription')
;
INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Payments', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Payments')
;

ALTER TABLE SyncDS_UserPermission ADD SettingsTypeId int NULL
;
ALTER TABLE SyncDS_UserPermission ADD ScopeGroupId int NULL
;
ALTER TABLE SyncDS_UserPermission ADD ItemTypeId int NULL
;

ALTER TABLE SyncDS_GroupPermission ADD SettingsTypeId int NULL
;
ALTER TABLE SyncDS_GroupPermission ADD ScopeGroupId int NULL
;
ALTER TABLE SyncDS_GroupPermission ADD ItemTypeId int NULL
;

ALTER TABLE SyncDS_UserPermission ADD FOREIGN KEY (SettingsTypeId) REFERENCES SyncDS_SettingsType (Id) 
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;

ALTER TABLE SyncDS_GroupPermission ADD FOREIGN KEY (SettingsTypeId) REFERENCES SyncDS_SettingsType (Id)
;
ALTER TABLE SyncDS_GroupPermission ADD  FOREIGN KEY(ScopeGroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;

INSERT INTO SyncDS_ItemType (Name, IsActive) SELECT 'Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_ItemType WHERE Name = 'Settings')
;
INSERT INTO SyncDS_ItemType (Name, IsActive) SELECT 'User Management', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_ItemType WHERE Name = 'User Management')
;
INSERT INTO SyncDS_ItemType (Name, IsActive) SELECT 'Permissions', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_ItemType WHERE Name = 'Permissions')
;

INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Specific Settings',0,11,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'Specific Settings')
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Settings',1,11,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'All Settings')
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Specific Group',0,12,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'Specific Group')
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Users and Groups',1,12,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'Users and Groups')
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Specific Permissions',0,13,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'Specific Permissions')
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Permissions',1,13,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'All Permissions')
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Groups',1,12,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'All Groups')
;

INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 23,3,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 23 AND PermissionAccessId = 3)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 24,3,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 24 AND PermissionAccessId = 3)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 25,3,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 25 AND PermissionAccessId = 3)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 26,3,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 26 AND PermissionAccessId = 3)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 27,3,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 27 AND PermissionAccessId = 3)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 28,3,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 28 AND PermissionAccessId = 3)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 29,1,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 29 AND PermissionAccessId = 1)
;