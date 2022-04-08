CREATE TABLE [Group] (
	Id uniqueidentifier NOT NULL,
	Name nvarchar(255) NOT NULL,
	Description nvarchar(1024) NULL,
	Color nvarchar(7),
	DirectoryTypeId int NOT NULL,
	ExternalProviderId nvarchar(512),
	DirectoryDomainName nvarchar(512),
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_Group] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [Group_idx1] NONCLUSTERED
	(
	[IsActive], [Name]
	)
)
Go

CREATE TABLE [Organization] (
	Id uniqueidentifier NOT NULL,
	Name nvarchar(100) NOT NULL,
	OwnerId uniqueidentifier NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [OrgUser] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsDefault bit NOT NULL,
	IsActive bit NOT NULL,
	IsDeleted bit NOT NULL,
	CONSTRAINT [PK_OrgUser] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [OrgUser_idx1] NONCLUSTERED
	(
	[IsDeleted], [OrgId], [UserId], [IsActive]
	)
)
Go

CREATE TABLE [OrgGroup] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NULL,
	GroupId uniqueidentifier NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_OrgGroup] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [OrgGroup_idx1] NONCLUSTERED
	(
	[OrgId], [SubscriptionId], [GroupId], [IsActive]
	)
)
Go

CREATE TABLE [OrgGroupMember] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	GroupId uniqueidentifier NOT NULL,
	GroupRoleId int NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL
	CONSTRAINT [PK_OrgGroupMember] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [OrgGroupMember_idx1] NONCLUSTERED
	(
	[UserId], [GroupId], [GroupRoleId], [IsActive]
	)
)
Go

CREATE TABLE [Roles] (
	Id uniqueidentifier NOT NULL,
	Name nvarchar(100) NOT NULL,
	Description nvarchar(max) NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsCustom bit NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [RoleDefinitions] (
	Id uniqueidentifier NOT NULL,
	RoleId uniqueidentifier NOT NULL,
	ProductTypeId int NOT NULL,
	ResourceTypeId int NOT NULL,
	ActionId int NOT NULL,
	CanDo bit NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_RoleDefinitions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [IAMActions] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL UNIQUE,
	Description nvarchar(1024) NULL,
	AccessId int unique NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_IAMActions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [ResourceType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL UNIQUE,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_ResourceType] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [UserRoles] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NULL,
	RoleId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	ResourceTypeId int NULL,
	ResourceId uniqueidentifier NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [APILogs] (
	Id uniqueidentifier NOT NULL,
	RequestType nvarchar(20) NOT NULL,
	URL nvarchar(4000) NOT NULL,
	Query nvarchar(4000) NULL,
	RequestBody nvarchar(max) NULL,
	ResponseBody nvarchar(max) NULL,
	RequestTime datetime NOT NULL,
	ResponseTime datetime NOT NULL,
	ServerIP nvarchar(50) NOT NULL,
	ClientIP nvarchar(50) NULL,
	Status int NOT NULL,
	Source int NOT NULL,
	UserId uniqueidentifier NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_APILogs] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [FeatureConfiguration] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Configuration nvarchar(1024) NULL,
	TenantTypeId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_FeatureConfiguration] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [GroupRole] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL UNIQUE,
	Description nvarchar(1024) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_GroupRole] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [InternalDomains] (
	Id int IDENTITY(1,1) NOT NULL,
	Domain nvarchar(255) NOT NULL,
	ModifiedDate datetime NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_InternalDomains] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [ResourceScopes] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL UNIQUE,
	Description nvarchar(1024) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_ResourceScopes] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [ResourcePermissions] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Scope int NOT NULL,
	ProductTypeId int NOT NULL,
	ResourceTypeId int NOT NULL,
	AccessId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_ResourcePermissions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [UserPermissions] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	ResourcePermissionId int NOT NULL,
	ResourceId nvarchar(255) NOT NULL,
	CanDo bit NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_UserPermissions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [UserPermissions_idx1] NONCLUSTERED
	(
	[OrgId], [UserId], [SubscriptionId], [ResourcePermissionId], [ResourceId], [CanDo], [IsActive]
	)
)
Go

