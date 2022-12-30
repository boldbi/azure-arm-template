CREATE TABLE {database_name}.BOLDBI_UserSession(
	Id Char(38) NOT NULL,
	IdpReferenceId Char(38) NOT NULL,
	SessionId Char(38) NOT NULL,
	DirectoryTypeId int NOT NULL DEFAULT 0,
	IpAddress varchar(255) NOT NULL,
	Browser varchar(255) NULL,
	LoggedInTime datetime NOT NULL,
	LastActive datetime NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.BOLDBI_Item ADD IsUploadDraft tinyint NOT NULL DEFAULT 0
;

CREATE TABLE {database_name}.BOLDBI_BackgroundJobs(
    Id int NOT NULL AUTO_INCREMENT,
    JobType varchar(100) NOT NULL,
    ItemId Char(38) NULL,
    UserId int NULL,
    JobDetails text NOT NULL,
    CreatedDate datetime NOT NULL,
    CompletedDate datetime NOT NULL,
    Status varchar(255) NOT NULL,
	ResourceInfo text NULL,
	CanIncludeSensitiveInfo tinyint NOT NULL,
    IsActive tinyint NOT NULL,
    PRIMARY KEY (Id))
;