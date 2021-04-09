ALTER TABLE [SyncDS_UserLog] ADD [ActivityId] [uniqueidentifier] NOT NULL Default newid() with values;

while(exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_TYPE='FOREIGN KEY' AND TABLE_NAME = 'SyncDS_UserLog'))
begin
	declare @sql nvarchar(2000)
	SELECT TOP 1 @sql=('ALTER TABLE [SyncDS_UserLog] DROP CONSTRAINT [' + CONSTRAINT_NAME + ']')
	FROM information_schema.table_constraints
	WHERE CONSTRAINT_TYPE = 'FOREIGN KEY' AND TABLE_NAME = 'SyncDS_UserLog'
	exec (@sql)
end

ALTER TABLE [SyncDS_UserLog] DROP COLUMN [GroupId]
;
ALTER TABLE [SyncDS_UserLog] ADD [LogFieldId] [int] NOT NULL DEFAULT 104
;
ALTER TABLE [SyncDS_UserLog] ALTER COLUMN [OldValue] [nvarchar](4000) NULL
;
ALTER TABLE [SyncDS_UserLog] ALTER COLUMN [NewValue] [nvarchar](4000) NULL
;
EXEC sp_rename 'SyncDS_UserLog.UpdatedUserId', 'CurrentUserId', 'COLUMN';  
GO
EXEC sp_rename 'SyncDS_UserLog.ModifiedDate', 'CreatedDate', 'COLUMN';  
GO
ALTER TABLE [SyncDS_UserLog] ADD [SourceTypeId] [int] NOT NULL DEFAULT 1
;
ALTER TABLE [SyncDS_UserLog] ADD [LogStatusId] [int] NOT NULL DEFAULT 2
;
ALTER TABLE [SyncDS_UserLog] ALTER COLUMN [TargetUserId] [int] NULL
;
ALTER TABLE [SyncDS_UserLog] ALTER COLUMN [CurrentUserId] [int] NULL
;

ALTER TABLE [SyncDS_UserLog]  ADD CONSTRAINT FK_UserLog_UserLogTypeId FOREIGN KEY([UserLogTypeId]) REFERENCES [SyncDS_UserLogType] ([Id])
;
ALTER TABLE [SyncDS_UserLog]  ADD CONSTRAINT FK_UserLog_TargetUserId FOREIGN KEY([TargetUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_UserLog]  ADD CONSTRAINT FK_UserLog_CurrentUserId FOREIGN KEY([CurrentUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_UserLog]  ADD CONSTRAINT FK_UserLog_SourceTypeId FOREIGN KEY([SourceTypeId]) REFERENCES [SyncDS_Source] ([Id])
;
ALTER TABLE [SyncDS_UserLog]  ADD CONSTRAINT FK_UserLog_LogStatusId FOREIGN KEY([LogStatusId]) REFERENCES [SyncDS_LogStatus] ([Id])
;

UPDATE [SyncDS_UserLog] SET OldValue = ''
;
UPDATE [SyncDS_UserLog] SET NewValue = ''
;

UPDATE [SyncDS_UserLogType] SET Name = N'Add' WHERE Id = 1
;
UPDATE [SyncDS_UserLogType] SET Name = N'Update' WHERE Id = 2
;
UPDATE [SyncDS_UserLogType] SET Name = N'Delete' WHERE Id = 3
;
UPDATE [SyncDS_UserLogType] SET Name = N'Synchronization' WHERE Id = 4
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Import',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Visit',1)
;

UPDATE [SyncDS_LogModule] SET Name = N'UserDirectoryAzureSchedule' WHERE Name = N'UserDirectory.Azure.Schedule'
;
UPDATE [SyncDS_LogModule] SET Name = N'UserDirectoryDatabaseSchedule' WHERE Name = N'UserDirectory.Database.Schedule'
;
UPDATE [SyncDS_LogModule] SET Name = N'SystemLogGeneral' WHERE Name = N'General'
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'User',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserManagementPages',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserManagement',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserPreferenceNotification',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Contact',N'Contact',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'CreatedDate',N'CreatedDate',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'DisplayName',N'DisplayName',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Email',N'Email',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Username',N'Username',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'FirstName',N'FirstName',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsActivated',N'IsActivated',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsActive',N'IsActive',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsDeleted',N'IsDeleted',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'LastLogin',N'LastLogin',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'LastName',N'LastName',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'ModifiedDate',N'ModifiedDate',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Picture',N'Picture',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Password',N'Password',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'PasswordChangedDate',N'PasswordChangedDate',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'DirectoryTypeId',N'DirectoryTypeId',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IdPReferenceId',N'IdPReferenceId',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'ExternalProviderId',N'ExternalProviderId',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'CanSync',N'CanSync',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsCloseRequest',N'IsCloseRequest',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserPermissionsManagement',N'Manage User Permissions',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'ConciergeSupportIncidents',N'Concierge Support Incidents',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'ViewConciergeSupportIncident',N'View Concierge Support Incident',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserConnectedAccounts',N'User Connected Accounts',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserProfile',N'User Profile',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserPermission',N'User Permission',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'AzureUserImport',N'Azure AD User Import',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'DatabaseUserImport',N'Database User Import',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserManagementIndex',N'User Management',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'DatabaseUsersSynchronization',N'Database users Synchronization',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'AzureUsersSynchronization',N'Azure AD users Synchronization',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'CsvUserImport',N'CSV User Import',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserManagementProfile',N'User Management Profile',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'User',N'User',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'Users',N'Users',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'CsvUsers',N'CSV Users',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserActiveStatus',N'User Active Status',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'DatabaseUsers',N'Database Users',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'AzureUsers',N'Azure Users',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'HomepageInProfile',N'Homepage in User Profile',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'DefaultHomepage',N'Default Homepage of User',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserProfilePicture',N'User Profile Picture',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'ProfileNotificationSettings',N'Notification Settings in Profile',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserPassword',N'User Password',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableAutoWatchOfCommentsOfAccessibleItems',N'Auto Watch Of Comments Of Accessible Items',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableAutoWatchOfCommentsOfCreatedItems',N'Auto Watch Of Comments Of Created Items',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableMailNotification',N'Mail Notification',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableSystemNotification',N'System Notification',GETDATE(),1)
;

