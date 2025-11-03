CREATE TABLE [BOLDTC_UmsConfiguration] (
    Id int IDENTITY(1,1) NOT NULL,
	SystemKey nvarchar(255) NOT NULL UNIQUE,
	SystemValue nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	CONSTRAINT PK_BOLDTC_UmsConfiguration PRIMARY KEY (Id)
);

CREATE TABLE [BOLDTC_BiConfiguration] (
    Id int IDENTITY(1,1) NOT NULL,
	SystemKey nvarchar(255) NOT NULL UNIQUE,
	SystemValue nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	CONSTRAINT PK_BOLDTC_BiConfiguration PRIMARY KEY (Id)
);

ALTER TABLE [BOLDTC_TenantInactivity] DROP COLUMN IsRecordsDeletedInMetaTables;

ALTER TABLE [BOLDTC_TenantInactivity] ADD IsImdbTablesDeleted bit NOT NULL;