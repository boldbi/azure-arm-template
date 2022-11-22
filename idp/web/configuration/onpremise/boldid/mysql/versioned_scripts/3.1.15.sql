CREATE TABLE [BOLDTC_AzureBlob] (
	Id int NOT NULL AUTO_INCREMENT,
	TenantInfoId char(38) NOT NULL,
	AccountName nvarchar(max) NOT NULL,
	AccessKey nvarchar(max) NOT NULL,
	Uri nvarchar(max) NOT NULL,
	ContainerName nvarchar(max) NOT NULL,
	ConnectionType nvarchar(max) NOT NULL,
	ConnectionString nvarchar(max) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREBLOB PRIMARY KEY (Id ASC)
)
;

ALTER TABLE {database_name}.BOLDTC_AzureBlob ADD CONSTRAINT BOLDTC_AzureBlob_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;
ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD UseCustomBranding tinyint NOT NULL DEFAULT 0
;
ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD IsNewImDbDatabase tinyint NOT NULL DEFAULT 0
;
ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD IsNewDatabase tinyint NOT NULL DEFAULT 0
;