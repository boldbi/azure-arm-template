------------------------------------------------------------------
-- Write SQL queries in the following order
-- 	1. Create Tables
--	2. Insert Values
--	3. Alter Table Syntax
------------------------------------------------------------------

CREATE TABLE [SyncDS_User](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
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

CREATE TABLE [SyncDS_Group](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1026) NULL,
	[Color] [nvarchar](255) NOT NULL DEFAULT 'White',
	[ModifiedDate] [datetime] NOT NULL,
	[DirectoryTypeId] [int] NOT NULL DEFAULT 0,
	[ExternalProviderId] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_UserGroup](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[GroupId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[ExternalProviderId] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_UserLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_UserLog](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
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

CREATE TABLE [SyncDS_UserLogin](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[ClientToken] [nvarchar](4000) NOT NULL,
	[IpAddress] [nvarchar](50) NOT NULL,
	[LoggedInTime] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
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
	[Dashboards] [nVarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
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
	[IsSampleData] [bit] NULL,
	[DataSource] nvarchar(max) null,
	[IsPublic] [bit] NOT NULL DEFAULT 0,
	[IsDraft] [bit] NULL DEFAULT 0,
	[IsActive] [bit] NULL)
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

CREATE TABLE [SyncDS_ItemTrashDeleted](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemTrashId] [int] NOT NULL,
	[DeletedById] [int] NOT NULL,
	[DeletedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_ItemLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemLogTypeId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemVersionId] [int] NOT NULL,
	[SourceTypeId] [int] NOT NULL,
	[ParentId] [uniqueidentifier] NULL,
	[FromCategoryId] [uniqueidentifier] NULL,
	[ToCategoryId] [uniqueidentifier] NULL,
	[UpdatedUserId] [int] NOT NULL,	
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_PermissionEntity](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[EntityType] [int] NOT NULL,
	[ItemTypeId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_UserPermission](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NULL,
	[UserId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_GroupPermission](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NULL,
	[GroupId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
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
	[IsDataChanges] [bit] NOT NULL DEFAULT 0,
	[IsTimeInterval] [bit] NOT NULL DEFAULT 0,
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

CREATE TABLE [SyncDS_SubscribedUser](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[RecipientUserId] [int] NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_SubscrExtnRecpt](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[EmailIds] [NVARCHAR](4000) NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_SchdLogExtnRecpt](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[DeliveredEmailId] [NVARCHAR](150) NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,	
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_ItemWatch](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsWatched] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_FavoriteItem](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_DashboardWidget] (
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardItemId] [uniqueidentifier] NOT NULL,
	[WidgetItemId] [uniqueidentifier] NOT NULL,
	[WidgetDesignerId] [uniqueidentifier] NOT NULL,
	[WidgetInfo] [varchar](max),
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_AzureADCredential](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[TenantName] [nvarchar](255),
	[ClientId] [nvarchar](100),
	[ClientSecret] [nvarchar](100),
	[EnableGroupUserImport] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_HomepageItemFilter](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[HomepageId] [uniqueidentifier] NOT NULL,
	[FilterId] [int] NOT NULL,
	[QueryString] [nvarchar](4000) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_MultiTabDashboard](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ParentDashboardId] [uniqueidentifier] NOT NULL,
	[ChildDashboardId] [uniqueidentifier] NOT NULL,
	[DashboardDesignerId] [uniqueidentifier] NOT NULL,
	[OrderNumber] [int] NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_DataNotification](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[Frequency] [int] NULL,
	[ConditionCategory] [int] NOT NULL,
	[PreviousValue]  text NULL,
	[PreviousData] text NULL,
	[IsActive] [bit] NOT NULL,
	[ColumnInfo] text NOT NULL,
	[ConditionInfo] text NULL,
	[ItemName] nvarchar(255) NOT NULL)
;

CREATE TABLE [SyncDS_ConditionCategory](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(255) NULL UNIQUE,
	[IsActive] [bit] NOT NULL
);

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

CREATE TABLE [SyncDS_Source](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Name] [nvarchar](100) NULL UNIQUE,
    [IsActive] [bit] NULL)
;

CREATE TABLE [SyncDS_SlideshowInfo](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SlideshowId] [uniqueidentifier] NOT NULL,
	[ItemInfo] nvarchar(max) NOT NULL,
	[loopInterval] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_PermissionLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_UserPermissionLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[UserId] [int] NOT NULL,	
	[AffectedUserId] [int] NOT NULL,
	[UserPermissionId] [int] NULL,
	[LogTypeId] [int] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_GroupPermissionLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[UserId] [int] NOT NULL,	
	[AffectedGroupId] [int] NOT NULL,
	[GroupPermissionId] [int] NULL,
	[LogTypeId] [int] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_SystemLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_LogStatus](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL)
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

CREATE TABLE [SyncDS_ItemSettings](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemConfig] [nvarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_ItemUserPreference](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[AutosaveFilter] [nvarchar](4000) NULL,
	[DefaultViewId] [uniqueidentifier] NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

---- PASTE INSERT Queries below this section --------

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
Insert INTO [SyncDS_ItemType] ([Name], [IsActive]) Values ('Slideshow',1)
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
INSERT into [SyncDS_ItemLogType] (Name,IsActive) VALUES ( N'Visited',1)
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
INSERT into [SyncDS_ExportType] (Name,IsActive) VALUES (N'Refresh', 1)
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
INSERT into [SyncDS_ScheduleStatus] (Name,IsActive) VALUES (N'Run', 1)
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
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Files',1,6,0)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific File',0,6,0)
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
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Slideshow',0,10,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Slideshow',1,10,1)
;

