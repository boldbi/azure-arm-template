CREATE TABLE [BOLDTC_AzureBlob] (
	Id SERIAL NOT NULL,
	TenantInfoId uuid NOT NULL,
	AccountName varchar(4000) NOT NULL,
	AccessKey varchar(4000) NOT NULL,
	Uri varchar(4000) NOT NULL,
	ContainerName varchar(4000) NOT NULL,
	ConnectionType varchar(4000) NOT NULL,
	ConnectionString nvarchar(4000) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREBLOB PRIMARY KEY (Id)
)
;
ALTER TABLE  BOLDTC_AzureBlob  ADD CONSTRAINT  BOLDTC_AzureBlob_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_AzureBlob  VALIDATE CONSTRAINT  BOLDTC_AzureBlob_fk0
;
ALTER TABLE BOLDTC_TenantInfo ADD UseCustomBranding smallint NOT NULL DEFAULT 0
;
ALTER TABLE BOLDTC_TenantInfo ADD IsNewImDbDatabase smallint NOT NULL DEFAULT 0
;
ALTER TABLE BOLDTC_TenantInfo ADD IsNewDatabase smallint NOT NULL DEFAULT 0
;