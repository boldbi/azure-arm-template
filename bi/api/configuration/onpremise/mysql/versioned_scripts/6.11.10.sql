CREATE TABLE {database_name}.BOLDBI_ScheduleRunHistory(
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleStatusId int NOT NULL,
	ScheduleId Char(38) NOT NULL,
	StartedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	Message text NULL,
	IsOnDemand tinyint NOT NULL DEFAULT 0,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

INSERT INTO {database_name}.BOLDBI_ExportType (Name, IsActive) SELECT 'PPT', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_ExportType WHERE Name='PPT' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_ExportType (Name, IsActive) SELECT 'CSV', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_ExportType WHERE Name='CSV' LIMIT 1)
;