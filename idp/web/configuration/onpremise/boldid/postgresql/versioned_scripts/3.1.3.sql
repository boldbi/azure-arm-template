INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES( N'DefaultAuth', now() at time zone 'utc', 1);

ALTER TABLE BOLDTC_AuthSettings
ADD COLUMN IsDefaultAuthentication smallint NOT NULL DEFAULT '0';