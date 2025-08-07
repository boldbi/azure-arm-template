CREATE TABLE [BOLDTC_TenantInactivity] (
    Id uniqueidentifier PRIMARY KEY,
    TenantId uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	TenantType int NOT NULL,
	DNS nvarchar(255) NOT NULL,
	TenantIdentifier nvarchar(255) NOT NULL,
    Email nvarchar(255) NOT NULL,
	FirstName nvarchar(255) NOT NULL,
	LastName nvarchar(255) NOT NULL,
	LoggedInTime datetime NOT NULL,
    ReminderEmailCount int NOT NULL,
    MarkedForSuspension bit NOT NULL,
    DeletionReminderSentOn datetime NULL,
    IsPermanentlyDeleted bit NOT NULL,
	IsRecordsDeletedInMetaTables bit NOT NULL,
    IsActive bit NOT NULL
);