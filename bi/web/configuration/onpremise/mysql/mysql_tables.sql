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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_Group(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	Color varchar(255) NOT NULL DEFAULT 'White',
	IsolationCode varchar(4000) NULL,
	ModifiedDate datetime NOT NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	ExternalProviderId varchar(100) NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_UserGroup(
	Id int NOT NULL AUTO_INCREMENT,
	GroupId int NOT NULL,
	UserId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	ExternalProviderId varchar(100) NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_UserLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_UserLogin(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	ClientToken varchar(4000) NOT NULL,
	IpAddress varchar(50) NOT NULL,
	LoggedInTime datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NULL,
	PRIMARY KEY (Id))
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
	IsSampleData tinyint NULL,
	DataSource text null,
	IsPublic tinyint NOT NULL DEFAULT 0,
	IsDraft tinyint NULL DEFAULT 0,
	IsLocked tinyint NULL DEFAULT 0,
	IsActive tinyint NULL,
	IsUnlisted tinyint(1) NOT NULL DEFAULT 0,
	IsUploadDraft tinyint(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemView(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	UserId int NOT NULL,
	ItemViewId Char(38) NOT NULL,
	QueryString varchar(4000) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NULL UNIQUE,
	IsActive tinyint NULL,
	PRIMARY KEY (Id))
;


CREATE TABLE {database_name}.BOLDBI_ItemTrash(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	TrashedById int NOT NULL,
	TrashedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemTrashDeleted(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ItemTrashId int NOT NULL,
	DeletedById int NOT NULL,
	DeletedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_PermissionEntity(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	EntityType int NOT NULL,
	ItemTypeId int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_RecurrenceType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(30) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ExportType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(20) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ScheduleDetail(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	ItemId Char(38) NOT NULL,
	Name varchar(150) NOT NULL,
	RecurrenceTypeId int NULL,
	RecurrenceInfo varchar(4000) NULL,
	Subject varchar(4000) NULL,
	EmailContent varchar(4000) NULL,
	IsDataChanges tinyint NOT NULL DEFAULT 0,
	IsTimeInterval tinyint NOT NULL DEFAULT 0,
	StartDate datetime NULL,
	EndDate datetime NULL,
	EndAfter int NULL DEFAULT 0,
	NextSchedule datetime NULL,
	ExportTypeId int NOT NULL,
	IsEnabled tinyint NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	ScheduleExportInfo text NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SubscribedUser(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	SubscribedById int NOT NULL,
	RecipientUserId int NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SubscribedGroup(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	SubscribedById int NOT NULL,
	RecipientGroupId int NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SubscrExtnRecpt(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	SubscribedById int NOT NULL,
	EmailIds varchar(4000) NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;
	
CREATE TABLE {database_name}.BOLDBI_ScheduleStatus(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ScheduleLogUser(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredUserId int NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint NOT NULL,	
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SchdLogExtnRecpt(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredEmailId varchar(150) NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint NOT NULL,	
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SystemSettings(
	Id int NOT NULL AUTO_INCREMENT,
	`Key` varchar(255) NOT NULL,
	Value text NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	CONSTRAINT UK_BOLDBI_SystemSettings_Key UNIQUE(`Key`),
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ServerVersion(
	Id int NOT NULL,
	VersionNumber varchar(20) NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemWatch(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ParentItemId Char(38) NULL,
	UserId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsWatched tinyint NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemCommentLogType(
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NULL UNIQUE,
    IsActive tinyint NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_FavoriteItem(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	ItemId Char(38) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_DashboardWidget (
	Id int NOT NULL AUTO_INCREMENT,
	DashboardItemId Char(38) NOT NULL,
	WidgetItemId Char(38) NOT NULL,
	WidgetDesignerId Char(38) NOT NULL,
	WidgetInfo text,
	ModifiedDate datetime NOT NULL,	
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_AzureADCredential(
	Id int NOT NULL AUTO_INCREMENT,
	TenantName varchar(255),
	ClientId varchar(100),
	ClientSecret varchar(100),
	IsActive tinyint NOT NULL,
	EnableGroupUserImport tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SAMLSettings(
	Id int NOT NULL AUTO_INCREMENT, 
	MetadataURI varchar(4000),
	Authority varchar(4000),
	DesignerClientId varchar(100),
	TenantName varchar(100), 
	MobileAppId varchar(100),
	IsEnabled tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_UserType(
	Id int NOT NULL AUTO_INCREMENT, 
	Type varchar(100) UNIQUE,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_DashboardDataSource(
	Id int NOT NULL AUTO_INCREMENT,
	DashboardItemId Char(38) NOT NULL,
	DataSourceName varchar(255) NOT NULL,
	DataSourceItemId Char(38) NOT NULL,
	VersionNumber int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_HomepageItemFilter(
	Id int NOT NULL AUTO_INCREMENT,
	HomepageId Char(38) NOT NULL,
	FilterId int NOT NULL,
	QueryString varchar(4000) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_DataNotification(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	DataSourceId Char(38) NULL,
	DaJsonString text NOT NULL,
	FilterData text NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ConditionCategory(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_Source(
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NULL UNIQUE,
    IsActive tinyint NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SlideshowInfo(
	Id int NOT NULL AUTO_INCREMENT,
	SlideshowId Char(38) NOT NULL,
	ItemInfo text NOT NULL,
	loopInterval int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_PermissionAccess(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	AccessId int UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_PermissionAccEntity(
	Id int NOT NULL AUTO_INCREMENT,
	PermissionEntityId int NOT NULL,
	PermissionAccessId int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_PermissionLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_UserPermissionLog(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,	
	AffectedUserId int NOT NULL,
	UserPermissionId int NULL,
	LogTypeId int NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_GroupPermissionLog(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,	
	AffectedGroupId int NOT NULL,
	GroupPermissionId int NULL,
	LogTypeId int NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SystemLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_LogStatus(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_LogModule(
	Id int NOT NULL AUTO_INCREMENT,
	Name text NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_LogField(
	Id int NOT NULL AUTO_INCREMENT,
	ModuleId int NOT NULL,
	Field text NOT NULL,
	Description text NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_GroupLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemSettings(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	ItemConfig varchar(4000) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_ItemUserPreference(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId Char(38) NOT NULL,
	UserId int NOT NULL,
	AutosaveFilter varchar(4000) NULL,
	DefaultViewId Char(38) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_UserDataNotification(
    Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	UserId int NOT NULL,
	FilterData text NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_SettingsType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
	IsActive smallint NOT NULL)
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
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_NotificationEvents(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_EventPayloads(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_EventPayloadsMapping(
	Id int NOT NULL AUTO_INCREMENT,
	EventType int NOT NULL,
	PayloadType int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
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
	PRIMARY KEY (Id))
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
    PRIMARY KEY (Id))
;
-- -- PASTE INSERT Queries below this section --------


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

INSERT into {database_name}.BOLDBI_Group (Name,Description,Color,IsolationCode,ModifiedDate,DirectoryTypeId,IsActive) VALUES ('System Administrator','Has administrative rights for the dashboards','#ff0000',null,NOW(), 1, 1)
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
-- INSERT into {database_name}.[BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES ('Read, Download',18,1)
-- ;
-- INSERT into {database_name}.[BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES ('Read, Write, Download',22,1)
-- ;
-- INSERT into {database_name}.[BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES ('Read, Write, Delete, Download',30,1)
-- ;

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

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForDashboardOwner','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForAccessibleUser','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationOnUserMention','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationOnUserMention',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationWhenWatchEnabled','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (2,'EnableNotificationForDashboardOwner','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1)
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
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForAccessibleUser','NotificationSettings.SystemNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationOnUserMention','NotificationSettings.SystemNotificationSettings.EnableNotificationOnUserMention',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationWhenWatchEnabled','NotificationSettings.SystemNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,'EnableNotificationForDashboardOwner','NotificationSettings.MailNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1)
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

-- -- PASTE ALTER Queries below this section --------

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
ALTER TABLE  {database_name}.BOLDBI_UserPermission ADD FOREIGN KEY(SettingsTypeId) REFERENCES {database_name}.BOLDBI_SettingsType (Id) 
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
ALTER TABLE  {database_name}.BOLDBI_GroupPermission ADD FOREIGN KEY(SettingsTypeId) REFERENCES {database_name}.BOLDBI_SettingsType (Id)
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

CREATE INDEX IX_BOLDBI_ScheduleDetail_ScheduleId ON {database_name}.BOLDBI_ScheduleDetail (ScheduleId);

CREATE INDEX IX_BOLDBI_ScheduleLog_ScheduleId ON {database_name}.BOLDBI_ScheduleLog (ScheduleId, ExecutedDate, ScheduleStatusId);

CREATE INDEX IX_BOLDBI_Item ON {database_name}.BOLDBI_Item (IsActive, ItemTypeId, ParentId, IsDraft, CreatedById, CreatedDate);

CREATE INDEX IX_BOLDBI_UserPermission ON {database_name}.BOLDBI_UserPermission (IsActive, UserId, ItemId, PermissionEntityId, PermissionAccessId);