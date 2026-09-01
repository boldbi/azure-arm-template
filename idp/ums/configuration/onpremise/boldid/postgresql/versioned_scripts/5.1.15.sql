CREATE TABLE BOLDTC_UmsConfiguration (
    Id SERIAL,
    SystemKey varchar(255) NOT NULL UNIQUE,
	SystemValue varchar(4000),
	ModifiedDate timestamp NOT NULL,
	CONSTRAINT PK_BOLDTC_UmsConfiguration PRIMARY KEY (Id)
);

CREATE TABLE BOLDTC_BiConfiguration (
    Id SERIAL,
    SystemKey varchar(255) NOT NULL UNIQUE,
	SystemValue varchar(4000),
	ModifiedDate timestamp NOT NULL,
	CONSTRAINT PK_BOLDTC_BiConfiguration PRIMARY KEY (Id)
);

ALTER TABLE BOLDTC_TenantInactivity RENAME COLUMN IsRecordsDeletedInMetaTables TO IsImdbTablesDeleted;
