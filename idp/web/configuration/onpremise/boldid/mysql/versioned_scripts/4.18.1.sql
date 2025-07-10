CREATE TABLE IF NOT EXISTS {database_name}.BOLDTC_TenantSettings (
	Id int NOT NULL AUTO_INCREMENT,
	TenantInfoId char(38) NOT NULL,
	Settings longtext NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTSETTINGS PRIMARY KEY (Id ASC),
  CONSTRAINT BOLDTC_TenantSettings_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
)
;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD AdditionalParameters longtext NULL
;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD ImDbAdditionalParameters longtext NULL
;