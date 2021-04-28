ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([SourceTypeId]) REFERENCES [SyncDS_Source] ([Id])
;

CREATE TABLE [SyncDS_LogStatus](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL)
;

DROP TABLE [SyncDS_SystemLog]
;

CREATE TABLE [SyncDS_SystemLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[SystemLogTypeId] [int] NOT NULL,
	[LogFieldId] [int] NOT NULL,
	[OldValue] [nvarchar](4000) NULL,
	[NewValue] [nvarchar](4000) NULL,
	[LogStatusId] [int] NOT NULL,
	[UpdatedUserId] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] bit NOT NULL)
;

ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_SystemLogTypeId FOREIGN KEY([SystemLogTypeId]) REFERENCES [SyncDS_SystemLogType] ([Id])
;
ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_UpdatedUserId FOREIGN KEY([UpdatedUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_LogStatusId FOREIGN KEY([LogStatusId]) REFERENCES [SyncDS_LogStatus] ([Id])
;

CREATE TABLE [SyncDS_LogModule](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] nvarchar(max) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_LogField](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ModuleId] int NOT NULL,
	[Field] nvarchar(max) NOT NULL,
	[Description] nvarchar(max) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_LogField]  ADD CONSTRAINT FK_LogField_ModuleId FOREIGN KEY([ModuleId]) REFERENCES [SyncDS_LogModule] ([Id])
;

ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [SyncDS_LogField] ([Id])
;

INSERT into [SyncDS_LogStatus] (Name,IsActive) VALUES ( N'Start',1)
;
INSERT into [SyncDS_LogStatus] (Name,IsActive) VALUES ( N'Success',1)
;
INSERT into [SyncDS_LogStatus] (Name,IsActive) VALUES ( N'Fail',1)
;

UPDATE [SyncDS_SystemLogType] SET Name = N'Update' WHERE Name = N'Updated'
;
INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Add',1)
;
INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Delete',1)
;
INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Activate',1)
;
INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Retry',1)
;
INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Enable',1)
;
INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Disable',1)
;
INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Visit',1)
;

INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'SystemSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'NotificationSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'NotificationAdministration',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'AzureADDetail',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'DatabaseConfiguration',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'TenantBillingSubscriptionInfo',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'CardDetail',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserDirectory.Azure.Schedule',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserDirectory.Database.Schedule',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'General',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'DateFormat',N'SiteSettings.DateFormat',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'TimeZone',N'SiteSettings.TimeZone',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'TimeFormat',N'SiteSettings.TimeFormat',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'OrganizationName',N'SiteSettings.OrganizationName',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'LoginLogo',N'SiteSettings.LoginScreenLogo',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'EmailLogo',N'SiteSettings.EmailLogo',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'MainScreenLogo',N'SiteSettings.HeaderLogo',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'FavIcon',N'SiteSettings.Favicon',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'IsEnableCopyrightInfo',N'SiteSettings.ShowCopyrightInformation',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'IsEnablePoweredBySyncfusion',N'SiteSettings.ShowPoweredBySyncfusion',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableSystemNotification',N'NotificationSettings.SystemNotifications.DefaultSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableMailNotification',N'NotificationSettings.MailNotifications.DefaultSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableAutoWatchOfCommentsOfCreatedItems',N'NotificationSettings.AutowatchCommentsOfCreatedItems.DefaultSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableAutoWatchOfCommentsOfAccessibleItems',N'NotificationSettings.AutowatchCommentsOfAccessibleItems.DefaultSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableSystemNotification',N'NotificationSettings.SystemNotifications.Allow',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableMailNotification',N'NotificationSettings.MailNotifications.Allow',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableAutoWatchOfCommentsOfCreatedItems',N'NotificationSettings.AutowatchCommentsOfCreatedItems.Allow',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableAutoWatchOfCommentsOfAccessibleItems',N'NotificationSettings.AutowatchCommentsOfAccessibleItems.Allow',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'TenantName',N'UserDirectory.Azure.TenantName',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'ClientId',N'UserDirectory.Azure.ClientId',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'ClientKey',N'UserDirectory.Azure.ClientSecret',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'ServerType',N'UserDirectory.Database.DatabaseType',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'ServerName',N'UserDirectory.Database.ServerName',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'UserName',N'UserDirectory.Database.Username',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'Password',N'UserDirectory.Database.Password',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'DatabaseName',N'UserDirectory.Database.DatabaseName',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'AuthenticationType',N'UserDirectory.Database.Authentication',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'DSN',N'UserDirectory.Database.DSN',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'Port',N'UserDirectory.Database.Port',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'FullName',N'Payments.BillingAddress.Name',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'Email',N'Payments.BillingAddress.Email',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'AddressLine1',N'Payments.BillingAddress.AddressLine1',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'AddressLine2',N'Payments.BillingAddress.AddressLine2',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'City',N'Payments.BillingAddress.City',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'State',N'Payments.BillingAddress.State',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'Country',N'Payments.BillingAddress.Country',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'ZipCode',N'Payments.BillingAddress.ZipCode',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'FullName',N'Payments.BillingAddress.Name',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Email',N'Payments.BillingAddress.Email',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Address1',N'Payments.BillingAddress.AddressLine1',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Address2',N'Payments.BillingAddress.AddressLine2',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'City',N'Payments.BillingAddress.City',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'State',N'Payments.BillingAddress.State',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Country',N'Payments.BillingAddress.Country',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'ZipCode',N'Payments.BillingAddress.ZipCode',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'IsEnabled',N'UserDirectory.Azure.Schedule.IsEnabled',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'RecurrenceType',N'UserDirectory.Azure.Schedule.RecurrenceType',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'RecurrenceInfo',N'UserDirectory.Azure.Schedule.Recurrence',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'StartDateString',N'UserDirectory.Azure.Schedule.Time',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'IsEnabled',N'UserDirectory.Database.Schedule.IsEnabled',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'RecurrenceType',N'UserDirectory.Database.Schedule.RecurrenceType',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'RecurrenceInfo',N'UserDirectory.Database.Schedule.Recurrence',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'StartDateString',N'UserDirectory.Database.Schedule.Time',GETDATE(),1)
;

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription',N'Subscription',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'NotificationSettings',N'NotificationSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Azure.Schedule',N'UserDirectory.Azure.Schedule',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Database.Schedule',N'UserDirectory.Database.Schedule',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Azure',N'UserDirectory.Azure',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'SystemSettings',N'SystemSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Database',N'UserDirectory.Database',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings',N'DashboardSettings',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.PublicDashboards',N'DashboardSettings.PublicDashboards',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'ConciergeSupport.ResourceAccess',N'ConciergeSupport.ResourceAccess',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'ConciergeSupport',N'ConciergeSupport',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments',N'Payments',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments.Card',N'Payments.Card',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments.BillingAddress',N'Payments.BillingAddress',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription',N'Subscription',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription.Plan',N'Subscription.Plan',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'SiteSettings',N'SiteSettings',GETDATE(),1)
;