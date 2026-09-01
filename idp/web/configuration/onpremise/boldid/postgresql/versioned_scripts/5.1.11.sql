CREATE TABLE BOLDTC_TenantInactivity (
    Id uuid PRIMARY KEY,
    TenantId uuid NOT NULL,
	TenantInfoId uuid NOT NULL,
    TenantType int NOT NULL,
	DNS VARCHAR(255) NOT NULL,
	TenantIdentifier VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
	FirstName VARCHAR(255) NOT NULL,
	LastName VARCHAR(255) NOT NULL,
	LoggedInTime TIMESTAMP NOT NULL,
    ReminderEmailCount INTEGER NOT NULL,
    MarkedForSuspension SMALLINT NOT NULL,
    DeletionReminderSentOn TIMESTAMP NULL,
    IsPermanentlyDeleted SMALLINT NOT NULL,
	IsRecordsDeletedInMetaTables SMALLINT NOT NULL,
    IsActive SMALLINT NOT NULL
);
ALTER TABLE  BOLDTC_AuthSettings ALTER COLUMN Settings Type varchar(4000);