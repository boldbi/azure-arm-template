CREATE TABLE {database_name}.SyncDS_User(
	Id int NOT NULL AUTO_INCREMENT,
	UserName varchar(100) NOT NULL,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NULL,
	DisplayName varchar(512) NULL,
	Email varchar(255) NOT NULL,
	Password varchar(255) NOT NULL,
	Contact varchar(20) NULL,
	Picture varchar(100) NOT NULL,	
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NULL,
	LastLogin datetime NULL,
	PasswordChangedDate datetime NULL,
	ActivationExpirationDate datetime NULL,
	ActivationCode varchar(255) NOT NULL,
	ResetPasswordCode varchar(255) NULL,
	LastResetAttempt datetime NULL,
	UserTypeId int NOT NULL DEFAULT 0,
	IsActivated tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	IsDeleted tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_Group(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	Color varchar(255) NOT NULL DEFAULT 'White',
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_UserGroup(
	Id int NOT NULL AUTO_INCREMENT,
	GroupId int NOT NULL,
	UserId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_UserGroup  ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;
ALTER TABLE {database_name}.SyncDS_UserGroup  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_UserLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_UserLog(
	Id int NOT NULL AUTO_INCREMENT,
	UserLogTypeId int NOT NULL,	
	GroupId int NULL,
	OldValue int NULL,
	NewValue int NULL,
	UpdatedUserId int NOT NULL,
	TargetUserId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_UserLog  ADD  FOREIGN KEY(UserLogTypeId) REFERENCES {database_name}.SyncDS_UserLogType (Id)
;
ALTER TABLE {database_name}.SyncDS_UserLog  ADD  FOREIGN KEY(GroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;
ALTER TABLE {database_name}.SyncDS_UserLog  ADD  FOREIGN KEY(TargetUserId) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_UserLog  ADD  FOREIGN KEY(UpdatedUserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_UserLogin(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	ClientToken varchar(4000) NOT NULL,
	IpAddress varchar(50) NOT NULL,
	LoggedInTime datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_UserLogin  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_UserPreference(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	Language varchar(4000) NULL,
	TimeZone varchar(100) NULL,
	RecordSize int NULL,
	ItemSort varchar(4000) NULL,
	ItemFilters varchar(4000) NULL,
	Notifications varchar(4000) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_UserPreference ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_SystemLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_SystemLog(
	LogId int NOT NULL AUTO_INCREMENT,
	SystemLogTypeId int NOT NULL,
	UpdatedUserId int NOT NULL,
	TargetUserId int NOT NULL,		
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (LogId))
;

ALTER TABLE {database_name}.SyncDS_SystemLog  ADD FOREIGN KEY(SystemLogTypeId) REFERENCES {database_name}.SyncDS_SystemLogType (Id)
;
ALTER TABLE {database_name}.SyncDS_SystemLog  ADD FOREIGN KEY(UpdatedUserId) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_SystemLog  ADD FOREIGN KEY(TargetUserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ItemType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive tinyint(1) NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_Item(
	Id char(38) NOT NULL,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	ItemTypeId int NOT NULL,
	ParentId char(38) NULL,
	Extension varchar(30) NULL,
	CloneItemId char(38) NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsPublic tinyint(1) NOT NULL DEFAULT 0,
	IsActive tinyint(1) NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_Item  ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.SyncDS_ItemType (Id)
;
ALTER TABLE {database_name}.SyncDS_Item  ADD FOREIGN KEY(ParentId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_Item  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_Item  ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ItemView(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId char(38) NOT NULL,
	UserId int NOT NULL,
	ItemViewId char(38) NOT NULL,
	QueryString varchar(4000) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ItemView  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemView  ADD FOREIGN KEY(ItemViewId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemView  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ItemLogType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NULL UNIQUE,
	IsActive tinyint(1) NULL,
	PRIMARY KEY (Id))
;


CREATE TABLE {database_name}.SyncDS_ItemTrash(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId char(38) NOT NULL,
	TrashedById int NOT NULL,
	TrashedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ItemTrash  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemTrash  ADD FOREIGN KEY(TrashedById) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ItemTrashDeleted(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId char(38) NOT NULL,
	ItemTrashId int NOT NULL,
	DeletedById int NOT NULL,
	DeletedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(ItemTrashId) REFERENCES {database_name}.SyncDS_ItemTrash (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(DeletedById) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ItemVersion(
	Id int NOT NULL AUTO_INCREMENT,
	ItemId char(38) NOT NULL,
	ItemTypeId int NOT NULL,
	ItemName varchar(265) NULL,
	VersionNumber int NOT NULL,
	RolledbackVersionNumber int NULL,
	Comment varchar(1026) NULL,
	IsCurrentVersion tinyint(1) NOT NULL,
	CreatedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ItemVersion  ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.SyncDS_ItemType (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemVersion  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemVersion  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ItemLog(
	Id int NOT NULL AUTO_INCREMENT,
	ItemLogTypeId int NOT NULL,
	ItemId char(38) NOT NULL,
	ItemVersionId int NOT NULL,
	ParentId char(38) NULL,
	FromCategoryId char(38) NULL,
	ToCategoryId char(38) NULL,
	UpdatedUserId int NOT NULL,	
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ItemLog  ADD FOREIGN KEY(ItemVersionId) REFERENCES {database_name}.SyncDS_ItemVersion (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemLog  ADD FOREIGN KEY(ItemLogTypeId) REFERENCES {database_name}.SyncDS_ItemLogType (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemLog  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemLog  ADD FOREIGN KEY(ParentId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemLog  ADD FOREIGN KEY(FromCategoryId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemLog  ADD FOREIGN KEY(ToCategoryId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemLog  ADD FOREIGN KEY(UpdatedUserId) REFERENCES {database_name}.SyncDS_User (Id)
;


CREATE TABLE {database_name}.SyncDS_PermissionEntity(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL UNIQUE,
	EntityType int NOT NULL,
	ItemTypeId int NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;
ALTER TABLE {database_name}.SyncDS_PermissionEntity ADD FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.SyncDS_ItemType (Id)
;
CREATE TABLE {database_name}.SyncDS_UserPermission(
	Id int NOT NULL AUTO_INCREMENT,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId char(38) NULL,
	UserId int NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_UserPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.SyncDS_PermissionEntity (Id)
;
ALTER TABLE {database_name}.SyncDS_UserPermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_UserPermission  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_GroupPermission(
	Id int NOT NULL AUTO_INCREMENT,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId char(38) NULL,
	GroupId int NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_GroupPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.SyncDS_PermissionEntity (Id)
;
ALTER TABLE {database_name}.SyncDS_GroupPermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_GroupPermission  ADD  FOREIGN KEY(GroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;

CREATE TABLE {database_name}.SyncDS_RecurrenceType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(30) NOT NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_ExportType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(20) NOT NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_ScheduleDetail(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId char(38) NOT NULL,
	ItemId char(38) NOT NULL,
	Name varchar(150) NOT NULL,
	RecurrenceTypeId int NULL,
	RecurrenceInfo varchar(4000) NULL,
	EmailContent varchar(4000) NULL,
	StartDate datetime NULL,
	EndDate datetime NULL DEFAULT 0,
	EndAfter int NULL DEFAULT 0,
	NextSchedule datetime NULL,
	ExportTypeId int NOT NULL,
	IsEnabled tinyint(1) NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	IsDataChanges tinyint(1) NOT NULL default 0,
	IsTimeInterval tinyint(1) NOT NULL default 0,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ScheduleDetail  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail  ADD FOREIGN KEY(RecurrenceTypeId) REFERENCES {database_name}.SyncDS_RecurrenceType (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail  ADD FOREIGN KEY(ExportTypeId) REFERENCES {database_name}.SyncDS_ExportType (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail  ADD FOREIGN KEY(CreatedById) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail  ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_SubscribedUser(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId char(38) NOT NULL,
	SubscribedById int NOT NULL,
	RecipientUserId int NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_SubscribedUser  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_SubscribedUser  ADD FOREIGN KEY(SubscribedById) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_SubscribedUser  ADD FOREIGN KEY(RecipientUserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_SubscribedGroup(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId char(38) NOT NULL,
	SubscribedById int NOT NULL,
	RecipientGroupId int NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_SubscribedGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_SubscribedGroup  ADD FOREIGN KEY(SubscribedById) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_SubscribedGroup  ADD FOREIGN KEY(RecipientGroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;

CREATE TABLE {database_name}.SyncDS_SubscrExtnRecpt(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId char(38) NOT NULL,
	SubscribedById int NOT NULL,
	EmailIds varchar(4000) NOT NULL,
	SubscribedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id));
	
ALTER TABLE {database_name}.SyncDS_SubscrExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_SubscrExtnRecpt  ADD FOREIGN KEY(SubscribedById) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ScheduleStatus(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_ScheduleLogUser(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredUserId int NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint(1) NOT NULL,	
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ScheduleLogUser  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.SyncDS_ScheduleStatus (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleLogUser  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleLogUser  ADD FOREIGN KEY(DeliveredUserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ScheduleLogGroup(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	GroupId int NOT NULL,
	DeliveredUserId int NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.SyncDS_ScheduleStatus (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(DeliveredUserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_SchdLogExtnRecpt(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId char(38) NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredEmailId varchar(150) NOT NULL,
	DeliveredDate datetime NOT NULL,
	IsOnDemand tinyint(1) NOT NULL,	
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id));
	
ALTER TABLE {database_name}.SyncDS_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.SyncDS_ScheduleStatus (Id)
;
ALTER TABLE {database_name}.SyncDS_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;

CREATE TABLE {database_name}.SyncDS_ScheduleLog(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleStatusId int NOT NULL,
	ScheduleId char(38) NOT NULL,
	ExecutedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsOnDemand tinyint(1) NOT NULL DEFAULT 0,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ScheduleLog  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES {database_name}.SyncDS_ScheduleStatus (Id)
;
ALTER TABLE {database_name}.SyncDS_ScheduleLog  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;

CREATE TABLE {database_name}.SyncDS_SystemSettings(
	Id int NOT NULL AUTO_INCREMENT,
	SyncDS_SystemSettings.Key varchar(255) NOT NULL,
	Value varchar(4000) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE(`Key`))
;

CREATE TABLE {database_name}.SyncDS_ServerVersion(
Id int NOT NULL,
VersionNumber varchar(20) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_ADUser(
Id int NOT NULL AUTO_INCREMENT,
UserId int not null,
ActiveDirectoryUserId char(38) not null,
IsActive tinyint(1) not null,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ADUser ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_ADGroup(
Id int NOT NULL AUTO_INCREMENT,
GroupId int not null,
ActiveDirectoryGroupId char(38) not null,
IsActive tinyint(1) not null,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ADGroup ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;

CREATE TABLE {database_name}.SyncDS_ADCredential(
Id int NOT NULL AUTO_INCREMENT,
Username varchar(100),
Password varchar(100),
LdapUrl varchar(255),
EnableSsl tinyint(1) not null,
DistinguishedName varchar(150),
PortNo int not null,
IsActive tinyint(1) not null,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_Comment(
    Id int NOT NULL AUTO_INCREMENT,
    Comment varchar(4000) NOT NULL,
    ItemId char(38) NOT NULL,
    UserId int NOT NULL,
    ParentId int NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    ModifiedById int NOT NULL,
    IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_Comment ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_Comment ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_Comment ADD FOREIGN KEY(ModifiedById) REFERENCES {database_name}.SyncDS_User (Id)
; 

CREATE TABLE {database_name}.SyncDS_ItemWatch(
            Id int NOT NULL AUTO_INCREMENT,
            ItemId char(38) NOT NULL,
            UserId int NOT NULL,
            ModifiedDate datetime NOT NULL,
			IsWatched tinyint(1) NOT NULL,
            IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;
 
ALTER TABLE {database_name}.SyncDS_ItemWatch ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemWatch ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
; 

CREATE TABLE {database_name}.SyncDS_ItemCommentLogType(
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NULL UNIQUE,
    IsActive tinyint(1) NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_ItemCommentLog(
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
    IsRead tinyint(1) NOT NULL,
    IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_ItemCommentLog  ADD FOREIGN KEY(CurrentUserId) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemCommentLog  ADD FOREIGN KEY(ItemCommentLogTypeId) REFERENCES {database_name}.SyncDS_ItemCommentLogType (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemCommentLog  ADD FOREIGN KEY(CommentId) REFERENCES {database_name}.SyncDS_Comment (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemCommentLog  ADD FOREIGN KEY(RepliedFor) REFERENCES {database_name}.SyncDS_Comment (Id)
;
ALTER TABLE {database_name}.SyncDS_ItemCommentLog  ADD FOREIGN KEY(NotificationTo) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_FavoriteItem(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	ItemId char(38) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;
	
ALTER TABLE {database_name}.SyncDS_FavoriteItem  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;
ALTER TABLE {database_name}.SyncDS_FavoriteItem  ADD FOREIGN KEY(ItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;

CREATE TABLE {database_name}.SyncDS_DashboardWidget (
	Id int NOT NULL AUTO_INCREMENT,
	DashboardItemId char(38) NOT NULL,
	WidgetItemId char(38) NOT NULL,
	WidgetDesignerId char(38) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_DashboardWidget  ADD FOREIGN KEY(DashboardItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_DashboardWidget  ADD FOREIGN KEY(WidgetItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;

CREATE TABLE {database_name}.SyncDS_AzureADCredential(
	Id int NOT NULL AUTO_INCREMENT,
	TenantName varchar(255),
	ClientId varchar(100),
	ClientSecret varchar(100),
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_AzureADUser(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	AzureADUserId char(38) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_AzureADUser ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_AzureADGroup(
	Id int NOT NULL AUTO_INCREMENT,
	GroupId int NOT NULL,
	AzureADGroupId char(38) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_AzureADGroup ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;


CREATE TABLE {database_name}.SyncDS_SAMLSettings(
	Id int NOT NULL AUTO_INCREMENT, 
	MetadataURI varchar(4000), 
	Authority varchar(4000),
	DesignerClientId varchar(100),
	TenantName varchar(100),
	MobileAppId varchar(100),
	IsEnabled tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_UserType(
	Id int NOT NULL AUTO_INCREMENT,
	Type varchar(100) UNIQUE,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_DashboardDataSource(
	Id int NOT NULL AUTO_INCREMENT,
	DashboardItemId char(38) NOT NULL,
	DataSourceName varchar(255) NOT NULL,
	DataSourceItemId char(38) NOT NULL,
	VersionNumber int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_DashboardDataSource  ADD FOREIGN KEY(DashboardItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_DashboardDataSource  ADD FOREIGN KEY(DataSourceItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_DashboardDataSource  ADD FOREIGN KEY(VersionNumber) REFERENCES {database_name}.SyncDS_ItemVersion (Id)
;

CREATE TABLE {database_name}.SyncDS_Homepage(
Id char(38) NOT NULL,
Name varchar(255) NOT NULL,
UserId int NOT NULL,
ItemInfo varchar(4000) NOT NULL,
ItemType varchar(100) NOT NULL,
IsDefaultHomepage tinyint(1) NOT NULL,
CreatedDate datetime NOT NULL,
ModifiedDate datetime NOT NULL,
IsActive tinyint(1) NOT NULL,
PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_Homepage ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_HomepageItemFilter(
Id int NOT NULL AUTO_INCREMENT,
HomepageId char(38) NOT NULL,
FilterId int NOT NULL,
QueryString varchar(4000) NOT NULL,
ModifiedDate datetime NOT NULL,
IsActive tinyint(1) NOT NULL,
PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_HomepageItemFilter ADD FOREIGN KEY(HomepageId) REFERENCES {database_name}.SyncDS_Homepage (Id)
;

INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) VALUES ('Category',1)
;
INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) VALUES ('Dashboard',1)
;
INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) VALUES ('Report',1)
;
INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) VALUES ('Datasource',1)
;
INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) VALUES ('Dataset',1)
;
INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) VALUES ('File',1)
;
INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) VALUES ('Schedule',1)
;
INSERT into {database_name}.SyncDS_ItemType (Name,IsActive) values ('Widget',1)
;
insert into {database_name}.SyncDS_ItemType (Name,IsActive) values (N'ItemView',1)
;


INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Added',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Edited',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Deleted',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Moved',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Copied',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Cloned',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Trashed',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Restored',1)
;
INSERT into {database_name}.SyncDS_ItemLogType (Name,IsActive) VALUES ( 'Rollbacked',1)
;

INSERT into {database_name}.SyncDS_SystemLogType (Name,IsActive) VALUES ('Updated',1)
;

INSERT into {database_name}.SyncDS_UserLogType (Name,IsActive) VALUES ( 'Added',1)
;
INSERT into {database_name}.SyncDS_UserLogType (Name,IsActive) VALUES ( 'Updated',1)
;
INSERT into {database_name}.SyncDS_UserLogType (Name,IsActive) VALUES ( 'Deleted',1)
;
INSERT into {database_name}.SyncDS_UserLogType (Name,IsActive) VALUES ( 'Changed',1)
;

INSERT into {database_name}.SyncDS_ExportType (Name,IsActive) VALUES ('Excel', 1)
;
INSERT into {database_name}.SyncDS_ExportType (Name,IsActive) VALUES ('HTML', 1)
;
INSERT into {database_name}.SyncDS_ExportType (Name,IsActive) VALUES ('PDF', 1)
;
INSERT into {database_name}.SyncDS_ExportType (Name,IsActive) VALUES ('Word', 1)
;
INSERT into {database_name}.SyncDS_ExportType (Name,IsActive) VALUES ('Image', 1)
;

INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('Daily', 1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('DailyWeekDay', 1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('Weekly', 1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('Monthly', 1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('MonthlyDOW', 1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('Yearly', 1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('YearlyDOW', 1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('Time', 1)
;

INSERT into {database_name}.SyncDS_ScheduleStatus (Name,IsActive) VALUES ('Success', 1)
;
INSERT into {database_name}.SyncDS_ScheduleStatus (Name,IsActive) VALUES ('Failure', 1)
;

INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Reports',1,3,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Reports in Category',2,1,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Report',0,3,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Categories',1,1,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Category',0,1,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Data Sources',1,4,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Data Source',0,4, 1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Files',1,6,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific File',0,6,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Schedules',1,7,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Schedule',0,7,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('All Dashboards',1,2,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Dashboards in Category',2,1,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES ('Specific Dashboard',0,2, 1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES('All Widgets',1,8,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES('Specific Widget',0,8,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All Datasets',1,5, 1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific Dataset',0,5,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'Specific ItemView',0,9,1)
;
INSERT into {database_name}.SyncDS_PermissionEntity (Name,EntityType,ItemTypeId,IsActive) VALUES (N'All ItemViews',1,9,1)
;
INSERT into {database_name}.SyncDS_Group (Name,Description,Color,ModifiedDate,IsActive) VALUES ('System Administrator','Has administrative rights for the dashboard server','#ff0000',UTC_TIMESTAMP(), 1)
;

INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'Added',1)
;
INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'Edited',1)
;
INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'Deleted',1)
;
INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'Upvoted',1)
;
INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'Downvoted',1)
;
INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'Replied',1)
;
INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'UserMention',1)
;
INSERT into {database_name}.SyncDS_UserType(Type) values('Server User')
;
INSERT into {database_name}.SyncDS_UserType(Type) values('Active Directory User')
;
INSERT into {database_name}.SyncDS_UserType(Type) values('Federation User')
;

CREATE TABLE {database_name}.SyncDS_DBCredential(
    Id int NOT NULL AUTO_INCREMENT,
    DatabaseType varchar(255) NOT NULL,
    ConnectionString varchar(4000) NOT NULL,
    Status  varchar(255) NOT NULL,
    ActiveStatusValue  varchar(255) NOT NULL,
    IsActive tinyint(1) NOT NULL,
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
    EmailRelationId int NULL,
    FirstNameRelationId int NULL,
    IsActiveRelationId int NULL,
    LastNameRelationId int NULL,
    PRIMARY KEY (Id))
;
CREATE TABLE {database_name}.SyncDS_TableRelation(
   Id int NOT NULL AUTO_INCREMENT,
   LeftTable varchar(255) NOT NULL,
   LeftTableColumnName varchar(255) NOT NULL,	
   LeftTableCondition varchar(255) NOT NULL,
   LeftTableName varchar(255) NOT NULL,
   LeftTableSchema varchar(255) NOT NULL,
   Relationship varchar(255) NOT NULL,
   RightTable varchar(255) NOT NULL,
   RightTableColumnName varchar(255) NOT NULL,	
   RightTableCondition varchar(255) NOT NULL,
   RightTableName varchar(255) NOT NULL,
   RightTableSchema varchar(255) NOT NULL,
   PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_MultiTabDashboard(
	Id int NOT NULL AUTO_INCREMENT,
	ParentDashboardId char(38) NOT NULL,
        ChildDashboardId char(38) NOT NULL,
        DashboardDesignerId char(38) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_MultiTabDashboard  ADD FOREIGN KEY(ParentDashboardId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_MultiTabDashboard  ADD FOREIGN KEY(ChildDashboardId) REFERENCES {database_name}.SyncDS_Item (Id)
;

CREATE TABLE {database_name}.SyncDS_DataNotification(
	Id int AUTO_INCREMENT NOT NULL,
	ScheduleId char(38) NOT NULL,
	Frequency int NULL,
	ConditionCategory int NOT NULL,
	PreviousValue text NULL,
	PreviousData text NULL,
	IsActive tinyint(1) NOT NULL,
	ColumnInfo text NOT NULL,
	ConditionInfo text NULL,
    ItemName varchar(255) NOT NULL,PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_DataNotification  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.SyncDS_Item (Id)
;

CREATE TABLE {database_name}.SyncDS_ConditionCategory(
	Id int AUTO_INCREMENT NOT NULL,
	Name varchar(255) NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

INSERT into {database_name}.SyncDS_ConditionCategory (Name,IsActive) VALUES ('Increases',1)
;
INSERT into {database_name}.SyncDS_ConditionCategory (Name,IsActive) VALUES ('Continuously Increases',1)
;
INSERT into {database_name}.SyncDS_ConditionCategory (Name,IsActive) VALUES ('Decreases',1)
;
INSERT into {database_name}.SyncDS_ConditionCategory (Name,IsActive) VALUES ('Continuously Decreases',1)
;
INSERT into {database_name}.SyncDS_ConditionCategory (Name,IsActive) VALUES ('Value Changes',1)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('Hourly',1)
;

CREATE TABLE {database_name}.SyncDS_PermissionAccess(
	Id int AUTO_INCREMENT NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	AccessId int NOT NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_PermissionAccEntity(
	Id int AUTO_INCREMENT NOT NULL,
	PermissionEntityId int NOT NULL,
	PermissionAccessId int NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_PermissionAccEntity  ADD FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.SyncDS_PermissionEntity (Id)
;
ALTER TABLE {database_name}.SyncDS_PermissionAccEntity  ADD FOREIGN KEY(PermissionAccessId) REFERENCES {database_name}.SyncDS_PermissionAccess (Id)
;

INSERT into {database_name}.SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Create',1,1)
;
INSERT into {database_name}.SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Read',2,1), (N'Read, Write',6,1), (N'Read, Write, Delete',14,1)
;
INSERT into {database_name}.SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Read, Download',18,1), (N'Read, Write, Download',22,1), (N'Read, Write, Delete, Download',30,1)
;

INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,1,1), (6,1,1), (8,1,1), (10,1,1), (12,1,1), (13,1,1), (15,1,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,2,1), (13,2,1), (14,2,1), (4,2,1), (5,2,1), (10,2,1), (11,2,1), (15,2,1), (16,2,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,3,1), (5,3,1), (10,3,1), (11,3,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,4,1), (5,4,1), (10,4,1), (11,4,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1), (13,5,1), (14,5,1), (15,5,1), (16,5,1), (6,5,1), (7,5,1), (8,5,1), (9,5,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,6,1), (13,6,1), (14,6,1), (15,6,1), (16,6,1), (6,6,1), (7,6,1), (8,6,1), (9,6,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,7,1), (13,7,1), (14,7,1), (6,7,1), (7,7,1), (8,7,1), (9,7,1), (15,7,1), (16,7,1)
;

CREATE TABLE {database_name}.SyncDS_CustomExpression(
	Id int NOT NULL AUTO_INCREMENT,
	DashboardId char(38) NOT NULL,
	WidgetId char(38) NOT NULL,
	DatasourceId varchar(255) NOT NULL,
	UserId int NOT NULL,
	Name varchar(255) NOT NULL,
	Expression varchar(4000) NOT NULL,
	ColumnInfo varchar(4000) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_CustomExpression  ADD FOREIGN KEY(DashboardId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_CustomExpression  ADD FOREIGN KEY(WidgetId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_CustomExpression  ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;