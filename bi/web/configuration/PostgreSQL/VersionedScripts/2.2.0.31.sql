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

CREATE TABLE SyncDS_MultiDashboardMap(
	Id SERIAL primary key NOT NULL,
	ParentDashboardId uuid NOT NULL,
	ChildDashboardId uuid NOT NULL,
	DashboardDesignerId uuid NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL DEFAULT 0)
;

ALTER TABLE SyncDS_MultiDashboardMap  ADD FOREIGN KEY(ParentDashboardId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_MultiDashboardMap  ADD FOREIGN KEY(ChildDashboardId) REFERENCES SyncDS_Item (Id)
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

ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN EmailContent varchar(4000) NULL
;

ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN IsDataChanges smallint NOT NULL default 0
;

ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN IsTimeInterval smallint NOT NULL default 0
;

CREATE TABLE SyncDS_ConditionCategory(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(255) NULL,
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
ALTER TABLE SyncDS_ScheduleDetail ALTER COLUMN RecurrenceTypeId DROP NOT NULL
;
ALTER TABLE SyncDS_ScheduleDetail ALTER COLUMN RecurrenceInfo DROP NOT NULL
;
ALTER TABLE SyncDS_ScheduleDetail ALTER COLUMN StartDate DROP NOT NULL
;
ALTER TABLE SyncDS_ScheduleDetail ALTER COLUMN EndAfter DROP NOT NULL
;
ALTER TABLE SyncDS_ScheduleDetail ALTER COLUMN NextSchedule DROP NOT NULL
;
ALTER TABLE SyncDS_SAMLSettings ADD TenantName varchar(100)
;
ALTER TABLE SyncDS_SAMLSettings ADD MobileAppId varchar(100)
;
INSERT into SyncDS_RecurrenceType (Name,IsActive) VALUES (N'Hourly', 1)
;