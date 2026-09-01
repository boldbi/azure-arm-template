CREATE TABLE SyncDS_User(
	Id SERIAL primary key NOT NULL,
	UserName varchar(100) NOT NULL,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NULL,
	DisplayName varchar(512) NULL,
	Email varchar(255) NOT NULL,
	Password varchar(255) NOT NULL,
	Contact varchar(20) NULL,
	Picture varchar(100) NOT NULL,	
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NULL,
	LastLogin timestamp NULL,
	PasswordChangedDate timestamp NULL,
	ActivationExpirationDate timestamp NULL,
	ActivationCode varchar(255) NOT NULL,
	ResetPasswordCode varchar(255) NULL,
	LastResetAttempt timestamp NULL,
	UserTypeId int NOT NULL DEFAULT 0,
	IsActivated smallint NOT NULL,
	IsActive smallint NOT NULL,
	IsDeleted smallint NOT NULL)
;

CREATE TABLE SyncDS_Group(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(255) NOT NULL,
	Description varchar(1026) NULL,
	Color varchar(255) NOT NULL DEFAULT 'White',
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserGroup(
	Id SERIAL PRIMARY KEY NOT NULL,
	GroupId int NOT NULL,
	UserId int NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_UserGroup  ADD FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_UserGroup  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_UserLogType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_UserLog(
	Id SERIAL primary key NOT NULL,
	UserLogTypeId int NOT NULL,	
	GroupId int NULL,
	OldValue int NULL,
	NewValue int NULL,
	UpdatedUserId int NOT NULL,
	TargetUserId int NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_UserLog  ADD  FOREIGN KEY(UserLogTypeId) REFERENCES SyncDS_UserLogType (Id)
;
ALTER TABLE SyncDS_UserLog  ADD  FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_UserLog  ADD  FOREIGN KEY(TargetUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserLog  ADD  FOREIGN KEY(UpdatedUserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_UserLogin(
	Id SERIAL PRIMARY KEY NOT NULL,
	UserId int NOT NULL,
	ClientToken varchar(4000) NOT NULL,
	IpAddress varchar(50) NOT NULL,
	LoggedInTime timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_UserLogin  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
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
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_UserPreference ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_SystemLogType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_SystemLog(
	LogId SERIAL primary key NOT NULL,
	SystemLogTypeId int NOT NULL,
	UpdatedUserId int NOT NULL,
	TargetUserId int NOT NULL,		
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_SystemLog  ADD FOREIGN KEY(SystemLogTypeId) REFERENCES SyncDS_SystemLogType (Id)
;
ALTER TABLE SyncDS_SystemLog  ADD FOREIGN KEY(UpdatedUserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_SystemLog  ADD FOREIGN KEY(TargetUserId) REFERENCES SyncDS_User (Id)
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
	IsPublic smallint NOT NULL DEFAULT 0,
	IsActive smallint NULL)
;

ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;
ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(ParentId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_Item  ADD FOREIGN KEY(ModifiedById) REFERENCES SyncDS_User (Id)
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

ALTER TABLE SyncDS_ItemView  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemView  ADD FOREIGN KEY(ItemViewId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemView  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
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

ALTER TABLE SyncDS_ItemTrash  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemTrash  ADD FOREIGN KEY(TrashedById) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_ItemTrashDeleted(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemId uuid NOT NULL,
	ItemTrashId int NOT NULL,
	DeletedById int NOT NULL,
	DeletedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(ItemTrashId) REFERENCES SyncDS_ItemTrash (Id)
;
ALTER TABLE SyncDS_ItemTrashDeleted  ADD FOREIGN KEY(DeletedById) REFERENCES SyncDS_User (Id)
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

ALTER TABLE SyncDS_ItemVersion  ADD FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;
ALTER TABLE SyncDS_ItemVersion  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemVersion  ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_ItemLog(
	Id SERIAL PRIMARY KEY NOT NULL,
	ItemLogTypeId int NOT NULL,
	ItemId uuid NOT NULL,
	ItemVersionId int NOT NULL,
	ParentId uuid NULL,
	FromCategoryId uuid NULL,
	ToCategoryId uuid NULL,
	UpdatedUserId int NOT NULL,	
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
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


CREATE TABLE SyncDS_PermissionEntity(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	EntityType int NOT NULL,
	ItemTypeId int NOT NULL,
	IsActive smallint NOT NULL)
;
ALTER TABLE SyncDS_PermissionEntity  ADD FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;

CREATE TABLE SyncDS_UserPermission(
	Id SERIAL PRIMARY KEY NOT NULL,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId uuid NULL,
	UserId int NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_UserPermission  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_GroupPermission(
	Id SERIAL PRIMARY KEY NOT NULL,
	PermissionAccessId int NOT NULL,
	PermissionEntityId int NOT NULL,
	ItemId uuid NULL,
	GroupId int NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_GroupPermission  ADD  FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
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
	ScheduleId uuid NOT NULL,
	ItemId uuid NOT NULL,
	Name varchar(150) NOT NULL,
	RecurrenceTypeId int NULL,
	RecurrenceInfo varchar(4000) NULL,
	EmailContent varchar(4000) NULL,
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
	IsActive smallint NOT NULL)
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

CREATE TABLE SyncDS_SubscribedUser(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	SubscribedById int NOT NULL,
	RecipientUserId int NOT NULL,
	SubscribedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_SubscribedUser  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_SubscribedUser  ADD FOREIGN KEY(SubscribedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_SubscribedUser  ADD FOREIGN KEY(RecipientUserId) REFERENCES SyncDS_User (Id)
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

ALTER TABLE SyncDS_SubscribedGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_SubscribedGroup  ADD FOREIGN KEY(SubscribedById) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_SubscribedGroup  ADD FOREIGN KEY(RecipientGroupId) REFERENCES SyncDS_Group (Id)
;

CREATE TABLE SyncDS_SubscrExtnRecpt(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	SubscribedById int NOT NULL,
	EmailIds varchar(4000) NOT NULL,
	SubscribedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL);
	
ALTER TABLE SyncDS_SubscrExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_SubscrExtnRecpt  ADD FOREIGN KEY(SubscribedById) REFERENCES SyncDS_User (Id)
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

ALTER TABLE SyncDS_ScheduleLogUser  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_ScheduleLogUser  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ScheduleLogUser  ADD FOREIGN KEY(DeliveredUserId) REFERENCES SyncDS_User (Id)
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

ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_ScheduleLogGroup  ADD FOREIGN KEY(DeliveredUserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_SchdLogExtnRecpt(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	ScheduleStatusId int NOT NULL,
	DeliveredEmailId varchar(150) NOT NULL,
	DeliveredDate timestamp NOT NULL,
	IsOnDemand smallint NOT NULL,	
	IsActive smallint NOT NULL);
	
ALTER TABLE SyncDS_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_SchdLogExtnRecpt  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;

CREATE TABLE SyncDS_ScheduleLog(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleStatusId int NOT NULL,
	ScheduleId uuid NOT NULL,
	ExecutedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsOnDemand smallint NOT NULL DEFAULT (0),
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_ScheduleLog  ADD FOREIGN KEY(ScheduleStatusId) REFERENCES SyncDS_ScheduleStatus (Id)
;
ALTER TABLE SyncDS_ScheduleLog  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;

CREATE TABLE SyncDS_SystemSettings(
	Id SERIAL PRIMARY KEY NOT NULL,
	Key varchar(255) NOT NULL,
	Value varchar(4000) NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
	CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE (Key))
;

CREATE TABLE SyncDS_ServerVersion(
Id int PRIMARY KEY NOT NULL,
VersionNumber varchar(20) NOT NULL)
;

CREATE TABLE SyncDS_ADUser(
Id SERIAL primary key NOT NULL,
UserId int NOT NULL,
ActiveDirectoryUserId uuid NOT NULL,
IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_ADUser ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_ADGroup(
Id SERIAL primary key NOT NULL,
GroupId int NOT NULL,
ActiveDirectoryGroupId uuid NOT NULL,
IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_ADGroup ADD FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;

CREATE TABLE SyncDS_ADCredential(
Id SERIAL primary key NOT NULL,
Username varchar(100),
Password varchar(100),
LdapUrl varchar(255),
EnableSsl smallint NOT NULL,
DistinguishedName varchar(150),
PortNo int NOT NULL,
IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_Comment(
    Id SERIAL PRIMARY KEY NOT NULL,
    Comment varchar(4000) NOT NULL,
    ItemId uuid NOT NULL,
    UserId int NOT NULL,
    ParentId int NULL,
    CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
    ModifiedById int NOT NULL,
    IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_Comment ADD FOREIGN KEY(ModifiedById) REFERENCES SyncDS_User (Id)
; 

CREATE TABLE SyncDS_ItemWatch(
            Id SERIAL PRIMARY KEY NOT NULL,
            ItemId uuid NOT NULL,
            UserId int NOT NULL,
            ModifiedDate timestamp NOT NULL,
			IsWatched smallint NOT NULL,
            IsActive smallint NOT NULL)
;
 
ALTER TABLE SyncDS_ItemWatch ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemWatch ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
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

CREATE TABLE SyncDS_FavoriteItem(
	Id SERIAL PRIMARY KEY NOT NULL,
	UserId int NOT NULL,
	ItemId uuid NOT NULL,
	IsActive smallint NOT NULL)
;
	
ALTER TABLE SyncDS_FavoriteItem  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_FavoriteItem  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;

CREATE TABLE SyncDS_DashboardWidget (
	Id SERIAL PRIMARY KEY NOT NULL,
	DashboardItemId uuid NOT NULL,
	WidgetItemId uuid NOT NULL,
	WidgetDesignerId uuid NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_DashboardWidget  ADD FOREIGN KEY(DashboardItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DashboardWidget  ADD FOREIGN KEY(WidgetItemId) REFERENCES SyncDS_Item (Id)
;

CREATE TABLE SyncDS_AzureADCredential(
Id SERIAL primary key NOT NULL,
TenantName varchar(255),
ClientId varchar(100),
ClientSecret varchar(100),
IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_AzureADUser(
Id SERIAL primary key NOT NULL,
UserId int NOT NULL,
AzureADUserId uuid NOT NULL,
IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_AzureADUser ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_AzureADGroup(
Id SERIAL primary key NOT NULL,
GroupId int NOT NULL,
AzureADGroupId uuid NOT NULL,
IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_AzureADGroup ADD FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
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

CREATE TABLE SyncDS_DashboardDataSource(
	Id SERIAL primary key NOT NULL,
	DashboardItemId uuid NOT NULL,
	DataSourceName varchar(255) NOT NULL,
	DataSourceItemId uuid NOT NULL,
	VersionNumber int NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL DEFAULT 0)
;

ALTER TABLE SyncDS_DashboardDataSource  ADD FOREIGN KEY(DashboardItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DashboardDataSource  ADD FOREIGN KEY(DataSourceItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DashboardDataSource  ADD FOREIGN KEY(VersionNumber) REFERENCES SyncDS_ItemVersion (Id)
;

CREATE TABLE SyncDS_UserType(
	Id SERIAL primary key NOT NULL, 
	Type varchar(100) UNIQUE)
;

CREATE TABLE SyncDS_Homepage(
	Id uuid PRIMARY KEY NOT NULL,
	Name varchar(255) NOT NULL,
	UserId int NOT NULL,
	ItemInfo varchar(4000) NOT NULL,
	ItemType varchar(100) NOT NULL,
	IsDefaultHomepage smallint NOT NULL,
    CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_Homepage  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

CREATE TABLE SyncDS_HomepageItemFilter(
	Id SERIAL primary key NOT NULL,
	HomepageId uuid NOT NULL,
	FilterId int NOT NULL,
	QueryString varchar(4000) NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_HomepageItemFilter  ADD  FOREIGN KEY(HomepageId) REFERENCES SyncDS_Homepage (Id)
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

INSERT into SyncDS_SystemLogType (Name,IsActive) VALUES (N'Updated',1)
;

INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Updated',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into SyncDS_UserLogType (Name,IsActive) VALUES ( N'Changed',1)
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

INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All Reports',1,3,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Reports in Category',2,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific Report',0,3,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All Categories',1,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific Category',0,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All Data Sources',1,4,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific Data Source',0,4,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All Files',1,6,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific File',0,6,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All Schedules',1,7,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific Schedule',0,7,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All Dashboards',1,2,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Dashboards in Category',2,1,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific Dashboard',0,2,1)
;
insert into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) values(N'All Widgets',1,8,1)
;
insert into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) values(N'Specific Widget',0,8,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All Datasets',1,5,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific Dataset',0,5,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'Specific ItemView',0,9,1)
;
INSERT into SyncDS_PermissionEntity (Name,EntityType,ItemtypeId, IsActive) VALUES (N'All ItemViews',1,9,1)
;
INSERT into SyncDS_Group (Name,Description,Color,ModifiedDate,IsActive) VALUES (N'System Administrator','Has administrative rights for the dashboard server','#ff0000',current_timestamp(0), 1)
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

CREATE TABLE SyncDS_DBCredential(
    Id SERIAL primary key NOT NULL,
    DatabaseType varchar(255) NOT NULL,
    ConnectionString varchar(4000) NOT NULL,
    Status varchar(255) NOT NULL,
    ActiveStatusValue varchar(255) NOT NULL,
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
    IsActive smallint NOT NULL)
;


CREATE TABLE SyncDS_TableRelation(
    Id SERIAL primary key NOT NULL,
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
	Id SERIAL primary key NOT NULL,
	ParentDashboardId uuid NOT NULL,
	ChildDashboardId uuid NOT NULL,
	DashboardDesignerId uuid NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL DEFAULT 0)
;

ALTER TABLE SyncDS_MultiTabDashboard  ADD FOREIGN KEY(ParentDashboardId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_MultiTabDashboard  ADD FOREIGN KEY(ChildDashboardId) REFERENCES SyncDS_Item (Id)
;

CREATE TABLE SyncDS_DataNotification(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	Frequency int NULL,
	ConditionCategory int NOT NULL,
	PreviousValue text NULL,
    PreviousData text NULL,
	IsActive smallint NOT NULL,
	ColumnInfo text NOT NULL,
	ConditionInfo text NULL,
	ItemName varchar(255) NOT NULL)
;

ALTER TABLE SyncDS_DataNotification  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;

ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN IsDataChanges smallint NOT NULL default 0
;

ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN IsTimeInterval smallint NOT NULL default 0
;

CREATE TABLE SyncDS_ConditionCategory(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(255) NULL UNIQUE,
	IsActive smallint NOT NULL)
;

INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES ( N'Increases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES ( N'Continuously Increases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES ( N'Decreases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES ( N'Continuously Decreases',1)
;
INSERT into SyncDS_ConditionCategory (Name,IsActive) VALUES ( N'Value Changes',1)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES ( N'Hourly',1)
;

CREATE TABLE SyncDS_PermissionAccess(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	AccessId int NOT NULL,
	IsActive smallint NOT NULL )
;

CREATE TABLE SyncDS_PermissionAccEntity(
	Id SERIAL PRIMARY KEY NOT NULL,
	PermissionEntityId int NOT NULL,
	PermissionAccessId int NOT NULL,
	IsActive smallint NOT NULL )
;

ALTER TABLE SyncDS_PermissionAccEntity  ADD FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_PermissionAccEntity  ADD FOREIGN KEY(PermissionAccessId) REFERENCES SyncDS_PermissionAccess (Id)
;

INSERT into SyncDS_PermissionAccess (Name,AccessId,IsActive) VALUES ( N'Create',1,1)
;
INSERT into SyncDS_PermissionAccess (Name,AccessId,IsActive) VALUES ( N'Read',2,1)
;
INSERT into SyncDS_PermissionAccess (Name,AccessId,IsActive) VALUES ( N'Read, Write',6,1)
;
INSERT into SyncDS_PermissionAccess (Name,AccessId,IsActive) VALUES ( N'Read, Write, Delete',14,1)
;
INSERT into SyncDS_PermissionAccess (Name,AccessId,IsActive) VALUES ( N'Read, Download',18,1)
;
INSERT into SyncDS_PermissionAccess (Name,AccessId,IsActive) VALUES ( N'Read, Write, Download',22,1)
;
INSERT into SyncDS_PermissionAccess (Name,AccessId,IsActive) VALUES ( N'Read, Write, Delete, Download',30,1)
;

INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (4,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (6,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (10,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (12,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (13,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (15,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (12,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (13,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (14,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (4,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (5,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (10,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (11,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (15,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (16,2,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (4,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (5,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (10,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (11,3,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (4,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (5,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (10,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (11,4,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (12,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (13,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (14,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (15,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (16,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (6,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (7,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (9,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (12,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (13,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (14,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (15,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (16,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (6,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (7,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (9,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (12,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (13,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (14,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (6,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (7,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (9,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (15,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (16,7,1)
;

CREATE TABLE SyncDS_CustomExpression(
	Id SERIAL PRIMARY KEY NOT NULL,
	DashboardId uuid NOT NULL,
	WidgetId uuid NOT NULL,
	DatasourceId varchar(255) NOT NULL,
	UserId int NOT NULL,
	Name varchar(255) NOT NULL,
	Expression varchar(4000) NOT NULL,
	ColumnInfo varchar(4000) NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_CustomExpression  ADD FOREIGN KEY(DashboardId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_CustomExpression  ADD FOREIGN KEY(WidgetId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_CustomExpression  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;

INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,1,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (9,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (9,6,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (8,7,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId,PermissionAccessId,IsActive) VALUES (9,7,1)
;