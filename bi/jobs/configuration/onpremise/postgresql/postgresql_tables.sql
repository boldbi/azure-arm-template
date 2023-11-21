CREATE TABLE SyncDS_User(
	Id SERIAL primary key NOT NULL,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NULL,
	DisplayName varchar(512) NULL,
	Username varchar(255) NOT NULL,
	Email varchar(350) NOT NULL,
	Contact varchar(20) NULL,
	Picture varchar(100) NOT NULL,	
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NULL,
	LastLogin timestamp NULL,
	PasswordChangedDate timestamp NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	IdPReferenceId uuid NOT NULL,
	ExternalProviderId varchar(1024) NULL,
	CanSync smallint NOT NULL DEFAULT 0,
	IsCloseRequest smallint NOT NULL DEFAULT 0,
	IsActive smallint NOT NULL,
	IsActivated smallint NOT NULL,
	IsDeleted smallint NOT NULL)
;

CREATE TABLE SyncDS_Group(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	Color varchar(255) NOT NULL DEFAULT 'White',
	IsolationCode varchar(4000) NULL,
	ModifiedDate timestamp NOT NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	ExternalProviderId varchar(100) NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserGroup(
	Id SERIAL PRIMARY KEY NOT NULL,
	GroupId int NOT NULL,
	UserId int NOT NULL,
	ModifiedDate timestamp NOT NULL,
	ExternalProviderId varchar(100) NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserLogType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserLog(
	Id uuid PRIMARY KEY NOT NULL,
	ActivityId uuid NOT NULL,
	UserLogTypeId int NOT NULL,
	LogFieldId int NOT NULL,
	OldValue varchar(4000) NULL,
	NewValue varchar(4000) NULL,	
	CurrentUserId int NULL,
	TargetUserId int NULL,
	SourceTypeId int NOT NULL,
	LogStatusId int NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserLogin(
	Id SERIAL PRIMARY KEY NOT NULL,
	UserId int NOT NULL,
	ClientToken varchar(4000) NOT NULL,
	IpAddress varchar(50) NOT NULL,
	LoggedInTime timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserPreference(
	Id SERIAL PRIMARY KEY NOT NULL,
	UserId int NOT NULL,
	Language varchar(4000) NULL,
	TimeZone varchar(100) NULL,
	RecordSize int NULL,
	ItemSort varchar(4000) NULL,
	ItemFilters varchar(4000) NULL,
	Notifications varchar(4000) NULL,
	Dashboards varchar(4000) NULL,
	IsolationCode varchar(4000) NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemType(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NULL)
;

CREATE TABLE SyncDS_Item(
	Id uuid PRIMARY KEY NOT NULL,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	ItemTypeId int NOT NULL,
	ParentId uuid NULL,
	Extension varchar(30) NULL,
	CloneItemId uuid NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsSampleData smallint NULL,
	DataSource varchar(1026) null,
	IsPublic smallint NOT NULL DEFAULT 0,
	IsDraft smallint NULL DEFAULT 0,
	IsLocked smallint NULL DEFAULT 0,
	IsActive smallint NULL,
	IsUnlisted smallint NOT NULL DEFAULT 0,
	IsUploadDraft smallint NOT NULL DEFAULT 0)
;

CREATE TABLE SyncDS_ItemView(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemId uuid NOT NULL,
	UserId int NOT NULL,
	ItemViewId uuid NOT NULL,
	QueryString varchar(4000) NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemLogType(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NULL UNIQUE,
	IsActive smallint NULL)
;


CREATE TABLE SyncDS_ItemTrash(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemId uuid NOT NULL,
	TrashedById int NOT NULL,
	TrashedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemTrashDeleted(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemId uuid NOT NULL,
	ItemTrashId int NOT NULL,
	DeletedById int NOT NULL,
	DeletedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemVersion(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemId uuid NOT NULL,
	ItemTypeId int NOT NULL,
	ItemName varchar(265) NULL,
	VersionNumber int NOT NULL,
	RolledbackVersionNumber int NULL,
	Comment varchar(1026) NULL,
	IsCurrentVersion smallint NOT NULL,
	CreatedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemLog(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemLogTypeId int NOT NULL,
	ItemId uuid NOT NULL,
	ItemVersionId int NOT NULL,
	SourceTypeId int NOT NULL,
	EventTypeId int NULL,
	ParentId uuid NULL,
	FromCategoryId uuid NULL,
	ToCategoryId uuid NULL,
	UpdatedUserId int NOT NULL,	
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_PermissionEntity(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	EntityType int NOT NULL,
	ItemTypeId int NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserPermission(
	Id SERIAL PRIMARY KEY NOT NULL,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId uuid NULL,
	UserId int NOT NULL,
	SettingsTypeId int NULl,
	ScopeGroupId int NULl,
	ItemTypeId int NULl,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_GroupPermission(
	Id SERIAL PRIMARY KEY NOT NULL,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId uuid NULL,
	GroupId int NOT NULL,
	SettingsTypeId int NULl,
	ScopeGroupId int NULl,
	ItemTypeId int NULl,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_RecurrenceType(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(30) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ExportType(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(20) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ScheduleDetail(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL UNIQUE,
	ItemId uuid NOT NULL,
	DashboardWidgetId uuid NULL,
	Name varchar(150) NOT NULL,
	RecurrenceTypeId int NULL,
	RecurrenceInfo varchar(4000) NULL,
	Subject varchar(4000) NULL,
	EmailContent varchar(4000) NULL,
	IsDataChanges smallint NOT NULL DEFAULT 0,
	IsTimeInterval smallint NOT NULL DEFAULT 0,
	StartDate timestamp NULL,
	EndDate timestamp NULL,
	EndAfter int NULL DEFAULT 0,
	NextSchedule timestamp NULL,
	ExportTypeId int NOT NULL,
	IsEnabled smallint NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	ScheduleExportInfo text NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SubscribedUser(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	SubscribedById int NOT NULL,
	RecipientUserId int NOT NULL,
	SubscribedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SubscribedGroup(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	SubscribedById int NOT NULL,
	RecipientGroupId int NOT NULL,
	SubscribedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SubscrExtnRecpt(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	SubscribedById int NOT NULL,
	EmailIds varchar(4000) NOT NULL,
	SubscribedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;
	
CREATE TABLE SyncDS_ScheduleStatus(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ScheduleLogUser(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredUserId int NOT NULL,
	DeliveredDate timestamp NOT NULL,
	IsOnDemand smallint NOT NULL,	
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ScheduleLogGroup(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	ScheduleStatusId int NOT NULL,
	GroupId int NOT NULL,
	DeliveredUserId int NOT NULL,
	DeliveredDate timestamp NOT NULL,
	IsOnDemand smallint NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SchdLogExtnRecpt(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredEmailId varchar(150) NOT NULL,
	DeliveredDate timestamp NOT NULL,
	IsOnDemand smallint NOT NULL,	
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ScheduleLog(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleStatusId int NOT NULL,
	ScheduleId uuid NOT NULL,
	ExecutedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	Message text NULL,
	IsOnDemand smallint NOT NULL DEFAULT (0),
	IsActive smallint NOT NULL,
	RequestId uuid NULL,
	LogExist smallint NOT NULL DEFAULT (0))
;

CREATE TABLE SyncDS_ScheduleMissingLogs(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	MissingType int NOT NULL,
	StartDate timestamp NOT NULL,
	EndDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SystemSettings(
	Id SERIAL PRIMARY KEY NOT NULL,
	Key varchar(255) NOT NULL,
	Value text NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
	CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE(Key))
;

CREATE TABLE SyncDS_ServerVersion(
	Id int PRIMARY KEY NOT NULL,
	VersionNumber varchar(20) NOT NULL)
;

CREATE TABLE SyncDS_Comment(
    Id SERIAL PRIMARY KEY NOT NULL,
    Comment varchar(4000) NOT NULL,
    ItemId uuid NOT NULL,
    UserId int NOT NULL,
    ParentId int NULL,
    ParentItemId uuid NULL,
    CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
    ModifiedById int NOT NULL,
    IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemWatch(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemId uuid NOT NULL,
	ParentItemId uuid NULL,
	UserId int NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsWatched smallint NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemCommentLogType(
    Id SERIAL PRIMARY KEY NOT NULL,
    Name varchar(100) NULL UNIQUE,
    IsActive smallint NULL)
;

CREATE TABLE SyncDS_ItemCommentLog(
    Id SERIAL PRIMARY KEY NOT NULL,
    ItemCommentLogTypeId int NOT NULL,
    CurrentUserId int NOT NULL,    
    CommentId int NOT NULL,
	Url varchar(4000) NOT NULL,
    ClubId varchar(100) NOT NULL,
    RepliedFor int NULL,
    OldValue varchar(4000) NULL,
    NewValue varchar(4000) NULL,
    NotificationTo int NULL,    
    ModifiedDate timestamp NOT NULL,
    IsRead smallint NOT NULL,
    IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_FavoriteItem(
	Id SERIAL PRIMARY KEY NOT NULL,
	UserId int NOT NULL,
	ItemId uuid NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_DashboardWidget (
	Id SERIAL PRIMARY KEY NOT NULL,
	DashboardItemId uuid NOT NULL,
	WidgetItemId uuid NOT NULL,
	WidgetDesignerId uuid NOT NULL,
	WidgetInfo varchar(4000),
	ModifiedDate timestamp NOT NULL,	
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_AzureADCredential(
	Id SERIAL primary key NOT NULL,
	TenantName varchar(255),
	ClientId varchar(100),
	ClientSecret varchar(100),
	IsActive smallint NOT NULL,
	EnableGroupUserImport smallint NOT NULL)
;

CREATE TABLE SyncDS_ADCredential(
Id SERIAL primary key NOT NULL,
Username varchar(100),
Password varchar(100),
LdapUrl varchar(255),
EnableSsl smallint NOT NULL,
DistinguishedName varchar(150),
PortNo int NOT NULL,
IsActive smallint NOT NULL,
EnableGroupUserImport smallint NOT NULL)
;

CREATE TABLE SyncDS_SAMLSettings(
	Id SERIAL primary key NOT NULL, 
	MetadataURI varchar(4000),
	Authority varchar(4000),
	DesignerClientId varchar(100),
	TenantName varchar(100), 
	MobileAppId varchar(100),
	IsEnabled smallint NOT NULL)
;

CREATE TABLE SyncDS_UserType(
	Id SERIAL primary key NOT NULL, 
	Type varchar(100) UNIQUE)
;

CREATE TABLE SyncDS_DashboardDataSource(
	Id SERIAL PRIMARY KEY NOT NULL,
	DashboardItemId uuid NOT NULL,
	DataSourceName varchar(255) NOT NULL,
	DataSourceItemId uuid NOT NULL,
	VersionNumber int NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_Homepage(
	Id uuid primary key NOT NULL,
	Name varchar(255) NOT NULL,
	UserId int NOT NULL,
	ItemInfo varchar(4000) NOT NULL,
	ItemType varchar(100) NOT NULL,
	IsDefaultHomepage smallint NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_HomepageItemFilter(
	Id SERIAL primary key NOT NULL,
	HomepageId uuid NOT NULL,
	FilterId int NOT NULL,
	QueryString varchar(4000) NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_DBCredential(
    Id SERIAL PRIMARY KEY NOT NULL,
    DatabaseType varchar(255) NOT NULL,
    ConnectionString varchar(4000) NOT NULL,
    UserNameSchema varchar(255) NOT NULL,
    UserNameTable varchar(255) NOT NULL,
    UserNameColumn varchar(255) NOT NULL,
    FirstNameSchema varchar(255) NOT NULL,
    FirstNameTable varchar(255) NOT NULL,
    FirstNameColumn varchar(255) NOT NULL,
    LastNameSchema varchar(255) NOT NULL,
    LastNameTable varchar(255) NOT NULL,
    LastNameColumn varchar(255) NOT NULL,
    EmailSchema varchar(255) NOT NULL,
    EmailTable varchar(255) NOT NULL,
    EmailColumn varchar(255) NOT NULL,
    IsActiveSchema varchar(255) NOT NULL,
    IsActiveTable varchar(255) NOT NULL,
    IsActiveColumn varchar(255) NOT NULL,
    Status  varchar(255) NOT NULL,
    ActiveStatusValue  varchar(255) NOT NULL,
    EmailRelationId int NULL,
    FirstNameRelationId int NULL,
    LastNameRelationId int NULL,
    IsActiveRelationId int NULL,
    IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_TableRelation(
    Id SERIAL PRIMARY KEY NOT NULL,
    LeftTable varchar(255) NOT NULL,
    LeftTableColumnName varchar(255) NOT NULL,	
    LeftTableCondition  varchar(255) NOT NULL,
    LeftTableName  varchar(255) NOT NULL,
    LeftTableSchema varchar(255) NOT NULL,
    Relationship varchar(255) NOT NULL,
    RightTable varchar(255) NOT NULL,
    RightTableColumnName varchar(255) NOT NULL,	
    RightTableCondition  varchar(255) NOT NULL,
    RightTableName  varchar(255) NOT NULL,
    RightTableSchema varchar(255) NOT NULL)
;

CREATE TABLE SyncDS_MultiTabDashboard(
	Id SERIAL PRIMARY KEY NOT NULL,
	ParentDashboardId uuid NOT NULL,
	ChildDashboardId uuid NOT NULL,
	DashboardDesignerId uuid NOT NULL,
	OrderNumber int NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
	TabName varchar(255) NULL)
;

CREATE TABLE SyncDS_DataNotification(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	DataSourceId uuid NULL,
	DaJsonString text NOT NULL,
	FilterData text NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ConditionCategory(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(255) NULL UNIQUE,
	IsActive smallint NOT NULL
);

CREATE TABLE SyncDS_CustomExpression(
	Id SERIAL PRIMARY KEY NOT NULL,
	DashboardId uuid NOT NULL,
	WidgetId uuid NOT NULL,
	DatasourceId varchar(255) NOT NULL,
	UserId int NOT NULL,
	Name varchar(255) NULL,
	Expression varchar(4000) NOT NULL,
	ColumnInfo varchar(4000) NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_Source(
    Id SERIAL PRIMARY KEY NOT NULL,
    Name varchar(100) NULL UNIQUE,
    IsActive smallint NULL)
;

CREATE TABLE SyncDS_SlideshowInfo(
	Id SERIAL PRIMARY KEY NOT NULL,
	SlideshowId uuid NOT NULL,
	ItemInfo text NOT NULL,
	loopInterval int NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_PermissionAccess(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) UNIQUE NOT NULL,
	AccessId int UNIQUE NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_PermissionAccEntity(
	Id SERIAL PRIMARY KEY NOT NULL,
	PermissionEntityId int NOT NULL,
	PermissionAccessId int NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_PermissionLogType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserPermissionLog(
	Id SERIAL primary key NOT NULL,
	UserId int NOT NULL,	
	AffectedUserId int NOT NULL,
	UserPermissionId int NULL,
	LogTypeId int NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_GroupPermissionLog(
	Id SERIAL primary key NOT NULL,
	UserId int NOT NULL,	
	AffectedGroupId int NOT NULL,
	GroupPermissionId int NULL,
	LogTypeId int NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SystemLogType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_LogStatus(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SystemLog(
	Id SERIAL primary key NOT NULL,
	SystemLogTypeId int NOT NULL,
	LogFieldId int NOT NULL,
	OldValue varchar(4000) NULL,
	NewValue varchar(4000) NULL,
	LogStatusId int NOT NULL,
	UpdatedUserId int NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_LogModule(
	Id SERIAL primary key NOT NULL,
	Name varchar(1026) NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_LogField(
	Id SERIAL primary key NOT NULL,
	ModuleId int NOT NULL,
	Field varchar(1026) NOT NULL,
	Description varchar(1026) NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_GroupLogType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_GroupLog(
	Id uuid PRIMARY KEY NOT NULL,
	ActivityId uuid NOT NULL,
	GroupLogTypeId int NOT NULL,
	LogFieldId int NOT NULL,
	OldValue varchar(4000) NULL,
	NewValue varchar(4000) NULL,	
	CurrentUserId int NULL,
	TargetGroupId int NULL,
	SourceTypeId int NOT NULL,
	LogStatusId int NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemSettings(
	Id SERIAL primary key NOT NULL,
	ItemId uuid NOT NULL,
	ItemConfig varchar(4000) NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ItemUserPreference(
    Id SERIAL primary key NOT NULL,
    ItemId uuid NOT NULL,
    UserId int NOT NULL,
    AutosaveFilter varchar(4000) NULL,
    DefaultViewId uuid NULL,
    ModifiedDate timestamp NOT NULL,
    IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_PublishedItem(
    Id uuid primary key NOT NULL,
	TenantId uuid NOT NULL,
	ItemId uuid NOT NULL,
	ItemName varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	CategoryName varchar(255) NULL,
    UserId int NOT NULL,
	DestinationItemId uuid NOT NULL,
	PublishType varchar(255) NOT NULL,
	IsLocked smallint NOT NULL,
	CreatedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
	ExternalSiteId int not null DEFAULT 0)
;

CREATE TABLE SyncDS_PublishJobs(
    Id SERIAL primary key NOT NULL,
	PublishId uuid NOT NULL,
    UserId int NOT NULL,
	JobDetails varchar(4000) NOT NULL,
	CreatedDate timestamp NOT NULL,
	CompletedDate timestamp NOT NULL,
	Status varchar(255) NOT NULL,
	IsActive smallint NOT NULL,
	Type int NOT NULL)
;

CREATE TABLE SyncDS_PublishType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_DeploymentDashboards(
    Id SERIAL primary key NOT NULL,
	ItemId uuid NOT NULL,
	ItemName varchar(255) NOT NULL,
	CategoryName varchar(255) NOT NULL,
	IsDashboardLocked smallint NOT NULL,
	IsDatasourceLocked smallint NOT NULL,
	ItemInfo text NOT NULL,
    Description varchar(1026) NULL,
    CreatedById int NOT NULL,
    CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
    IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserAttributes(
    Id SERIAL primary key NOT NULL,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1026) NULL,
	Encrypt smallint NOT NULL,
	UserId int NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_GroupAttributes(
    Id SERIAL primary key NOT NULL,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1026) NULL,
	Encrypt smallint NOT NULL,
	GroupId int NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SiteAttributes(
    Id SERIAL primary key NOT NULL,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1026) NULL,
	Encrypt smallint NOT NULL,
	CreatedById uuid NOT NULL,
	ModifiedById uuid NOT NULL,
	CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserDataNotification(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	UserId int NOT NULL,
	FilterData text NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ExternalSites(
    Id SERIAL primary key NOT NULL,
	Name varchar(255) NOT NULL,
	ClientId varchar(255) NOT NULL,
	ClientSecret varchar(255) NULL,
	SiteURL varchar(255) NULL,
	CreatedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedById int NULL,
	ModifiedDate timestamp NULL,
	SiteType int not null DEFAULT 0,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SettingsType(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NULL)
;

CREATE TABLE SyncDS_EmailActivityLog(
	Id  SERIAL PRIMARY KEY NOT NULL,
	Event varchar(255) NOT NULL,
	RecipientEmail varchar(255) NOT NULL,
	SenderEmail varchar(255) NOT NULL,
	MailSubject varchar(255) NOT NULL,
	MailBody text NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp  NULL,
	InitiatedBy int NOT NULL,
	UserId int NULL,
	GroupId int NULL,
	ItemId uuid NULL,
	CommentId int NULL,
	PermissionId int NULL,
	Status int NOT NULL,
	StatusMessage text NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_Webhook(
	Id  SERIAL PRIMARY KEY NOT NULL,
	Name varchar(512) NOT NULL,
	Description varchar(4000) NULL,
	Url varchar(512) NOT NULL,
	UserId int NOT NULL,
	Security varchar(512) NULL,
	Headers text NULL,
	ContentType int NOT NULL,
	SubscribedEvent varchar(512) NOT NULL,
	Payload text NULL,
	Failures int NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsEnable smallint NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_NotificationTrigger(
	Id SERIAL PRIMARY KEY NOT NULL,
	WebhookId int NULL,
	RecurrenceInfo varchar(4000) NOT NULL,
	RetryCount int NOT NULL,
	RequestData text NULL,
	WebhookTargetData text NULL,
	AdditionalInfo text NULL,
	NextScheduleDate timestamp NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NULL,
	ReferenceId varchar(255) NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_WebhookLog(
	Id SERIAL PRIMARY KEY NOT NULL,
	WebhookId int NULL,
	Event varchar(512) NOT NULL,
	RequestUrl varchar(512) NULL,
	FailureType varchar(512) NOT NULL,
	ReferenceId varchar(255) NULL,
	ResponseMessage text NULL,
	ResponseStatusCode varchar(512) NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_NotificationEvents(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_EventPayloads(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_EventPayloadsMapping(
	Id SERIAL PRIMARY KEY NOT NULL,
	EventType int NOT NULL,
	PayloadType int NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserSession(
	Id uuid primary key NOT NULL,
	IdpReferenceId uuid NOT NULL,
	SessionId uuid NOT NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	IpAddress varchar(255) NULL,
	Browser varchar(1024) NULL,
	LoggedInTime timestamp NULL,
	LastActive timestamp NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_BackgroundJobs (
	Id SERIAL primary key NOT NULL,
	JobType int NOT NULL,
	ItemId uuid NULL,
	UserId int NULL,
	JobDetails text NULL,
	CreatedDate timestamp NOT NULL,
	CompletedDate timestamp NOT NULL,
	Status varchar(255) NOT NULL,
	StatusMessage varchar(255) NULL,
	ResourceInfo text NULL,
	CanIncludeSensitiveInfo smallint NULL,
	IsSampleData smallint NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UploadDataSourceMapping (
	Id SERIAL primary key NOT NULL,
	DownloadedTenantId uuid NOT NULL,
	DownloadedItemId varchar(255) NOT NULL,
	UploadedItemId uuid NOT NULL,
	UploadedDate timestamp  NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_ScheduleRunHistory(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleStatusId int NOT NULL,
	ScheduleId uuid NOT NULL,
	StartedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	Message text NULL,
	IsOnDemand smallint NOT NULL DEFAULT (0),
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_DSMetrics (
   Id SERIAL PRIMARY KEY,
   DataSourceID VARCHAR(255),
   IsRefresh BOOLEAN,
   RefreshStartTime VARCHAR(255),
   RefreshEndTime VARCHAR(255),
   IsIncremental VARCHAR(255),
   TableDetails VARCHAR(255),
   RowsUpdated INTEGER,
   TotalRows INTEGER,
   CustomQuery VARCHAR(700),
   SourceConnectionDetails VARCHAR(255),
   IncrementalRefreshDetails VARCHAR(255),
   ExtractType VARCHAR(255),
   RefreshStatus VARCHAR(255),
   RefreshException VARCHAR(255))
;

CREATE TABLE SyncDS_ai_qnawidgethistory (
   searchid VARCHAR(255) PRIMARY KEY,
   question TEXT,
   tableinfo TEXT,
   schemasequence TEXT,
   fieldinfo TEXT,
   message TEXT,
   haserror BOOLEAN,
   sqlquery TEXT,
   uservote TEXT,
   isreported BOOLEAN)
;

---- PASTE INSERT Queries below this section --------

INSERT INTO SyncDS_PublishType (Name, IsActive) Values (N'Publish',1)
;

INSERT INTO SyncDS_PublishType (Name, IsActive) Values (N'Lock',1)
;

INSERT INTO SyncDS_PublishType (Name, IsActive) Values (N'Unlock',1)
;

INSERT into SyncDS_ItemType (Name,IsActive) VALUES (N'Category',1)
;
INSERT into SyncDS_ItemType (Name,IsActive) VALUES (N'Dashboard',1)
;
INSERT into SyncDS_ItemType (Name,IsActive) VALUES (N'Report',1)
;
INSERT into SyncDS_ItemType (Name,IsActive) VALUES (N'Datasource',1)
;
INSERT into SyncDS_ItemType (Name,IsActive) VALUES (N'Dataset',1)
;
INSERT into SyncDS_ItemType (Name,IsActive) VALUES (N'File',1)
;
INSERT into SyncDS_ItemType (Name,IsActive) VALUES (N'Schedule',1)
;
insert into SyncDS_ItemType (Name,IsActive) values (N'Widget',1)
;
insert into SyncDS_ItemType (Name,IsActive) values (N'ItemView',1)
;
Insert INTO SyncDS_ItemType (Name, IsActive) Values ('Slideshow',1)
;
INSERT into SyncDS_ItemType (Name, IsActive) Values (N'Settings',1)
; 
INSERT INTO SyncDS_ItemType (Name, IsActive) Values (N'User Management',1)
;
INSERT INTO SyncDS_ItemType (Name, IsActive) Values (N'Permissions',1)
;

INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Site Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Dashboard Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Embed Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Data Process',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Connectors',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Email Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Accounts Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) values (N'User Directory Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) values (N'Authentication Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'Notification Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'Manage License',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'Support Settings',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'Subscription',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'Payments',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'Widgets',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'Security',1)
;
INSERT into SyncDS_SettingsType (Name,IsActive) Values (N'Integrations',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) Values (N'CORS Settings',1)
;
INSERT into SyncDS_SettingsType (Name,IsActive) Values (N'Look and Feel',1)
;
INSERT into SyncDS_SettingsType (Name, IsActive) VALUES (N'Site Credentials',1)
;

INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Edited',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Moved',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Copied',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Cloned',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Trashed',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Restored',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Rollbacked',1)
;
INSERT into SyncDS_ItemLogType (Name,IsActive) VALUES ( N'Visited',1)
;

INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'Excel', 1)
;
INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'HTML', 1)
;
INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'PDF', 1)
;
INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'Word', 1)
;
INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'Image', 1)
;
INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'Refresh', 1)
;
INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'PPT', 1)
;
INSERT into SyncDS_ExportType (Name,IsActive) VALUES (N'CSV', 1)
;

INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'Daily', 1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'DailyWeekDay', 1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'Weekly', 1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'Monthly', 1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'MonthlyDOW', 1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'Yearly', 1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'YearlyDOW', 1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'Time', 1)
;

INSERT into SyncDS_ScheduleStatus (Name,IsActive) VALUES (N'Success', 1)
;
INSERT into SyncDS_ScheduleStatus (Name,IsActive) VALUES (N'Failure', 1)
;
INSERT into SyncDS_ScheduleStatus (Name,IsActive) VALUES (N'Run', 1)
;

INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Reports',1,3,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Reports in Category',2,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Report',0,3,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Categories',1,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Category',0,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Data Sources',1,4,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Data Source',0,4,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Files',1,6,0)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific File',0,6,0)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Schedules',1,7,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Schedule',0,7,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Dashboards',1,2,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Dashboards in Category',2,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Dashboard',0,2, 1)
;
insert into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) values(N'All Widgets',1,8,1)
;
insert into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) values(N'Specific Widget',0,8,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Datasets',1,5,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Dataset',0,5,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific ItemView',0,9,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All ItemViews',1,9,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Slideshow',0,10,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Slideshow',1,10,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Settings',0,11,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Settings',1,11,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Group',0,12,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Users and Groups',1,12,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Permissions',0,13,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Permissions',1,13,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Groups',1,12,1)
;
INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Users',1,12,1)
;

INSERT into SyncDS_Group (Name,Description,Color,IsolationCode,ModifiedDate,DirectoryTypeId,IsActive) VALUES (N'System Administrator','Has administrative rights for the dashboards','#ff0000',null,now() at time zone 'utc', 1, 1)
;

INSERT into SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( N'Edited',1)
;
INSERT into SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( N'Upvoted',1)
;
INSERT into SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( N'Downvoted',1)
;
INSERT into SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( N'Replied',1)
;
INSERT into SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( N'UserMention',1)
;
INSERT into SyncDS_UserType(Type) values(N'Server User')
;
INSERT into SyncDS_UserType(Type) values(N'Active Directory User')
;
INSERT into SyncDS_UserType(Type) values(N'Federation User')
;
ALTER TABLE SyncDS_MultiTabDashboard  ADD FOREIGN KEY(ParentDashboardId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_MultiTabDashboard  ADD FOREIGN KEY(ChildDashboardId) REFERENCES SyncDS_Item (Id)
;

INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES (N'Increases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES (N'Continuously Increases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES (N'Decreases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES (N'Continuously Decreases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES (N'Value Changes',1)
;

INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'Hourly',1)
;


INSERT INTO SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Create',1,1)
;
INSERT INTO SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Read',2,1)
;
INSERT INTO SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Read, Write',6,1)
;
INSERT INTO SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete',14,1)
;
INSERT INTO SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Download',18,1)
;

INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,1,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,1,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,1,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,1,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (29,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,2,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,2,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,2,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,2,1)
;	
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,2,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,2,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,2,1)
;							  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,2,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,3,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (23,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (24,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (25,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (26,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (27,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (28,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,4,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,4,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,4,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,4,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,4,1)
;																									  
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (30,3,1)
;

INSERT into SyncDS_PermissionLogType (Name,IsActive) VALUES ( N'PermissionAdded',1)
;
INSERT into SyncDS_PermissionLogType (Name,IsActive) VALUES ( N'PermissionRemoved',1)
;

INSERT into SyncDS_Source (Name,IsActive) VALUES ( N'Web',1)
;
INSERT into SyncDS_Source (Name,IsActive) VALUES ( N'API',1)
;
INSERT into SyncDS_Source (Name,IsActive) VALUES ( N'Schedule',1)
;
INSERT into SyncDS_Source (Name,IsActive) VALUES ( N'Embed',1)
;

INSERT into SyncDS_LogStatus (Name,IsActive) VALUES ( N'Start',1)
;
INSERT into SyncDS_LogStatus (Name,IsActive) VALUES ( N'Success',1)
;
INSERT into SyncDS_LogStatus (Name,IsActive) VALUES ( N'Fail',1)
;

INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Update',1)
;
INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Add',1)
;
INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Delete',1)
;
INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Activate',1)
;
INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Retry',1)
;
INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Enable',1)
;
INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Disable',1)
;
INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Visit',1)
;

INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Add',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Update',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Delete',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Synchronization',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Import',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Visit',1)
;

INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'Add',1)
;
INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'Update',1)
;
INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'Delete',1)
;
INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'Synchronization',1)
;
INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'Import',1)
;
INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'Visit',1)
;
INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'UserAdd',1)
;
INSERT into SyncDS_GroupLogType (Name,IsActive) VALUES ( N'UserRemove',1)
;

INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'SystemSettings',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'NotificationSettings',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'NotificationAdministration',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'AzureADDetail',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'DatabaseConfiguration',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'TenantBillingSubscriptionInfo',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'CardDetail',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryAzureSchedule',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryDatabaseSchedule',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'SystemLogGeneral',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'User',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'UserManagementPages',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'UserManagement',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'UserPreferenceNotification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'Group',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'GroupManagementPages',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'WindowsADDetail',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogModule (Name,ModifiedDate,IsActive) VALUES (N'UserDirectoryWindowsSchedule',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'DateFormat',N'SiteSettings.DateFormat',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'TimeZone',N'SiteSettings.TimeZone',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'TimeFormat',N'SiteSettings.TimeFormat',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'OrganizationName',N'SiteSettings.OrganizationName',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'LoginLogo',N'SiteSettings.LoginScreenLogo',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'EmailLogo',N'SiteSettings.EmailLogo',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'MainScreenLogo',N'SiteSettings.HeaderLogo',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'FavIcon',N'SiteSettings.Favicon',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'FooterLogo',N'SiteSettings.FooterLogo',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'IsEnableCopyrightInfo',N'SiteSettings.ShowCopyrightInformation',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'IsEnablePoweredBySyncfusion',N'SiteSettings.ShowPoweredBySyncfusion',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'CopyrightInformation',N'SiteSettings.CopyrightInformation',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableUserScheduleNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserScheduleNotification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableUserProfileNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserProfileNotification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableResourceShareNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableResourceShareNotification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,N'EnableUserSynchronizationNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserSynchronizationNotification',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationOnUserMention',N'NotificationSettings.SystemNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.SystemNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.MailNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.MailNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationOnUserMention',N'NotificationSettings.MailNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.MailNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableUserScheduleNotification',N'NotificationSettings.MailNotificationSettings.EnableUserScheduleNotification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableUserProfileNotification',N'NotificationSettings.MailNotificationSettings.EnableUserProfileNotification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableResourceShareNotification',N'NotificationSettings.MailNotificationSettings.EnableResourceShareNotification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableUserSynchronizationNotification',N'NotificationSettings.MailNotificationSettings.EnableUserSynchronizationNotification',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'TenantName',N'UserDirectory.Azure.TenantName',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'ClientId',N'UserDirectory.Azure.ClientId',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,N'ClientKey',N'UserDirectory.Azure.ClientSecret',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'ServerType',N'UserDirectory.Database.DatabaseType',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'ServerName',N'UserDirectory.Database.ServerName',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'UserName',N'UserDirectory.Database.Username',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'Password',N'UserDirectory.Database.Password',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'DatabaseName',N'UserDirectory.Database.DatabaseName',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'AuthenticationType',N'UserDirectory.Database.Authentication',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'DSN',N'UserDirectory.Database.DSN',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,N'Port',N'UserDirectory.Database.Port',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'FullName',N'Payments.BillingAddress.Name',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'Email',N'Payments.BillingAddress.Email',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'AddressLine1',N'Payments.BillingAddress.AddressLine1',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'AddressLine2',N'Payments.BillingAddress.AddressLine2',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'City',N'Payments.BillingAddress.City',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'State',N'Payments.BillingAddress.State',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'Country',N'Payments.BillingAddress.Country',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,N'ZipCode',N'Payments.BillingAddress.ZipCode',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'FullName',N'Payments.BillingAddress.Name',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Email',N'Payments.BillingAddress.Email',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Address1',N'Payments.BillingAddress.AddressLine1',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Address2',N'Payments.BillingAddress.AddressLine2',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'City',N'Payments.BillingAddress.City',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'State',N'Payments.BillingAddress.State',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'Country',N'Payments.BillingAddress.Country',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,N'ZipCode',N'Payments.BillingAddress.ZipCode',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'IsEnabled',N'UserDirectory.Azure.Schedule.IsEnabled',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'RecurrenceType',N'UserDirectory.Azure.Schedule.RecurrenceType',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'RecurrenceInfo',N'UserDirectory.Azure.Schedule.Recurrence',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,N'StartDateString',N'UserDirectory.Azure.Schedule.Time',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'IsEnabled',N'UserDirectory.Database.Schedule.IsEnabled',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'RecurrenceType',N'UserDirectory.Database.Schedule.RecurrenceType',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'RecurrenceInfo',N'UserDirectory.Database.Schedule.Recurrence',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,N'StartDateString',N'UserDirectory.Database.Schedule.Time',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription',N'Subscription',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'NotificationSettings',N'NotificationSettings',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Azure.Schedule',N'UserDirectory.Azure.Schedule',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Database.Schedule',N'UserDirectory.Database.Schedule',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Azure',N'UserDirectory.Azure',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'SystemSettings',N'SystemSettings',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Database',N'UserDirectory.Database',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings',N'DashboardSettings',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.PublicDashboards',N'DashboardSettings.PublicDashboards',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.DefaultViews',N'DashboardSettings.DefaultViews',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.AutosaveFilter',N'DashboardSettings.AutosaveFilter',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.Theming',N'DashboardSettings.Theming',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.IsolationCode',N'DashboardSettings.IsolationCode',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'ConciergeSupport.ResourceAccess',N'ConciergeSupport.ResourceAccess',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'ConciergeSupport',N'ConciergeSupport',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments',N'Payments',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments.Card',N'Payments.Card',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Payments.BillingAddress',N'Payments.BillingAddress',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription',N'Subscription',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'Subscription.Plan',N'Subscription.Plan',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'SiteSettings',N'SiteSettings',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.UsageAnalytics',N'DashboardSettings.UsageAnalytics',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Contact',N'Contact',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'CreatedDate',N'CreatedDate',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'DisplayName',N'DisplayName',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Email',N'Email',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Username',N'Username',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'FirstName',N'FirstName',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsActivated',N'IsActivated',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsActive',N'IsActive',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsDeleted',N'IsDeleted',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'LastLogin',N'LastLogin',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'LastName',N'LastName',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'ModifiedDate',N'ModifiedDate',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Picture',N'Picture',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'Password',N'Password',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'PasswordChangedDate',N'PasswordChangedDate',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'DirectoryTypeId',N'DirectoryTypeId',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IdPReferenceId',N'IdPReferenceId',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'ExternalProviderId',N'ExternalProviderId',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'CanSync',N'CanSync',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,N'IsCloseRequest',N'IsCloseRequest',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserPermissionsManagement',N'Manage User Permissions',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'ConciergeSupportIncidents',N'Concierge Support Incidents',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'ViewConciergeSupportIncident',N'View Concierge Support Incident',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserConnectedAccounts',N'User Connected Accounts',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserProfile',N'User Profile',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserPermission',N'User Permission',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'AzureUserImport',N'Azure AD User Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'DatabaseUserImport',N'Database User Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserManagementIndex',N'User Management',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'DatabaseUsersSynchronization',N'Database users Synchronization',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'AzureUsersSynchronization',N'Azure AD users Synchronization',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'CsvUserImport',N'CSV User Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'UserManagementProfile',N'User Management Profile',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'User',N'User',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'Users',N'Users',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'CsvUsers',N'CSV Users',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserActiveStatus',N'User Active Status',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'DatabaseUsers',N'Database Users',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'AzureUsers',N'Azure Users',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'HomepageInProfile',N'Homepage in User Profile',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'DefaultHomepage',N'Default Homepage of User',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserProfilePicture',N'User Profile Picture',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'ProfileNotificationSettings',N'Notification Settings in Profile',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserPassword',N'User Password',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserDashboardSettings',N'Dashboard Settings in Profile',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableAutoWatchOfCommentsOfAccessibleItems',N'Auto Watch Of Comments Of Accessible Items',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableAutoWatchOfCommentsOfCreatedItems',N'Auto Watch Of Comments Of Created Items',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableMailNotification',N'Mail Notification',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableSystemNotification',N'System Notification',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Group',N'Group',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Color',N'Color',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Description',N'Description',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'IsActive',N'IsActive',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'ModifiedDate',N'ModifiedDate',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Name',N'Name',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'DirectoryTypeId',N'DirectoryTypeId',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'ExternalProviderId',N'ExternalProviderId',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'Groups',N'Groups',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'AzureGroups',N'Azure Groups',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'AzureADGroup',N'Azure AD groups Synchronization',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'AzureADGroupImport',N'Azure AD Group Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'Group',N'Group Management',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'ViewGroup',N'Group Detail',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'EditGroup',N'Edit Group',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'GroupPermission',N'Group Permission',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Username',N'UserDirectory.Windows.Username',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Password',N'UserDirectory.Windows.Password',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'LDAP URL',N'UserDirectory.Windows.LDAP URL',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Distinguished Name',N'UserDirectory.Windows.Distinguished Name',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Enable SSL',N'UserDirectory.Windows.Enable SSL',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,N'Port Number',N'UserDirectory.Windows.Port Number',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'IsEnabled',N'UserDirectory.Windows.Schedule.IsEnabled',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'RecurrenceType',N'UserDirectory.Windows.Schedule.RecurrenceType',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'RecurrenceInfo',N'UserDirectory.Windows.Schedule.Recurrence',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,N'StartDateString',N'UserDirectory.Windows.Schedule.Time',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Windows.Schedule',N'UserDirectory.Windows.Schedule',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.Windows',N'UserDirectory.Windows',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'WindowsUserImport',N'Windows AD User Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,N'WindowsUsersSynchronization',N'Windows AD users Synchronization',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'WindowsUsers',N'Windows Users',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'WindowsGroups',N'Windows Groups',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'OAuthGroups',N'OAuth Group Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,N'OpenIDGroups',N'OpenID Group Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'WindowsADGroup',N'Windows AD groups Synchronization',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,N'WindowsADGroupImport',N'Windows AD Group Import',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'EmbedSettings',N'EmbedSettings',now() at time zone 'utc',1)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.OAuth2',N'UserDirectory.OAuth2',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.OpenIDConnect',N'UserDirectory.OpenIDConnect',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.AuthControl',N'UserDirectory.AuthControl',now() at time zone 'utc',1)
;

INSERT INTO SyncDS_NotificationEvents (Name, IsActive) VALUES (N'Time Drive Dashboard Export',1)
;
INSERT INTO SyncDS_NotificationEvents (Name, IsActive) VALUES (N'Alert Drive Dashboard Export',1)
;

INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'Schedule Name',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'Schedule Id',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'Dashboard Id',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'Dashboard Name',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'Message',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'File Content',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'File Extension',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'Export Format',1)
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) VALUES (N'Alert Info',1)
;

INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,1,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,2,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,3,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,4,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,5,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,6,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,7,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,8,1)
;

INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,1,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,2,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,3,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,4,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,5,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,6,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,7,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,8,1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,9,1)
;

---- PASTE ALTER Queries below this section --------
ALTER TABLE SyncDS_ScheduleMissingLogs  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_ScheduleDetail (ScheduleId)
;

ALTER TABLE SyncDS_PublishJobs  ADD FOREIGN KEY(Type) REFERENCES SyncDS_PublishType (Id)
;

ALTER TABLE SyncDS_UserGroup  ADD FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_UserGroup  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_UserLogin  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_UserPreference ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;
ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(ParentId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(ModifiedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ItemView  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemView  ADD FOREIGN KEY(ItemViewId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemView  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ItemTrash  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemTrash  ADD FOREIGN KEY(TrashedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(ItemTrashId) REFERENCES SyncDS_ItemTrash (Id)
;
ALTER TABLE SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(DeletedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ItemVersion  ADD FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;
ALTER TABLE SyncDS_ItemVersion  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemVersion  ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(ItemVersionId) REFERENCES SyncDS_ItemVersion (Id)
;
ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(ItemLogTypeId) REFERENCES SyncDS_ItemLogType (Id)
;
ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(ParentId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(FromCategoryId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(ToCategoryId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(UpdatedUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_ItemLog  ADD FOREIGN KEY(SourceTypeId) REFERENCES SyncDS_Source (Id)
;

ALTER TABLE SyncDS_PermissionEntity  ADD FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;

ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserPermission  ADD FOREIGN KEY(SettingsTypeId) REFERENCES SyncDS_SettingsType (Id) 
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;

ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD FOREIGN KEY(SettingsTypeId) REFERENCES SyncDS_SettingsType (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;

ALTER TABLE SyncDS_ScheduleDetail  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ScheduleDetail  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ScheduleDetail  ADD FOREIGN KEY(RecurrenceTypeId) REFERENCES SyncDS_RecurrenceType (Id)
;
ALTER TABLE SyncDS_ScheduleDetail  ADD FOREIGN KEY(ExportTypeId) REFERENCES SyncDS_ExportType (Id)
;
ALTER TABLE SyncDS_ScheduleDetail  ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_ScheduleDetail  ADD FOREIGN KEY(ModifiedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_SubscribedUser  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_SubscribedUser  ADD FOREIGN KEY(SubscribedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_SubscribedUser  ADD FOREIGN KEY(RecipientUserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_SubscribedGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_SubscribedGroup  ADD FOREIGN KEY(SubscribedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_SubscribedGroup  ADD FOREIGN KEY(RecipientGroupId) REFERENCES SyncDS_Group (Id)
;
	
ALTER TABLE SyncDS_SubscrExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_SubscrExtnRecpt  ADD FOREIGN KEY(SubscribedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ScheduleLogUser  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_ScheduleLogUser  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ScheduleLogUser  ADD FOREIGN KEY(DeliveredUserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(DeliveredUserId) REFERENCES SyncDS_User (Id)
;
	
ALTER TABLE SyncDS_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_ScheduleLog  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_ScheduleLog  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(ModifiedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(ParentItemId) REFERENCES SyncDS_Item (Id) 
;
 
ALTER TABLE SyncDS_ItemWatch ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemWatch ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_ItemWatch ADD FOREIGN KEY(ParentItemId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_Homepage  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_ItemCommentLog  ADD FOREIGN KEY(CurrentUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_ItemCommentLog  ADD FOREIGN KEY(ItemCommentLogTypeId) REFERENCES SyncDS_ItemCommentLogType (Id)
;
ALTER TABLE SyncDS_ItemCommentLog  ADD FOREIGN KEY(CommentId) REFERENCES SyncDS_Comment (Id)
;
ALTER TABLE SyncDS_ItemCommentLog  ADD FOREIGN KEY(RepliedFor) REFERENCES SyncDS_Comment (Id)
;
ALTER TABLE SyncDS_ItemCommentLog  ADD FOREIGN KEY(NotificationTo) REFERENCES SyncDS_User (Id)
;
	
ALTER TABLE SyncDS_FavoriteItem  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_FavoriteItem  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_DashboardWidget  ADD FOREIGN KEY(DashboardItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DashboardWidget  ADD FOREIGN KEY(WidgetItemId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_DashboardDataSource  ADD FOREIGN KEY(DashboardItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DashboardDataSource  ADD FOREIGN KEY(DataSourceItemId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_HomepageItemFilter  ADD FOREIGN KEY(HomepageId) REFERENCES SyncDS_Homepage (Id)
;

ALTER TABLE SyncDS_PermissionAccEntity  ADD FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_PermissionAccEntity  ADD FOREIGN KEY(PermissionAccessId) REFERENCES SyncDS_PermissionAccess (Id)
;
ALTER TABLE SyncDS_CustomExpression  ADD FOREIGN KEY(DashboardId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_CustomExpression  ADD FOREIGN KEY(WidgetId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_CustomExpression  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_SlideshowInfo  ADD FOREIGN KEY(SlideshowId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_UserPermissionLog  ADD  FOREIGN KEY(LogTypeId) REFERENCES SyncDS_PermissionLogType (Id)
;
ALTER TABLE SyncDS_UserPermissionLog  ADD  FOREIGN KEY(UserPermissionId) REFERENCES SyncDS_UserPermission (Id)
;
ALTER TABLE SyncDS_UserPermissionLog  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserPermissionLog  ADD  FOREIGN KEY(AffectedUserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_GroupPermissionLog  ADD  FOREIGN KEY(LogTypeId) REFERENCES SyncDS_PermissionLogType (Id)
;
ALTER TABLE SyncDS_GroupPermissionLog  ADD  FOREIGN KEY(GroupPermissionId) REFERENCES SyncDS_GroupPermission (Id)
;
ALTER TABLE SyncDS_GroupPermissionLog  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_GroupPermissionLog  ADD  FOREIGN KEY(AffectedGroupId) REFERENCES SyncDS_Group (Id)
;

ALTER TABLE SyncDS_SystemLog  ADD CONSTRAINT FK_SystemLog_SystemLogTypeId FOREIGN KEY(SystemLogTypeId) REFERENCES SyncDS_SystemLogType (Id)
;
ALTER TABLE SyncDS_SystemLog  ADD CONSTRAINT FK_SystemLog_UpdatedUserId FOREIGN KEY(UpdatedUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_SystemLog  ADD CONSTRAINT FK_SystemLog_LogStatusId FOREIGN KEY(LogStatusId) REFERENCES SyncDS_LogStatus (Id)
;

ALTER TABLE SyncDS_LogField  ADD CONSTRAINT FK_LogField_ModuleId FOREIGN KEY(ModuleId) REFERENCES SyncDS_LogModule (Id)
;

ALTER TABLE SyncDS_SystemLog  ADD CONSTRAINT FK_SystemLog_LogFieldId FOREIGN KEY(LogFieldId) REFERENCES SyncDS_LogField (Id)
;

ALTER TABLE SyncDS_UserLog  ADD CONSTRAINT FK_UserLog_UserLogTypeId FOREIGN KEY(UserLogTypeId) REFERENCES SyncDS_UserLogType (Id)
;
ALTER TABLE SyncDS_UserLog  ADD CONSTRAINT FK_UserLog_TargetUserId FOREIGN KEY(TargetUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserLog  ADD CONSTRAINT FK_UserLog_CurrentUserId FOREIGN KEY(CurrentUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserLog  ADD CONSTRAINT FK_UserLog_SourceTypeId FOREIGN KEY(SourceTypeId) REFERENCES SyncDS_Source (Id)
;
ALTER TABLE SyncDS_UserLog  ADD CONSTRAINT FK_UserLog_LogStatusId FOREIGN KEY(LogStatusId) REFERENCES SyncDS_LogStatus (Id)
;
ALTER TABLE SyncDS_UserLog  ADD CONSTRAINT FK_UserLog_LogFieldId FOREIGN KEY(LogFieldId) REFERENCES SyncDS_LogField (Id)
;

ALTER TABLE SyncDS_GroupLog  ADD CONSTRAINT FK_GroupLog_GroupLogTypeId FOREIGN KEY(GroupLogTypeId) REFERENCES SyncDS_GroupLogType (Id)
;
ALTER TABLE SyncDS_GroupLog  ADD CONSTRAINT FK_GroupLog_TargetGroupId FOREIGN KEY(TargetGroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_GroupLog  ADD CONSTRAINT FK_GroupLog_CurrentUserId FOREIGN KEY(CurrentUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_GroupLog  ADD CONSTRAINT FK_GroupLog_SourceTypeId FOREIGN KEY(SourceTypeId) REFERENCES SyncDS_Source (Id)
;
ALTER TABLE SyncDS_GroupLog  ADD CONSTRAINT FK_GroupLog_LogStatusId FOREIGN KEY(LogStatusId) REFERENCES SyncDS_LogStatus (Id)
;
ALTER TABLE SyncDS_GroupLog  ADD CONSTRAINT FK_GroupLog_LogFieldId FOREIGN KEY(LogFieldId) REFERENCES SyncDS_LogField (Id)
;
ALTER TABLE SyncDS_ItemSettings ADD CONSTRAINT FK_ItemSettings_ItemId FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemUserPreference  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemUserPreference  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_DeploymentDashboards  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DeploymentDashboards  ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_PublishedItem  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_PublishedItem  ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_PublishJobs  ADD FOREIGN KEY(PublishId) REFERENCES SyncDS_PublishedItem (Id)
;
ALTER TABLE SyncDS_PublishJobs  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_ExternalSites ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_UserAttributes ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserAttributes ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserAttributes ADD FOREIGN KEY(ModifiedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_GroupAttributes ADD  FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_GroupAttributes ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_GroupAttributes ADD FOREIGN KEY(ModifiedById) REFERENCES SyncDS_User (Id)
;

ALTER TABLE SyncDS_DataNotification ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DataNotification ADD FOREIGN KEY(DataSourceId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_UserDataNotification ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_EmailActivityLog  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_EmailActivityLog  ADD  FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_EmailActivityLog  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_EmailActivityLog  ADD FOREIGN KEY(CommentId) REFERENCES SyncDS_Comment (Id)
;

ALTER TABLE SyncDS_WebhookLog  ADD FOREIGN KEY(WebhookId) REFERENCES SyncDS_Webhook (Id)
;

ALTER TABLE SyncDS_NotificationTrigger  ADD FOREIGN KEY(WebhookId) REFERENCES SyncDS_Webhook (Id)
;

ALTER TABLE SyncDS_EventPayloadsMapping ADD FOREIGN KEY(EventType) REFERENCES SyncDS_NotificationEvents (Id)
;

ALTER TABLE SyncDS_EventPayloadsMapping ADD FOREIGN KEY(PayloadType) REFERENCES SyncDS_EventPayloads (Id)
;

CREATE INDEX IX_SyncDS_ScheduleDetail_ScheduleId ON SyncDS_ScheduleDetail(ScheduleId);

CREATE INDEX IX_SyncDS_ScheduleLog_ScheduleId ON SyncDS_ScheduleLog (ScheduleId) INCLUDE (ExecutedDate, ScheduleStatusId);

CREATE INDEX IX_SyncDS_Item ON SyncDS_Item (IsActive, ItemTypeId, ParentId, IsDraft) INCLUDE (CreatedById, CreatedDate);

CREATE INDEX IX_SyncDS_UserPermission ON SyncDS_UserPermission (IsActive, UserId, ItemId, PermissionEntityId) INCLUDE (PermissionAccessId);