CREATE TABLE [GroupPermissions] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NOT NULL,
	GroupId uniqueidentifier NOT NULL,
	ResourcePermissionId int NOT NULL,
	ResourceId nvarchar(255) NOT NULL,
	CanDo bit NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_GroupPermissions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [GroupPermissions_idx1] NONCLUSTERED
	(
	[OrgId], [GroupId], [SubscriptionId], [ResourcePermissionId], [ResourceId], [CanDo], [IsActive]
	)
)
Go

CREATE TABLE [PermissionLog] (
	Id bigint IDENTITY(1,1) NOT NULL,
	LogAction nvarchar(255) NOT NULL,
	Message nvarchar(max) NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NULL,
	AffectedUserId uniqueidentifier NULL,
	UserPermissionId uniqueidentifier NULL,
	AffectedGroupId uniqueidentifier NULL,
	GroupPermissionId uniqueidentifier NULL,
	RequestedById uniqueidentifier NOT NULL,
	IpAddress nvarchar(100) NOT NULL,
	SourceTypeId int NULL,
	LogDate datetime NOT NULL,
	ReferrerUrl nvarchar(max) NOT NULL,
	AdditionalData nvarchar(max) NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_PERMISSIONLOG] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

ALTER TABLE [InternalApps] ALTER COLUMN [URL] nvarchar(MAX) NOT NULL;
GO

ALTER TABLE [TenantUser] ADD IsDeleted bit NULL;
GO

UPDATE [TenantUser] set IsDeleted = ~IsActive;
GO

ALTER TABLE [TenantUser] ALTER COLUMN IsDeleted bit NOT NULL;
GO

CREATE NONCLUSTERED INDEX [User_idx1] ON [dbo].[User] ([Id], [Email], [IsActivated], [IsActive], [IsDeleted])

CREATE NONCLUSTERED INDEX [TenantUser_idx1] ON [dbo].[TenantUser] ([UserId], [TenantInfoId], [IsActive], [IsDeleted])
GO

ALTER TABLE [Group] WITH CHECK ADD CONSTRAINT [Group_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Group] CHECK CONSTRAINT [Group_fk0]
GO
ALTER TABLE [Group] WITH CHECK ADD CONSTRAINT [Group_fk1] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Group] CHECK CONSTRAINT [Group_fk1]
GO
ALTER TABLE [Group] WITH CHECK ADD CONSTRAINT [Group_fk2] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [DirectoryType]([Id])
GO
ALTER TABLE [Group] CHECK CONSTRAINT [Group_fk2]
GO

ALTER TABLE [Organization] WITH CHECK ADD CONSTRAINT [Organization_fk0] FOREIGN KEY ([OwnerId]) REFERENCES [User]([Id])
GO
ALTER TABLE [Organization] CHECK CONSTRAINT [Organization_fk0]
GO
ALTER TABLE [Organization] WITH CHECK ADD CONSTRAINT [Organization_fk1] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Organization] CHECK CONSTRAINT [Organization_fk1]
GO
ALTER TABLE [Organization] WITH CHECK ADD CONSTRAINT [Organization_fk2] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Organization] CHECK CONSTRAINT [Organization_fk2]
GO

ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk0]
GO
ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk1]
GO
ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk2] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk2]
GO
ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk3] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk3]
GO

ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk0]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk1] FOREIGN KEY([SubscriptionId]) REFERENCES [TenantInfo] ([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk1]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk2] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk2]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk3] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk3]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk4] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk4]
GO

ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk0]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk1] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk1]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk2] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk2]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk3] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk3]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk4] FOREIGN KEY ([GroupRoleId]) REFERENCES [GroupRole]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk4]
GO

