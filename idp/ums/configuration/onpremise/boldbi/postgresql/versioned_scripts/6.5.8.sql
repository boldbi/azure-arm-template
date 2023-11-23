CREATE TABLE SyncDS_PublishType(
	Id SERIAL primary key NOT NULL,
	Name varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL)
;

INSERT INTO SyncDS_PublishType (Name, IsActive) Values (N'Publish',1)
;

INSERT INTO SyncDS_PublishType (Name, IsActive) Values (N'Lock',1)
;

INSERT INTO SyncDS_PublishType (Name, IsActive) Values (N'Unlock',1)
;

ALTER TABLE SyncDS_PublishJobs ADD COLUMN Type int not null DEFAULT 1
;

ALTER TABLE SyncDS_PublishJobs  ADD FOREIGN KEY(Type) REFERENCES SyncDS_PublishType (Id)
;