------------------------------------------------------------------
-- Write SQL queries in the following order
-- 	1. Create Tables
--	2. Insert Values
--	3. Alter Table Syntax
------------------------------------------------------------------

CREATE TABLE [BOLDBI_User](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[FirstName] [nvarchar](255) NOT NULL,
	[LastName] [nvarchar](255) NULL,
	[DisplayName] [nvarchar](512) NULL,
	[Username] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](350) NOT NULL,
	[Contact] [nvarchar](20) NULL,
	[Picture] [nvarchar](100) NOT NULL,	
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[LastLogin] [datetime] NULL,
	[PasswordChangedDate] [datetime] NULL,
	[DirectoryTypeId] [int] NOT NULL DEFAULT 0,
	[IdPReferenceId] [uniqueidentifier] NOT NULL,
	[ExternalProviderId] [nvarchar](1024) NULL,
	[CanSync] [bit] NOT NULL DEFAULT 0,
	[IsCloseRequest] [bit] NOT NULL DEFAULT 0,
	[IsActive] [bit] NOT NULL,
	[IsActivated] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_Group](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[GroupLogo] [nvarchar](1026) NULL,
	[Description] [nvarchar](1026) NULL,
	[Color] [nvarchar](255) NOT NULL DEFAULT 'White',
	[IsolationCode] [nVarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[DirectoryTypeId] [int] NOT NULL DEFAULT 0,
	[ExternalProviderId] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_UserGroup](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[GroupId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[ExternalProviderId] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_UserLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_UserLog](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[ActivityId] [uniqueidentifier] NOT NULL,
	[UserLogTypeId] [int] NOT NULL,
	[LogFieldId] [int] NOT NULL,
	[OldValue] [nvarchar](4000) NULL,
	[NewValue] [nvarchar](4000) NULL,	
	[CurrentUserId] [int] NULL,
	[TargetUserId] [int] NULL,
	[SourceTypeId] [int] NOT NULL,
	[LogStatusId] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_AICredentials](
    [Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
    [SiteId] [uniqueidentifier] NOT NULL,
    [AIModel] [int] NOT NULL,
    [AIConfiguration] [nvarchar](4000) NULL,
    [CreatedById] [uniqueidentifier] NULL,
    [ModifiedById] [uniqueidentifier] NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL,
    [IsAIModel] [bit] NOT NULL DEFAULT 0,
    [EnableAIFeature] [bit] NOT NULL DEFAULT 0,
    [IsAISummariesEnabledGlobally] [bit] NOT NULL DEFAULT 0
);

CREATE TABLE [BOLDBI_UserLogin](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[ClientToken] [nvarchar](4000) NOT NULL,
	[IpAddress] [nvarchar](50) NOT NULL,
	[LoggedInTime] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_UserPreference](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[Language] [nvarchar](4000) NULL,
	[TimeZone] [nvarchar](100) NULL,
	[RecordSize] [int] NULL,
	[ItemSort] [nvarchar](4000) NULL,
	[ItemFilters] [nvarchar](4000) NULL,
	[Notifications] [nvarchar](4000) NULL,
	[Dashboards] [nVarchar](4000) NULL,
	[IsolationCode] [nVarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ItemType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NULL)
;

CREATE TABLE [BOLDBI_Item](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
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
	[PublishedDate] [datetime] NULL,
	[IsSampleData] [bit] NULL,
	[DataSource] nvarchar(max) null,
	[IsPublic] [bit] NOT NULL DEFAULT 0,
	[IsDraft] [bit] NULL DEFAULT 0,
	[IsLocked] [bit] NULL DEFAULT 0,
	[IsActive] [bit] NULL,
	[IsUnlisted] [bit] NOT NULL DEFAULT 0,
	[IsUploadDraft] [bit] NOT NULL DEFAULT 0)
;

CREATE TABLE [BOLDBI_ItemView](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemViewId] [uniqueidentifier] NOT NULL,
	[QueryString] nvarchar(max) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
    [IsWidgetLinking] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ItemLogType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NULL UNIQUE,
	[IsActive] [bit] NULL)
;


CREATE TABLE [BOLDBI_ItemTrash](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[TrashedById] [int] NOT NULL,
	[TrashedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ItemTrashDeleted](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemTrashId] [int] NOT NULL,
	[DeletedById] [int] NOT NULL,
	[DeletedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ItemVersion](
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

CREATE TABLE [BOLDBI_ItemLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[ItemLogTypeId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemVersionId] [int] NOT NULL,
	[SourceTypeId] [int] NOT NULL,
	[EventTypeId] [int] NULL,
	[ParentId] [uniqueidentifier] NULL,
	[FromCategoryId] [uniqueidentifier] NULL,
	[ToCategoryId] [uniqueidentifier] NULL,
	[UpdatedUserId] [int] NOT NULL,	
	[ModifiedDate] [datetime] NOT NULL,
    [AnonymousUsername] [nvarchar](255) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_PermissionEntity](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[EntityType] [int] NOT NULL,
	[ItemTypeId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_UserPermission](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NULL,
	[UserId] [int] NOT NULL,
	[SettingsTypeId] [int]  NULl,
	[ScopeGroupId] [int] NULl,
	[ItemTypeId] [int] NULl,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_GroupPermission](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NULL,
	[GroupId] [int] NOT NULL,
	[SettingsTypeId] [int]  NULl,
	[ScopeGroupId] [int] NULl,
	[ItemTypeId] [int] NULl,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_RecurrenceType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](30) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ExportType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](20) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ScheduleDetail](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL UNIQUE,
	[ItemId] [uniqueidentifier] NOT NULL,
	[DashboardWidgetId] [uniqueidentifier] NULL,
	[DashboardWidgetIds] [nvarchar](max) NULL,
	[DashboardViewId] [uniqueidentifier] NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Parameter] [nvarchar](max) NULL,
	[RecurrenceTypeId] [int] NULL,
	[RecurrenceInfo] [nvarchar](4000) NULL,
	[Subject] [nvarchar](4000) NULL,
	[EmailContent] [nvarchar](4000) NULL,
	[IsDataChanges] [bit] NOT NULL DEFAULT 0,
	[IsTimeInterval] [bit] NOT NULL DEFAULT 0,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[EndAfter] [int] NULL DEFAULT 0,
	[NextSchedule] [datetime] NULL,
	[ExportTypeId] [int] NULL,
	[MultiExportType] [nvarchar](max) NULL,
	[IsEnabled] [bit] NOT NULL,
	[CreatedById] [int] NOT NULL,
	[ModifiedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[ScheduleExportInfo] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SubscribedUser](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[RecipientUserId] [int] NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SubscribedGroup](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[RecipientGroupId] [int] NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SubscrExtnRecpt](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[EmailIds] [NVARCHAR](4000) NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;
	
CREATE TABLE [BOLDBI_ScheduleStatus](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ScheduleLogUser](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[DeliveredUserId] [int] NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,	
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ScheduleMissingLogs](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[MissingType] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)	
;

CREATE TABLE [BOLDBI_ScheduleLogGroup](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[GroupId] [int] NOT NULL,
	[DeliveredUserId] [int] NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SchdLogExtnRecpt](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[DeliveredEmailId] [NVARCHAR](150) NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,	
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ScheduleLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ExecutedDate] [datetime] NOT NULL,
	[Message] [nvarchar](max) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL DEFAULT (0),
	[IsActive] [bit] NOT NULL,
	[RequestId] [uniqueidentifier] NULL,
	[LogExist] [bit] NOT NULL DEFAULT (0))
;

CREATE TABLE [BOLDBI_SystemSettings](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[Key] [nvarchar](255) NOT NULL,
	[Value] [nvarchar](max) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
	CONSTRAINT UK_BOLDBI_SystemSettings_Key_SiteId UNIQUE([Key], SiteId))
;

CREATE TABLE [BOLDBI_ServerVersion](
	[Id] [int] PRIMARY KEY NOT NULL,
	[VersionNumber] [nvarchar](20) NOT NULL)
;

CREATE TABLE [BOLDBI_Comment](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Comment] [NVARCHAR](max) NOT NULL,
    [ItemId] [uniqueidentifier] NOT NULL,
    [UserId] [int] NOT NULL,
    [ParentId] [int] NULL,
    [ParentItemId] [uniqueidentifier] NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [ModifiedById] [int] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ItemWatch](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ParentItemId] [uniqueidentifier] NULL,
	[UserId] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsWatched] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ItemCommentLogType](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Name] [nvarchar](100) NULL UNIQUE,
    [IsActive] [bit] NULL)
