CREATE TABLE [SyncDS_User](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](255) NOT NULL,
	[LastName] [nvarchar](255) NULL,
	[DisplayName] [nvarchar](512) NULL,
	[Email] [nvarchar](255) NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
	[Contact] [nvarchar](20) NULL,
	[Picture] [nvarchar](100) NOT NULL,	
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[LastLogin] [datetime] NULL,
	[PasswordChangedDate] [datetime] NULL,
	[ActivationExpirationDate] [datetime] NULL,
	[ActivationCode] [nvarchar](255) NOT NULL,
	[ResetPasswordCode] [nvarchar](255) NULL,
	[LastResetAttempt] [datetime] NULL,
	[UserTypeId] [int] NOT NULL DEFAULT 0,
	[IsActivated] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_Group](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1026) NULL,
	[Color] [nvarchar](255) NOT NULL DEFAULT 'White',
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_UserGroup](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[GroupId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_UserGroup]  ADD FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;
ALTER TABLE [SyncDS_UserGroup]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_UserLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_UserLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[UserLogTypeId] [int] NOT NULL,	
	[GroupId] [int] NULL,
	[OldValue] [int] NULL,
	[NewValue] [int] NULL,
	[UpdatedUserId] [int] NOT NULL,
	[TargetUserId] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_UserLog]  ADD  FOREIGN KEY([UserLogTypeId]) REFERENCES [SyncDS_UserLogType] ([Id])
;
ALTER TABLE [SyncDS_UserLog]  ADD  FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;
ALTER TABLE [SyncDS_UserLog]  ADD  FOREIGN KEY([TargetUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_UserLog]  ADD  FOREIGN KEY([UpdatedUserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_UserLogin](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[ClientToken] [nvarchar](4000) NOT NULL,
	[IpAddress] [nvarchar](50) NOT NULL,
	[LoggedInTime] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_UserLogin]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_UserPreference](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[Language] [nvarchar](4000) NULL,
	[TimeZone] [nvarchar](100) NULL,
	[RecordSize] [int] NULL,
	[ItemSort] [nvarchar](4000) NULL,
	[ItemFilters] [nvarchar](4000) NULL,
	[Notifications] [nvarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_UserPreference] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_SystemLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_SystemLog](
	[LogId] [int] IDENTITY(1,1) primary key NOT NULL,
	[SystemLogTypeId] [int] NOT NULL,
	[UpdatedUserId] [int] NOT NULL,
	[TargetUserId] [int] NOT NULL,		
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] bit NOT NULL)
;

