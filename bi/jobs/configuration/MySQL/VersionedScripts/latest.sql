ALTER TABLE {database_name}.SyncDS_ConditionCategory MODIFY  Name varchar(255) NULL
;
ALTER TABLE {database_name}.SyncDS_ItemCommentLogType ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_ConditionCategory ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_ExportType ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_ItemLogType ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_ItemType ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_PermissionEntity ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_RecurrenceType ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_SystemLogType ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_UserLogType ADD CONSTRAINT UNIQUE (Name)
;
ALTER TABLE {database_name}.SyncDS_UserType ADD CONSTRAINT UNIQUE (Type)
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

INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,1,1), (6,1,1), (10,1,1), (12,1,1), (13,1,1), (15,1,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,2,1), (13,2,1), (14,2,1), (4,2,1), (5,2,1), (10,2,1), (11,2,1), (15,2,1), (16,2,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,3,1), (5,3,1), (10,3,1), (11,3,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (4,4,1), (5,4,1), (10,4,1), (11,4,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1), (13,5,1), (14,5,1), (15,5,1), (16,5,1), (6,5,1), (7,5,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,6,1), (13,6,1), (14,6,1), (15,6,1), (16,6,1), (6,6,1), (7,6,1)
;
INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,7,1), (13,7,1), (14,7,1), (6,7,1), (7,7,1), (15,7,1), (16,7,1)
;

INSERT into {database_name}.SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,1,1), (8,5,1), (9,5,1), (8,6,1), (9,6,1), (8,7,1), (9,7,1)
;

UPDATE {database_name}.SyncDS_UserPermission SET PermissionAccessId='18' WHERE PermissionAccessId='2' AND PermissionEntityId NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE {database_name}.SyncDS_UserPermission SET PermissionAccessId='22' WHERE PermissionAccessId='6' AND PermissionEntityId NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE {database_name}.SyncDS_UserPermission SET PermissionAccessId='30' WHERE PermissionAccessId='14' AND PermissionEntityId NOT IN ('4', '5', '10', '11', '19', '20')
;

UPDATE {database_name}.SyncDS_GroupPermission SET PermissionAccessId='18' WHERE PermissionAccessId='2' AND PermissionEntityId NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE {database_name}.SyncDS_GroupPermission SET PermissionAccessId='22' WHERE PermissionAccessId='6' AND PermissionEntityId NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE {database_name}.SyncDS_GroupPermission SET PermissionAccessId='30' WHERE PermissionAccessId='14' AND PermissionEntityId NOT IN ('4', '5', '10', '11', '19', '20')
;

RENAME TABLE {database_name}.SyncDS_MultiDashboardMap TO {database_name}.SyncDS_MultiTabDashboard
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