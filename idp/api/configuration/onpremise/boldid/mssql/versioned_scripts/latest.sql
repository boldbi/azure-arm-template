IF NOT EXISTS (SELECT * FROM   INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'BOLDTC_AzureBlob')
BEGIN
CREATE TABLE [BOLDTC_AzureBlob] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	AccountName nvarchar(max) NOT NULL,
	AccessKey nvarchar(max) NOT NULL,
	Uri nvarchar(max) NULL,
	ContainerName nvarchar(max) NOT NULL,
	ConnectionType nvarchar(max) NOT NULL,
	ConnectionString nvarchar(max) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_BOLDTC_AzureBlob] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
;
ALTER TABLE [BOLDTC_AzureBlob] WITH CHECK ADD CONSTRAINT [BOLDTC_AzureBlob_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [BOLDTC_TenantInfo]([Id])
;
END;