;

CREATE TABLE [BOLDBI_ItemCommentLog](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
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

CREATE TABLE [BOLDBI_FavoriteItem](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_DashboardWidget] (
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardItemId] [uniqueidentifier] NOT NULL,
	[WidgetItemId] [uniqueidentifier] NOT NULL,
	[WidgetDesignerId] [uniqueidentifier] NOT NULL,
	[WidgetInfo] varchar(max),
	[ModifiedDate] [datetime] NOT NULL,	
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_AzureADCredential](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[TenantName] [nvarchar](255),
	[ClientId] [nvarchar](100),
	[ClientSecret] [nvarchar](100),
	[IsActive] [bit] NOT NULL,
	[EnableGroupUserImport] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ADCredential](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[Username] [nvarchar](100),
	[Password] [nvarchar](100),
	[LdapUrl] [nvarchar](255),
	[EnableSsl] [bit] NOT NULL,
	[DistinguishedName] [nvarchar](150),
	[PortNo] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[EnableGroupUserImport] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SAMLSettings](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL, 
	[MetadataURI] nvarchar(4000),
	[Authority] nvarchar(4000),
	[DesignerClientId] nvarchar(100),
	[TenantName] nvarchar(100), 
	[MobileAppId] nvarchar(100),
	[IsEnabled] bit NOT NULL)
;

CREATE TABLE [BOLDBI_UserType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL, 
	[Type] nvarchar(100) UNIQUE)
;

CREATE TABLE [BOLDBI_DashboardDataSource](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardItemId] [uniqueidentifier] NOT NULL,
	[DataSourceName] [nvarchar](255) NOT NULL,
	[DataSourceItemId] [uniqueidentifier] NOT NULL,
	[VersionNumber] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_Homepage](
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

CREATE TABLE [BOLDBI_HomepageItemFilter](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[HomepageId] [uniqueidentifier] NOT NULL,
	[FilterId] [int] NOT NULL,
	[QueryString] [nvarchar](4000) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_DBCredential](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
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

CREATE TABLE [BOLDBI_TableRelation](
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

CREATE TABLE [BOLDBI_MultiTabDashboard](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ParentDashboardId] [uniqueidentifier] NOT NULL,
	[ChildDashboardId] [uniqueidentifier] NOT NULL,
	[DashboardDesignerId] [uniqueidentifier] NOT NULL,	
	[OrderNumber] [int] NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[TabName] [nvarchar](255) NULL)
;

CREATE TABLE [BOLDBI_DataNotification](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[DataSourceId] [uniqueidentifier] NULL,
	[DaJsonString] [nvarchar](max) NOT NULL,
	[FilterData] [nvarchar](max) NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ConditionCategory](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(255) NULL UNIQUE,
	[IsActive] [bit] NOT NULL
);

CREATE TABLE [BOLDBI_CustomExpression](
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

CREATE TABLE [BOLDBI_Source](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Name] [nvarchar](100) NULL UNIQUE,
    [IsActive] [bit] NULL)
;

CREATE TABLE [BOLDBI_SlideshowInfo](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SlideshowId] [uniqueidentifier] NOT NULL,
	[ItemInfo] nvarchar(max) NOT NULL,
	[loopInterval] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_PermissionAccess](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) UNIQUE NOT NULL,
	[AccessId] [int] UNIQUE NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_PermissionAccEntity](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_PermissionLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_UserPermissionLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,	
	[AffectedUserId] [int] NOT NULL,
	[UserPermissionId] [int] NULL,
	[LogTypeId] [int] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_GroupPermissionLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,	
	[AffectedGroupId] [int] NOT NULL,
	[GroupPermissionId] [int] NULL,
	[LogTypeId] [int] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SystemLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_LogStatus](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SystemLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[SystemLogTypeId] [int] NOT NULL,
	[LogFieldId] [int] NOT NULL,
	[OldValue] [nvarchar](4000) NULL,
	[NewValue] [nvarchar](4000) NULL,
	[LogStatusId] [int] NOT NULL,
	[UpdatedUserId] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] bit NOT NULL)
;

CREATE TABLE [BOLDBI_LogModule](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] nvarchar(max) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_LogField](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ModuleId] int NOT NULL,
	[Field] nvarchar(max) NOT NULL,
	[Description] nvarchar(max) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_GroupLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_GroupLog](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
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

CREATE TABLE [BOLDBI_ItemSettings](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemConfig] [nvarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ItemUserPreference](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[AutosaveFilter] [nvarchar](4000) NULL,
	[DefaultViewId] [uniqueidentifier] NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_PublishedItem](
    [Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
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
    [IsActive] [bit] NOT NULL,
	[ExternalSiteId] [int] NOT NULL DEFAULT 0)
;

CREATE TABLE [BOLDBI_PublishJobs](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [PublishId] [uniqueidentifier] NOT NULL,
    [UserId] [int] NOT NULL,
    [JobDetails] [nvarchar](4000) NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CompletedDate] [datetime] NOT NULL,
    [Status] [nvarchar](255) NOT NULL,
    [IsActive] [bit] NOT NULL,
	[Type] [int] NOT NULL)	
;

CREATE TABLE [BOLDBI_PublishType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL

);

CREATE TABLE [BOLDBI_DeploymentDashboards](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemName] [nvarchar](255) NOT NULL,
	[CategoryName] [nvarchar](255) NOT NULL,
    [Description] [nvarchar](1026) NULL,
	[IsDashboardLocked] [bit] NOT NULL,
    [IsDatasourceLocked] [bit] NOT NULL,
    [ItemInfo] [nvarchar](max) NOT NULL,
    [CreatedById] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL)
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
	[SiteId] [uniqueidentifier] NOT NULL,
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