ALTER TABLE [Roles] WITH CHECK ADD CONSTRAINT [Roles_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Roles] CHECK CONSTRAINT [Roles_fk0]
GO
ALTER TABLE [Roles] WITH CHECK ADD CONSTRAINT [Roles_fk1] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Roles] CHECK CONSTRAINT [Roles_fk1]
GO

ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk0] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk0]
GO
ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk1] FOREIGN KEY ([ProductTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk1]
GO
ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk2] FOREIGN KEY ([ResourceTypeId]) REFERENCES [ResourceType]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk2]
GO
ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk3] FOREIGN KEY ([ActionId]) REFERENCES [IAMActions]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk3]
GO

ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk0]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk1] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk1]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk2] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk2]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk3] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk3]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk4] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk4]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk5] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk5]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk6] FOREIGN KEY ([ResourceTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk6]
GO

ALTER TABLE [APILogs] WITH CHECK ADD CONSTRAINT [APILogs_fk1] FOREIGN KEY ([Source]) REFERENCES [SourceType]([Id])
GO
ALTER TABLE [APILogs] CHECK CONSTRAINT [APILogs_fk1]
GO

ALTER TABLE [FeatureConfiguration] WITH CHECK ADD CONSTRAINT [FeatureConfiguration_fk1] FOREIGN KEY ([TenantTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [FeatureConfiguration] CHECK CONSTRAINT [FeatureConfiguration_fk1]
GO

ALTER TABLE [Tenant] ADD [OrgId] uniqueidentifier NULL
Go
ALTER TABLE [Tenant] WITH CHECK ADD CONSTRAINT [Tenant_fk1] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [Tenant] CHECK CONSTRAINT [Tenant_fk1]
GO

ALTER TABLE [EmailValidation] ALTER COLUMN ProductId int NULL
GO

ALTER TABLE [ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk0] FOREIGN KEY([Scope]) REFERENCES [ResourceScopes]([Id])
GO
ALTER TABLE [ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk0]
GO
ALTER TABLE [ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk1] FOREIGN KEY([ProductTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk1]
GO
ALTER TABLE [ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk2] FOREIGN KEY ([ResourceTypeId]) REFERENCES [ResourceType]([Id])
GO
ALTER TABLE [ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk2]
GO
ALTER TABLE [ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk3] FOREIGN KEY ([AccessId]) REFERENCES [IAMActions]([AccessId])
GO
ALTER TABLE [ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk3]
GO

ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk0]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk1] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk1]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk2] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk2]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk3] FOREIGN KEY ([ResourcePermissionId]) REFERENCES [ResourcePermissions]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk3]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk4] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk4]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk5] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk5]
GO

ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk0]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk1] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk1]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk2] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk2]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk3] FOREIGN KEY ([ResourcePermissionId]) REFERENCES [ResourcePermissions]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk3]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk4] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk4]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk5] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk5]
GO

ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk0] FOREIGN KEY([OrgId]) REFERENCES [Organization] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk0]
GO
ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk1] FOREIGN KEY([SubscriptionId]) REFERENCES [TenantInfo] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk1]
GO
ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk2] FOREIGN KEY([AffectedUserId]) REFERENCES [User] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk2]
GO
ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk3] FOREIGN KEY([UserPermissionId]) REFERENCES [UserPermissions] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk3]
GO
ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk4] FOREIGN KEY([AffectedGroupId]) REFERENCES [Group] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk4]
GO
ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk5] FOREIGN KEY([GroupPermissionId]) REFERENCES [GroupPermissions] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk5]
GO
ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk6] FOREIGN KEY([RequestedById]) REFERENCES [User] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk6]
GO
ALTER TABLE [PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk7] FOREIGN KEY([SourceTypeId]) REFERENCES [TenantType] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk7]
GO

INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.com', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.net', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.org', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.io', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.de', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.co', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldbi.com', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldreports.com', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldsign.com', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldid.net', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('sfn.io', getdate(), 1)
INSERT into [InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('essentialpdf.com', getdate(), 1)
GO

INSERT into [ResourceType] (Name,IsActive) VALUES (N'Category',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Dashboard',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Report',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Datasource',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Dataset',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'File',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Schedule',1)
insert into [ResourceType] (Name,IsActive) values (N'Widget',1)
insert into [ResourceType] (Name,IsActive) values (N'ItemView',1)
Insert INTO [ResourceType] (Name,IsActive) Values ('Slideshow',1)
Insert INTO [ResourceType] (Name,IsActive) Values ('Document',1)
Insert INTO [ResourceType] (Name,IsActive) Values ('Template',1)
Insert INTO [ResourceType] (Name,IsActive) Values ('Form',1)
Insert INTO [ResourceType] (Name,IsActive) Values ('Signature',1)
GO

declare @max int
select @max=max([Id]) from TenantType
if @max IS NULL
  SET @max = 0
DBCC CHECKIDENT ([TenantType], RESEED,@max)
GO

INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldSign',1)
Go

INSERT [FormType] ([Name], [Url], [CreatedDate], [ModifiedDate], [IsActive]) VALUES ('Bold_BI_OnPremise_Registration_Form_v1', ' https://app.boldbi.com/bi/on-premise/register', GETDATE(), GETDATE(), 1)
INSERT [FormType] ([Name], [Url], [CreatedDate], [ModifiedDate], [IsActive]) VALUES ('Bold_Reports_OnPremise_Registration_Form_v1', ' https://app.boldbi.com/reports/on-premise/register', GETDATE(), GETDATE(), 1)
INSERT [FormType] ([Name], [Url], [CreatedDate], [ModifiedDate], [IsActive]) VALUES ('Bold_Sign_Registration_Form_v1', ' https://app.boldbi.com/bold-sign/register', GETDATE(), GETDATE(), 1)
INSERT [FormType] ([Name], [Url], [CreatedDate], [ModifiedDate], [IsActive]) VALUES ('IAM_Account_Registration_Form_v1', 'http//login.boldid.net/accounts/register', GETDATE(), GETDATE(), 1)
GO

INSERT [RegistrationFormVersion] ([Name], [FormTypeId], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES ('Bold_BI_OnPremise_Registration_Form_v1', 3, 'https://cdn.boldbi.com/documents/forms/registration-form/v1.png', GETDATE(), GETDATE(), 1, 1)
INSERT [RegistrationFormVersion] ([Name], [FormTypeId], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES ('Bold_Reports_OnPremise_Registration_Form_v1', 4, 'https://cdn.boldbi.com/documents/forms/registration-form/v1.png', GETDATE(), GETDATE(), 1, 1)
INSERT [RegistrationFormVersion] ([Name], [FormTypeId], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES ('Bold_Sign_Registration_Form_v1', 5, 'https://cdn.boldbi.com/documents/forms/registration-form/v1.png', GETDATE(), GETDATE(), 1, 1)
INSERT [RegistrationFormVersion] ([Name], [FormTypeId], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES('IAM_Account_Registration_Form_v1', 6, 'https://cdn.boldbi.com/documents/forms/accounts/registration-form/v1.png', getdate(), getdate(), 1, 1)
GO

--development & staging apps
INSERT INTO [InternalApps] ([ClientId],[ClientSecret],[Name],[URL],[ModifiedDate],[IsActive]) VALUES (N'bfdcb308-436b-4f3a-8dad-66f3518a498f',N'LScOH40B4aawIxnLZHJeT6ycnG5+R5CpMG8u9BmKH6Yw97kSr6H8ofdHT/xdsVK3gDMGVwPz7DMvmvrcL3xWbl8uAOYoLFUz9Mm/oMnazX4=', 'boldbi', 'staging.boldbi.com', GETDATE(),1)
INSERT INTO [InternalApps] ([ClientId],[ClientSecret],[Name],[URL],[ModifiedDate],[IsActive]) VALUES (N'be8e8048-38e6-4790-9cb3-d8bf4b3bbcf5',N'cc/hDdIdkHyX3aV+RcZBCK7JOcmB+KFxpIGU/TLl2Tf+9IGasx9iTY6P5FTZI0HXZ54u2jriTtwArIPgMLuP8VQm3r4RckfyrYjZhgQujCM=', 'tenantapp', 'dev-app.boldbi.com', GETDATE(),1)
INSERT INTO [InternalApps] ([ClientId],[ClientSecret],[Name],[URL],[ModifiedDate],[IsActive]) VALUES (N'7756c46f-90e2-4971-82b1-75cc0e386771',N'B8up+M6piKzYasIgTJyNFXSCwsTQCX26cKO0IkjZjqvt4kpHO2LbOSO60Vw/+eoEvID8eJkW23qTsJSigoVKpN1vbnJc6b2PnvHWHEeQxpE=', 'localhost', 'localhost', GETDATE(),1)
INSERT INTO [InternalApps] ([ClientId],[ClientSecret],[Name],[URL],[ModifiedDate],[IsActive]) VALUES (N'93c69ed5-852f-48d8-9cf7-93648905bfcf',N'W60mJ3JSWNKo/zPJW8S4aytmkzy2R5o6OtYINRG7Y+tHl6zfZG36jS+we/L2AVqnhgO1zuwqhjTjQz3lYrXPMHl5mOMZdf0VJAPDmFFDT0Y=', 'boldreports', 'staging.boldreports.com', GETDATE(),1)
INSERT INTO [InternalApps] ([ClientId],[ClientSecret],[Name],[URL],[ModifiedDate],[IsActive]) VALUES (N'b5e84b37-a725-4d8c-8811-d1eecd4ded58',N'+P0IrjSE/dh9odwfnxCQhCFKHm+OlM/+CN++4qonBYRJRp3CEIADegVz5ySxwZe6E7Mm/v9ZbdWkr+0b9IkcqpwDnl4Fb8YAQvadN65+9Cs=', 'syncfusion', 'syncfusion.io', GETDATE(),1)
GO

INSERT into [FeatureConfiguration] ([Name], [Configuration], [TenantTypeId], [ModifiedDate], [IsActive]) VALUES (N'Groups', N'{"users_group_limit": 1}', 5, GetDate(), N'True')
GO

INSERT into [GroupRole] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'Admin', N'', GetDate(), N'True')
GO
INSERT into [GroupRole] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'Team Admin', N'', GetDate(), N'True')
GO
INSERT into [GroupRole] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'Member', N'', GetDate(), N'True')
GO

INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Create', N'Enables CREATE operations (Post).', 1, GetDate(), GetDate(), N'True')
GO
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'View', N'Enables read operations (GET).', 2, GetDate(), GetDate(), N'True')
GO
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Write', N'Enables write operations (PUT or PATCH).', 6, GetDate(), GetDate(), N'True')
GO
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Delete', N'Enables view and delete operations (DELETE).', 10, GetDate(), GetDate(), N'True')
GO
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Full Control', N'The wildcard character grants access to all operations that match the string.', 14, GetDate(), GetDate(), N'True')
GO
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Use', N'Enables to use.', 32, GetDate(), GetDate(), N'True')
GO

INSERT into [ResourceScopes] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'SpecificResource', N'', GetDate(), N'True')
GO
INSERT into [ResourceScopes] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'AllResources', N'', GetDate(), N'True')
GO
INSERT into [ResourceScopes] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'ResourcesInCollection', N'', GetDate(), N'True')
GO

INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document View', 3, 5, 11, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document Write', 3, 5, 11, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document Delete', 3, 5, 11, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document Full Control', 3, 5, 11, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Create', 2, 5, 11, 1, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document View', 2, 5, 11, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Write', 2, 5, 11, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Delete', 2, 5, 11, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Full Control', 2, 5, 11, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document View', 1, 5, 11, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document Write', 1, 5, 11, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document Delete', 1, 5, 11, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document Full Control', 1, 5, 11, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template View', 3, 5, 12, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template Write', 3, 5, 12, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template Delete', 3, 5, 12, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template Full Control', 3, 5, 12, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Create', 2, 5, 12, 1, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template View', 2, 5, 12, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Write', 2, 5, 12, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Delete', 2, 5, 12, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Full Control', 2, 5, 12, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template View', 1, 5, 12, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template Write', 1, 5, 12, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template Delete', 1, 5, 12, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template Full Control', 1, 5, 12, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form View', 3, 5, 13, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form Write', 3, 5, 13, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form Delete', 3, 5, 13, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form Full Control', 3, 5, 13, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Create', 2, 5, 13, 1, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form View', 2, 5, 13, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Write', 2, 5, 13, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Delete', 2, 5, 13, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Full Control', 2, 5, 13, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form View', 1, 5, 13, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form Write', 1, 5, 13, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form Delete', 1, 5, 13, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form Full Control', 1, 5, 13, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Signature', 3, 5, 14, 32, GetDate(), N'True')
GO