ALTER TABLE [SyncDS_SystemLog]  ADD FOREIGN KEY([SystemLogTypeId]) REFERENCES [SyncDS_SystemLogType] ([Id])
;
ALTER TABLE [SyncDS_SystemLog]  ADD FOREIGN KEY([UpdatedUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_SystemLog]  ADD FOREIGN KEY([TargetUserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ItemType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NULL)
;

CREATE TABLE [SyncDS_Item](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1026) NULL,
	[ItemTypeId] [int] NOT NULL,
	[ParentId] [uniqueidentifier] NULL,
	[Extension] [nvarchar](30) NULL,
	[CloneItemId] [uniqueidentifier] NULL,
	[CreatedById] [int] NOT NULL,
	[ModifiedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsPublic] [bit] NOT NULL DEFAULT 0,
	[IsActive] [bit] NULL)
;

ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [SyncDS_ItemType] ([Id])
;
ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([ParentId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([CreatedById]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([ModifiedById]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ItemView](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemViewId] [uniqueidentifier] NOT NULL,
	[QueryString] [nvarchar](4000) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([ItemViewId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ItemLogType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NULL UNIQUE,
	[IsActive] [bit] NULL)
;


CREATE TABLE [SyncDS_ItemTrash](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[TrashedById] [int] NOT NULL,
	[TrashedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemTrash]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemTrash]  ADD FOREIGN KEY([TrashedById]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ItemTrashDeleted](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemTrashId] [int] NOT NULL,
	[DeletedById] [int] NOT NULL,
	[DeletedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemTrashDeleted]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemTrashDeleted]  ADD FOREIGN KEY([ItemTrashId]) REFERENCES [SyncDS_ItemTrash] ([Id])
;
ALTER TABLE [SyncDS_ItemTrashDeleted]  ADD FOREIGN KEY([DeletedById]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ItemVersion](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemTypeId] [int] NOT NULL,
	[ItemName] [nvarchar](265) NULL,
	[VersionNumber] [int] NOT NULL,
	[RolledbackVersionNumber] [int] NULL,
	[Comment] [nvarchar](1026) NULL,
	[IsCurrentVersion] [bit] NOT NULL,
	[CreatedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemVersion]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [SyncDS_ItemType] ([Id])
;
ALTER TABLE [SyncDS_ItemVersion]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemVersion]  ADD FOREIGN KEY([CreatedById]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ItemLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemLogTypeId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemVersionId] [int] NOT NULL,
	[ParentId] [uniqueidentifier] NULL,
	[FromCategoryId] [uniqueidentifier] NULL,
	[ToCategoryId] [uniqueidentifier] NULL,
	[UpdatedUserId] [int] NOT NULL,	
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([ItemVersionId]) REFERENCES [SyncDS_ItemVersion] ([Id])
;
ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([ItemLogTypeId]) REFERENCES [SyncDS_ItemLogType] ([Id])
;
ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([ParentId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([FromCategoryId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([ToCategoryId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([UpdatedUserId]) REFERENCES [SyncDS_User] ([Id])
;


CREATE TABLE [SyncDS_PermissionEntity](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[EntityType] [int] NOT NULL,
	[ItemTypeId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;
ALTER TABLE [SyncDS_PermissionEntity]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [SyncDS_ItemType] ([Id])
;

CREATE TABLE [SyncDS_UserPermission](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NULL,
	[UserId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_UserPermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [SyncDS_PermissionEntity] ([Id])
;
ALTER TABLE [SyncDS_UserPermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_UserPermission]  ADD  FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_GroupPermission](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NULL,
	[GroupId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_GroupPermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [SyncDS_PermissionEntity] ([Id])
;
ALTER TABLE [SyncDS_GroupPermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_GroupPermission]  ADD  FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;

CREATE TABLE [SyncDS_RecurrenceType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](30) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_ExportType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](20) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_ScheduleDetail](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[RecurrenceTypeId] [int] NULL,
	[RecurrenceInfo] [nvarchar](4000) NULL,
	[EmailContent] [nvarchar](4000) NULL,
	[IsDataChanges] [bit] NOT NULL DEFAULT (0),
	[IsTimeInterval] [bit] NOT NULL DEFAULT (0),
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[EndAfter] [int] NULL DEFAULT 0,
	[NextSchedule] [datetime] NULL,
	[ExportTypeId] [int] NOT NULL,
	[IsEnabled] [bit] NOT NULL,
	[CreatedById] [int] NOT NULL,
	[ModifiedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ScheduleDetail]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ScheduleDetail]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ScheduleDetail]  ADD FOREIGN KEY([RecurrenceTypeId]) REFERENCES [SyncDS_RecurrenceType] ([Id])
;
ALTER TABLE [SyncDS_ScheduleDetail]  ADD FOREIGN KEY([ExportTypeId]) REFERENCES [SyncDS_ExportType] ([Id])
;
ALTER TABLE [SyncDS_ScheduleDetail]  ADD FOREIGN KEY([CreatedById]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_ScheduleDetail]  ADD FOREIGN KEY([ModifiedById]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_SubscribedUser](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[RecipientUserId] [int] NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_SubscribedUser]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_SubscribedUser]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_SubscribedUser]  ADD FOREIGN KEY([RecipientUserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_SubscribedGroup](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[RecipientGroupId] [int] NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_SubscribedGroup]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_SubscribedGroup]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_SubscribedGroup]  ADD FOREIGN KEY([RecipientGroupId]) REFERENCES [SyncDS_Group] ([Id])
;

CREATE TABLE [SyncDS_SubscrExtnRecpt](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[EmailIds] [NVARCHAR](4000) NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL);
	
ALTER TABLE [SyncDS_SubscrExtnRecpt]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_SubscrExtnRecpt]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ScheduleStatus](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_ScheduleLogUser](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[DeliveredUserId] [int] NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,	
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ScheduleLogUser]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogUser]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogUser]  ADD FOREIGN KEY([DeliveredUserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ScheduleLogGroup](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[GroupId] [int] NOT NULL,
	[DeliveredUserId] [int] NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([DeliveredUserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_SchdLogExtnRecpt](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[DeliveredEmailId] [NVARCHAR](150) NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,	
	[IsActive] [bit] NOT NULL);
	
ALTER TABLE [SyncDS_SchdLogExtnRecpt]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_SchdLogExtnRecpt]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;

CREATE TABLE [SyncDS_ScheduleLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ExecutedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL DEFAULT (0),
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ScheduleLog]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLog]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;

CREATE TABLE [SyncDS_SystemSettings](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Key] [nvarchar](255) NOT NULL,
	[Value] [nvarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
	CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE([Key]))
;

CREATE TABLE [SyncDS_ServerVersion](
[Id] [int] PRIMARY KEY NOT NULL,
[VersionNumber] [nvarchar](20) NOT NULL)
;

CREATE TABLE [SyncDS_ADUser](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[UserId] [int] NOT NULL,
[ActiveDirectoryUserId] [uniqueidentifier] NOT NULL,
[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ADUser] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_ADGroup](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[GroupId] [int] NOT NULL,
[ActiveDirectoryGroupId] [uniqueidentifier] NOT NULL,
[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ADGroup] ADD FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;

CREATE TABLE [SyncDS_ADCredential](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[Username] [nvarchar](100),
[Password] [nvarchar](100),
[LdapUrl] [nvarchar](255),
[EnableSsl] [bit] NOT NULL,
[DistinguishedName] [nvarchar](150),
[PortNo] [int] NOT NULL,
[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_Comment](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Comment] [NVARCHAR](4000) NOT NULL,
    [ItemId] [uniqueidentifier] NOT NULL,
    [UserId] [int] NOT NULL,
    [ParentId] [int] NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [ModifiedById] [int] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_Comment] ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_Comment] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_Comment] ADD FOREIGN KEY([ModifiedById]) REFERENCES [SyncDS_User] ([Id])
; 

CREATE TABLE [SyncDS_ItemWatch](
            [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
            [ItemId] [uniqueidentifier] NOT NULL,
            [UserId] [int] NOT NULL,
            [ModifiedDate] [datetime] NOT NULL,
			[IsWatched] [bit] NOT NULL,
            [IsActive] [bit] NOT NULL)
;
 
ALTER TABLE [SyncDS_ItemWatch] ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemWatch] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
; 

CREATE TABLE [SyncDS_ItemCommentLogType](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Name] [nvarchar](100) NULL UNIQUE,
    [IsActive] [bit] NULL)
;

CREATE TABLE [SyncDS_ItemCommentLog](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [ItemCommentLogTypeId] [int] NOT NULL,
    [CurrentUserId] [int] NOT NULL,    
    [CommentId] [int] NOT NULL,
	[Url] nvarchar(4000) NOT NULL,
    [ClubId] nvarchar(100) NOT NULL,
    [RepliedFor] [int] NULL,
    [OldValue] nvarchar(4000) NULL,
    [NewValue] nvarchar(4000) NULL,
    [NotificationTo] [int] NULL,    
    [ModifiedDate] [datetime] NOT NULL,
    [IsRead] [bit] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemCommentLog]  ADD FOREIGN KEY([CurrentUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_ItemCommentLog]  ADD FOREIGN KEY([ItemCommentLogTypeId]) REFERENCES [SyncDS_ItemCommentLogType] ([Id])
;
ALTER TABLE [SyncDS_ItemCommentLog]  ADD FOREIGN KEY([CommentId]) REFERENCES [SyncDS_Comment] ([Id])
;
ALTER TABLE [SyncDS_ItemCommentLog]  ADD FOREIGN KEY([RepliedFor]) REFERENCES [SyncDS_Comment] ([Id])
;
ALTER TABLE [SyncDS_ItemCommentLog]  ADD FOREIGN KEY([NotificationTo]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_FavoriteItem](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[IsActive] [bit] NOT NULL)
;
	
ALTER TABLE [SyncDS_FavoriteItem]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_FavoriteItem]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;

CREATE TABLE [SyncDS_DashboardWidget] (
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardItemId] [uniqueidentifier] NOT NULL,
	[WidgetItemId] [uniqueidentifier] NOT NULL,
	[WidgetDesignerId] [uniqueidentifier] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_DashboardWidget]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardWidget]  ADD FOREIGN KEY([WidgetItemId]) REFERENCES [SyncDS_Item] ([Id])
;

CREATE TABLE [SyncDS_AzureADCredential](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[TenantName] [nvarchar](255),
[ClientId] [nvarchar](100),
[ClientSecret] [nvarchar](100),
[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_AzureADUser](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[UserId] [int] NOT NULL,
[AzureADUserId] [uniqueidentifier] NOT NULL,
[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_AzureADUser] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_AzureADGroup](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[GroupId] [int] NOT NULL,
[AzureADGroupId] [uniqueidentifier] NOT NULL,
[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_AzureADGroup] ADD FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;


CREATE TABLE [SyncDS_SAMLSettings](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL, 
	[MetadataURI] nvarchar(4000), 
	[Authority] nvarchar(4000),
	[DesignerClientId] nvarchar(100),
	[TenantName] nvarchar(100),
	[MobileAppId] nvarchar(100),
	[IsEnabled] bit NOT NULL)
;

CREATE TABLE [SyncDS_UserType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL, 
	[Type] nvarchar(100) UNIQUE)
;

CREATE TABLE [SyncDS_DashboardDataSource](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardItemId] [uniqueidentifier] NOT NULL,
	[DataSourceName] [nvarchar](255) NOT NULL,
	[DataSourceItemId] [uniqueidentifier] NOT NULL,
	[VersionNumber] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([DataSourceItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([VersionNumber]) REFERENCES [SyncDS_ItemVersion] ([Id])
;

CREATE TABLE [SyncDS_Homepage](
	[Id] [uniqueidentifier] primary key NOT NULL,
	[Name] nvarchar(255) NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemInfo] nvarchar(4000) NOT NULL,
	[ItemType] nvarchar(100) NOT NULL,
	[IsDefaultHomepage] bit NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] bit NOT NULL)
;

ALTER TABLE [SyncDS_Homepage]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_HomepageItemFilter](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[HomepageId] [uniqueidentifier] NOT NULL,
	[FilterId] [int] NOT NULL,
	[QueryString] [nvarchar](4000) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_HomepageItemFilter]  ADD FOREIGN KEY([HomepageId]) REFERENCES [SyncDS_Homepage] ([Id])
;

INSERT into [SyncDS_ItemType] (Name,IsActive) VALUES (N'Category',1)
;
INSERT into [SyncDS_ItemType] (Name,IsActive) VALUES (N'Dashboard',1)
;
INSERT into [SyncDS_ItemType] (Name,IsActive) VALUES (N'Report',1)
;
INSERT into [SyncDS_ItemType] (Name,IsActive) VALUES (N'Datasource',1)
;
INSERT into [SyncDS_ItemType] (Name,IsActive) VALUES (N'Dataset',1)
;
INSERT into [SyncDS_ItemType] (Name,IsActive) VALUES (N'File',1)
;
INSERT into [SyncDS_ItemType] (Name,IsActive) VALUES (N'Schedule',1)
;
insert into [SyncDS_ItemType] (Name,IsActive) values (N'Widget',1)
;
insert into [SyncDS_ItemType] (Name,IsActive) values (N'ItemView',1)
;


INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Edited',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Moved',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Copied',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Cloned',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Trashed',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Restored',1)
;
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Rollbacked',1)
;

INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Updated',1)
;

INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Updated',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Changed',1)
;