CREATE TABLE [BOLDBI_UserDataNotification](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[FilterData] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ExternalSites](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[ClientId] [nvarchar](255) NOT NULL,
	[ClientSecret] [nvarchar](255) NOT NULL,
	[SiteURL] [nvarchar](255) NOT NULL,
	[CreatedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedById] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[SiteType] [int] NOT NULL DEFAULT 0,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_SettingsType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_EmailActivityLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[Event] [nvarchar](255) NOT NULL,
	[RecipientEmail] [nvarchar](255) NOT NULL,
	[SenderEmail] [nvarchar](255) NOT NULL,
	[MailSubject] [nvarchar](255) NOT NULL,
	[MailBody] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[InitiatedBy] int NOT NULL,
	[UserId] [int] NULL,
	[GroupId] [int] NULL,
	[ItemId] [uniqueidentifier] NULL,
	[CommentId] [int] NULL,
	[PermissionId] [int] NULL,
	[Status] [int] NOT NULL,
	[StatusMessage] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_Webhook](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](512) NOT NULL,
	[Description] [nvarchar](4000) NULL,
	[Url] [nvarchar](512) NOT NULL,
	[UserId] [int] NOT NULL,
	[Security] [nvarchar](512) NULL,
	[Headers] [nvarchar](max) NULL,
	[ContentType] [int] NOT NULL,
	[SubscribedEvent] [nvarchar](512) NOT NULL,
	[Payload] [nvarchar](max) NULL,
	[Failures] [int] NOT NULL,
	[CreatedById] [int] NOT NULL,
	[ModifiedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsEnable] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_NotificationTrigger](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[WebhookId] [int] NOT NULL,
	[RecurrenceInfo] [nvarchar](4000) NOT NULL,
	[RetryCount] [int] NOT NULL,
	[RequestData] [nvarchar](max) NULL,
	[WebhookTargetData] [nvarchar](max) NULL,
	[AdditionalInfo] [nvarchar](max) NULL,
	[NextScheduleDate] [datetime] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[ReferenceId] [nvarchar](255) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_WebhookLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[WebhookId] [int] NULL,
	[Event] [nvarchar](512) NOT NULL,
	[RequestUrl] [nvarchar](512) NULL,
	[FailureType] [nvarchar](512) NOT NULL,
	[ReferenceId] [nvarchar](255) NULL,
	[ResponseMessage] [nvarchar](max) NULL,
	[ResponseStatusCode] [nvarchar](512) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_NotificationEvents](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) UNIQUE NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_EventPayloads](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) UNIQUE NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_EventPayloadsMapping](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[EventType] [int] NOT NULL,
	[PayloadType] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_UserSession](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[IdpReferenceId]  [uniqueidentifier] NOT NULL,
	[SessionId]  [uniqueidentifier] NOT NULL,
	[DirectoryTypeId] [int] NOT NULL,
	[IpAddress] [nvarchar](255) NOT NULL,
	[Browser] [nvarchar](255) NOT NULL,
	[LoggedInTime] [datetime] NOT NULL,
	[LastActive] [datetime] NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_BackgroundJobs](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [JobType] int NOT NULL,
    [ItemId] [uniqueidentifier] NULL,
    [UserId] [int] NULL,
    [JobDetails] [nvarchar](max) NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CompletedDate] [datetime] NOT NULL,
    [Status] [nvarchar](255) NOT NULL,
	[StatusMessage] [nvarchar](255) NULL,
	[ResourceInfo] [nvarchar](max) NULL,
	[CanIncludeSensitiveInfo] [bit] NULL,
	[IsSampleData] [bit] NULL,
    [IsActive] [bit] NOT NULL,
	[ParentJobId] [int] NULL)
;

CREATE TABLE [BOLDBI_UploadDataSourceMapping](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [DownloadedTenantId] [uniqueidentifier] NOT NULL,
    [DownloadedItemId] [nvarchar](255) NOT NULL,
    [UploadedItemId] [uniqueidentifier] NOT NULL,
    [UploadedDate] [datetime] NULL,
    [IsActive] [bit] NULL)
;

CREATE TABLE [BOLDBI_ScheduleRunHistory](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[StartedDate] [datetime] NOT NULL,
	[Message] [nvarchar](max) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL DEFAULT (0),
	[IsActive] [bit] NOT NULL,
	[LogExist] [bit] NOT NULL DEFAULT (0))
;
CREATE TABLE [BoldBI_DSMetrics]  (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   DataSourceID VARCHAR(255),
   IsRefresh bit,
   RefreshStartTime VARCHAR(255),
   RefreshEndTime VARCHAR(255),
   IsIncremental VARCHAR(255),
   TableDetails VARCHAR(255),
   RowsUpdated INTEGER,
   TotalRows INTEGER,
   CustomQuery VARCHAR(max),
   SourceConnectionDetails VARCHAR(255),
   IncrementalRefreshDetails VARCHAR(255),
   ExtractType VARCHAR(255),
   RefreshStatus VARCHAR(255),
   RefreshException VARCHAR(255))
;
	   
CREATE TABLE [BOLDBI_CustomEmailTemplate](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[SiteId] [uniqueidentifier] NOT NULL,
[IsEnabled] [bit] NULL,
[DisclaimerContent] [nvarchar](255) NOT NULL,
[HeaderContent] [nvarchar](255) NULL,
[Subject] [nvarchar](255) NULL,
[TemplateName] [nvarchar](255) NULL,
[Language] [nvarchar](255) NOT NULL,
[MailBody] [nvarchar](max) NOT NULL,
[CreatedDate] [datetime] NOT NULL,
[ModifiedDate] [datetime] NULL,
[SendEmailAsHTML] [bit] NOT NULL,
[CustomVisibilityOptions] [nvarchar](max) NOT NULL,
[IsActive] [bit] NOT NULL,
[TemplateId] [int] NOT NULL,
[IsDefaultTemplate][bit] NOT NULL,
[IsSystemDefault][bit] NOT NULL,
[Description][nvarchar](255) NULL,
[ModifiedBy][int] NOT NULL,
[TemplateLocalizationKey][nvarchar](255) NULL);

CREATE TABLE [BoldBI_ai_qnawidgethistory] (
   searchid VARCHAR(255) PRIMARY KEY,
   question TEXT,
   tableinfo TEXT,
   fieldinfo TEXT,
   message TEXT,
   haserror BIT,
   chartType TEXT,
   uservote TEXT,
   isreported BIT,
   search_date DATETIME,
   widgetid NVARCHAR(255))
;

