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
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_PublishJobs(
    Id SERIAL primary key NOT NULL,
	PublishId uuid NOT NULL,
    UserId int NOT NULL,
	JobDetails varchar(4000) NOT NULL,
	CreatedDate timestamp NOT NULL,
	CompletedDate timestamp NOT NULL,
	Status varchar(255) NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_DeploymentDashboards(
    Id SERIAL primary key NOT NULL,
	ItemId uuid NOT NULL,
	ItemName varchar(255) NOT NULL,
	CategoryName varchar(255) NOT NULL,
	IsDashboardLocked smallint NOT NULL,
	IsDatasourceLocked smallint NOT NULL,
    Description varchar(1026) NULL,
    CreatedById int NOT NULL,
    CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
    IsActive smallint NOT NULL)
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

ALTER TABLE SyncDS_UserPreference ADD IsolationCode varchar(4000) NULL
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.IsolationCode',N'DashboardSettings.IsolationCode',now() at time zone 'utc',1)
;

ALTER TABLE SyncDS_Group ADD IsolationCode varchar(4000) NULL
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

ALTER TABLE SyncDS_ScheduleLog ADD Message text NULL
;

ALTER TABLE SyncDS_DataNotification DROP COLUMN Frequency
;
ALTER TABLE SyncDS_DataNotification DROP COLUMN ConditionCategory
;
ALTER TABLE SyncDS_DataNotification DROP COLUMN PreviousValue
;
ALTER TABLE SyncDS_DataNotification DROP COLUMN PreviousData
;
ALTER TABLE SyncDS_DataNotification DROP COLUMN ColumnInfo
;
ALTER TABLE SyncDS_DataNotification DROP COLUMN ConditionInfo
;
ALTER TABLE SyncDS_DataNotification DROP COLUMN ItemName
;

ALTER TABLE SyncDS_DataNotification ADD DataSourceId uuid NULL
;
ALTER TABLE SyncDS_DataNotification ADD DaJsonString text NOT NULL
;
ALTER TABLE SyncDS_DataNotification ADD FilterData text NOT NULL
;

CREATE TABLE SyncDS_UserDataNotification(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	UserId int NOT NULL,
	FilterData text NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_DataNotification ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_DataNotification ADD FOREIGN KEY(DataSourceId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_UserDataNotification ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_Item (Id)
;

CREATE TABLE SyncDS_ExternalSites(
    Id SERIAL primary key NOT NULL,
	Name varchar(255) NOT NULL,
	ClientId varchar(255) NOT NULL,
	ClientSecret varchar(255) NULL,
	SiteURL varchar(255) NULL,
	CreatedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_ExternalSites ADD FOREIGN KEY(CreatedById) REFERENCES SyncDS_User (Id)
;

Update SyncDS_UserPermission set PermissionEntityId = 19 Where PermissionEntityId = 9
;

Update SyncDS_GroupPermission set PermissionEntityId = 19 Where PermissionEntityId = 9
;

ALTER TABLE SyncDS_Item ADD IsLocked smallint NOT NULL DEFAULT 0
;