ALTER TABLE [SyncDS_UserLog]  ADD CONSTRAINT FK_UserLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [SyncDS_LogField] ([Id])
;

CREATE TABLE [SyncDS_GroupLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_GroupLog](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[ActivityId] [uniqueidentifier] NOT NULL,
	[GroupLogTypeId] [int] NOT NULL,
	[LogFieldId] [int] NOT NULL,
	[OldValue] [nvarchar](4000) NULL,
	[NewValue] [nvarchar](4000) NULL,	
	[CurrentUserId] [int] NULL,
	[TargetGroupId] [int] NULL,
	[SourceTypeId] [int] NOT NULL,
	[LogStatusId] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_GroupLog]  ADD CONSTRAINT FK_GroupLog_GroupLogTypeId FOREIGN KEY([GroupLogTypeId]) REFERENCES [SyncDS_GroupLogType] ([Id])
;
ALTER TABLE [SyncDS_GroupLog]  ADD CONSTRAINT FK_GroupLog_TargetGroupId FOREIGN KEY([TargetGroupId]) REFERENCES [SyncDS_Group] ([Id])
;
ALTER TABLE [SyncDS_GroupLog]  ADD CONSTRAINT FK_GroupLog_CurrentUserId FOREIGN KEY([CurrentUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_GroupLog]  ADD CONSTRAINT FK_GroupLog_SourceTypeId FOREIGN KEY([SourceTypeId]) REFERENCES [SyncDS_Source] ([Id])
;
ALTER TABLE [SyncDS_GroupLog]  ADD CONSTRAINT FK_GroupLog_LogStatusId FOREIGN KEY([LogStatusId]) REFERENCES [SyncDS_LogStatus] ([Id])
;
ALTER TABLE [SyncDS_GroupLog]  ADD CONSTRAINT FK_GroupLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [SyncDS_LogField] ([Id])
;

INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'Add',1)
;
INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'Update',1)
;
INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'Delete',1)
;
INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'Synchronization',1)
;
INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'Import',1)
;
INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'Visit',1)
;
INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'UserAdd',1)
;
INSERT into [SyncDS_GroupLogType] (Name,IsActive) VALUES ( N'UserRemove',1)
;

INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'Group',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'GroupManagementPages',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Group',N'Group',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Color',N'Color',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Description',N'Description',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'IsActive',N'IsActive',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'ModifiedDate',N'ModifiedDate',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Name',N'Name',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'DirectoryTypeId',N'DirectoryTypeId',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'ExternalProviderId',N'ExternalProviderId',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Groups',N'Groups',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'AzureGroups',N'Azure Groups',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'AzureADGroup',N'Azure AD groups Synchronization',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'AzureADGroupImport',N'Azure AD Group Import',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'Group',N'Group Management',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'ViewGroup',N'Group Detail',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'EditGroup',N'Edit Group',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'GroupPermission',N'Group Permission',GETDATE(),1)
;

while(exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_TYPE='PRIMARY KEY' AND TABLE_NAME = 'SyncDS_UserLog'))
begin
	declare @sql nvarchar(2000)
	SELECT TOP 1 @sql=('ALTER TABLE [SyncDS_UserLog] DROP CONSTRAINT [' + CONSTRAINT_NAME + ']')
	FROM information_schema.table_constraints
	WHERE CONSTRAINT_TYPE = 'PRIMARY KEY' AND TABLE_NAME = 'SyncDS_UserLog'
	exec (@sql)
end

ALTER TABLE [SyncDS_UserLog] ADD [Temp_Id] [uniqueidentifier] NOT NULL Default newid() with values
;
ALTER TABLE [SyncDS_UserLog] DROP COLUMN [Id]
;
EXEC sp_rename 'SyncDS_UserLog.Temp_Id', 'Id', 'COLUMN';  
GO
ALTER TABLE [SyncDS_UserLog] ADD CONSTRAINT PK_SystemLog_Id PRIMARY KEY (Id)
;