INSERT into [SyncDS_ExportType] (Name,IsActive) VALUES (N'Excel', 1)
;
INSERT into [SyncDS_ExportType] (Name,IsActive) VALUES (N'HTML', 1)
;
INSERT into [SyncDS_ExportType] (Name,IsActive) VALUES (N'PDF', 1)
;
INSERT into [SyncDS_ExportType] (Name,IsActive) VALUES (N'Word', 1)
;
INSERT into [SyncDS_ExportType] (Name,IsActive) VALUES (N'Image', 1)
;

INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Daily', 1)
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'DailyWeekDay', 1)
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Weekly', 1)
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Monthly', 1)
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'MonthlyDOW', 1)
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Yearly', 1)
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'YearlyDOW', 1)
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Time', 1)
;

INSERT into [SyncDS_ScheduleStatus] (Name,IsActive) VALUES (N'Success', 1)
;
INSERT into [SyncDS_ScheduleStatus] (Name,IsActive) VALUES (N'Failure', 1)
;

INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Reports',1,3,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Reports in Category',2,1,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Report',0,3,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Categories',1,1,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Category',0,1,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Data Sources',1,4,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Data Source',0,4,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Files',1,6,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific File',0,6,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Schedules',1,7,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Schedule',0,7,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Dashboards',1,2,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Dashboards in Category',2,1,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Dashboard',0,2, 1)
;
insert into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) values(N'All Widgets',1,8,1)
;
insert into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) values(N'Specific Widget',0,8,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Datasets',1,5,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Dataset',0,5,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific ItemView',0,9,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All ItemViews',1,9,1)
;
INSERT into [SyncDS_Group] (Name,Description,Color,ModifiedDate,IsActive) VALUES (N'System Administrator','Has administrative rights for the dashboard server','#ff0000',GETDATE(), 1)
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'Edited',1)
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'Upvoted',1)
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'Downvoted',1)
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'Replied',1)
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'UserMention',1)
;
INSERT into [SyncDS_UserType](Type) values(N'Server User')
;
INSERT into [SyncDS_UserType](Type) values(N'Active Directory User')
;
INSERT into [SyncDS_UserType](Type) values(N'Federation User')
;

