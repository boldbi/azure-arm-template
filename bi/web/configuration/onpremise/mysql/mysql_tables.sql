CREATE TABLE {database_name}.BOLDBI_User(
	Id int NOT NULL AUTO_INCREMENT,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NULL,
	DisplayName varchar(512) NULL,
	Username varchar(255) NOT NULL,
	Email varchar(350) NOT NULL,
	Contact varchar(20) NULL,
	Picture varchar(100) NOT NULL,	
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NULL,
	LastLogin datetime NULL,
	PasswordChangedDate datetime NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	IdPReferenceId Char(38) NOT NULL,
	ExternalProviderId varchar(1024) NULL,
	CanSync tinyint NOT NULL DEFAULT 0,
	IsCloseRequest tinyint NOT NULL DEFAULT 0,
	IsActive tinyint NOT NULL,
	IsActivated tinyint NOT NULL,
	IsDeleted tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_Group(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	GroupLogo varchar(1026) NULL,
	Color varchar(255) NOT NULL DEFAULT 'White',
	IsolationCode varchar(4000) NULL,
	ModifiedDate datetime NOT NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	ExternalProviderId varchar(100) NULL,
	IsAdminGroup tinyint NOT NULL DEFAULT 0,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserGroup(
	Id int NOT NULL AUTO_INCREMENT,
	GroupId int NOT NULL,
	UserId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	ExternalProviderId varchar(100) NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserLog(
	Id Char(38) NOT NULL,
	ActivityId Char(38) NOT NULL,
	UserLogTypeId int NOT NULL,
	LogFieldId int NOT NULL,
	OldValue varchar(4000) NULL,
	NewValue varchar(4000) NULL,	
	CurrentUserId int NULL,
	TargetUserId int NULL,
	SourceTypeId int NOT NULL,
	LogStatusId int NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserLogin(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	ClientToken varchar(4000) NOT NULL,
	IpAddress varchar(50) NOT NULL,
	LoggedInTime datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserPreference(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	Language varchar(4000) NULL,
	TimeZone varchar(100) NULL,
	RecordSize int NULL,
	ItemSort varchar(4000) NULL,
	ItemFilters varchar(4000) NULL,
	Notifications varchar(4000) NULL,
	Dashboards text NULL,
	IsolationCode text NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_Item(
	Id Char(38) NOT NULL,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	ItemTypeId int NOT NULL,
	ParentId Char(38) NULL,
	Extension varchar(30) NULL,
	CloneItemId Char(38) NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
        PublishedDate datetime NULL,
	DashboardLogo varchar(1026) NULL,
	IsSampleData tinyint NULL,
	DataSource text null,
	IsPublic tinyint NOT NULL DEFAULT 0,
	IsDraft tinyint NULL DEFAULT 0,
	IsLocked tinyint NULL DEFAULT 0,
	IsActive tinyint NULL,
	IsUnlisted tinyint(1) NOT NULL DEFAULT 0,
	IsUploadDraft tinyint(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemView(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	UserId int NOT NULL,
	ItemViewId Char(38) NOT NULL,
	QueryString text NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	IsWidgetLinking tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NULL UNIQUE,
	IsActive tinyint NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;


CREATE TABLE {database_name}.BOLDBI_ItemTrash(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	TrashedById int NOT NULL,
	TrashedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemTrashDeleted(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ItemTrashId int NOT NULL,
	DeletedById int NOT NULL,
	DeletedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemVersion(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ItemTypeId int NOT NULL,
	ItemName varchar(265) NULL,
	VersionNumber int NOT NULL,
	RolledbackVersionNumber int NULL,
	Comment varchar(1026) NULL,
	IsCurrentVersion tinyint NOT NULL,
	CreatedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemLog(
	Id int NOT NULL AUTO_INCREMENT,
	ItemLogTypeId int NOT NULL,
	ItemId Char(38) NOT NULL,
	ItemVersionId int NOT NULL,
	SourceTypeId int NOT NULL,
	EventTypeId int NULL,
	ParentId Char(38) NULL,
	FromCategoryId Char(38) NULL,
	ToCategoryId Char(38) NULL,
	UpdatedUserId int NOT NULL,	
	ModifiedDate datetime NOT NULL,
    AnonymousUsername varchar(255) NULL,
	IPAddress varchar(255) NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_PermissionEntity(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	EntityType int NOT NULL,
	ItemTypeId int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserPermission(
	Id int NOT NULL AUTO_INCREMENT,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId Char(38) NULL,
	UserId int NOT NULL,
	SettingsTypeId int NULl,
	ScopeGroupId int NULl,
	ItemTypeId int NULl,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_GroupPermission(
	Id int NOT NULL AUTO_INCREMENT,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId Char(38) NULL,
	GroupId int NOT NULL,
	SettingsTypeId int NULl,
	ScopeGroupId int NULl,
	ItemTypeId int NULl,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_RecurrenceType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(30) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ExportType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(20) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ScheduleDetail(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL UNIQUE,
	ItemId Char(38) NOT NULL,
	DashboardWidgetId Char(38) NULL,
	DashboardViewId Char(38) NULL,
	Name varchar(150) NOT NULL,
	Parameter text NULL,
	RecurrenceTypeId int NULL,
	RecurrenceInfo varchar(4000) NULL,
	Subject varchar(4000) NULL,
	EmailContent varchar(4000) NULL,
	IsDataChanges tinyint NOT NULL DEFAULT 0,
	IsTimeInterval tinyint NOT NULL DEFAULT 0,
	AIInsightSummaryEnabled tinyint NOT NULL DEFAULT 0,
	StartDate datetime NULL,
	EndDate datetime NULL,
	EndAfter int NULL DEFAULT 0,
	NextSchedule datetime NULL,
	ExportTypeId int NULL,
        MultiExportType text NULL,
	IsEnabled tinyint NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	ScheduleExportInfo text NULL,
        DashboardWidgetIds text NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SubscribedUser(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	SubscribedById int NOT NULL,
	RecipientUserId int NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SubscribedGroup(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	SubscribedById int NOT NULL,
	RecipientGroupId int NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SubscrExtnRecpt(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	SubscribedById int NOT NULL,
	EmailIds varchar(4000) NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;
	
CREATE TABLE {database_name}.BOLDBI_ScheduleStatus(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ScheduleLogUser(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredUserId int NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint NOT NULL,	
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ScheduleLogGroup(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	GroupId int NOT NULL,
	DeliveredUserId int NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SchdLogExtnRecpt(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredEmailId varchar(150) NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint NOT NULL,	
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ScheduleLog(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleStatusId int NOT NULL,
	ScheduleId Char(38) NOT NULL,
	ExecutedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	Message text NULL,
	IsOnDemand tinyint NOT NULL DEFAULT 0,
	IsActive tinyint NOT NULL,
	RequestId Char(38) NULL,
	LogExist tinyint NOT NULL DEFAULT 0,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BoldBI_ScheduleMissingLogs(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	MissingType int NOT NULL,
	StartDate datetime NOT NULL,
	EndDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SystemSettings(
	Id int NOT NULL AUTO_INCREMENT,
	`Key` varchar(255) NOT NULL,
	Value text NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	CONSTRAINT UK_BOLDBI_SystemSettings_Key UNIQUE(`Key`),
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ServerVersion(
	Id int NOT NULL,
	VersionNumber varchar(20) NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_Comment(
    Id int NOT NULL AUTO_INCREMENT,
    Comment text NOT NULL,
    ItemId Char(38) NOT NULL,
    UserId int NOT NULL,
    ParentId int NULL,
    ParentItemId Char(38) NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    ModifiedById int NOT NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemWatch(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ParentItemId Char(38) NULL,
	UserId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsWatched tinyint NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemCommentLogType(
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NULL UNIQUE,
    IsActive tinyint NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemCommentLog(
    Id int NOT NULL AUTO_INCREMENT,
    ItemCommentLogTypeId int NOT NULL,
    CurrentUserId int NOT NULL,    
    CommentId int NOT NULL,
	Url varchar(4000) NOT NULL,
    ClubId varchar(100) NOT NULL,
    RepliedFor int NULL,
    OldValue varchar(4000) NULL,
    NewValue varchar(4000) NULL,
    NotificationTo int NULL,    
    ModifiedDate datetime NOT NULL,
    IsRead tinyint NOT NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_FavoriteItem(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	ItemId Char(38) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_DashboardWidget (
	Id int NOT NULL AUTO_INCREMENT,
	DashboardItemId Char(38) NOT NULL,
	WidgetItemId Char(38) NOT NULL,
	WidgetDesignerId Char(38) NOT NULL,
	WidgetInfo text,
	ModifiedDate datetime NOT NULL,	
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_AzureADCredential(
	Id int NOT NULL AUTO_INCREMENT,
	TenantName varchar(255),
	ClientId varchar(100),
	ClientSecret varchar(100),
	IsActive tinyint NOT NULL,
	EnableGroupUserImport tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ADCredential(
	Id int NOT NULL AUTO_INCREMENT,
	Username varchar(100),
	Password varchar(100),
	LdapUrl varchar(255),
	EnableSsl tinyint NOT NULL,
	DistinguishedName varchar(150),
	PortNo int NOT NULL,
	IsActive tinyint NOT NULL,
	EnableGroupUserImport tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SAMLSettings(
	Id int NOT NULL AUTO_INCREMENT, 
	MetadataURI varchar(4000),
	Authority varchar(4000),
	DesignerClientId varchar(100),
	TenantName varchar(100), 
	MobileAppId varchar(100),
	IsEnabled tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserType(
	Id int NOT NULL AUTO_INCREMENT, 
	Type varchar(100) UNIQUE,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_DashboardDataSource(
	Id int NOT NULL AUTO_INCREMENT,
	DashboardItemId Char(38) NOT NULL,
	DataSourceName varchar(255) NOT NULL,
	DataSourceItemId Char(38) NOT NULL,
	VersionNumber int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_Homepage(
	Id Char(38) NOT NULL,
	Name varchar(255) NOT NULL,
	UserId int NOT NULL,
	ItemInfo varchar(4000) NOT NULL,
	ItemType varchar(100) NOT NULL,
	IsDefaultHomepage tinyint NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_HomepageItemFilter(
	Id int NOT NULL AUTO_INCREMENT,
	HomepageId Char(38) NOT NULL,
	FilterId int NOT NULL,
	QueryString varchar(4000) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_DBCredential(
    Id int NOT NULL AUTO_INCREMENT,
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
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_TableRelation(
    Id int NOT NULL AUTO_INCREMENT,
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
    RightTableSchema varchar(255) NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_MultiTabDashboard(
	Id int NOT NULL AUTO_INCREMENT,
	ParentDashboardId Char(38) NOT NULL,
	ChildDashboardId Char(38) NOT NULL,
	DashboardDesignerId Char(38) NOT NULL,	
	OrderNumber int NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	TabName varchar(255) NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_DataNotification(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	DataSourceId Char(38) NULL,
	DaJsonString text NOT NULL,
	FilterData text NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ConditionCategory(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_CustomExpression(
	Id int NOT NULL AUTO_INCREMENT,
	DashboardId Char(38) NOT NULL,
	WidgetId Char(38) NOT NULL,
	DatasourceId varchar(255) NOT NULL,
	UserId int NOT NULL,
	Name varchar(255) NULL,
	Expression varchar(4000) NOT NULL,
	ColumnInfo varchar(4000) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_Source(
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NULL UNIQUE,
    IsActive tinyint NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SlideshowInfo(
	Id int NOT NULL AUTO_INCREMENT,
	SlideshowId Char(38) NOT NULL,
	ItemInfo text NOT NULL,
	loopInterval int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_PermissionAccess(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	AccessId int UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_PermissionAccEntity(
	Id int NOT NULL AUTO_INCREMENT,
	PermissionEntityId int NOT NULL,
	PermissionAccessId int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_PermissionLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserPermissionLog(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,	
	AffectedUserId int NOT NULL,
	UserPermissionId int NULL,
	LogTypeId int NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_GroupPermissionLog(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,	
	AffectedGroupId int NOT NULL,
	GroupPermissionId int NULL,
	LogTypeId int NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SystemLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_LogStatus(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SystemLog(
	Id int NOT NULL AUTO_INCREMENT,
	SystemLogTypeId int NOT NULL,
	LogFieldId int NOT NULL,
	OldValue varchar(4000) NULL,
	NewValue varchar(4000) NULL,
	LogStatusId int NOT NULL,
	UpdatedUserId int NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_LogModule(
	Id int NOT NULL AUTO_INCREMENT,
	Name text NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_LogField(
	Id int NOT NULL AUTO_INCREMENT,
	ModuleId int NOT NULL,
	Field text NOT NULL,
	Description text NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_GroupLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_GroupLog(
	Id Char(38) NOT NULL,
	ActivityId Char(38) NOT NULL,
	GroupLogTypeId int NOT NULL,
	LogFieldId int NOT NULL,
	OldValue varchar(4000) NULL,
	NewValue varchar(4000) NULL,	
	CurrentUserId int NULL,
	TargetGroupId int NULL,
	SourceTypeId int NOT NULL,
	LogStatusId int NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemSettings(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ItemConfig varchar(4000) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ItemUserPreference(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	UserId int NOT NULL,
	AutosaveFilter varchar(4000) NULL,
	DefaultViewId Char(38) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_PublishedItem(
    Id Char(38) NOT NULL,
    TenantId Char(38) NOT NULL,
    ItemId Char(38) NOT NULL,
	ItemName varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	CategoryName varchar(255) NULL,
    UserId int NOT NULL,
    DestinationItemId Char(38) NOT NULL,
	PublishType varchar(255) NOT NULL,
    IsLocked tinyint NOT NULL,
	CreatedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
    IsActive tinyint NOT NULL,
	ExternalSiteId int NOT NULL DEFAULT 0,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_PublishJobs(
    Id int NOT NULL AUTO_INCREMENT,
    PublishId Char(38) NOT NULL,
    UserId int NOT NULL,
    JobDetails varchar(4000) NOT NULL,
    CreatedDate datetime NOT NULL,
    CompletedDate datetime NOT NULL,
    Status varchar(255) NOT NULL,
    IsActive tinyint NOT NULL,
	Type int NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_PublishType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_DeploymentDashboards(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ItemName varchar(255) NOT NULL,
	CategoryName varchar(255) NOT NULL,
    Description varchar(1026) NULL,
	IsDashboardLocked tinyint NOT NULL,
    IsDatasourceLocked tinyint NOT NULL,
    ItemInfo text NOT NULL,
    CreatedById int NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserAttributes(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1026) NULL,
	Encrypt tinyint NOT NULL,
	UserId int NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_GroupAttributes(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1026) NULL,
	Encrypt tinyint NOT NULL,
	GroupId int NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SiteAttributes(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1026) NULL,
	Encrypt tinyint NOT NULL,
	CreatedById Char(38) NOT NULL,
	ModifiedById Char(38) NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserDataNotification(
    Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	UserId int NOT NULL,
	FilterData text NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ExternalSites(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	ClientId varchar(255) NOT NULL,
	ClientSecret varchar(255) NOT NULL,
	SiteURL varchar(255) NOT NULL,
	CreatedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedById int NULL,
	ModifiedDate datetime NULL,
	SiteType int NOT NULL DEFAULT 0,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_SettingsType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_EmailActivityLog(
	Id int NOT NULL AUTO_INCREMENT,
	Event varchar(255) NOT NULL,
	RecipientEmail varchar(255) NOT NULL,
	SenderEmail varchar(255) NOT NULL,
	MailSubject varchar(255) NOT NULL,
	MailBody text NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime  NULL,
	InitiatedBy int NOT NULL,
	UserId int NULL,
	GroupId int NULL,
	ItemId Char(38) NULL,
	CommentId int NULL,
	PermissionId int NULL,
	Status int NOT NULL,
	StatusMessage text NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_Webhook(
	Id int NOT NULL AUTO_INCREMENT,
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
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsEnable tinyint NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_NotificationTrigger(
	Id SERIAL PRIMARY KEY NOT NULL,
	WebhookId int NULL,
	RecurrenceInfo varchar(4000) NOT NULL,
	RetryCount int NOT NULL,
	RequestData longtext NULL,
	WebhookTargetData longtext NULL,
	AdditionalInfo text NULL,
	NextScheduleDate timestamp NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NULL,
	ReferenceId varchar(255) NULL,
	IsActive smallint NOT NULL) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_WebhookLog(
	Id int NOT NULL AUTO_INCREMENT,
	WebhookId int NULL,
	Event varchar(512) NOT NULL,
	RequestUrl varchar(512) NULL,
	FailureType varchar(512) NOT NULL,
	ReferenceId varchar(255) NULL,
	ResponseMessage text NULL,
	ResponseStatusCode varchar(512) NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_NotificationEvents(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_EventPayloads(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_EventPayloadsMapping(
	Id int NOT NULL AUTO_INCREMENT,
	EventType int NOT NULL,
	PayloadType int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserSession(
	Id Char(38) NOT NULL,
	IdpReferenceId Char(38) NOT NULL,
	SessionId Char(38) NOT NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	IpAddress varchar(255) NOT NULL,
	Browser varchar(255) NULL,
	LoggedInTime datetime NOT NULL,
	LastActive datetime NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;


CREATE TABLE {database_name}.BOLDBI_BackgroundJobs(
    Id int NOT NULL AUTO_INCREMENT,
    JobType varchar(100) NOT NULL,
    ItemId Char(38) NULL,
    UserId int NULL,
    JobDetails text NOT NULL,
    CreatedDate datetime NOT NULL,
    CompletedDate datetime NOT NULL,
    Status varchar(255) NOT NULL,
	StatusMessage varchar(255) NULL,
	ResourceInfo text NULL,
	CanIncludeSensitiveInfo tinyint NULL,
	IsSampleData tinyint NULL,
    IsActive tinyint NOT NULL,
	ParentJobId int NULL,
    PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UploadDataSourceMapping(
	Id int NOT NULL AUTO_INCREMENT,
	DownloadedTenantId char(38) NOT NULL,
	DownloadedItemId varchar(255) NOT NULL,
	UploadedItemId char(38) NOT NULL,
	UploadedDate datetime  NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ScheduleRunHistory(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleStatusId int NOT NULL,
	ScheduleId Char(38) NOT NULL,
	StartedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	Message text NULL,
	IsOnDemand tinyint NOT NULL DEFAULT 0,
	IsActive tinyint NOT NULL,
	LogExist tinyint NOT NULL DEFAULT 0,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_DSMetrics (
   Id SERIAL PRIMARY KEY,
   DataSourceID VARCHAR(255),
   IsRefresh BOOLEAN,
   RefreshStartTime VARCHAR(255),
   RefreshEndTime VARCHAR(255),
   IsIncremental VARCHAR(255),
   TableDetails VARCHAR(255),
   RowsUpdated INTEGER,
   TotalRows INTEGER,
   CustomQuery text,
   SourceConnectionDetails VARCHAR(255),
   IncrementalRefreshDetails VARCHAR(255),
   ExtractType VARCHAR(255),
   RefreshStatus VARCHAR(255),
   RefreshException VARCHAR(255)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ai_qnawidgethistory (
   searchid VARCHAR(255) PRIMARY KEY,
   question TEXT,
   tableinfo TEXT,
   fieldinfo TEXT,
   message TEXT,
   haserror BOOLEAN,
   chartType TEXT,
   uservote TEXT,
   isreported BOOLEAN,
   search_date TIMESTAMP,
   widgetid VARCHAR(255)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_Notification (
    Id int NOT NULL AUTO_INCREMENT,
    CurrentUserId int NOT NULL,
    ClubId varchar(100) NOT NULL,
    CommentId int NULL,
    ItemId Char(38) NULL,
    NotificationSource varchar(100) NULL,
    NotifictionDetails varchar(4000) NULL,
    NotificationTo int NULL,    
    ModifiedDate datetime NOT NULL,
    IsRead tinyint NOT NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_CustomEmailTemplate (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IsEnabled BIT,
    DisclaimerContent VARCHAR(255) NOT NULL,
    HeaderContent VARCHAR(255) NULL,
    Subject VARCHAR(255),
    TemplateName VARCHAR(255),
    Language VARCHAR(255) NOT NULL,
    MailBody TEXT NOT NULL,
    CreatedDate DATETIME NOT NULL,
    ModifiedDate DATETIME,
    SendEmailAsHTML BIT NOT NULL,
    CustomVisibilityOptions TEXT NOT NULL,
    IsActive BIT NOT NULL,
    TemplateId INT NOT NULL,
    IsDefaultTemplate BIT NOT NULL,
    IsSystemDefault BIT NOT NULL,
    Description VARCHAR(255) NULL,
    ModifiedBy int NOT NULL,
    TemplateLocalizationKey VARCHAR(255) NULL) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ApiKeyDetails (
    Id Char(38) NOT NULL,
    Name varchar(255) NOT NULL,
    ModifiedDate datetime NOT NULL,
    CreatedDate datetime NOT NULL,
    LastUsedDate datetime NULL,
    ApiKey varchar(100) NULL,
    TokenValidity datetime NULL,
    CreatedBy int NOT NULL,
    ModifiedBy int NOT NULL,
	IsApiKeyViewed tinyint NOT NULL,
    IsActive tinyint NOT NULL,
    PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_AI_CHAT (
    SearchID VARCHAR(255) PRIMARY KEY,
    SessionID TEXT,
    SearchDateTime DATETIME,
    InputToken INT,
    OutputToken INT,
    TotalToken INT,
    InputTokenCost DOUBLE,
    OutputTokenCost DOUBLE,
    TotalTokensCost DOUBLE,
    UserInfo TEXT,
    TenantID TEXT,
    RequestType TEXT,
    Environment TEXT) ROW_FORMAT=DYNAMIC
;


CREATE TABLE {database_name}.BOLDBI_AI_SESSIONS (
    SessionID VARCHAR(255) PRIMARY KEY,
    SessionStartTime DATETIME,
    SessionEndTime DATETIME,
    InputToken INT,
    OutputToken INT,
    TotalToken INT,
    InputTokenCost DOUBLE,
    OutputTokenCost DOUBLE,
    TotalTokensCost DOUBLE,
    UserInfo TEXT,
    TenantID TEXT,
    Environment TEXT,
	RequestType TEXT,
	SessionName TEXT,
	IsActive tinyint NOT NULL DEFAULT 0,
	HistoryContent TEXT,
	SessionModifiedTime DATETIME) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_AICredentials(
    Id char(38) NOT NULL,
    AIModel INT NOT NULL,
    AIConfiguration varchar(4000) NULL,
    CreatedById char(38) NULL,
    ModifiedById char(38) NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive tinyint NOT NULL,
    IsAISummariesEnabledGlobally tinyint NOT NULL DEFAULT 0,
    EnableAIFeature tinyint NOT NULL DEFAULT 0,
    IsAIModel tinyint NOT NULL DEFAULT 0,
    PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_AI_REQUESTS (
    MessageId VARCHAR(255) NOT NULL PRIMARY KEY,
    SearchDate DATETIME,
    Message TEXT,
    DatasourceId VARCHAR(255),
    SessionId VARCHAR(255),
    HasError BOOLEAN,
    Response TEXT,
    StatusMessage TEXT,
    AiModel VARCHAR(255),
    TenantId VARCHAR(255),
    UserEmail VARCHAR(255),
    Feedback TEXT,
    UserInfo TEXT,
    RequestType VARCHAR(255),
    Environment VARCHAR(255),
    IsValidResponse BOOLEAN,
    IsWidgetRendered BOOLEAN) ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ResourceFeatureAccess (
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(4000) NOT NULL,
    Type varchar(4000) NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_ResourceFeatureAccEntity (
    Id int NOT NULL AUTO_INCREMENT,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessId int NOT NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_UserResourceFeaturePermission (
    Id int NOT NULL AUTO_INCREMENT,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessJson varchar(4000) NOT NULL,
    ItemId Char(38) NULL,
    UserId int NOT NULL,
    ScopeGroupId int NULL,
    ItemTypeId int NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;

CREATE TABLE {database_name}.BOLDBI_GroupResourceFeaturePermission (
    Id int NOT NULL AUTO_INCREMENT,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessJson varchar(4000) NOT NULL,
    ItemId Char(38) NULL,
    GroupId int NOT NULL,
    ScopeGroupId int NULL,
    ItemTypeId int NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;

-- -- PASTE INSERT Queries below this section --------

INSERT into {database_name}.BOLDBI_PublishType (Name, IsActive) Values ('Publish',1)
;

INSERT into {database_name}.BOLDBI_PublishType (Name, IsActive) Values ('Lock',1)
;

INSERT into {database_name}.BOLDBI_PublishType (Name, IsActive) Values ('Unlock',1)
;

INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) VALUES ('Category',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) VALUES ('Dashboard',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) VALUES ('Report',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) VALUES ('Datasource',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) VALUES ('Dataset',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) VALUES ('File',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) VALUES ('Schedule',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) values ('Widget',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name,IsActive) values ('ItemView',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name, IsActive) Values ('Slideshow',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name, IsActive) Values ('Settings',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name, IsActive) Values ('User Management',1)
;
INSERT into {database_name}.BOLDBI_ItemType (Name, IsActive) Values ('Permissions',1)
;

INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Site Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Dashboard Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Embed Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Data Process',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Connectors',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Email Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Accounts Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) values ('User Directory Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) values ('Authentication Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name, IsActive) Values ('Notification Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name, IsActive) Values ('Manage License',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ( 'Support Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ( 'Subscription',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ( 'Payments',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ( 'Widgets',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ( 'Security',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) Values ( 'Integrations',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ( 'CORS Settings',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ( 'Look and Feel',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('Site Credentials',1)
;
INSERT into {database_name}.BOLDBI_SettingsType (Name,IsActive) VALUES ('API Key',1)
;

INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Added',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Edited',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Deleted',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Moved',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Copied',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Cloned',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Trashed',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Restored',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Rollbacked',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Visited',1)
;
INSERT into {database_name}.BOLDBI_ItemLogType (Name,IsActive) VALUES ( 'Downloaded',1)
;

INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('Excel', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('HTML', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('PDF', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('Word', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('Image', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('Refresh', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('PPT', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('CSV', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('DashboardCache', 1)
;
INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('DatasourceCache', 1)
;

INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('Daily', 1)
;
INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('DailyWeekDay', 1)
;
INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('Weekly', 1)
;
INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('Monthly', 1)
;
INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('MonthlyDOW', 1)
;
INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('Yearly', 1)
;
INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('YearlyDOW', 1)
;
INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('Time', 1)
;

INSERT into {database_name}.BOLDBI_ScheduleStatus (Name,IsActive) VALUES ('Success', 1)
;
INSERT into {database_name}.BOLDBI_ScheduleStatus (Name,IsActive) VALUES ('Failure', 1)
;
INSERT into {database_name}.BOLDBI_ScheduleStatus (Name,IsActive) VALUES ('Run', 1)
;

INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('All Reports',1,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Reports in Category',2,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Report',0,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Categories',1,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Category',0,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Data Sources',1,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Data Source',0,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Files',1,6,0)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific File',0,6,0)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Schedules',1,7,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Schedule',0,7,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Dashboards',1,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Dashboards in Category',2,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Dashboard',0,2, 1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) values('All Widgets',1,8,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) values('Specific Widget',0,8,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Datasets',1,5,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Dataset',0,5,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific ItemView',0,9,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All ItemViews',1,9,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('Specific Slideshow',0,10,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('All Slideshow',1,10,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('Specific Settings',0,11,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('All Settings',1,11,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('Specific Group',0,12,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('Users and Groups',1,12,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('Specific Permissions',0,13,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('All Permissions',1,13,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('All Groups',1,12,1)
;
INSERT into {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) VALUES ('All Users',1,12,1)
;

INSERT into {database_name}.BOLDBI_Group (Name,Description,Color,IsolationCode,ModifiedDate,DirectoryTypeId,IsAdminGroup,IsActive) VALUES ('System Administrator','Has administrative rights for the dashboards','#ff0000',null,NOW(), 1, 1, 1)
;

INSERT into {database_name}.BOLDBI_ItemCommentLogType (Name,IsActive) VALUES ( 'Added',1)
;
INSERT into {database_name}.BOLDBI_ItemCommentLogType (Name,IsActive) VALUES ( 'Edited',1)
;
INSERT into {database_name}.BOLDBI_ItemCommentLogType (Name,IsActive) VALUES ( 'Deleted',1)
;
INSERT into {database_name}.BOLDBI_ItemCommentLogType (Name,IsActive) VALUES ( 'Upvoted',1)
;
INSERT into {database_name}.BOLDBI_ItemCommentLogType (Name,IsActive) VALUES ( 'Downvoted',1)
;
INSERT into {database_name}.BOLDBI_ItemCommentLogType (Name,IsActive) VALUES ( 'Replied',1)
;
INSERT into {database_name}.BOLDBI_ItemCommentLogType (Name,IsActive) VALUES ( 'UserMention',1)
;
INSERT into {database_name}.BOLDBI_UserType(Type) values('Server User')
;
INSERT into {database_name}.BOLDBI_UserType(Type) values('Active Directory User')
;
INSERT into {database_name}.BOLDBI_UserType(Type) values('Federation User')
;

ALTER TABLE  {database_name}.BOLDBI_MultiTabDashboard  ADD FOREIGN KEY(ParentDashboardId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_MultiTabDashboard  ADD FOREIGN KEY(ChildDashboardId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

INSERT into {database_name}.BOLDBI_ConditionCategory (Name,IsActive) VALUES ('Increases',1)
;
INSERT into {database_name}.BOLDBI_ConditionCategory (Name,IsActive) VALUES ('Continuously Increases',1)
;
INSERT into {database_name}.BOLDBI_ConditionCategory (Name,IsActive) VALUES ('Decreases',1)
;
INSERT into {database_name}.BOLDBI_ConditionCategory (Name,IsActive) VALUES ('Continuously Decreases',1)
;
INSERT into {database_name}.BOLDBI_ConditionCategory (Name,IsActive) VALUES ('Value Changes',1)
;

INSERT into {database_name}.BOLDBI_RecurrenceType (Name,IsActive) VALUES ('Hourly',1)
;


INSERT into {database_name}.BOLDBI_PermissionAccess (Name, AccessId, IsActive) VALUES ('Create',1,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccess (Name, AccessId, IsActive) VALUES ('Read',2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccess (Name, AccessId, IsActive) VALUES ('Read, Write',6,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccess (Name, AccessId, IsActive) VALUES ('Read, Write, Delete',14,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccess (Name, AccessId, IsActive) VALUES ('Download',18,1)
;

INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,1,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,1,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,1,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,1,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (29,1,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,2,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,2,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,2,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,2,1)
;	
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,2,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,2,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,2,1)
;							  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,2,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,2,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,3,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (23,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (24,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (25,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (26,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (27,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (28,3,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,4,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (5,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (6,4,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (7,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (10,4,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (11,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,4,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,4,1)
;																									  
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (15,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (16,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,4,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,5,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,5,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (30,3,1)
;

INSERT into {database_name}.BOLDBI_PermissionLogType (Name,IsActive) VALUES ( 'PermissionAdded',1)
;
INSERT into {database_name}.BOLDBI_PermissionLogType (Name,IsActive) VALUES ( 'PermissionRemoved',1)
;

INSERT into {database_name}.BOLDBI_Source (Name,IsActive) VALUES ( 'Web',1)
;
INSERT into {database_name}.BOLDBI_Source (Name,IsActive) VALUES ( 'API',1)
;
INSERT into {database_name}.BOLDBI_Source (Name,IsActive) VALUES ( 'Schedule',1)
;
INSERT into {database_name}.BOLDBI_Source (Name,IsActive) VALUES ( 'Embed',1)
;

INSERT into {database_name}.BOLDBI_LogStatus (Name,IsActive) VALUES ( 'Start',1)
;
INSERT into {database_name}.BOLDBI_LogStatus (Name,IsActive) VALUES ( 'Success',1)
;
INSERT into {database_name}.BOLDBI_LogStatus (Name,IsActive) VALUES ( 'Fail',1)
;

INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Update',1)
;
INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Add',1)
;
INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Delete',1)
;
INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Activate',1)
;
INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Retry',1)
;
INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Enable',1)
;
INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Disable',1)
;
INSERT into {database_name}.BOLDBI_SystemLogType (Name,IsActive) VALUES ('Visit',1)
;

INSERT into {database_name}.BOLDBI_UserLogType (Name,IsActive) VALUES ( 'Add',1)
;
INSERT into {database_name}.BOLDBI_UserLogType (Name,IsActive) VALUES ( 'Update',1)
;
INSERT into {database_name}.BOLDBI_UserLogType (Name,IsActive) VALUES ( 'Delete',1)
;
INSERT into {database_name}.BOLDBI_UserLogType (Name,IsActive) VALUES ( 'Synchronization',1)
;
INSERT into {database_name}.BOLDBI_UserLogType (Name,IsActive) VALUES ( 'Import',1)
;
INSERT into {database_name}.BOLDBI_UserLogType (Name,IsActive) VALUES ( 'Visit',1)
;

INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'Add',1)
;
INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'Update',1)
;
INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'Delete',1)
;
INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'Synchronization',1)
;
INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'Import',1)
;
INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'Visit',1)
;
INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'UserAdd',1)
;
INSERT into {database_name}.BOLDBI_GroupLogType (Name,IsActive) VALUES ( 'UserRemove',1)
;

INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('SystemSettings',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('NotificationSettings',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('NotificationAdministration',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('AzureADDetail',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('DatabaseConfiguration',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('TenantBillingSubscriptionInfo',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('CardDetail',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('UserDirectoryAzureSchedule',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('UserDirectoryDatabaseSchedule',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('SystemLogGeneral',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('User',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('UserManagementPages',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('UserManagement',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('UserPreferenceNotification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('Group',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('GroupManagementPages',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('WindowsADDetail',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogModule (Name,ModifiedDate,IsActive) VALUES ('UserDirectoryWindowsSchedule',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'DateFormat','SiteSettings.DateFormat',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'TimeZone','SiteSettings.TimeZone',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'TimeFormat','SiteSettings.TimeFormat',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'OrganizationName','SiteSettings.OrganizationName',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'LoginLogo','SiteSettings.LoginScreenLogo',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'EmailLogo','SiteSettings.EmailLogo',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'MainScreenLogo','SiteSettings.HeaderLogo',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'FavIcon','SiteSettings.Favicon',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'FooterLogo','SiteSettings.FooterLogo',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'IsEnableCopyrightInfo','SiteSettings.ShowCopyrightInformation',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'IsEnablePoweredBySyncfusion','SiteSettings.ShowPoweredBySyncfusion',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'CopyrightInformation','SiteSettings.CopyrightInformation',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'ResourceType','SiteSettings.ResourceType',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'ResourceOrder','SiteSettings.ResourceOrder',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForDashboardOwner','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForApiKeyExpiration','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForAccessibleUser','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationOnUserMention','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationOnUserMention',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationWhenWatchEnabled','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForDashboardOwner','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForApiKeyExpiration','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForAccessibleUser','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationOnUserMention','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationOnUserMention',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationWhenWatchEnabled','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableUserScheduleNotification','UserNotificationSettings.UserMailNotificationSettings.EnableUserScheduleNotification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableUserProfileNotification','UserNotificationSettings.UserMailNotificationSettings.EnableUserProfileNotification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableResourceShareNotification','UserNotificationSettings.UserMailNotificationSettings.EnableResourceShareNotification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableUserSynchronizationNotification','UserNotificationSettings.UserMailNotificationSettings.EnableUserSynchronizationNotification',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForDashboardOwner','NotificationSettings.SystemNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForApiKeyExpiration','NotificationSettings.SystemNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForAccessibleUser','NotificationSettings.SystemNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationOnUserMention','NotificationSettings.SystemNotificationSettings.EnableNotificationOnUserMention',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationWhenWatchEnabled','NotificationSettings.SystemNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForDashboardOwner','NotificationSettings.MailNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForApiKeyExpiration','NotificationSettings.MailNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForAccessibleUser','NotificationSettings.MailNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationOnUserMention','NotificationSettings.MailNotificationSettings.EnableNotificationOnUserMention',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationWhenWatchEnabled','NotificationSettings.MailNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableUserScheduleNotification','NotificationSettings.MailNotificationSettings.EnableUserScheduleNotification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableUserProfileNotification','NotificationSettings.MailNotificationSettings.EnableUserProfileNotification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableResourceShareNotification','NotificationSettings.MailNotificationSettings.EnableResourceShareNotification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableUserSynchronizationNotification','NotificationSettings.MailNotificationSettings.EnableUserSynchronizationNotification',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,'TenantName','UserDirectory.Azure.TenantName',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,'ClientId','UserDirectory.Azure.ClientId',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (4,'ClientKey','UserDirectory.Azure.ClientSecret',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'ServerType','UserDirectory.Database.DatabaseType',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'ServerName','UserDirectory.Database.ServerName',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'UserName','UserDirectory.Database.Username',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'Password','UserDirectory.Database.Password',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'DatabaseName','UserDirectory.Database.DatabaseName',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'AuthenticationType','UserDirectory.Database.Authentication',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'DSN','UserDirectory.Database.DSN',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (5,'Port','UserDirectory.Database.Port',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'FullName','Payments.BillingAddress.Name',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'Email','Payments.BillingAddress.Email',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'AddressLine1','Payments.BillingAddress.AddressLine1',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'AddressLine2','Payments.BillingAddress.AddressLine2',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'City','Payments.BillingAddress.City',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'State','Payments.BillingAddress.State',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'Country','Payments.BillingAddress.Country',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (6,'ZipCode','Payments.BillingAddress.ZipCode',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'FullName','Payments.BillingAddress.Name',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'Email','Payments.BillingAddress.Email',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'Address1','Payments.BillingAddress.AddressLine1',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'Address2','Payments.BillingAddress.AddressLine2',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'City','Payments.BillingAddress.City',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'State','Payments.BillingAddress.State',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'Country','Payments.BillingAddress.Country',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (7,'ZipCode','Payments.BillingAddress.ZipCode',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,'IsEnabled','UserDirectory.Azure.Schedule.IsEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,'RecurrenceType','UserDirectory.Azure.Schedule.RecurrenceType',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,'RecurrenceInfo','UserDirectory.Azure.Schedule.Recurrence',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (8,'StartDateString','UserDirectory.Azure.Schedule.Time',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,'IsEnabled','UserDirectory.Database.Schedule.IsEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,'RecurrenceType','UserDirectory.Database.Schedule.RecurrenceType',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,'RecurrenceInfo','UserDirectory.Database.Schedule.Recurrence',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (9,'StartDateString','UserDirectory.Database.Schedule.Time',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'Subscription','Subscription',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'NotificationSettings','NotificationSettings',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.Azure.Schedule','UserDirectory.Azure.Schedule',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.Database.Schedule','UserDirectory.Database.Schedule',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.Azure','UserDirectory.Azure',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'SystemSettings','SystemSettings',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.Database','UserDirectory.Database',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'DashboardSettings','DashboardSettings',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'DashboardSettings.PublicDashboards','DashboardSettings.PublicDashboards',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'ConciergeSupport.ResourceAccess','ConciergeSupport.ResourceAccess',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'ConciergeSupport','ConciergeSupport',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'Payments','Payments',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'Payments.Card','Payments.Card',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'Payments.BillingAddress','Payments.BillingAddress',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'Subscription','Subscription',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'Subscription.Plan','Subscription.Plan',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'SiteSettings','SiteSettings',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.OAuth2','UserDirectory.OAuth2',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.OpenIDConnect','UserDirectory.OpenIDConnect',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.AuthControl','UserDirectory.AuthControl',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'DashboardSettings.UsageAnalytics','DashboardSettings.UsageAnalytics',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'Contact','Contact',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'CreatedDate','CreatedDate',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'DisplayName','DisplayName',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'Email','Email',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'Username','Username',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'FirstName','FirstName',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'IsActivated','IsActivated',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'IsActive','IsActive',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'IsDeleted','IsDeleted',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'LastLogin','LastLogin',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'LastName','LastName',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'ModifiedDate','ModifiedDate',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'Picture','Picture',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'Password','Password',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'PasswordChangedDate','PasswordChangedDate',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'DirectoryTypeId','DirectoryTypeId',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'IdPReferenceId','IdPReferenceId',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'ExternalProviderId','ExternalProviderId',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'CanSync','CanSync',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (11,'IsCloseRequest','IsCloseRequest',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'UserPermissionsManagement','Manage User Permissions',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'ConciergeSupportIncidents','Concierge Support Incidents',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'ViewConciergeSupportIncident','View Concierge Support Incident',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'UserConnectedAccounts','User Connected Accounts',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'UserProfile','User Profile',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'UserPermission','User Permission',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'AzureUserImport','Azure AD User Import',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'DatabaseUserImport','Database User Import',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'UserManagementIndex','User Management',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'DatabaseUsersSynchronization','Database users Synchronization',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'AzureUsersSynchronization','Azure AD users Synchronization',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'CsvUserImport','CSV User Import',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'UserManagementProfile','User Management Profile',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'User','User',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'Users','Users',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'CsvUsers','CSV Users',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'UserActiveStatus','User Active Status',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'DatabaseUsers','Database Users',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'AzureUsers','Azure Users',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'HomepageInProfile','Homepage in User Profile',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'DefaultHomepage','Default Homepage of User',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'UserProfilePicture','User Profile Picture',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'ProfileNotificationSettings','Notification Settings in Profile',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'UserPassword','User Password',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'UserDashboardSettings','Dashboard Settings in Profile',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,'EnableAutoWatchOfCommentsOfAccessibleItems','Auto Watch Of Comments Of Accessible Items',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,'EnableAutoWatchOfCommentsOfCreatedItems','Auto Watch Of Comments Of Created Items',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,'EnableMailNotification','Mail Notification',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,'EnableSystemNotification','System Notification',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'Group','Group',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'Color','Color',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'Description','Description',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'IsActive','IsActive',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'ModifiedDate','ModifiedDate',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'Name','Name',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'DirectoryTypeId','DirectoryTypeId',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'ExternalProviderId','ExternalProviderId',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'Groups','Groups',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'AzureGroups','Azure Groups',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'OAuthGroups','OAuth Group Import',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'OpenIDGroups','OpenID Group Import',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'AzureADGroup','Azure AD groups Synchronization',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'AzureADGroupImport','Azure AD Group Import',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'Group','Group Management',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'ViewGroup','Group Detail',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'EditGroup','Edit Group',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'GroupPermission','Group Permission',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,'Username','UserDirectory.Windows.Username',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,'Password','UserDirectory.Windows.Password',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,'LDAP URL','UserDirectory.Windows.LDAP URL',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,'Distinguished Name','UserDirectory.Windows.Distinguished Name',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,'Enable SSL','UserDirectory.Windows.Enable SSL',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (17,'Port Number','UserDirectory.Windows.Port Number',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,'IsEnabled','UserDirectory.Windows.Schedule.IsEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,'RecurrenceType','UserDirectory.Windows.Schedule.RecurrenceType',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,'RecurrenceInfo','UserDirectory.Windows.Schedule.Recurrence',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (18,'StartDateString','UserDirectory.Windows.Schedule.Time',NOW(),1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.Windows.Schedule','UserDirectory.Windows.Schedule',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'UserDirectory.Windows','UserDirectory.Windows',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'WindowsUserImport','Windows AD User Import',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (12,'WindowsUsersSynchronization','Windows AD users Synchronization',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,'WindowsUsers','Windows Users',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (15,'WindowsGroups','Windows Groups',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'WindowsADGroup','Windows AD groups Synchronization',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (16,'WindowsADGroupImport','Windows AD Group Import',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'DashboardSettings.DefaultViews','DashboardSettings.DefaultViews',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'DashboardSettings.AutosaveFilter','DashboardSettings.AutosaveFilter',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'DashboardSettings.Theming','DashboardSettings.Theming',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,'DashboardSettings.IsolationCode','DashboardSettings.IsolationCode',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,'EmbedSettings','EmbedSettings',NOW(),1)
;

INSERT INTO {database_name}.BOLDBI_NotificationEvents (Name, IsActive) VALUES (N'Time Drive Dashboard Export',1)
;
INSERT INTO {database_name}.BOLDBI_NotificationEvents (Name, IsActive) VALUES (N'Alert Drive Dashboard Export',1)
;

INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'Schedule Name',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'Schedule Id',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'Dashboard Id',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'Dashboard Name',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'Message',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'File Content',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'File Extension',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'Export Format',1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) VALUES (N'Alert Info',1)
;

INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,1,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,2,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,3,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,4,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,5,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,6,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,7,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (1,8,1)
;

INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,1,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,2,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,3,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,4,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,5,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,6,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,7,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,8,1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) VALUES (2,9,1)
;

INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Image',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'PDF',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'PPT',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Excel',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'CSV',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'View Underlying Data',NULL,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Dashboard Parameters',NULL,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,1,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,1,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,1,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,2,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,2,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,2,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,3,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,3,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,3,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,4,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,4,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,4,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,5,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,5,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,5,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,6,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,6,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,6,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,7,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,7,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,7,1)
;

-- -- PASTE ALTER Queries below this section --------

ALTER TABLE  {database_name}.BOLDBI_PublishJobs  ADD FOREIGN KEY(Type) REFERENCES {database_name}.BOLDBI_PublishType (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ScheduleMissingLogs  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_ScheduleDetail (ScheduleId)
;

ALTER TABLE  {database_name}.BOLDBI_UserGroup  ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserGroup  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserLogin  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserPreference ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_Item  ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_Item  ADD FOREIGN KEY(ParentId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_Item  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_Item  ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ItemView  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemView  ADD FOREIGN KEY(ItemViewId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemView  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ItemTrash  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemTrash  ADD FOREIGN KEY(TrashedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ItemTrashDeleted  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemTrashDeleted  ADD FOREIGN KEY(ItemTrashId) REFERENCES {database_name}.BOLDBI_ItemTrash (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemTrashDeleted  ADD FOREIGN KEY(DeletedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ItemVersion  ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemVersion  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemVersion  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(ItemVersionId) REFERENCES {database_name}.BOLDBI_ItemVersion (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(ItemLogTypeId) REFERENCES {database_name}.BOLDBI_ItemLogType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(ParentId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(FromCategoryId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(ToCategoryId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(UpdatedUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemLog  ADD FOREIGN KEY(SourceTypeId) REFERENCES {database_name}.BOLDBI_Source (Id)
;

ALTER TABLE  {database_name}.BOLDBI_PermissionEntity  ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserPermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserPermission  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserPermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserPermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

ALTER TABLE  {database_name}.BOLDBI_GroupPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupPermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupPermission  ADD  FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupPermission ADD  FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupPermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ScheduleDetail  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleDetail  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleDetail  ADD FOREIGN KEY(RecurrenceTypeId) REFERENCES {database_name}.BOLDBI_RecurrenceType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleDetail  ADD FOREIGN KEY(ExportTypeId) REFERENCES {database_name}.BOLDBI_ExportType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleDetail  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleDetail  ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_SubscribedUser  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SubscribedUser  ADD FOREIGN KEY(SubscribedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SubscribedUser  ADD FOREIGN KEY(RecipientUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_SubscribedGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SubscribedGroup  ADD FOREIGN KEY(SubscribedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SubscribedGroup  ADD FOREIGN KEY(RecipientGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
	
ALTER TABLE  {database_name}.BOLDBI_SubscrExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SubscrExtnRecpt  ADD FOREIGN KEY(SubscribedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ScheduleLogUser  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.BOLDBI_ScheduleStatus (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleLogUser  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleLogUser  ADD FOREIGN KEY(DeliveredUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.BOLDBI_ScheduleStatus (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleLogGroup  ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleLogGroup  ADD FOREIGN KEY(DeliveredUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
	
ALTER TABLE  {database_name}.BOLDBI_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.BOLDBI_ScheduleStatus (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ScheduleLog  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.BOLDBI_ScheduleStatus (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ScheduleLog  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_Comment ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_Comment ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_Comment ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_Comment ADD FOREIGN KEY(ParentItemId) REFERENCES {database_name}.BOLDBI_Item (Id) 
;
 
ALTER TABLE  {database_name}.BOLDBI_ItemWatch ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemWatch ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemWatch ADD FOREIGN KEY(ParentItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_Homepage  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ItemCommentLog  ADD FOREIGN KEY(CurrentUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemCommentLog  ADD FOREIGN KEY(ItemCommentLogTypeId) REFERENCES {database_name}.BOLDBI_ItemCommentLogType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemCommentLog  ADD FOREIGN KEY(CommentId) REFERENCES {database_name}.BOLDBI_Comment (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemCommentLog  ADD FOREIGN KEY(RepliedFor) REFERENCES {database_name}.BOLDBI_Comment (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemCommentLog  ADD FOREIGN KEY(NotificationTo) REFERENCES {database_name}.BOLDBI_User (Id)
;
	
ALTER TABLE  {database_name}.BOLDBI_FavoriteItem  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_FavoriteItem  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_DashboardWidget  ADD FOREIGN KEY(DashboardItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_DashboardWidget  ADD FOREIGN KEY(WidgetItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_DashboardDataSource  ADD FOREIGN KEY(DashboardItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_DashboardDataSource  ADD FOREIGN KEY(DataSourceItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_HomepageItemFilter  ADD FOREIGN KEY(HomepageId) REFERENCES {database_name}.BOLDBI_Homepage (Id)
;

ALTER TABLE  {database_name}.BOLDBI_PermissionAccEntity  ADD FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_PermissionAccEntity  ADD FOREIGN KEY(PermissionAccessId) REFERENCES {database_name}.BOLDBI_PermissionAccess (Id)
;
ALTER TABLE  {database_name}.BOLDBI_CustomExpression  ADD FOREIGN KEY(DashboardId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_CustomExpression  ADD FOREIGN KEY(WidgetId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_CustomExpression  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_SlideshowInfo  ADD FOREIGN KEY(SlideshowId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserPermissionLog  ADD  FOREIGN KEY(LogTypeId) REFERENCES {database_name}.BOLDBI_PermissionLogType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserPermissionLog  ADD  FOREIGN KEY(UserPermissionId) REFERENCES {database_name}.BOLDBI_UserPermission (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserPermissionLog  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserPermissionLog  ADD  FOREIGN KEY(AffectedUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_GroupPermissionLog  ADD  FOREIGN KEY(LogTypeId) REFERENCES {database_name}.BOLDBI_PermissionLogType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupPermissionLog  ADD  FOREIGN KEY(GroupPermissionId) REFERENCES {database_name}.BOLDBI_GroupPermission (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupPermissionLog  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupPermissionLog  ADD  FOREIGN KEY(AffectedGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;

ALTER TABLE  {database_name}.BOLDBI_SystemLog  ADD CONSTRAINT FK_SystemLog_SystemLogTypeId FOREIGN KEY(SystemLogTypeId) REFERENCES {database_name}.BOLDBI_SystemLogType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SystemLog  ADD CONSTRAINT FK_SystemLog_UpdatedUserId FOREIGN KEY(UpdatedUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_SystemLog  ADD CONSTRAINT FK_SystemLog_LogStatusId FOREIGN KEY(LogStatusId) REFERENCES {database_name}.BOLDBI_LogStatus (Id)
;

ALTER TABLE  {database_name}.BOLDBI_LogField  ADD CONSTRAINT FK_LogField_ModuleId FOREIGN KEY(ModuleId) REFERENCES {database_name}.BOLDBI_LogModule (Id)
;

ALTER TABLE  {database_name}.BOLDBI_SystemLog  ADD CONSTRAINT FK_SystemLog_LogFieldId FOREIGN KEY(LogFieldId) REFERENCES {database_name}.BOLDBI_LogField (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserLog  ADD CONSTRAINT FK_UserLog_UserLogTypeId FOREIGN KEY(UserLogTypeId) REFERENCES {database_name}.BOLDBI_UserLogType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserLog  ADD CONSTRAINT FK_UserLog_TargetUserId FOREIGN KEY(TargetUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserLog  ADD CONSTRAINT FK_UserLog_CurrentUserId FOREIGN KEY(CurrentUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserLog  ADD CONSTRAINT FK_UserLog_SourceTypeId FOREIGN KEY(SourceTypeId) REFERENCES {database_name}.BOLDBI_Source (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserLog  ADD CONSTRAINT FK_UserLog_LogStatusId FOREIGN KEY(LogStatusId) REFERENCES {database_name}.BOLDBI_LogStatus (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserLog  ADD CONSTRAINT FK_UserLog_LogFieldId FOREIGN KEY(LogFieldId) REFERENCES {database_name}.BOLDBI_LogField (Id)
;

ALTER TABLE  {database_name}.BOLDBI_GroupLog  ADD CONSTRAINT FK_GroupLog_GroupLogTypeId FOREIGN KEY(GroupLogTypeId) REFERENCES {database_name}.BOLDBI_GroupLogType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupLog  ADD CONSTRAINT FK_GroupLog_TargetGroupId FOREIGN KEY(TargetGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupLog  ADD CONSTRAINT FK_GroupLog_CurrentUserId FOREIGN KEY(CurrentUserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupLog  ADD CONSTRAINT FK_GroupLog_SourceTypeId FOREIGN KEY(SourceTypeId) REFERENCES {database_name}.BOLDBI_Source (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupLog  ADD CONSTRAINT FK_GroupLog_LogStatusId FOREIGN KEY(LogStatusId) REFERENCES {database_name}.BOLDBI_LogStatus (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupLog  ADD CONSTRAINT FK_GroupLog_LogFieldId FOREIGN KEY(LogFieldId) REFERENCES {database_name}.BOLDBI_LogField (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemSettings ADD CONSTRAINT FK_ItemSettings_ItemId FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemUserPreference  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ItemUserPreference  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_DeploymentDashboards  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_DeploymentDashboards  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE  {database_name}.BOLDBI_PublishedItem  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_PublishedItem  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_PublishJobs  ADD FOREIGN KEY(PublishId) REFERENCES {database_name}.BOLDBI_PublishedItem (Id)
;
ALTER TABLE  {database_name}.BOLDBI_PublishJobs  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ExternalSites  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserAttributes ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserAttributes ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserAttributes ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupAttributes ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupAttributes ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupAttributes ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.BOLDBI_User (Id)
;

ALTER TABLE  {database_name}.BOLDBI_DataNotification  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_DataNotification  ADD FOREIGN KEY(DataSourceId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserDataNotification  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_Item (Id)
;

ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD  FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD FOREIGN KEY(CommentId) REFERENCES {database_name}.BOLDBI_Comment (Id)
;

ALTER TABLE {database_name}.BOLDBI_WebhookLog  ADD FOREIGN KEY(WebhookId) REFERENCES {database_name}.BOLDBI_Webhook (Id)
;
ALTER TABLE {database_name}.BOLDBI_NotificationTrigger  ADD FOREIGN KEY(WebhookId) REFERENCES {database_name}.BOLDBI_Webhook (Id)
;

ALTER TABLE {database_name}.BOLDBI_EventPayloadsMapping ADD FOREIGN KEY(EventType) REFERENCES {database_name}.BOLDBI_NotificationEvents (Id)
;

ALTER TABLE {database_name}.BOLDBI_EventPayloadsMapping ADD FOREIGN KEY(PayloadType) REFERENCES {database_name}.BOLDBI_EventPayloads (Id)
;

ALTER TABLE  {database_name}.BOLDBI_ResourceFeatureAccEntity  ADD FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ResourceFeatureAccEntity  ADD FOREIGN KEY(ResourceFeatureAccessId) REFERENCES {database_name}.BOLDBI_ResourceFeatureAccess (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission ADD  FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

CREATE INDEX IX_BOLDBI_ScheduleDetail_ScheduleId ON {database_name}.BOLDBI_ScheduleDetail (ScheduleId);

CREATE INDEX IX_BOLDBI_ScheduleLog_ScheduleId ON {database_name}.BOLDBI_ScheduleLog (ScheduleId, ExecutedDate, ScheduleStatusId);

CREATE INDEX IX_BOLDBI_Item ON {database_name}.BOLDBI_Item (IsActive, ItemTypeId, ParentId, IsDraft, CreatedById, CreatedDate);

CREATE INDEX IX_BOLDBI_UserPermission ON {database_name}.BOLDBI_UserPermission (IsActive, UserId, ItemId, PermissionEntityId, PermissionAccessId);

-- ========================
-- Preserve existing indexes from source script
-- ========================
--  use boldbi
SET @x = (SELECT COUNT(*) FROM information_schema.statistics
          WHERE table_schema = DATABASE() AND table_name='boldbi_scheduledetail' AND index_name='IX_BOLDBI_ScheduleDetail_ScheduleId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleDetail_ScheduleId` ON boldbi_scheduledetail (scheduleid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics
          WHERE table_schema = DATABASE() AND table_name='boldbi_schedulelog' AND index_name='IX_BOLDBI_ScheduleLog_ScheduleId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleLog_ScheduleId` ON boldbi_schedulelog (scheduleid, executeddate, schedulestatusid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics
          WHERE table_schema = DATABASE() AND table_name='boldbi_item' AND index_name='IX_BOLDBI_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Item` ON boldbi_item (isactive, itemtypeid, parentid, isdraft, createdbyid, createddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Users, Groups, Membership
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_user' AND index_name='IX_BOLDBI_User_Email');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_User_Email` ON boldbi_user (email)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_user' AND index_name='IX_BOLDBI_User_Username');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_User_Username` ON boldbi_user (username)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_user' AND index_name='IX_BOLDBI_User_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_User_IsActive` ON boldbi_user (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userlogin' AND index_name='IX_BOLDBI_UserLogin_UserId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserLogin_UserId` ON boldbi_userlogin (userid, loggedintime)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userpreference' AND index_name='IX_BOLDBI_UserPreference_UserId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserPreference_UserId` ON boldbi_userpreference (userid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_group' AND index_name='IX_BOLDBI_Group_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Group_IsActive` ON boldbi_group (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_usergroup' AND index_name='IX_BOLDBI_UserGroup_GroupId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserGroup_GroupId` ON boldbi_usergroup (groupid, userid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_usergroup' AND index_name='IX_BOLDBI_UserGroup_UserId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserGroup_UserId` ON boldbi_usergroup (userid, groupid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Item catalog, hierarchy, views, versions, trash
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_item' AND index_name='IX_BOLDBI_Item_ParentId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Item_ParentId` ON boldbi_item (parentid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_item' AND index_name='IX_BOLDBI_Item_CreatedById');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Item_CreatedById` ON boldbi_item (createdbyid, createddate, itemtypeid, isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_item' AND index_name='IX_BOLDBI_Item_ModifiedById');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Item_ModifiedById` ON boldbi_item (modifiedbyid, modifieddate, itemtypeid, isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_item' AND index_name='IX_BOLDBI_Item_ItemType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Item_ItemType_IsActive` ON boldbi_item (itemtypeid, isactive, name, parentid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemview' AND index_name='IX_BOLDBI_ItemView_ItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemView_ItemId` ON boldbi_itemview (itemid, userid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemview' AND index_name='IX_BOLDBI_ItemView_UserId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemView_UserId` ON boldbi_itemview (userid, itemid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemtrash' AND index_name='IX_BOLDBI_ItemTrash_ItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemTrash_ItemId` ON boldbi_itemtrash (itemid, trashedbyid, trasheddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemtrashdeleted' AND index_name='IX_BOLDBI_ItemTrashDeleted_ItemTrashId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemTrashDeleted_ItemTrashId` ON boldbi_itemtrashdeleted (itemtrashid, itemid, deletedbyid, deleteddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemversion' AND index_name='IX_BOLDBI_ItemVersion_ItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemVersion_ItemId` ON boldbi_itemversion (itemid, iscurrentversion, versionnumber, createddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemversion' AND index_name='IX_BOLDBI_ItemVersion_Item_Version');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemVersion_Item_Version` ON boldbi_itemversion (itemid, versionnumber)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Permissions
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userpermission' AND index_name='IX_BOLDBI_UserPermission_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserPermission_User` ON boldbi_userpermission (userid, isactive, permissionentityid, permissionaccessid, itemid, itemtypeid, settingstypeid, scopegroupid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userpermission' AND index_name='IX_BOLDBI_UserPermission_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserPermission_Item` ON boldbi_userpermission (itemid, isactive, userid, permissionentityid, permissionaccessid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_grouppermission' AND index_name='IX_BOLDBI_GroupPermission_Group');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupPermission_Group` ON boldbi_grouppermission (groupid, isactive, permissionentityid, permissionaccessid, itemid, itemtypeid, settingstypeid, scopegroupid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_grouppermission' AND index_name='IX_BOLDBI_GroupPermission_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupPermission_Item` ON boldbi_grouppermission (itemid, isactive, groupid, permissionentityid, permissionaccessid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_permissionentity' AND index_name='IX_BOLDBI_PermissionEntity_ItemType');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PermissionEntity_ItemType` ON boldbi_permissionentity (itemtypeid, entitytype, name, isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_permissionaccentity' AND index_name='IX_BOLDBI_PermissionAccEntity_PermissionEntityId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PermissionAccEntity_PermissionEntityId` ON boldbi_permissionaccentity (permissionentityid, permissionaccessid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_permissionaccentity' AND index_name='IX_BOLDBI_PermissionAccEntity_PermissionAccessId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PermissionAccEntity_PermissionAccessId` ON boldbi_permissionaccentity (permissionaccessid, permissionentityid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Scheduling & Subscriptions
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_scheduledetail' AND index_name='IX_BOLDBI_ScheduleDetail_ItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleDetail_ItemId` ON boldbi_scheduledetail (itemid, scheduleid, name, isenabled, nextschedule, recurrencetypeid, exporttypeid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_scheduledetail' AND index_name='IX_BOLDBI_ScheduleDetail_IsEnabled_Next');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleDetail_IsEnabled_Next` ON boldbi_scheduledetail (isenabled, nextschedule, scheduleid, itemid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_subscribeduser' AND index_name='IX_BOLDBI_SubscribedUser_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SubscribedUser_Schedule` ON boldbi_subscribeduser (scheduleid, recipientuserid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_subscribeduser' AND index_name='IX_BOLDBI_SubscribedUser_Recipient');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SubscribedUser_Recipient` ON boldbi_subscribeduser (recipientuserid, scheduleid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_subscribedgroup' AND index_name='IX_BOLDBI_SubscribedGroup_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SubscribedGroup_Schedule` ON boldbi_subscribedgroup (scheduleid, recipientgroupid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_subscribedgroup' AND index_name='IX_BOLDBI_SubscribedGroup_Recipient');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SubscribedGroup_Recipient` ON boldbi_subscribedgroup (recipientgroupid, scheduleid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_subscrextnrecpt' AND index_name='IX_BOLDBI_SubscrExtnRecpt_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SubscrExtnRecpt_Schedule` ON boldbi_subscrextnrecpt (scheduleid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_schedulemissinglogs' AND index_name='IX_BOLDBI_ScheduleMissingLogs_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleMissingLogs_Schedule` ON boldbi_schedulemissinglogs (scheduleid, startdate, enddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_scheduleloguser' AND index_name='IX_BOLDBI_ScheduleLogUser_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleLogUser_Schedule` ON boldbi_scheduleloguser (scheduleid, schedulestatusid, delivereddate, delivereduserid, isondemand)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_scheduleloggroup' AND index_name='IX_BOLDBI_ScheduleLogGroup_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleLogGroup_Schedule` ON boldbi_scheduleloggroup (scheduleid, schedulestatusid, delivereddate, groupid, delivereduserid, isondemand)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_schdlogextnrecpt' AND index_name='IX_BOLDBI_SchdLogExtnRecpt_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SchdLogExtnRecpt_Schedule` ON boldbi_schdlogextnrecpt (scheduleid, schedulestatusid, delivereddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_schedulerunhistory' AND index_name='IX_BOLDBI_ScheduleRunHistory_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleRunHistory_Schedule` ON boldbi_schedulerunhistory (scheduleid, starteddate DESC, schedulestatusid, isondemand, message(255))', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Comments & interactions
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_comment' AND index_name='IX_BOLDBI_Comment_ItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Comment_ItemId` ON boldbi_comment (itemid, createddate DESC, userid, parentid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_comment' AND index_name='IX_BOLDBI_Comment_ParentId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Comment_ParentId` ON boldbi_comment (parentid, createddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemcommentlog' AND index_name='IX_BOLDBI_ItemCommentLog_CommentId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemCommentLog_CommentId` ON boldbi_itemcommentlog (commentid, itemcommentlogtypeid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemcommentlog' AND index_name='IX_BOLDBI_ItemCommentLog_CurrentUserId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemCommentLog_CurrentUserId` ON boldbi_itemcommentlog (currentuserid, commentid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemwatch' AND index_name='IX_BOLDBI_ItemWatch_ItemUser');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemWatch_ItemUser` ON boldbi_itemwatch (itemid, userid, iswatched)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_favoriteitem' AND index_name='IX_BOLDBI_FavoriteItem_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_FavoriteItem_User` ON boldbi_favoriteitem (userid, itemid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Widgets, Data Sources, Multi-Tab Dashboards
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_dashboardwidget' AND index_name='IX_BOLDBI_DashboardWidget_DashboardItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_DashboardWidget_DashboardItemId` ON boldbi_dashboardwidget (dashboarditemid, widgetitemid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_dashboardwidget' AND index_name='IX_BOLDBI_DashboardWidget_WidgetItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_DashboardWidget_WidgetItemId` ON boldbi_dashboardwidget (widgetitemid, dashboarditemid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_dashboarddatasource' AND index_name='IX_BOLDBI_DashboardDataSource_Dashboard');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_DashboardDataSource_Dashboard` ON boldbi_dashboarddatasource (dashboarditemid, datasourceitemid, versionnumber)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_dashboarddatasource' AND index_name='IX_BOLDBI_DashboardDataSource_DataSource');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_DashboardDataSource_DataSource` ON boldbi_dashboarddatasource (datasourceitemid, dashboarditemid, versionnumber)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_multitabdashboard' AND index_name='IX_BOLDBI_MultiTabDashboard_Parent');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_MultiTabDashboard_Parent` ON boldbi_multitabdashboard (parentdashboardid, ordernumber, childdashboardid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_multitabdashboard' AND index_name='IX_BOLDBI_MultiTabDashboard_Child');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_MultiTabDashboard_Child` ON boldbi_multitabdashboard (childdashboardid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Publishing & Deployment
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_publisheditem' AND index_name='IX_BOLDBI_PublishedItem_ItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PublishedItem_ItemId` ON boldbi_publisheditem (itemid, isactive, destinationitemid, publishtype, createddate, externalsiteid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_publishjobs' AND index_name='IX_BOLDBI_PublishJobs_PublishId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PublishJobs_PublishId` ON boldbi_publishjobs (publishid, status, createddate, completeddate, type)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_deploymentdashboards' AND index_name='IX_BOLDBI_DeploymentDashboards_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_DeploymentDashboards_Item` ON boldbi_deploymentdashboards (itemid, createdbyid, createddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Auditing & System Logs
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemlog' AND index_name='IX_BOLDBI_ItemLog_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemLog_Item` ON boldbi_itemlog (itemid, modifieddate DESC, itemlogtypeid, itemversionid, updateduserid, sourcetypeid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemlog' AND index_name='IX_BOLDBI_ItemLog_Version');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemLog_Version` ON boldbi_itemlog (itemversionid, modifieddate DESC)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userlog' AND index_name='IX_BOLDBI_UserLog_Target');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserLog_Target` ON boldbi_userlog (targetuserid, createddate DESC, userlogtypeid, sourcetypeid, logstatusid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_grouplog' AND index_name='IX_BOLDBI_GroupLog_Target');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupLog_Target` ON boldbi_grouplog (targetgroupid, createddate DESC, grouplogtypeid, sourcetypeid, logstatusid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userpermissionlog' AND index_name='IX_BOLDBI_UserPermissionLog_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserPermissionLog_User` ON boldbi_userpermissionlog (userid, createddate DESC, affecteduserid, logtypeid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userpermissionlog' AND index_name='IX_BOLDBI_UserPermissionLog_Affected');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserPermissionLog_Affected` ON boldbi_userpermissionlog (affecteduserid, createddate DESC, userid, logtypeid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_grouppermissionlog' AND index_name='IX_BOLDBI_GroupPermissionLog_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupPermissionLog_User` ON boldbi_grouppermissionlog (userid, createddate DESC, affectedgroupid, logtypeid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_grouppermissionlog' AND index_name='IX_BOLDBI_GroupPermissionLog_Affected');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupPermissionLog_Affected` ON boldbi_grouppermissionlog (affectedgroupid, createddate DESC, userid, logtypeid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_systemlog' AND index_name='IX_BOLDBI_SystemLog_TypeStatusTime');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SystemLog_TypeStatusTime` ON boldbi_systemlog (systemlogtypeid, logstatusid, createddate DESC)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Notifications, Email, Webhooks
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_emailactivitylog' AND index_name='IX_BOLDBI_EmailActivityLog_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_EmailActivityLog_User` ON boldbi_emailactivitylog (userid, createddate DESC, status, recipientemail, mailsubject)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_emailactivitylog' AND index_name='IX_BOLDBI_EmailActivityLog_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_EmailActivityLog_Item` ON boldbi_emailactivitylog (itemid, createddate DESC, status, recipientemail, event)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_notification' AND index_name='IX_BOLDBI_Notification_CurrentUser');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Notification_CurrentUser` ON boldbi_notification (currentuserid, isread, modifieddate DESC, itemid, commentid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_notification' AND index_name='IX_BOLDBI_Notification_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Notification_Item` ON boldbi_notification (itemid, modifieddate DESC, currentuserid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_webhook' AND index_name='IX_BOLDBI_Webhook_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Webhook_User` ON boldbi_webhook (userid, isenable, isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_notificationtrigger' AND index_name='IX_BOLDBI_NotificationTrigger_Webhook');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_NotificationTrigger_Webhook` ON boldbi_notificationtrigger (webhookid, nextscheduledate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_webhooklog' AND index_name='IX_BOLDBI_WebhookLog_Webhook');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_WebhookLog_Webhook` ON boldbi_webhooklog (webhookid, createddate DESC, event(191), responsestatuscode)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Directory / Auth / Config
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_azureadcredential' AND index_name='IX_BOLDBI_AzureADCredential_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_AzureADCredential_IsActive` ON boldbi_azureadcredential (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_adcredential' AND index_name='IX_BOLDBI_ADCredential_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ADCredential_IsActive` ON boldbi_adcredential (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_samlsettings' AND index_name='IX_BOLDBI_SAMLSettings_IsEnabled');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SAMLSettings_IsEnabled` ON boldbi_samlsettings (isenabled)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_systemsettings' AND index_name='IX_BOLDBI_SystemSettings_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SystemSettings_IsActive` ON boldbi_systemsettings (isactive, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_serverversion' AND index_name='IX_BOLDBI_ServerVersion_VersionNumber');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ServerVersion_VersionNumber` ON boldbi_serverversion (versionnumber)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Customization & Expressions
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_customexpression' AND index_name='IX_BOLDBI_CustomExpression_Dashboard');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_CustomExpression_Dashboard` ON boldbi_customexpression (dashboardid, widgetid, userid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_customexpression' AND index_name='IX_BOLDBI_CustomExpression_Widget');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_CustomExpression_Widget` ON boldbi_customexpression (widgetid, dashboardid, userid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_customexpression' AND index_name='IX_BOLDBI_CustomExpression_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_CustomExpression_User` ON boldbi_customexpression (userid, dashboardid, widgetid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Data Notification & Relations
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_datanotification' AND index_name='IX_BOLDBI_DataNotification_Schedule');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_DataNotification_Schedule` ON boldbi_datanotification (scheduleid, datasourceid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_datanotification' AND index_name='IX_BOLDBI_DataNotification_DataSource');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_DataNotification_DataSource` ON boldbi_datanotification (datasourceid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_tablerelation' AND index_name='IX_BOLDBI_TableRelation_Left');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_TableRelation_Left` ON boldbi_tablerelation (lefttablename, lefttableschema, lefttablecolumnname)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_tablerelation' AND index_name='IX_BOLDBI_TableRelation_Right');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_TableRelation_Right` ON boldbi_tablerelation (righttablename, righttableschema, righttablecolumnname)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Homepage & Preferences
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_homepage' AND index_name='IX_BOLDBI_Homepage_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Homepage_User` ON boldbi_homepage (userid, isdefaulthomepage)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_homepageitemfilter' AND index_name='IX_BOLDBI_HomepageItemFilter_HomepageId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_HomepageItemFilter_HomepageId` ON boldbi_homepageitemfilter (homepageid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemsettings' AND index_name='IX_BOLDBI_ItemSettings_ItemId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemSettings_ItemId` ON boldbi_itemsettings (itemid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemuserpreference' AND index_name='IX_BOLDBI_ItemUserPreference_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemUserPreference_Item` ON boldbi_itemuserpreference (itemid, userid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemuserpreference' AND index_name='IX_BOLDBI_ItemUserPreference_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemUserPreference_User` ON boldbi_itemuserpreference (userid, itemid, modifieddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Attributes & Site settings
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userattributes' AND index_name='IX_BOLDBI_UserAttributes_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserAttributes_User` ON boldbi_userattributes (userid, name)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_groupattributes' AND index_name='IX_BOLDBI_GroupAttributes_Group');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupAttributes_Group` ON boldbi_groupattributes (groupid, name)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_siteattributes' AND index_name='IX_BOLDBI_SiteAttributes_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SiteAttributes_IsActive` ON boldbi_siteattributes (isactive, name)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- External sites & settings
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_externalsites' AND index_name='IX_BOLDBI_ExternalSites_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ExternalSites_IsActive` ON boldbi_externalsites (isactive, name)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_settingstype' AND index_name='IX_BOLDBI_SettingsType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SettingsType_IsActive` ON boldbi_settingstype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Events, Payloads & Mapping
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_notificationevents' AND index_name='IX_BOLDBI_NotificationEvents_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_NotificationEvents_IsActive` ON boldbi_notificationevents (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_eventpayloads' AND index_name='IX_BOLDBI_EventPayloads_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_EventPayloads_IsActive` ON boldbi_eventpayloads (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_eventpayloadsmapping' AND index_name='IX_BOLDBI_EventPayloadsMapping_EventType');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_EventPayloadsMapping_EventType` ON boldbi_eventpayloadsmapping (eventtype, payloadtype)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_eventpayloadsmapping' AND index_name='IX_BOLDBI_EventPayloadsMapping_PayloadType');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_EventPayloadsMapping_PayloadType` ON boldbi_eventpayloadsmapping (payloadtype, eventtype)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- User sessions & background jobs
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_usersession' AND index_name='IX_BOLDBI_UserSession_Idp');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserSession_Idp` ON boldbi_usersession (idpreferenceid, sessionid, loggedintime, isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_usersession' AND index_name='IX_BOLDBI_UserSession_SessionId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserSession_SessionId` ON boldbi_usersession (sessionid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_backgroundjobs' AND index_name='IX_BOLDBI_BackgroundJobs_Status');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_BackgroundJobs_Status` ON boldbi_backgroundjobs (status, createddate, itemid, userid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Upload mapping
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_uploaddatasourcemapping' AND index_name='IX_BOLDBI_UploadDataSourceMapping_DownloadedTenant');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UploadDataSourceMapping_DownloadedTenant` ON boldbi_uploaddatasourcemapping (downloadedtenantid, uploadeditemid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_uploaddatasourcemapping' AND index_name='IX_BOLDBI_UploadDataSourceMapping_UploadedItem');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UploadDataSourceMapping_UploadedItem` ON boldbi_uploaddatasourcemapping (uploadeditemid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- AI / Metrics & Requests
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_dsmetrics' AND index_name='IX_BoldBI_DSMetrics_DS_Time');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BoldBI_DSMetrics_DS_Time` ON boldbi_dsmetrics (datasourceid, refreshstarttime, refreshstatus, rowsupdated, totalrows)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_ai_sessions' AND index_name='IX_BOLDBI_AI_SESSIONS_Time');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_AI_SESSIONS_Time` ON boldbi_ai_sessions (sessionstarttime DESC, sessionendtime, totaltokenscost, userinfo(191))', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_ai_chat' AND index_name='IX_BOLDBI_AI_CHAT_Session');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_AI_CHAT_Session` ON boldbi_ai_chat (sessionid(191), searchdatetime DESC, totaltokenscost, userinfo(191))', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_aicredentials' AND index_name='IX_BOLDBI_AICredentials_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_AICredentials_IsActive` ON boldbi_aicredentials (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_ai_requests' AND index_name='IX_BOLDBI_AI_REQUESTS_Session');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_AI_REQUESTS_Session` ON boldbi_ai_requests (sessionid, searchdate, datasourceid, aimodel)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- API Keys & Templates & QnA
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_apikeydetails' AND index_name='IX_BOLDBI_ApiKeyDetails_CreatedBy');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ApiKeyDetails_CreatedBy` ON boldbi_apikeydetails (createdby, isactive, lastuseddate)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_customemailtemplate' AND index_name='IX_BOLDBI_CustomEmailTemplate_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_CustomEmailTemplate_IsActive` ON boldbi_customemailtemplate (isactive, language, templateid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_ai_qnawidgethistory' AND index_name='IX_BoldBI_ai_qnawidgethistory_Widget');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BoldBI_ai_qnawidgethistory_Widget` ON boldbi_ai_qnawidgethistory (widgetid, search_date)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_ai_qnawidgethistory' AND index_name='IX_BoldBI_ai_qnawidgethistory_SearchDate');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BoldBI_ai_qnawidgethistory_SearchDate` ON boldbi_ai_qnawidgethistory (search_date)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;



-- ========================
-- Resource Feature Access & Permissions
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_resourcefeatureaccess' AND index_name='IX_BOLDBI_ResourceFeatureAccess_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ResourceFeatureAccess_IsActive` ON boldbi_resourcefeatureaccess (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_resourcefeatureaccentity' AND index_name='IX_BOLDBI_ResourceFeatureAccEntity_PermissionEntityId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ResourceFeatureAccEntity_PermissionEntityId` ON boldbi_resourcefeatureaccentity (permissionentityid, resourcefeatureaccessid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_resourcefeatureaccentity' AND index_name='IX_BOLDBI_ResourceFeatureAccEntity_ResourceFeatureAccessId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ResourceFeatureAccEntity_ResourceFeatureAccessId` ON boldbi_resourcefeatureaccentity (resourcefeatureaccessid, permissionentityid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userresourcefeaturepermission' AND index_name='IX_BOLDBI_UserResourceFeaturePermission_User');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserResourceFeaturePermission_User` ON boldbi_userresourcefeaturepermission (userid, itemid, permissionentityid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userresourcefeaturepermission' AND index_name='IX_BOLDBI_UserResourceFeaturePermission_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserResourceFeaturePermission_Item` ON boldbi_userresourcefeaturepermission (itemid, userid, permissionentityid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_groupresourcefeaturepermission' AND index_name='IX_BOLDBI_GroupResourceFeaturePermission_Group');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupResourceFeaturePermission_Group` ON boldbi_groupresourcefeaturepermission (groupid, itemid, permissionentityid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_groupresourcefeaturepermission' AND index_name='IX_BOLDBI_GroupResourceFeaturePermission_Item');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupResourceFeaturePermission_Item` ON boldbi_groupresourcefeaturepermission (itemid, groupid, permissionentityid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;


-- ========================
-- Type / Status (lookup) tables — per request
-- ========================
SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemtype' AND index_name='IX_BOLDBI_ItemType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemType_IsActive` ON boldbi_itemtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemlogtype' AND index_name='IX_BOLDBI_ItemLogType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemLogType_IsActive` ON boldbi_itemlogtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_recurrencetype' AND index_name='IX_BOLDBI_RecurrenceType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_RecurrenceType_IsActive` ON boldbi_recurrencetype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_exporttype' AND index_name='IX_BOLDBI_ExportType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ExportType_IsActive` ON boldbi_exporttype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_schedulestatus' AND index_name='IX_BOLDBI_ScheduleStatus_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ScheduleStatus_IsActive` ON boldbi_schedulestatus (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_itemcommentlogtype' AND index_name='IX_BOLDBI_ItemCommentLogType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ItemCommentLogType_IsActive` ON boldbi_itemcommentlogtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_permissionaccess' AND index_name='IX_BOLDBI_PermissionAccess_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PermissionAccess_IsActive` ON boldbi_permissionaccess (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_permissionlogtype' AND index_name='IX_BOLDBI_PermissionLogType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PermissionLogType_IsActive` ON boldbi_permissionlogtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_systemlogtype' AND index_name='IX_BOLDBI_SystemLogType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SystemLogType_IsActive` ON boldbi_systemlogtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_logstatus' AND index_name='IX_BOLDBI_LogStatus_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_LogStatus_IsActive` ON boldbi_logstatus (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_userlogtype' AND index_name='IX_BOLDBI_UserLogType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserLogType_IsActive` ON boldbi_userlogtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_grouplogtype' AND index_name='IX_BOLDBI_GroupLogType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_GroupLogType_IsActive` ON boldbi_grouplogtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_publishtype' AND index_name='IX_BOLDBI_PublishType_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_PublishType_IsActive` ON boldbi_publishtype (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_usertype' AND index_name='IX_BOLDBI_UserType_Type');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_UserType_Type` ON boldbi_usertype (type)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_conditioncategory' AND index_name='IX_BOLDBI_ConditionCategory_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_ConditionCategory_IsActive` ON boldbi_conditioncategory (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_source' AND index_name='IX_BOLDBI_Source_IsActive');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_Source_IsActive` ON boldbi_source (isactive)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name='boldbi_slideshowinfo' AND index_name='IX_BOLDBI_SlideshowInfo_SlideshowId');
SET @sql = IF(@x=0, 'CREATE INDEX `IX_BOLDBI_SlideshowInfo_SlideshowId` ON boldbi_slideshowinfo (slideshowid)', 'SELECT 1');
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

-- ========================
-- Filtered (optional) — comment out if not needed
-- ========================
SET @x = (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name   = 'boldbi_item'
    AND index_name   = 'IXF_BOLDBI_Item_IsActive'
);
SET @sql = IF(@x=0,
  'CREATE INDEX `IXF_BOLDBI_Item_IsActive`
     ON boldbi_item (itemtypeid, parentid, name, createddate)',
  'SELECT 1'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name   = 'boldbi_userpermission'
    AND index_name   = 'IXF_BOLDBI_UserPermission_Active'
);
SET @sql = IF(@x=0,
  'CREATE INDEX `IXF_BOLDBI_UserPermission_Active`
     ON boldbi_userpermission (userid, itemid, permissionentityid, permissionaccessid)',
  'SELECT 1'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @x = (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name   = 'boldbi_grouppermission'
    AND index_name   = 'IXF_BOLDBI_GroupPermission_Active'
);
SET @sql = IF(@x=0,
  'CREATE INDEX `IXF_BOLDBI_GroupPermission_Active`
     ON boldbi_grouppermission (groupid, itemid, permissionentityid, permissionaccessid)',
  'SELECT 1'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;
