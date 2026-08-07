CREATE TABLE SyncDS_UserSession(
	Id uuid primary key NOT NULL,
	IdpReferenceId uuid NOT NULL,
	SessionId uuid NOT NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	IpAddress varchar(255) NULL,
	Browser varchar(1024) NULL,
	LoggedInTime timestamp NULL,
	LastActive timestamp NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_Item ADD COLUMN IsUploadDraft smallint NOT NULL default 0
;

CREATE TABLE SyncDS_BackgroundJobs(
	Id SERIAL primary key NOT NULL,
	JobType int NOT NULL,
	ItemId uuid NULL,
	UserId int NULL,
	JobDetails text NULL,
	CreatedDate timestamp NOT NULL,
	CompletedDate timestamp NOT NULL,
	Status varchar(255) NOT NULL,
	StatusMessage varchar(255) NULL,
	ResourceInfo text NULL,
	CanIncludeSensitiveInfo smallint NULL,
	IsSampleData smallint NULL,
	IsActive smallint NOT NULL)
;