CREATE TABLE [SyncDS_DBCredential](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [DatabaseType] [nvarchar](255) NOT NULL,
    [ConnectionString] [nvarchar](4000) NOT NULL,
    [UserNameSchema] [nvarchar](255) NOT NULL,
    [UserNameTable] [nvarchar](255) NOT NULL,
    [UserNameColumn] [nvarchar](255) NOT NULL,
    [FirstNameSchema] [nvarchar](255) NOT NULL,
    [FirstNameTable] [nvarchar](255) NOT NULL,
    [FirstNameColumn] [nvarchar](255) NOT NULL,
    [LastNameSchema] [nvarchar](255) NOT NULL,
    [LastNameTable] [nvarchar](255) NOT NULL,
    [LastNameColumn] [nvarchar](255) NOT NULL,
    [EmailSchema] [nvarchar](255) NOT NULL,
    [EmailTable] [nvarchar](255) NOT NULL,
    [EmailColumn] [nvarchar](255) NOT NULL,
    [IsActiveSchema] [nvarchar](255) NOT NULL,
    [IsActiveTable] [nvarchar](255) NOT NULL,
    [IsActiveColumn] [nvarchar](255) NOT NULL,
    [Status]  [nvarchar](255) NOT NULL,
    [ActiveStatusValue]  [nvarchar](255) NOT NULL,
    [EmailRelationId] [int] NULL,
    [FirstNameRelationId] [int] NULL,
    [LastNameRelationId] [int] NULL,
    [IsActiveRelationId] [int] NULL,
    [IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_TableRelation](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [LeftTable] [nvarchar](255) NOT NULL,
    [LeftTableColumnName] [nvarchar](255) NOT NULL,	
    [LeftTableCondition]  [nvarchar](255) NOT NULL,
    [LeftTableName]  [nvarchar](255) NOT NULL,
    [LeftTableSchema] [nvarchar](255) NOT NULL,
    [Relationship] [nvarchar](255) NOT NULL,
    [RightTable] [nvarchar](255) NOT NULL,
    [RightTableColumnName] [nvarchar](255) NOT NULL,	
    [RightTableCondition]  [nvarchar](255) NOT NULL,
    [RightTableName]  [nvarchar](255) NOT NULL,
    [RightTableSchema] [nvarchar](255) NOT NULL)
;

CREATE TABLE [SyncDS_DataNotification](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[Frequency] [int] NULL,
	[ConditionCategory] [int] NOT NULL,
	[PreviousValue] ntext NULL,
	[PreviousData] ntext NULL,
	[IsActive] [bit] NOT NULL,
	[ColumnInfo] ntext NOT NULL,
	[ConditionInfo] ntext NULL,
	[ItemName] nvarchar(255) NOT NULL)
;

ALTER TABLE [SyncDS_DataNotification]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;

CREATE TABLE [SyncDS_ConditionCategory](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(255) NULL UNIQUE,
	[IsActive] [bit] NOT NULL
)
;


INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Increases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Continuously Increases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Decreases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Continuously Decreases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Value Changes',1)
;


CREATE TABLE [SyncDS_MultiTabDashboard](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ParentDashboardId] [uniqueidentifier] NOT NULL,
	[ChildDashboardId] [uniqueidentifier] NOT NULL,
	[DashboardDesignerId] [uniqueidentifier] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_MultiTabDashboard]  ADD FOREIGN KEY([ParentDashboardId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_MultiTabDashboard]  ADD FOREIGN KEY([ChildDashboardId]) REFERENCES [SyncDS_Item] ([Id])
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Hourly',1)
;

CREATE TABLE [SyncDS_PermissionAccess](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) UNIQUE NOT NULL,
	[AccessId] [int] UNIQUE NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_PermissionAccEntity](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_PermissionAccEntity]  ADD FOREIGN KEY([PermissionEntityId]) REFERENCES [SyncDS_PermissionEntity] ([Id])
;
ALTER TABLE [SyncDS_PermissionAccEntity]  ADD FOREIGN KEY([PermissionAccessId]) REFERENCES [SyncDS_PermissionAccess] ([Id])
;

INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Create',1,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read',2,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write',6,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete',14,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Download',18,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Download',22,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete, Download',30,1)
;

INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,1,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,1,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,1,1)
;																			  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,1,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,1,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,1,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,5,1)
;																				  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,5,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,5,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,5,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,5,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,5,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,5,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,6,1)
;																				  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,6,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,6,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,6,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,6,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,6,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,6,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,7,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,7,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,7,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,7,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,7,1)
;

CREATE TABLE [SyncDS_CustomExpression](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardId] [uniqueidentifier] NOT NULL,
	[WidgetId] [uniqueidentifier] NOT NULL,
	[DatasourceId] nvarchar(255) NOT NULL,
	[UserId] [int] NOT NULL,
	[Name] nvarchar(255) NULL,
	[Expression] nvarchar(4000) NOT NULL,
	[ColumnInfo] nvarchar(4000) NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([DashboardId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([WidgetId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;