CREATE TABLE [BOLDBI_Notification] (
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [CurrentUserId] [int] NOT NULL,
    [ClubId] nvarchar(100) NOT NULL,
    [CommentId] [int] NULL,
    [ItemId] [uniqueidentifier] NULL,
    [NotificationSource] nvarchar(100) NULL,
    [NotifictionDetails] nvarchar(4000) NULL,
    [NotificationTo] [int] NULL,    
    [ModifiedDate] [datetime] NOT NULL,
    [IsRead] [bit] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_ApiKeyDetails] (
    [Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
    [Name] [nvarchar](255) NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [LastUsedDate] [datetime] NULL,
    [ApiKey] nvarchar(100) NULL,
    [TokenValidity] [datetime] NULL,
    [CreatedBy] [int] NOT NULL,
    [ModifiedBy] [int] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_AI_SESSIONS] (
    [SessionID] NVARCHAR(255) PRIMARY KEY,
    [SessionStartTime] DATETIMEOFFSET,
    [SessionEndTime] DATETIMEOFFSET,
    [InputToken] INT,
    [OutputToken] INT,
    [TotalToken] INT,
    [InputTokenCost] FLOAT,
    [OutputTokenCost] FLOAT,
    [TotalTokensCost] FLOAT,
    [UserInfo] NVARCHAR(MAX),
    [TenantID] NVARCHAR(MAX),
    [Environment] NVARCHAR(MAX)
    );

CREATE TABLE [BOLDBI_AI_CHAT] (
    [SearchID] NVARCHAR(255) PRIMARY KEY,
    [SessionID] NVARCHAR(MAX),
    [SearchDateTime] DATETIMEOFFSET,
    [InputToken] INT,
    [OutputToken] INT,
    [TotalToken] INT,
    [InputTokenCost] FLOAT,
    [OutputTokenCost] FLOAT,
    [TotalTokensCost] FLOAT,
    [UserInfo] NVARCHAR(MAX),
    [TenantID] NVARCHAR(MAX),
    [RequestType] NVARCHAR(MAX),
    [Environment] NVARCHAR(MAX)
    );

CREATE TABLE [BOLDBI_AI_REQUESTS] (
    [MessageId] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [SearchDate] DATETIMEOFFSET,
    [Message] NVARCHAR(MAX),
    [DatasourceId] NVARCHAR(MAX),
    [SessionId] NVARCHAR(MAX),
    [HasError] BIT,
    [Response] NVARCHAR(MAX),
    [StatusMessage] NVARCHAR(MAX),
    [AiModel] NVARCHAR(MAX),
    [TenantId] NVARCHAR(MAX),
    [UserEmail] NVARCHAR(MAX),
    [Feedback] NVARCHAR(MAX),
    [UserInfo] NVARCHAR(MAX),
    [RequestType] NVARCHAR(MAX),
    [Environment] NVARCHAR(MAX),
    [IsValidResponse] BIT,
    [IsWidgetRendered] BIT
);

---- PASTE INSERT Queries below this section --------

INSERT into [BOLDBI_ItemType] (Name,IsActive) VALUES (N'Category',1)
;
INSERT into [BOLDBI_ItemType] (Name,IsActive) VALUES (N'Dashboard',1)
;
INSERT into [BOLDBI_ItemType] (Name,IsActive) VALUES (N'Report',1)
;
INSERT into [BOLDBI_ItemType] (Name,IsActive) VALUES (N'Datasource',1)
;
INSERT into [BOLDBI_ItemType] (Name,IsActive) VALUES (N'Dataset',1)
;
INSERT into [BOLDBI_ItemType] (Name,IsActive) VALUES (N'File',1)
;
INSERT into [BOLDBI_ItemType] (Name,IsActive) VALUES (N'Schedule',1)
;
insert into [BOLDBI_ItemType] (Name,IsActive) values (N'Widget',1)
;
insert into [BOLDBI_ItemType] (Name,IsActive) values (N'ItemView',1)
;
Insert INTO [BOLDBI_ItemType] (Name, IsActive) Values ('Slideshow',1)
;
INSERT INTO [BOLDBI_ItemType] (Name, IsActive) Values (N'Settings',1)
; 
INSERT INTO [BOLDBI_ItemType] (Name, IsActive) Values (N'User Management',1)
;
INSERT INTO [BOLDBI_ItemType] (Name, IsActive) Values (N'Permissions',1)
;

INSERT into [BOLDBI_SettingsType] (Name,IsActive) VALUES (N'Site Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) VALUES (N'Dashboard Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) VALUES (N'Embed Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) VALUES (N'Data Process',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) VALUES (N'Connectors',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) VALUES (N'Email Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) VALUES (N'Accounts Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) values (N'User Directory Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) values (N'Authentication Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Notification Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Manage License',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Support Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Subscription',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Payments',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Widgets',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Security',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Integrations',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'CORS Settings',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Look and Feel',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'Site Credentials',1)
;
INSERT into [BOLDBI_SettingsType] (Name,IsActive) Values (N'API Key',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Edited',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Moved',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Copied',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Cloned',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Trashed',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Restored',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Rollbacked',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Visited',1)
;
INSERT into [BOLDBI_ItemLogType] (Name,IsActive) VALUES ( N'Downloaded',1)
;

INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'Excel', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'HTML', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'PDF', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'Word', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'Image', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'Refresh', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'PPT', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'CSV', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'DashboardCache', 1)
;
INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'DatasourceCache', 1)
;

INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'Daily', 1)
;
INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'DailyWeekDay', 1)
;
INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'Weekly', 1)
;
INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'Monthly', 1)
;
INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'MonthlyDOW', 1)
;
INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'Yearly', 1)
;
INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'YearlyDOW', 1)
;
INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'Time', 1)
;

INSERT into [BOLDBI_ScheduleStatus] (Name,IsActive) VALUES (N'Success', 1)
;
INSERT into [BOLDBI_ScheduleStatus] (Name,IsActive) VALUES (N'Failure', 1)
;
INSERT into [BOLDBI_ScheduleStatus] (Name,IsActive) VALUES (N'Run', 1)
;

INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Reports',1,3,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Reports in Category',2,1,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Report',0,3,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Categories',1,1,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Category',0,1,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Data Sources',1,4,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Data Source',0,4,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Files',1,6,0)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific File',0,6,0)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Schedules',1,7,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Schedule',0,7,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Dashboards',1,2,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Dashboards in Category',2,1,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Dashboard',0,2, 1)
;
insert into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) values(N'All Widgets',1,8,1)
;
insert into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) values(N'Specific Widget',0,8,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Datasets',1,5,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Dataset',0,5,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific ItemView',0,9,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All ItemViews',1,9,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Slideshow',0,10,1)
;
INSERT into [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Slideshow',1,10,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Settings',0,11,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Settings',1,11,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Group',0,12,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Users and Groups',1,12,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Permissions',0,13,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Permissions',1,13,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Groups',1,12,1)
;
INSERT INTO [BOLDBI_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Users',1,12,1)
;

INSERT into [BOLDBI_ItemCommentLogType] (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into [BOLDBI_ItemCommentLogType] (Name,IsActive) VALUES ( N'Edited',1)
;
INSERT into [BOLDBI_ItemCommentLogType] (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into [BOLDBI_ItemCommentLogType] (Name,IsActive) VALUES ( N'Upvoted',1)
;
INSERT into [BOLDBI_ItemCommentLogType] (Name,IsActive) VALUES ( N'Downvoted',1)
;
INSERT into [BOLDBI_ItemCommentLogType] (Name,IsActive) VALUES ( N'Replied',1)
;
INSERT into [BOLDBI_ItemCommentLogType] (Name,IsActive) VALUES ( N'UserMention',1)
;
INSERT into [BOLDBI_UserType](Type) values(N'Server User')
;
INSERT into [BOLDBI_UserType](Type) values(N'Active Directory User')
;
INSERT into [BOLDBI_UserType](Type) values(N'Federation User')
;

ALTER TABLE [BOLDBI_MultiTabDashboard]  ADD FOREIGN KEY([ParentDashboardId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_MultiTabDashboard]  ADD FOREIGN KEY([ChildDashboardId]) REFERENCES [BOLDBI_Item] ([Id])
;

INSERT into [BOLDBI_ConditionCategory] (Name,IsActive) VALUES (N'Increases',1)
;
INSERT into [BOLDBI_ConditionCategory] (Name,IsActive) VALUES (N'Continuously Increases',1)
;
INSERT into [BOLDBI_ConditionCategory] (Name,IsActive) VALUES (N'Decreases',1)
;
INSERT into [BOLDBI_ConditionCategory] (Name,IsActive) VALUES (N'Continuously Decreases',1)
;
INSERT into [BOLDBI_ConditionCategory] (Name,IsActive) VALUES (N'Value Changes',1)
;

INSERT into [BOLDBI_RecurrenceType] (Name,IsActive) VALUES (N'Hourly',1)
;


INSERT INTO [BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Create',1,1)
;
INSERT INTO [BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read',2,1)
;
INSERT INTO [BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write',6,1)
;
INSERT INTO [BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete',14,1)
;
INSERT INTO [BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Download',18,1)
;

INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,1,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,1,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,1,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,1,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,1,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,1,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,1,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,1,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (29,1,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,2,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,2,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,2,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,2,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,2,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,2,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,2,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,2,1)
;	
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,2,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,2,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,2,1)
;							  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,2,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,2,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,2,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,2,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,3,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (23,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (24,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (25,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (26,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (27,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (28,3,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,4,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,4,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,4,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,4,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,4,1)
;																									  
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,4,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,5,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,5,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (30,3,1)
;

INSERT into [BOLDBI_PermissionLogType] (Name,IsActive) VALUES ( N'PermissionAdded',1)
;
INSERT into [BOLDBI_PermissionLogType] (Name,IsActive) VALUES ( N'PermissionRemoved',1)
;

INSERT into [BOLDBI_Source] (Name,IsActive) VALUES ( N'Web',1)
;
INSERT into [BOLDBI_Source] (Name,IsActive) VALUES ( N'API',1)
;
INSERT into [BOLDBI_Source] (Name,IsActive) VALUES ( N'Schedule',1)
;
INSERT into [BOLDBI_Source] (Name,IsActive) VALUES ( N'Embed',1)
;

INSERT into [BOLDBI_LogStatus] (Name,IsActive) VALUES ( N'Start',1)
;
INSERT into [BOLDBI_LogStatus] (Name,IsActive) VALUES ( N'Success',1)
;
INSERT into [BOLDBI_LogStatus] (Name,IsActive) VALUES ( N'Fail',1)
;

INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Update',1)
;
INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Add',1)
;
INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Delete',1)
;
INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Activate',1)
;
INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Retry',1)
;
INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Enable',1)
;
INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Disable',1)
;
INSERT into [BOLDBI_SystemLogType] (Name,IsActive) VALUES (N'Visit',1)
;

INSERT into [BOLDBI_UserLogType] (Name,IsActive) VALUES ( N'Add',1)
;
INSERT into [BOLDBI_UserLogType] (Name,IsActive) VALUES ( N'Update',1)
;
INSERT into [BOLDBI_UserLogType] (Name,IsActive) VALUES ( N'Delete',1)
;
INSERT into [BOLDBI_UserLogType] (Name,IsActive) VALUES ( N'Synchronization',1)
;
INSERT into [BOLDBI_UserLogType] (Name,IsActive) VALUES ( N'Import',1)
;
INSERT into [BOLDBI_UserLogType] (Name,IsActive) VALUES ( N'Visit',1)
;

INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'Add',1)
;
INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'Update',1)
;
INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'Delete',1)
;
INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'Synchronization',1)
;
INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'Import',1)
;
INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'Visit',1)
;
INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'UserAdd',1)
;
INSERT into [BOLDBI_GroupLogType] (Name,IsActive) VALUES ( N'UserRemove',1)
;

INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'SystemSettings',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'NotificationSettings',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'NotificationAdministration',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'AzureADDetail',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'DatabaseConfiguration',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'TenantBillingSubscriptionInfo',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'CardDetail',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryAzureSchedule',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryDatabaseSchedule',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'SystemLogGeneral',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'User',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserManagementPages',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserManagement',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserPreferenceNotification',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'Group',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'GroupManagementPages',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'WindowsADDetail',GETDATE(),1)
;
INSERT into [BOLDBI_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryWindowsSchedule',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'DateFormat',N'SiteSettings.DateFormat',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'TimeZone',N'SiteSettings.TimeZone',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'TimeFormat',N'SiteSettings.TimeFormat',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'OrganizationName',N'SiteSettings.OrganizationName',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'LoginLogo',N'SiteSettings.LoginScreenLogo',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'EmailLogo',N'SiteSettings.EmailLogo',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'MainScreenLogo',N'SiteSettings.HeaderLogo',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'FavIcon',N'SiteSettings.Favicon',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'FooterLogo',N'SiteSettings.FooterLogo',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'IsEnableCopyrightInfo',N'SiteSettings.ShowCopyrightInformation',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'IsEnablePoweredBySyncfusion',N'SiteSettings.ShowPoweredBySyncfusion',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'CopyrightInformation',N'SiteSettings.CopyrightInformation',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'ResourceType',N'SiteSettings.ResourceType',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'ResourceOrder',N'SiteSettings.ResourceOrder',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForApiKeyExpiration',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForApiKeyExpiration',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableUserScheduleNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserScheduleNotification',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableUserProfileNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserProfileNotification',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableResourceShareNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableResourceShareNotification',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableUserSynchronizationNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserSynchronizationNotification',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationOnUserMention',N'NotificationSettings.SystemNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.SystemNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForApiKeyExpiration',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.MailNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.MailNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationOnUserMention',N'NotificationSettings.MailNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.MailNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForApiKeyExpiration',N'NotificationSettings.MailNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableUserScheduleNotification',N'NotificationSettings.MailNotificationSettings.EnableUserScheduleNotification',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableUserProfileNotification',N'NotificationSettings.MailNotificationSettings.EnableUserProfileNotification',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableResourceShareNotification',N'NotificationSettings.MailNotificationSettings.EnableResourceShareNotification',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableUserSynchronizationNotification',N'NotificationSettings.MailNotificationSettings.EnableUserSynchronizationNotification',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'TenantName',N'UserDirectory.Azure.TenantName',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'ClientId',N'UserDirectory.Azure.ClientId',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'ClientKey',N'UserDirectory.Azure.ClientSecret',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'ServerType',N'UserDirectory.Database.DatabaseType',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'ServerName',N'UserDirectory.Database.ServerName',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'UserName',N'UserDirectory.Database.Username',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'Password',N'UserDirectory.Database.Password',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'DatabaseName',N'UserDirectory.Database.DatabaseName',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'AuthenticationType',N'UserDirectory.Database.Authentication',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'DSN',N'UserDirectory.Database.DSN',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'Port',N'UserDirectory.Database.Port',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'FullName',N'Payments.BillingAddress.Name',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'Email',N'Payments.BillingAddress.Email',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'AddressLine1',N'Payments.BillingAddress.AddressLine1',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'AddressLine2',N'Payments.BillingAddress.AddressLine2',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'City',N'Payments.BillingAddress.City',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'State',N'Payments.BillingAddress.State',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'Country',N'Payments.BillingAddress.Country',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'ZipCode',N'Payments.BillingAddress.ZipCode',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'FullName',N'Payments.BillingAddress.Name',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Email',N'Payments.BillingAddress.Email',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Address1',N'Payments.BillingAddress.AddressLine1',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Address2',N'Payments.BillingAddress.AddressLine2',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'City',N'Payments.BillingAddress.City',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'State',N'Payments.BillingAddress.State',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Country',N'Payments.BillingAddress.Country',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'ZipCode',N'Payments.BillingAddress.ZipCode',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'IsEnabled',N'UserDirectory.Azure.Schedule.IsEnabled',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'RecurrenceType',N'UserDirectory.Azure.Schedule.RecurrenceType',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'RecurrenceInfo',N'UserDirectory.Azure.Schedule.Recurrence',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'StartDateString',N'UserDirectory.Azure.Schedule.Time',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'IsEnabled',N'UserDirectory.Database.Schedule.IsEnabled',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'RecurrenceType',N'UserDirectory.Database.Schedule.RecurrenceType',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'RecurrenceInfo',N'UserDirectory.Database.Schedule.Recurrence',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'StartDateString',N'UserDirectory.Database.Schedule.Time',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription',N'Subscription',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'NotificationSettings',N'NotificationSettings',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Azure.Schedule',N'UserDirectory.Azure.Schedule',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Database.Schedule',N'UserDirectory.Database.Schedule',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Azure',N'UserDirectory.Azure',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'SystemSettings',N'SystemSettings',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Database',N'UserDirectory.Database',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings',N'DashboardSettings',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.PublicDashboards',N'DashboardSettings.PublicDashboards',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'ConciergeSupport.ResourceAccess',N'ConciergeSupport.ResourceAccess',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'ConciergeSupport',N'ConciergeSupport',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments',N'Payments',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments.Card',N'Payments.Card',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments.BillingAddress',N'Payments.BillingAddress',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription',N'Subscription',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription.Plan',N'Subscription.Plan',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'SiteSettings',N'SiteSettings',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.UsageAnalytics',N'DashboardSettings.UsageAnalytics',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Contact',N'Contact',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'CreatedDate',N'CreatedDate',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'DisplayName',N'DisplayName',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Email',N'Email',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Username',N'Username',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'FirstName',N'FirstName',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsActivated',N'IsActivated',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsActive',N'IsActive',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsDeleted',N'IsDeleted',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'LastLogin',N'LastLogin',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'LastName',N'LastName',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'ModifiedDate',N'ModifiedDate',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Picture',N'Picture',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Password',N'Password',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'PasswordChangedDate',N'PasswordChangedDate',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'DirectoryTypeId',N'DirectoryTypeId',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IdPReferenceId',N'IdPReferenceId',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'ExternalProviderId',N'ExternalProviderId',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'CanSync',N'CanSync',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsCloseRequest',N'IsCloseRequest',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'SiteId',N'SiteId',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserPermissionsManagement',N'Manage User Permissions',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'ConciergeSupportIncidents',N'Concierge Support Incidents',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'ViewConciergeSupportIncident',N'View Concierge Support Incident',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserConnectedAccounts',N'User Connected Accounts',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserProfile',N'User Profile',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserPermission',N'User Permission',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'AzureUserImport',N'Azure AD User Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'DatabaseUserImport',N'Database User Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserManagementIndex',N'User Management',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'DatabaseUsersSynchronization',N'Database users Synchronization',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'AzureUsersSynchronization',N'Azure AD users Synchronization',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'CsvUserImport',N'CSV User Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserManagementProfile',N'User Management Profile',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'User',N'User',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'Users',N'Users',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'CsvUsers',N'CSV Users',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserActiveStatus',N'User Active Status',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'DatabaseUsers',N'Database Users',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'AzureUsers',N'Azure Users',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'HomepageInProfile',N'Homepage in User Profile',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'DefaultHomepage',N'Default Homepage of User',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserProfilePicture',N'User Profile Picture',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'ProfileNotificationSettings',N'Notification Settings in Profile',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserPassword',N'User Password',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserDashboardSettings',N'Dashboard Settings in Profile',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableAutoWatchOfCommentsOfAccessibleItems',N'Auto Watch Of Comments Of Accessible Items',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableAutoWatchOfCommentsOfCreatedItems',N'Auto Watch Of Comments Of Created Items',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableMailNotification',N'Mail Notification',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableSystemNotification',N'System Notification',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Group',N'Group',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Color',N'Color',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Description',N'Description',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'IsActive',N'IsActive',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'ModifiedDate',N'ModifiedDate',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Name',N'Name',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'DirectoryTypeId',N'DirectoryTypeId',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'ExternalProviderId',N'ExternalProviderId',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Groups',N'Groups',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'AzureGroups',N'Azure Groups',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'SiteId',N'SiteId',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'AzureADGroup',N'Azure AD groups Synchronization',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'AzureADGroupImport',N'Azure AD Group Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'Group',N'Group Management',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'ViewGroup',N'Group Detail',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'EditGroup',N'Edit Group',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'GroupPermission',N'Group Permission',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Username',N'UserDirectory.Windows.Username',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Password',N'UserDirectory.Windows.Password',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'LDAP URL',N'UserDirectory.Windows.LDAP URL',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Distinguished Name',N'UserDirectory.Windows.Distinguished Name',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Enable SSL',N'UserDirectory.Windows.Enable SSL',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Port Number',N'UserDirectory.Windows.Port Number',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'IsEnabled',N'UserDirectory.Windows.Schedule.IsEnabled',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'RecurrenceType',N'UserDirectory.Windows.Schedule.RecurrenceType',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'RecurrenceInfo',N'UserDirectory.Windows.Schedule.Recurrence',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'StartDateString',N'UserDirectory.Windows.Schedule.Time',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Windows.Schedule',N'UserDirectory.Windows.Schedule',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Windows',N'UserDirectory.Windows',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'WindowsUserImport',N'Windows AD User Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'WindowsUsersSynchronization',N'Windows AD users Synchronization',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'WindowsUsers',N'Windows Users',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'WindowsGroups',N'Windows Groups',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'WindowsADGroup',N'Windows AD groups Synchronization',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'WindowsADGroupImport',N'Windows AD Group Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'OAuthGroups',N'OAuth Group Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'OpenIDGroups',N'OpenID Group Import',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.DefaultViews',N'DashboardSettings.DefaultViews',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.AutosaveFilter',N'DashboardSettings.AutosaveFilter',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.Theming',N'DashboardSettings.Theming',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.IsolationCode',N'DashboardSettings.IsolationCode',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'EmbedSettings',N'EmbedSettings',GETDATE(),1)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.OAuth2',N'UserDirectory.OAuth2',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.OpenIDConnect',N'UserDirectory.OpenIDConnect',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.AuthControl',N'UserDirectory.AuthControl',GETDATE(),1)
;

INSERT INTO [BOLDBI_NotificationEvents] (Name, IsActive) VALUES (N'Time Drive Dashboard Export',1)
;
INSERT INTO [BOLDBI_NotificationEvents] (Name, IsActive) VALUES (N'Alert Drive Dashboard Export',1)
;

INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'Schedule Name',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'Schedule Id',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'Dashboard Id',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'Dashboard Name',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'Message',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'File Content',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'File Extension',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'Export Format',1)
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) VALUES (N'Alert Info',1)
;

INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,1,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,2,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,3,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,4,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,5,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,6,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,7,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (1,8,1)
;

INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,1,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,2,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,3,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,4,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,5,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,6,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,7,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,8,1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) VALUES (2,9,1)
;

INSERT into [BOLDBI_PublishType] (Name,IsActive) VALUES ( N'Publish',1)
;

INSERT into [BOLDBI_PublishType] (Name,IsActive) VALUES ( N'Lock',1)
;

INSERT into [BOLDBI_PublishType] (Name,IsActive) VALUES ( N'Unlock',1)
;

---- PASTE ALTER Queries below this section --------

ALTER TABLE [BOLDBI_PublishJobs]  ADD FOREIGN KEY([Type]) REFERENCES [BOLDBI_PublishType] ([Id])
;

ALTER TABLE [BOLDBI_ScheduleMissingLogs]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_ScheduleDetail] ([ScheduleId])
;

ALTER TABLE [BOLDBI_UserGroup]  ADD FOREIGN KEY([GroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_UserGroup]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_UserLogin]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_UserPreference] ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_Item]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;
ALTER TABLE [BOLDBI_Item]  ADD FOREIGN KEY([ParentId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_Item]  ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_Item]  ADD FOREIGN KEY([ModifiedById]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ItemView]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemView]  ADD FOREIGN KEY([ItemViewId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemView]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ItemTrash]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemTrash]  ADD FOREIGN KEY([TrashedById]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ItemTrashDeleted]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemTrashDeleted]  ADD FOREIGN KEY([ItemTrashId]) REFERENCES [BOLDBI_ItemTrash] ([Id])
;
ALTER TABLE [BOLDBI_ItemTrashDeleted]  ADD FOREIGN KEY([DeletedById]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ItemVersion]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;
ALTER TABLE [BOLDBI_ItemVersion]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemVersion]  ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([ItemVersionId]) REFERENCES [BOLDBI_ItemVersion] ([Id])
;
ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([ItemLogTypeId]) REFERENCES [BOLDBI_ItemLogType] ([Id])
;
ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([ParentId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([FromCategoryId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([ToCategoryId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([UpdatedUserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_ItemLog]  ADD FOREIGN KEY([SourceTypeId]) REFERENCES [BOLDBI_Source] ([Id])
;

ALTER TABLE [BOLDBI_PermissionEntity]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;

ALTER TABLE [BOLDBI_UserPermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [BOLDBI_PermissionEntity] ([Id])
;
ALTER TABLE [BOLDBI_UserPermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_UserPermission]  ADD  FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_UserPermission] ADD FOREIGN KEY ([SettingsTypeId]) REFERENCES [BOLDBI_SettingsType] (Id) 
;
ALTER TABLE [BOLDBI_UserPermission]  ADD  FOREIGN KEY([ScopeGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_UserPermission]  ADD  FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;

ALTER TABLE [BOLDBI_GroupPermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [BOLDBI_PermissionEntity] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermission]  ADD  FOREIGN KEY([GroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermission] ADD FOREIGN KEY ([SettingsTypeId]) REFERENCES [BOLDBI_SettingsType] (Id)
;
ALTER TABLE [BOLDBI_GroupPermission]  ADD  FOREIGN KEY([ScopeGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermission]  ADD  FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;

ALTER TABLE [BOLDBI_ScheduleDetail]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleDetail]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleDetail]  ADD FOREIGN KEY([RecurrenceTypeId]) REFERENCES [BOLDBI_RecurrenceType] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleDetail]  ADD FOREIGN KEY([ExportTypeId]) REFERENCES [BOLDBI_ExportType] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleDetail]  ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleDetail]  ADD FOREIGN KEY([ModifiedById]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_SubscribedUser]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_SubscribedUser]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_SubscribedUser]  ADD FOREIGN KEY([RecipientUserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_SubscribedGroup]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_SubscribedGroup]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_SubscribedGroup]  ADD FOREIGN KEY([RecipientGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
	
ALTER TABLE [BOLDBI_SubscrExtnRecpt]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_SubscrExtnRecpt]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ScheduleLogUser]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [BOLDBI_ScheduleStatus] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleLogUser]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleLogUser]  ADD FOREIGN KEY([DeliveredUserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ScheduleLogGroup]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [BOLDBI_ScheduleStatus] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleLogGroup]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleLogGroup]  ADD FOREIGN KEY([GroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleLogGroup]  ADD FOREIGN KEY([DeliveredUserId]) REFERENCES [BOLDBI_User] ([Id])
;
	
ALTER TABLE [BOLDBI_SchdLogExtnRecpt]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [BOLDBI_ScheduleStatus] ([Id])
;
ALTER TABLE [BOLDBI_SchdLogExtnRecpt]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_ScheduleLog]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [BOLDBI_ScheduleStatus] ([Id])
;
ALTER TABLE [BOLDBI_ScheduleLog]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_Comment] ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_Comment] ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_Comment] ADD FOREIGN KEY([ModifiedById]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_Comment] ADD FOREIGN KEY([ParentItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
 
ALTER TABLE [BOLDBI_ItemWatch] ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemWatch] ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_ItemWatch] ADD FOREIGN KEY([ParentItemId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_Homepage]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_ItemCommentLog]  ADD FOREIGN KEY([CurrentUserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_ItemCommentLog]  ADD FOREIGN KEY([ItemCommentLogTypeId]) REFERENCES [BOLDBI_ItemCommentLogType] ([Id])
;
ALTER TABLE [BOLDBI_ItemCommentLog]  ADD FOREIGN KEY([CommentId]) REFERENCES [BOLDBI_Comment] ([Id])
;
ALTER TABLE [BOLDBI_ItemCommentLog]  ADD FOREIGN KEY([RepliedFor]) REFERENCES [BOLDBI_Comment] ([Id])
;
ALTER TABLE [BOLDBI_ItemCommentLog]  ADD FOREIGN KEY([NotificationTo]) REFERENCES [BOLDBI_User] ([Id])
;
	
ALTER TABLE [BOLDBI_FavoriteItem]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_FavoriteItem]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_DashboardWidget]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_DashboardWidget]  ADD FOREIGN KEY([WidgetItemId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_DashboardDataSource]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_DashboardDataSource]  ADD FOREIGN KEY([DataSourceItemId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_HomepageItemFilter]  ADD FOREIGN KEY([HomepageId]) REFERENCES [BOLDBI_Homepage] ([Id])
;

ALTER TABLE [BOLDBI_PermissionAccEntity]  ADD FOREIGN KEY([PermissionEntityId]) REFERENCES [BOLDBI_PermissionEntity] ([Id])
;
ALTER TABLE [BOLDBI_PermissionAccEntity]  ADD FOREIGN KEY([PermissionAccessId]) REFERENCES [BOLDBI_PermissionAccess] ([Id])
;
ALTER TABLE [BOLDBI_CustomExpression]  ADD FOREIGN KEY([DashboardId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_CustomExpression]  ADD FOREIGN KEY([WidgetId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_CustomExpression]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_SlideshowInfo]  ADD FOREIGN KEY([SlideshowId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_UserPermissionLog]  ADD  FOREIGN KEY([LogTypeId]) REFERENCES [BOLDBI_PermissionLogType] ([Id])
;
ALTER TABLE [BOLDBI_UserPermissionLog]  ADD  FOREIGN KEY([UserPermissionId]) REFERENCES [BOLDBI_UserPermission] ([Id])
;
ALTER TABLE [BOLDBI_UserPermissionLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_UserPermissionLog]  ADD  FOREIGN KEY([AffectedUserId]) REFERENCES [BOLDBI_User] ([Id])
;

ALTER TABLE [BOLDBI_GroupPermissionLog]  ADD  FOREIGN KEY([LogTypeId]) REFERENCES [BOLDBI_PermissionLogType] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermissionLog]  ADD  FOREIGN KEY([GroupPermissionId]) REFERENCES [BOLDBI_GroupPermission] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermissionLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_GroupPermissionLog]  ADD  FOREIGN KEY([AffectedGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;

ALTER TABLE [BOLDBI_SystemLog]  ADD CONSTRAINT FK_SystemLog_SystemLogTypeId FOREIGN KEY([SystemLogTypeId]) REFERENCES [BOLDBI_SystemLogType] ([Id])
;
ALTER TABLE [BOLDBI_SystemLog]  ADD CONSTRAINT FK_SystemLog_UpdatedUserId FOREIGN KEY([UpdatedUserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_SystemLog]  ADD CONSTRAINT FK_SystemLog_LogStatusId FOREIGN KEY([LogStatusId]) REFERENCES [BOLDBI_LogStatus] ([Id])
;

ALTER TABLE [BOLDBI_LogField]  ADD CONSTRAINT FK_LogField_ModuleId FOREIGN KEY([ModuleId]) REFERENCES [BOLDBI_LogModule] ([Id])
;

ALTER TABLE [BOLDBI_SystemLog]  ADD CONSTRAINT FK_SystemLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [BOLDBI_LogField] ([Id])
;

ALTER TABLE [BOLDBI_UserLog]  ADD CONSTRAINT FK_UserLog_UserLogTypeId FOREIGN KEY([UserLogTypeId]) REFERENCES [BOLDBI_UserLogType] ([Id])
;
ALTER TABLE [BOLDBI_UserLog]  ADD CONSTRAINT FK_UserLog_TargetUserId FOREIGN KEY([TargetUserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_UserLog]  ADD CONSTRAINT FK_UserLog_CurrentUserId FOREIGN KEY([CurrentUserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_UserLog]  ADD CONSTRAINT FK_UserLog_SourceTypeId FOREIGN KEY([SourceTypeId]) REFERENCES [BOLDBI_Source] ([Id])
;
ALTER TABLE [BOLDBI_UserLog]  ADD CONSTRAINT FK_UserLog_LogStatusId FOREIGN KEY([LogStatusId]) REFERENCES [BOLDBI_LogStatus] ([Id])
;
ALTER TABLE [BOLDBI_UserLog]  ADD CONSTRAINT FK_UserLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [BOLDBI_LogField] ([Id])
;

ALTER TABLE [BOLDBI_GroupLog]  ADD CONSTRAINT FK_GroupLog_GroupLogTypeId FOREIGN KEY([GroupLogTypeId]) REFERENCES [BOLDBI_GroupLogType] ([Id])
;
ALTER TABLE [BOLDBI_GroupLog]  ADD CONSTRAINT FK_GroupLog_TargetGroupId FOREIGN KEY([TargetGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_GroupLog]  ADD CONSTRAINT FK_GroupLog_CurrentUserId FOREIGN KEY([CurrentUserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_GroupLog]  ADD CONSTRAINT FK_GroupLog_SourceTypeId FOREIGN KEY([SourceTypeId]) REFERENCES [BOLDBI_Source] ([Id])
;
ALTER TABLE [BOLDBI_GroupLog]  ADD CONSTRAINT FK_GroupLog_LogStatusId FOREIGN KEY([LogStatusId]) REFERENCES [BOLDBI_LogStatus] ([Id])
;
ALTER TABLE [BOLDBI_GroupLog]  ADD CONSTRAINT FK_GroupLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [BOLDBI_LogField] ([Id])
;
ALTER TABLE [BOLDBI_ItemSettings] ADD CONSTRAINT FK_ItemSettings_ItemId FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemUserPreference]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemUserPreference]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
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
ALTER TABLE [BOLDBI_ExternalSites]  ADD FOREIGN KEY([CreatedById]) REFERENCES [BOLDBI_User] ([Id])
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

ALTER TABLE [BOLDBI_DataNotification]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_DataNotification]  ADD FOREIGN KEY([DataSourceId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_UserDataNotification]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_EmailActivityLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_EmailActivityLog]  ADD  FOREIGN KEY([GroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_EmailActivityLog]  ADD  FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_EmailActivityLog]  ADD FOREIGN KEY([CommentId]) REFERENCES [BOLDBI_Comment] ([Id])
;

ALTER TABLE [BOLDBI_WebhookLog]  ADD  FOREIGN KEY([WebhookId]) REFERENCES [BOLDBI_Webhook] ([Id])
;

ALTER TABLE [BOLDBI_EventPayloadsMapping]  ADD FOREIGN KEY([EventType]) REFERENCES [BOLDBI_NotificationEvents] ([Id])
;

ALTER TABLE [BOLDBI_EventPayloadsMapping]  ADD FOREIGN KEY([PayloadType]) REFERENCES [BOLDBI_EventPayloads] ([Id])
;

ALTER TABLE [BOLDBI_NotificationTrigger]  ADD  FOREIGN KEY([WebhookId]) REFERENCES [BOLDBI_Webhook] ([Id])
;

CREATE NONCLUSTERED INDEX [IX_BOLDBI_ScheduleDetail_ScheduleId] ON [BOLDBI_ScheduleDetail]([ScheduleId]) WITH (ONLINE = ON)

CREATE NONCLUSTERED INDEX [IX_BOLDBI_ScheduleLog_ScheduleId] ON [BOLDBI_ScheduleLog] ([ScheduleId]) INCLUDE ([ExecutedDate], [ScheduleStatusId]) WITH (ONLINE = ON)

CREATE NONCLUSTERED INDEX [IX_BOLDBI_Item] ON [BOLDBI_Item] ([IsActive], [ItemTypeId], [ParentId], [IsDraft]) INCLUDE ([CreatedById], [CreatedDate]) WITH (ONLINE = ON)

CREATE NONCLUSTERED INDEX [IX_BOLDBI_UserPermission] ON [BOLDBI_UserPermission] ([IsActive], [UserId], [ItemId], [PermissionEntityId]) INCLUDE ([PermissionAccessId]) WITH (ONLINE = ON)