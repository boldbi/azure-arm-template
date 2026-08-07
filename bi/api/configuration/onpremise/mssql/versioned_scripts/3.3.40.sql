CREATE TABLE [BOLDBI_PublishedItem](
    [Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
    [TenantId] [uniqueidentifier] NOT NULL,
    [ItemId] [uniqueidentifier] NOT NULL,
	[ItemName] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1026) NULL,
	[CategoryName] [nvarchar](255) NULL,
    [UserId] [int] NOT NULL,
    [DestinationItemId] [uniqueidentifier] NOT NULL,
	[PublishType] [nvarchar](255) NOT NULL,
    [IsLocked] [bit] NOT NULL,
    [CreatedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL)
;
CREATE TABLE [BOLDBI_PublishJobs](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [PublishId] [uniqueidentifier] NOT NULL,
    [UserId] [int] NOT NULL,
    [JobDetails] [nvarchar](4000) NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CompletedDate] [datetime] NOT NULL,
    [Status] [nvarchar](255) NOT NULL,
    [IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_DeploymentDashboards](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemName] [nvarchar](255) NOT NULL,
	[CategoryName] [nvarchar](255) NOT NULL,
    [Description] [nvarchar](1026) NULL,
	[IsDashboardLocked] [bit] NOT NULL,
	[IsDatasourceLocked] [bit] NOT NULL,
    [CreatedById] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDBI_DeploymentDashboards]  ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_DeploymentDashboards]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_PublishedItem]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_PublishedItem]  ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_PublishJobs]  ADD FOREIGN KEY([PublishId]) REFERENCES [BOLDBI_PublishedItem] ([Id])
;
ALTER TABLE [BOLDBI_PublishJobs]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_UserPreference] ADD [IsolationCode] [nVarchar](4000) NULL
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.IsolationCode',N'DashboardSettings.IsolationCode',GETDATE(),1)
;

ALTER TABLE [BOLDBI_Group] ADD [IsolationCode] [nVarchar](4000) NULL
;

CREATE TABLE [BOLDBI_UserAttributes](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Value] [nvarchar](4000) NOT NULL,
	[Description] [nvarchar](1026) NULL,
	[Encrypt] [bit] NOT NULL,
	[UserId] [int] NOT NULL,
	[CreatedById] [int] NOT NULL,
	[ModifiedById] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_GroupAttributes](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Value] [nvarchar](4000) NOT NULL,
	[Description] [nvarchar](1026) NULL,
	[Encrypt] [bit] NOT NULL,
	[GroupId] [int] NOT NULL,
	[CreatedById] [int] NOT NULL,
	[ModifiedById] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SiteAttributes](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Value] [nvarchar](4000) NOT NULL,
	[Description] [nvarchar](1026) NULL,
	[Encrypt] [bit] NOT NULL,
	[CreatedById] [uniqueidentifier] NOT NULL,
	[ModifiedById] [uniqueidentifier] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDBI_UserAttributes] ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_UserAttributes] ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_UserAttributes] ADD FOREIGN KEY([ModifiedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_GroupAttributes] ADD FOREIGN KEY([GroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_GroupAttributes] ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_GroupAttributes] ADD FOREIGN KEY([ModifiedById]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ScheduleLog] ADD [Message] [nVarchar](max) NULL
;

ALTER TABLE [BOLDBI_DataNotification] DROP COLUMN [Frequency]
;
ALTER TABLE [BOLDBI_DataNotification] DROP COLUMN [ConditionCategory]
;
ALTER TABLE [BOLDBI_DataNotification] DROP COLUMN [PreviousValue]
;
ALTER TABLE [BOLDBI_DataNotification] DROP COLUMN [PreviousData]
;
ALTER TABLE [BOLDBI_DataNotification] DROP COLUMN [ColumnInfo]
;
ALTER TABLE [BOLDBI_DataNotification] DROP COLUMN [ConditionInfo]
;
ALTER TABLE [BOLDBI_DataNotification] DROP COLUMN [ItemName]
;

ALTER TABLE [BOLDBI_DataNotification] ADD [DataSourceId] [uniqueidentifier] NULL
;
ALTER TABLE [BOLDBI_DataNotification] ADD [DaJsonString] [nvarchar](max) NOT NULL
;
ALTER TABLE [BOLDBI_DataNotification] ADD [FilterData] [nvarchar](max) NOT NULL
;

CREATE TABLE [BOLDBI_UserDataNotification](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[FilterData] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDBI_DataNotification]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_DataNotification]  ADD FOREIGN KEY([DataSourceId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_UserDataNotification]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;

CREATE TABLE [BOLDBI_ExternalSites](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[ClientId] [nvarchar](255) NOT NULL,
	[ClientSecret] [nvarchar](255) NOT NULL,
	[SiteURL] [nvarchar](255) NOT NULL,
	[CreatedById] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDBI_ExternalSites]  ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;

Update [BOLDBI_UserPermission] set [PermissionEntityId] = 19 Where [PermissionEntityId] = 9
;

Update [BOLDBI_GroupPermission] set [PermissionEntityId] = 19 Where [PermissionEntityId] = 9
;

ALTER TABLE [BOLDBI_Item] ADD [IsLocked] [bit] NOT NULL DEFAULT 0
;