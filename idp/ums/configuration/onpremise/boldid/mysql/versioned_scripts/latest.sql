CREATE TABLE IF NOT EXISTS {database_name}.BOLDTC_AzureBlob (
	Id int NOT NULL AUTO_INCREMENT,
	TenantInfoId char(38) NOT NULL,
	AccountName nvarchar(1024) NOT NULL,
	AccessKey nvarchar(1024) NOT NULL,
	Uri nvarchar(1024) NULL,
	ContainerName nvarchar(1024) NOT NULL,
	ConnectionType nvarchar(1024) NOT NULL,
	ConnectionString nvarchar(4000) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREBLOB PRIMARY KEY (Id ASC)
)
;

ALTER TABLE {database_name}.BOLDTC_AzureBlob ADD CONSTRAINT BOLDTC_AzureBlob_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;