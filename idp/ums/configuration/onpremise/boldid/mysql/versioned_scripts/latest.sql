CREATE TABLE {database_name}.BOLDTC_TenantInactivity (
    Id char(38) PRIMARY KEY,
    TenantId char(38) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	TenantType int NOT NULL,
	DNS nvarchar(255) NOT NULL,
	TenantIdentifier nvarchar(255) NOT NULL,
    Email nvarchar(255) NOT NULL,
	FirstName nvarchar(255) NOT NULL,
	LastName nvarchar(255) NOT NULL,
    LoggedInTime datetime NOT NULL,
    ReminderEmailCount int NOT NULL,
    MarkedForSuspension tinyint(1) NOT NULL,
    DeletionReminderSentOn datetime NULL,
    IsPermanentlyDeleted tinyint(1) NOT NULL,
	IsRecordsDeletedInMetaTables tinyint(1) NOT NULL,
    IsActive tinyint(1) NOT NULL
);