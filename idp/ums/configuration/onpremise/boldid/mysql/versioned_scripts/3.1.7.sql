ALTER TABLE {database_name}.BOLDTC_AuthSettings MODIFY COLUMN ModifiedBy char(38) NULL;
ALTER TABLE {database_name}.BOLDTC_AuthSettings MODIFY COLUMN CreatedBy char(38) NULL;

INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'LinkedIn',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Google',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'GitHub',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Facebook',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Twitter',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'JWTSSO',1);

INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'JWTSSO', UTC_TIMESTAMP(), 1);

INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'AzureAD', 3, UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'JWTSSO', 5, UTC_TIMESTAMP(), 1);

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD MaintenanceDatabase char(255) NULL;
ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD ImDbMaintenanceDatabase char(255) NULL;

CREATE TABLE IF NOT EXISTS {database_name}.BOLDTC_UserLog
   (
  	Id int NOT NULL AUTO_INCREMENT, 
	LogAction nvarchar(255) NOT NULL,
	UserId char(38) NOT NULL,
	Message longtext NOT NULL,
	RequestedById char(38) NOT NULL,
	IpAddress nvarchar(100) NOT NULL,
	LogDate datetime NOT NULL,
	ReferrerUrl longtext NULL,
	IsActive tinyint(1) NOT NULL,
	AdditionalData longtext NULL,
  CONSTRAINT PK_BOLDTC_USERLOG PRIMARY KEY (Id ASC),
  CONSTRAINT BOLDTC_UserLog_fk1 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id),
  CONSTRAINT BOLDTC_UserLog_fk2 FOREIGN KEY (RequestedById) REFERENCES {database_name}.BOLDTC_User(Id)
);


