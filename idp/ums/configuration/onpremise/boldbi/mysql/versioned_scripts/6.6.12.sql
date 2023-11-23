UPDATE {database_name}.BOLDBI_SettingsType SET Name='Site Credentials' WHERE Id = 20
;

INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Site Credentials', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Site Credentials' LIMIT 1)
;

ALTER TABLE {database_name}.BOLDBI_ScheduleLog ADD RequestId Char(38) NULL
;

ALTER TABLE {database_name}.BOLDBI_ScheduleLog ADD LogExist tinyint NOT NULL DEFAULT 0
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

ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD UNIQUE (ScheduleId);

ALTER TABLE  {database_name}.BOLDBI_ScheduleMissingLogs  ADD FOREIGN KEY(ScheduleId) REFERENCES {database_name}.BOLDBI_ScheduleDetail (ScheduleId)
;