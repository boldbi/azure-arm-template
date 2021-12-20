CREATE TABLE [BOLDTC_AzureBlob] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	AccountName nvarchar(max) NOT NULL,
	AccessKey nvarchar(max) NOT NULL,
	Uri nvarchar(max) NOT NULL,
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
ALTER TABLE [BOLDTC_TenantInfo] ADD [UseCustomBranding] bit NOT NULL DEFAULT 0
;
ALTER TABLE [BOLDTC_TenantInfo] ADD [IsNewImDbDatabase] bit NOT NULL DEFAULT 0
;
ALTER TABLE [BOLDTC_TenantInfo] ADD [IsNewDatabase] bit NOT NULL DEFAULT 0
;