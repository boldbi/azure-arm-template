ALTER TABLE  {database_name}.BOLDBI_ScheduleDetail ADD ScheduleExportInfo text NULL
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 10,'DashboardSettings.UsageAnalytics','DashboardSettings.UsageAnalytics',NOW(),1 FROM DUAL 
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field='DashboardSettings.UsageAnalytics' LIMIT 1)
;
ALTER TABLE {database_name}.BOLDBI_DeploymentDashboards ADD ItemInfo text NULL
;
ALTER TABLE {database_name}.BOLDBI_ItemLog ADD EventTypeId int NOT NULL DEFAULT 0
;
ALTER TABLE {database_name}.BOLDBI_Item ADD UnlistedCode varchar(20) NULL
;
ALTER TABLE {database_name}.BOLDBI_Item ADD IsUnlisted tinyint NOT NULL DEFAULT 0
;
ALTER TABLE {database_name}.BOLDBI_Comment ADD ParentItemId Char(38) NULL
;
ALTER TABLE {database_name}.BOLDBI_ItemWatch ADD ParentItemId Char(38) NULL
;

ALTER TABLE {database_name}.BOLDBI_Comment ADD FOREIGN KEY(ParentItemId) REFERENCES {database_name}.BOLDBI_Item (Id) 
;
ALTER TABLE {database_name}.BOLDBI_ItemWatch ADD FOREIGN KEY(ParentItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

CREATE TABLE {database_name}.BOLDBI_SettingsType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NULL,
	PRIMARY KEY (Id))
;

INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Site Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Site Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Dashboard Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Dashboard Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Embed Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Embed Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Data Store Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Data Store Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Connectors', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Connectors' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Email Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Email Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Accounts Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Accounts Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'User Directory Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='User Directory Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Authentication Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Authentication Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Notification Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Notification Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Manage License', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Manage License' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Support Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Support Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Subscription', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Subscription' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Payments', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Payments' LIMIT 1)
;

ALTER TABLE {database_name}.BOLDBI_UserPermission ADD SettingsTypeId int NULL 
;
ALTER TABLE {database_name}.BOLDBI_UserPermission ADD ScopeGroupId int NULL 
;
ALTER TABLE {database_name}.BOLDBI_UserPermission ADD ItemTypeId int NULL 
;

ALTER TABLE {database_name}.BOLDBI_GroupPermission ADD SettingsTypeId int NULL 
;
ALTER TABLE {database_name}.BOLDBI_GroupPermission ADD ScopeGroupId int NULL 
;
ALTER TABLE {database_name}.BOLDBI_GroupPermission ADD ItemTypeId int NULL 
;

ALTER TABLE {database_name}.BOLDBI_UserPermission ADD FOREIGN KEY (SettingsTypeId) REFERENCES {database_name}.BOLDBI_SettingsType (Id) 
;
ALTER TABLE {database_name}.BOLDBI_UserPermission ADD FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE {database_name}.BOLDBI_UserPermission ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

ALTER TABLE {database_name}.BOLDBI_GroupPermission ADD FOREIGN KEY (SettingsTypeId) REFERENCES {database_name}.BOLDBI_SettingsType (Id)
;
ALTER TABLE {database_name}.BOLDBI_GroupPermission ADD FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE {database_name}.BOLDBI_GroupPermission ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

INSERT INTO {database_name}.BOLDBI_ItemType (Name, IsActive) SELECT 'Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_ItemType WHERE Name='Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_ItemType (Name, IsActive) SELECT 'User Management', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_ItemType WHERE Name='User Management' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_ItemType (Name, IsActive) SELECT 'Permissions', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_ItemType WHERE Name='Permissions' LIMIT 1)
;

INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Specific Settings',0,11,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='Specific Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Settings',1,11,1 FROM DUAL 
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='All Settings' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Specific Group',0,12,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='Specific Group' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Users and Groups',1,12,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='Users and Groups' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'Specific Permissions',0,13,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='Specific Permissions' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Permissions',1,13,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='All Permissions' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Groups',1,12,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='All Groups' LIMIT 1)
;

INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 23,3,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 23 AND PermissionAccessId = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 24,3,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 24 AND PermissionAccessId = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 25,3,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 25 AND PermissionAccessId = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 26,3,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 26 AND PermissionAccessId = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 27,3,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 27 AND PermissionAccessId = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 28,3,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 28 AND PermissionAccessId = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 29,1,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 29 AND PermissionAccessId = 1 LIMIT 1)
;
UPDATE {database_name}.BOLDBI_ScheduleStatus SET Name = 'Run' WHERE Id = 3
;
UPDATE {database_name}.BOLDBI_ItemCommentLogType SET Name = 'UserMention' WHERE Name = 'UserMentio'
;
UPDATE {database_name}.BOLDBI_UserLogType SET Name = 'Synchronization' WHERE Name = 'Synchronizatio'
;
UPDATE {database_name}.BOLDBI_GroupLogType SET Name = 'Synchronization' WHERE Name = 'Synchronizatio'
;
UPDATE {database_name}.BOLDBI_LogModule SET Name = 'NotificationAdministration' WHERE Name = 'NotificationAdministratio'
;
UPDATE {database_name}.BOLDBI_LogModule SET Name = 'DatabaseConfiguration' WHERE Name = 'DatabaseConfiguratio'
;
UPDATE {database_name}.BOLDBI_LogModule SET Name = 'UserPreferenceNotification' WHERE Name = 'UserPreferenceNotificatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'FavIcon', Description = 'SiteSettings.Favicon' WHERE Field = 'FavIco'
;
UPDATE {database_name}.BOLDBI_LogField SET Description = 'SiteSettings.ShowCopyrightInformation' WHERE Description = 'SiteSettings.ShowCopyrightInformatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'IsEnablePoweredBySyncfusion', Description = 'SiteSettings.ShowPoweredBySyncfusion' WHERE Field = 'IsEnablePoweredBySyncfusio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'EnableSystemNotification' WHERE Field = 'EnableSystemNotificatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'EnableMailNotification' WHERE Field = 'EnableMailNotificatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Description = 'UserDirectory.Database.Authentication' WHERE Description = 'UserDirectory.Database.Authenticatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'DSN', Description = 'UserDirectory.Database.DSN' WHERE Field = 'DS'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'Subscription', Description = 'Subscription' WHERE Field = 'Subscriptio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'Subscription.Plan', Description = 'Subscription.Plan' WHERE Field = 'Subscription.Pla'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'LastLogin', Description = 'LastLogin' WHERE Field = 'LastLogi'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'UserPermission', Description = 'User Permission' WHERE Field = 'UserPermissio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'DatabaseUsersSynchronization', Description = 'Database users Synchronization' WHERE Field = 'DatabaseUsersSynchronizatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'AzureUsersSynchronization', Description = 'Azure AD users Synchronization' WHERE Field = 'AzureUsersSynchronizatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Description = 'Mail Notification' WHERE Description = 'Mail Notificatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Description = 'System Notification' WHERE Description = 'System Notificatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'Description', Description = 'Description' WHERE Field = 'Descriptio'
;
UPDATE {database_name}.BOLDBI_LogField SET Description = 'Azure AD groups Synchronization' WHERE Description = 'Azure AD groups Synchronizatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'GroupPermission', Description = 'Group Permission' WHERE Field = 'GroupPermissio'
;
UPDATE {database_name}.BOLDBI_LogField SET Field = 'WindowsUsersSynchronization', Description = 'Windows AD users Synchronization' WHERE Field = 'WindowsUsersSynchronizatio'
;
UPDATE {database_name}.BOLDBI_LogField SET Description = 'Windows AD groups Synchronization' WHERE Description = 'Windows AD groups Synchronizatio'
;