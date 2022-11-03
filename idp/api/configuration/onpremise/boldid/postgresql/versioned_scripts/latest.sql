ALTER TABLE BOLDTC_User ADD Status int NULL;

CREATE TABLE BOLDTC_UserStatus (
	Id SERIAL NOT NULL,
	Status varchar(100) NOT NULL,
        Value int NOT NULL UNIQUE,
        CreatedDate timestamp NOT NULL,
        ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_USERSTATUS PRIMARY KEY (Id)
)
;

INSERT into BOLDTC_UserStatus  (Status, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'NotActivated', 0, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_UserStatus  (Status, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Activated', 1, now() at time zone 'utc', now() at time zone 'utc', 1);
INSERT into BOLDTC_UserStatus  (Status, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Locked', 2, now() at time zone 'utc', now() at time zone 'utc', 1);


ALTER TABLE  BOLDTC_User  ADD CONSTRAINT  BOLDTC_User_fk1  FOREIGN KEY ( Status ) REFERENCES  BOLDTC_UserStatus ( Value )
;
ALTER TABLE  BOLDTC_User  VALIDATE CONSTRAINT  BOLDTC_User_fk1
;
