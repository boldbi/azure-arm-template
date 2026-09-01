CREATE TABLE IF NOT EXISTS BOLDTC_AzureBlob (
    Id SERIAL NOT NULL,
    TenantInfoId uuid NOT NULL,
    AccountName varchar(4000) NOT NULL,
    AccessKey varchar(4000) NOT NULL,
    Uri varchar(4000) NULL,
    ContainerName varchar(4000) NOT NULL,
    ConnectionType varchar(4000) NOT NULL,
    ConnectionString varchar(4000) NOT NULL,
    CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
    IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREBLOB PRIMARY KEY (Id),
  CONSTRAINT  BOLDTC_AzureBlob_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
)
;