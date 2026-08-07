CREATE TABLE SyncDS_ScheduleRunHistory(
	Id SERIAL PRIMARY KEY NOT NULL,
	ScheduleStatusId int NOT NULL,
	ScheduleId uuid NOT NULL,
	StartedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	Message text NULL,
	IsOnDemand smallint NOT NULL DEFAULT (0),
	IsActive smallint NOT NULL)
;

INSERT INTO SyncDS_ExportType (Name, IsActive) SELECT N'PPT', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_ExportType WHERE Name = N'PPT')
;
INSERT INTO SyncDS_ExportType (Name, IsActive) SELECT N'CSV', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_ExportType WHERE Name = N'CSV')
;