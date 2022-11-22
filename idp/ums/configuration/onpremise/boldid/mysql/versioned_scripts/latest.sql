CREATE TABLE {database_name}.BOLDTC_UserToken (
    Id char(38) NOT NULL,
    UserId char(38) NOT NULL,
    Name nvarchar(255) NOT NULL,
	Value nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_UserToken PRIMARY KEY (Id ASC) 
)
;

ALTER TABLE {database_name}.BOLDTC_User ADD IsMfaEnabled tinyint(1) NOT NULL DEFAULT 0;

ALTER TABLE {database_name}.BOLDTC_User ADD MfaType int NULL;

CREATE TABLE {database_name}.BOLDTC_MfaType (
	Id int NOT NULL AUTO_INCREMENT,
	Type nvarchar(100) NOT NULL,
        Value int NOT NULL UNIQUE,
        CreatedDate datetime NOT NULL,
        ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_MFATYPE PRIMARY KEY (Id ASC) 
)
;


INSERT {database_name}.BOLDTC_MfaType (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Authenticator', 1, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_MfaType (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Email', 2, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_MfaType (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'SMS', 3, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);

ALTER TABLE {database_name}.BOLDTC_User ADD CONSTRAINT BOLDTC_User_fk2 FOREIGN KEY (MfaType) REFERENCES {database_name}.BOLDTC_MfaType(Value)
;

ALTER TABLE {database_name}.BOLDTC_UserLog ADD Source int NULL;

CREATE TABLE {database_name}.BOLDTC_Source (
	Id int NOT NULL AUTO_INCREMENT,
	Type nvarchar(100) NOT NULL,
        Value int NOT NULL UNIQUE,
        CreatedDate datetime NOT NULL,
        ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_SOURCE PRIMARY KEY (Id ASC) 
)
;

INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Identity Provider Web', 1, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Identity Provider API', 2, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Tenant Management Web', 3, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Dashboard Server Web', 4, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Dashboard Server API', 5, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Dashboard Server Jobs', 6, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Report Server Web', 7, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Report Server API', 8, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Report Server Jobs', 9, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Source (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Admin Utility', 10, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);

ALTER TABLE {database_name}.BOLDTC_UserLog ADD CONSTRAINT BOLDTC_UserLog_fk3 FOREIGN KEY (Source) REFERENCES {database_name}.BOLDTC_Source(Value)
;

CREATE TABLE {database_name}.BOLDTC_EmailActivityLog (
	Id int NOT NULL AUTO_INCREMENT,
	Event nvarchar(255) NOT NULL,
	RecipientEmail nvarchar(255) NOT NULL,
	SenderEmail nvarchar(255) NOT NULL,
	MailSubject nvarchar(255) NOT NULL,
	MailBody nvarchar(1024) NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NULL,
	InitiatedBy char(38) NULL,
	UserId char(38) NULL,
	Status int NOT NULL,
	StatusMessage nvarchar(1024) NULL,
	IsActive tinyint(1) NOT NULL,
	CONSTRAINT PK_BOLDTC_EMAILACTIVITYLOG PRIMARY KEY (Id ASC) 
	)
;

ALTER TABLE {database_name}.BOLDTC_EmailActivityLog ADD CONSTRAINT BOLDTC_EmailActivityLog_fk0 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id)
;