INSERT into [SyncDS_Group] (Name,Description,Color,ModifiedDate,DirectoryTypeId,IsActive) VALUES (N'System Administrator','Has administrative rights for the dashboards','#ff0000',GETDATE(), 1, 1)
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

ALTER TABLE [SyncDS_MultiTabDashboard]  ADD FOREIGN KEY([ParentDashboardId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_MultiTabDashboard]  ADD FOREIGN KEY([ChildDashboardId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_DataNotification]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
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

INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Hourly',1)
;


INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Create',1,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read',2,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write',6,1)
;
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete',14,1)
;
--INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Download',18,1)
--;
--INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Download',22,1)
--;
--INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete, Download',30,1)
--;

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
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,2,1)
;	
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,2,1)
;							  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,2,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,3,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,4,1)
;																									  
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,4,1)
;

INSERT into [SyncDS_PermissionLogType] (Name,IsActive) VALUES ( N'PermissionAdded',1)
;
INSERT into [SyncDS_PermissionLogType] (Name,IsActive) VALUES ( N'PermissionRemoved',1)
;

INSERT into [SyncDS_Source] (Name,IsActive) VALUES ( N'Web',1)
;
INSERT into [SyncDS_Source] (Name,IsActive) VALUES ( N'API',1)
;
INSERT into [SyncDS_Source] (Name,IsActive) VALUES ( N'Schedule',1)
;

INSERT into [SyncDS_LogStatus] (Name,IsActive) VALUES ( N'Start',1)
;
INSERT into [SyncDS_LogStatus] (Name,IsActive) VALUES ( N'Success',1)
;
INSERT into [SyncDS_LogStatus] (Name,IsActive) VALUES ( N'Fail',1)
;

INSERT into [SyncDS_SystemLogType] (Name,IsActive) VALUES (N'Update',1)
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

INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Add',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Update',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Delete',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Synchronization',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Import',1)
;
INSERT into [SyncDS_UserLogType] (Name,IsActive) VALUES ( N'Visit',1)
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
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryAzureSchedule',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryDatabaseSchedule',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'SystemLogGeneral',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'User',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserManagementPages',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserManagement',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'UserPreferenceNotification',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'Group',GETDATE(),1)
;
INSERT into [SyncDS_LogModule] (Name,ModifiedDate,IsActive) VALUES (N'GroupManagementPages',GETDATE(),1)
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
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'EmbedSettings',N'EmbedSettings',GETDATE(),1)
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

INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserDashboardSettings',N'Dashboard Settings in Profile',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.DefaultViews',N'DashboardSettings.DefaultViews',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.AutosaveFilter',N'DashboardSettings.AutosaveFilter',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'OAuthGroups',N'OAuth2 Groups',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'OpenIDGroups',N'OpenID Connect Groups',GETDATE(),1)
;

---- PASTE ALTER Queries below this section --------

ALTER TABLE [SyncDS_UserGroup]  ADD FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;
ALTER TABLE [SyncDS_UserGroup]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_UserLogin]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_UserPreference] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [SyncDS_ItemType] ([Id])
;
ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([ParentId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([CreatedById]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_Item]  ADD FOREIGN KEY([ModifiedById]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([ItemViewId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_ItemTrash]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemTrash]  ADD FOREIGN KEY([TrashedById]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_ItemTrashDeleted]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemTrashDeleted]  ADD FOREIGN KEY([ItemTrashId]) REFERENCES [SyncDS_ItemTrash] ([Id])
;
ALTER TABLE [SyncDS_ItemTrashDeleted]  ADD FOREIGN KEY([DeletedById]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_ItemVersion]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [SyncDS_ItemType] ([Id])
;
ALTER TABLE [SyncDS_ItemVersion]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemVersion]  ADD FOREIGN KEY([CreatedById]) REFERENCES [SyncDS_User] ([Id])
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
ALTER TABLE [SyncDS_ItemLog]  ADD FOREIGN KEY([SourceTypeId]) REFERENCES [SyncDS_Source] ([Id])
;

ALTER TABLE [SyncDS_PermissionEntity]  ADD FOREIGN KEY([ItemTypeId]) REFERENCES [SyncDS_ItemType] ([Id])
;

ALTER TABLE [SyncDS_UserPermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [SyncDS_PermissionEntity] ([Id])
;
ALTER TABLE [SyncDS_UserPermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_UserPermission]  ADD  FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_GroupPermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [SyncDS_PermissionEntity] ([Id])
;
ALTER TABLE [SyncDS_GroupPermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_GroupPermission]  ADD  FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
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

ALTER TABLE [SyncDS_SubscribedUser]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_SubscribedUser]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_SubscribedUser]  ADD FOREIGN KEY([RecipientUserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_SubscribedGroup]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_SubscribedGroup]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_SubscribedGroup]  ADD FOREIGN KEY([RecipientGroupId]) REFERENCES [SyncDS_Group] ([Id])
;
	
