CREATE TABLE {database_name}.BOLDTC_UmsConfiguration (
    Id int NOT NULL AUTO_INCREMENT,
	SystemKey nvarchar(255) NOT NULL UNIQUE,
	SystemValue nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	CONSTRAINT PK_BOLDTC_UmsConfiguration PRIMARY KEY (Id)
);

CREATE TABLE {database_name}.BOLDTC_BiConfiguration (
    Id int NOT NULL AUTO_INCREMENT,
	SystemKey nvarchar(255) NOT NULL UNIQUE,
	SystemValue nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	CONSTRAINT PK_BOLDTC_BiConfiguration PRIMARY KEY (Id)
);

ALTER TABLE {database_name}.BOLDTC_TenantInactivity CHANGE COLUMN IsRecordsDeletedInMetaTables IsImdbTablesDeleted tinyint(1) NOT NULL;