INSERT INTO {database_name}.BOLDBI_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Users',1,12,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionEntity WHERE Name='All Users' LIMIT 1)
;

INSERT INTO {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 30,3,1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_PermissionAccEntity WHERE PermissionEntityId = 30 AND PermissionAccessId = 3 LIMIT 1)
;

DROP TABLE {database_name}.SyncDS_UploadDataSourceMapping
;

CREATE TABLE {database_name}.BOLDBI_UploadDataSourceMapping(
	Id int NOT NULL AUTO_INCREMENT,
	DownloadedTenantId char(38) NOT NULL,
	DownloadedItemId varchar(255) NOT NULL,
	UploadedItemId char(38) NOT NULL,
	UploadedDate datetime  NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

DROP TABLE {database_name}.ScheduleMissingLogs
;

CREATE TABLE {database_name}.BOLDBI_ScheduleMissingLogs(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId Char(38) NOT NULL,
	MissingType int NOT NULL,
	StartDate datetime NOT NULL,
	EndDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE  {database_name}.BOLDBI_ScheduleMissingLogs  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_ScheduleDetail (ScheduleId)
;