CREATE TABLE BOLDTC_UserToken (
    Id uuid NOT NULL,
    UserId uuid NOT NULL,
    Name varchar(255) NOT NULL,
	Value varchar(255) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_UserToken PRIMARY KEY (Id)
)
;

ALTER TABLE BOLDTC_User ADD IsMfaEnabled smallint NOT NULL DEFAULT '0';

ALTER TABLE BOLDTC_User ADD MfaType int NULL;

CREATE TABLE BOLDTC_MfaType (
	Id SERIAL NOT NULL,
	Type varchar(100) NOT NULL,
        Value int NOT NULL UNIQUE,
        CreatedDate timestamp NOT NULL,
        ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_MFATYPE PRIMARY KEY (Id)
)
;

INSERT into BOLDTC_MfaType  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Authenticator', 1, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_MfaType  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Email', 2, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_MfaType  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'SMS', 3, now() at time zone 'utc', now() at time zone 'utc', 1);

ALTER TABLE  BOLDTC_User  ADD CONSTRAINT  BOLDTC_User_fk2  FOREIGN KEY ( MfaType ) REFERENCES  BOLDTC_MfaType ( Value )
;
ALTER TABLE  BOLDTC_User  VALIDATE CONSTRAINT  BOLDTC_User_fk2
;

ALTER TABLE BOLDTC_UserLog ADD Source int NULL;

CREATE TABLE BOLDTC_Source (
	Id SERIAL NOT NULL,
	Type varchar(100) NOT NULL,
        Value int NOT NULL UNIQUE,
        CreatedDate timestamp NOT NULL,
        ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SOURCE PRIMARY KEY (Id)
)
;

INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Identity Provider Web', 1, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Identity Provider API', 2, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Tenant Management Web', 3, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Dashboard Server Web', 4, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Dashboard Server API', 5, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Dashboard Server Jobs', 6, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Report Server Web', 7, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Report Server API', 8, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Report Server Jobs', 9, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_Source  (Type, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Admin Utility', 10, now() at time zone 'utc', now() at time zone 'utc', 1);

ALTER TABLE  BOLDTC_UserLog  ADD CONSTRAINT  BOLDTC_UserLog_fk3  FOREIGN KEY ( Source ) REFERENCES  BOLDTC_Source ( Value )
;
ALTER TABLE  BOLDTC_UserLog  VALIDATE CONSTRAINT  BOLDTC_UserLog_fk3
;

CREATE TABLE BOLDTC_EmailActivityLog(
	Id SERIAL NOT NULL,
	Event varchar NOT NULL,
	RecipientEmail varchar(255) NOT NULL,
	SenderEmail varchar(255) NOT NULL,
	MailSubject varchar(255) NOT NULL,
	MailBody text NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NULL,
	InitiatedBy uuid NULL,
	UserId uuid NULL,
	Status int NOT NULL,
	StatusMessage text NULL,
	IsActive smallint NOT NULL,
	CONSTRAINT PK_BOLDTC_EMAILACTIVITYLOG PRIMARY KEY (Id) 
	)
;

ALTER TABLE BOLDTC_EmailActivityLog  ADD CONSTRAINT BOLDTC_EmailActivityLog_fk0 FOREIGN KEY (UserId) REFERENCES BOLDTC_User(Id)
;