ALTER TABLE [SyncDS_SubscrExtnRecpt]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_SubscrExtnRecpt]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_ScheduleLogUser]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogUser]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogUser]  ADD FOREIGN KEY([DeliveredUserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLogGroup]  ADD FOREIGN KEY([DeliveredUserId]) REFERENCES [SyncDS_User] ([Id])
;
	
ALTER TABLE [SyncDS_SchdLogExtnRecpt]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_SchdLogExtnRecpt]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_ScheduleLog]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [SyncDS_ScheduleStatus] ([Id])
;
ALTER TABLE [SyncDS_ScheduleLog]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_Comment] ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_Comment] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_Comment] ADD FOREIGN KEY([ModifiedById]) REFERENCES [SyncDS_User] ([Id])
; 
 
ALTER TABLE [SyncDS_ItemWatch] ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemWatch] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_Homepage]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
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
	
ALTER TABLE [SyncDS_FavoriteItem]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_FavoriteItem]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_DashboardWidget]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardWidget]  ADD FOREIGN KEY([WidgetItemId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([DataSourceItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([VersionNumber]) REFERENCES [SyncDS_ItemVersion] ([Id])
;

ALTER TABLE [SyncDS_HomepageItemFilter]  ADD FOREIGN KEY([HomepageId]) REFERENCES [SyncDS_Homepage] ([Id])
;

ALTER TABLE [SyncDS_PermissionAccEntity]  ADD FOREIGN KEY([PermissionEntityId]) REFERENCES [SyncDS_PermissionEntity] ([Id])
;
ALTER TABLE [SyncDS_PermissionAccEntity]  ADD FOREIGN KEY([PermissionAccessId]) REFERENCES [SyncDS_PermissionAccess] ([Id])
;
ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([DashboardId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([WidgetId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_SlideshowInfo]  ADD FOREIGN KEY([SlideshowId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([LogTypeId]) REFERENCES [SyncDS_PermissionLogType] ([Id])
;
ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([UserPermissionId]) REFERENCES [SyncDS_UserPermission] ([Id])
;
ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([AffectedUserId]) REFERENCES [SyncDS_User] ([Id])
;

ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([LogTypeId]) REFERENCES [SyncDS_PermissionLogType] ([Id])
;
ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([GroupPermissionId]) REFERENCES [SyncDS_GroupPermission] ([Id])
;
ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([AffectedGroupId]) REFERENCES [SyncDS_Group] ([Id])
;

ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_SystemLogTypeId FOREIGN KEY([SystemLogTypeId]) REFERENCES [SyncDS_SystemLogType] ([Id])
;
ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_UpdatedUserId FOREIGN KEY([UpdatedUserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_LogStatusId FOREIGN KEY([LogStatusId]) REFERENCES [SyncDS_LogStatus] ([Id])
;

ALTER TABLE [SyncDS_LogField]  ADD CONSTRAINT FK_LogField_ModuleId FOREIGN KEY([ModuleId]) REFERENCES [SyncDS_LogModule] ([Id])
;

ALTER TABLE [SyncDS_SystemLog]  ADD CONSTRAINT FK_SystemLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [SyncDS_LogField] ([Id])
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
ALTER TABLE [SyncDS_UserLog]  ADD CONSTRAINT FK_UserLog_LogFieldId FOREIGN KEY([LogFieldId]) REFERENCES [SyncDS_LogField] ([Id])
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
ALTER TABLE [SyncDS_ItemSettings] ADD CONSTRAINT FK_ItemSettings_ItemId FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_ItemUserPreference]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemUserPreference]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE NONCLUSTERED INDEX [IX_SyncDS_ScheduleDetail_ScheduleId] ON [SyncDS_ScheduleDetail]([ScheduleId]) WITH (ONLINE = ON)

CREATE NONCLUSTERED INDEX [IX_SyncDS_ScheduleLog_ScheduleId] ON [SyncDS_ScheduleLog] ([ScheduleId]) INCLUDE ([ExecutedDate], [ScheduleStatusId]) WITH (ONLINE = ON)

CREATE NONCLUSTERED INDEX [IX_SyncDS_Item] ON [SyncDS_Item] ([IsActive], [ItemTypeId], [ParentId], [IsDraft]) INCLUDE ([CreatedById], [CreatedDate]) WITH (ONLINE = ON)

CREATE NONCLUSTERED INDEX [IX_SyncDS_UserPermission] ON [SyncDS_UserPermission] ([IsActive], [UserId], [ItemId], [PermissionEntityId]) INCLUDE ([PermissionAccessId]) WITH (ONLINE = ON)