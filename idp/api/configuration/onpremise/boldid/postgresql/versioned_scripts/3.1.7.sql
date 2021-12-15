ALTER TABLE BOLDTC_AuthSettings ALTER COLUMN CreatedBy DROP NOT NULL;
ALTER TABLE BOLDTC_AuthSettings ALTER COLUMN modifiedby DROP NOT NULL;

ALTER TABLE BOLDTC_CustomPlan ALTER COLUMN PlanInfo TYPE text;

INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'LinkedIn',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'Google',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'GitHub',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'Facebook',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'Twitter',1);
INSERT into BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'JWTSSO',1);


INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'JWTSSO', now() at time zone 'utc', 1);

INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'AzureAD', 3, now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'JWTSSO', 5, now() at time zone 'utc', 1);

ALTER TABLE BOLDTC_TenantInfo ADD MaintenanceDatabase varchar(255) NULL;
ALTER TABLE BOLDTC_TenantInfo ADD ImDbMaintenanceDatabase varchar(255) NULL;

CREATE TABLE IF NOT EXISTS BOLDTC_UserLog (
    Id SERIAL NOT NULL,
    LogAction varchar(255) NOT NULL,
    UserId uuid NULL,
    Message varchar(4000) NOT NULL,
    RequestedById uuid NULL,
    IpAddress varchar(100) NOT NULL,
    LogDate timestamp NOT NULL,
    ReferrerUrl varchar(4000) NULL,
    IsActive smallint NOT NULL,
    AdditionalData varchar(4000) NULL,
  CONSTRAINT PK_BOLDTC_UserLog PRIMARY KEY (Id),    
   CONSTRAINT BOLDTC_UserLog_fk1 FOREIGN KEY (UserId) REFERENCES BOLDTC_User(Id),
    CONSTRAINT BOLDTC_UserLog_fk2 FOREIGN KEY (RequestedById) REFERENCES BOLDTC_User(Id)
)

