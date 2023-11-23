UPDATE SyncDS_SettingsType SET Name='Site Credentials' WHERE Id = 20
;

INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Site Credentials', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Site Credentials')
;

ALTER TABLE SyncDS_ScheduleLog ADD COLUMN RequestId uuid NULL
;

ALTER TABLE SyncDS_ScheduleLog ADD COLUMN LogExist smallint NOT NULL default 0
;

CREATE TABLE SyncDS_ScheduleMissingLogs(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleId uuid NOT NULL,
	MissingType int NOT NULL,
	StartDate timestamp NOT NULL,
	EndDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_ScheduleDetail ADD UNIQUE (ScheduleId);

ALTER TABLE SyncDS_ScheduleMissingLogs  ADD FOREIGN KEY(ScheduleId) REFERENCES SyncDS_ScheduleDetail (ScheduleId)
;