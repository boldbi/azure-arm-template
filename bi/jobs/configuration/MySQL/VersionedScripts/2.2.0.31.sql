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

CREATE TABLE {database_name}.SyncDS_MultiDashboardMap(
	Id int NOT NULL AUTO_INCREMENT,
	ParentDashboardId char(38) NOT NULL,
    ChildDashboardId char(38) NOT NULL,
    DashboardDesignerId char(38) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_MultiDashboardMap  ADD FOREIGN KEY(ParentDashboardId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_MultiDashboardMap  ADD FOREIGN KEY(ChildDashboardId) REFERENCES {database_name}.SyncDS_Item (Id)
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

ALTER TABLE {database_name}.SyncDS_ScheduleDetail ADD EmailContent varchar(4000) NULL
;

ALTER TABLE {database_name}.SyncDS_ScheduleDetail ADD IsDataChanges tinyint(1) NOT NULL default 0
;

ALTER TABLE {database_name}.SyncDS_ScheduleDetail ADD IsTimeInterval tinyint(1) NOT NULL default 0
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail MODIFY  RecurrenceTypeId int NULL
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail MODIFY  RecurrenceInfo varchar(4000) NULL
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail MODIFY  StartDate datetime NULL
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail MODIFY  EndAfter int NULL DEFAULT 0
;
ALTER TABLE {database_name}.SyncDS_ScheduleDetail MODIFY  NextSchedule datetime NULL
;

CREATE TABLE {database_name}.SyncDS_ConditionCategory(
	Id int AUTO_INCREMENT NOT NULL,
	Name varchar(255) NULL,
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

ALTER TABLE {database_name}.SyncDS_SAMLSettings ADD MobileAppId VARCHAR(100)
;
INSERT into {database_name}.SyncDS_RecurrenceType (Name,IsActive) VALUES ('Hourly', 1)
;