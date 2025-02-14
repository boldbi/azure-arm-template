IF NOT EXISTS (SELECT * FROM   INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'BOLDTC_TenantSettings')
BEGIN
CREATE TABLE [BOLDTC_TenantSettings] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	Settings nvarchar(max) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_BOLDTC_TenantSettings] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)

ALTER TABLE [BOLDTC_TenantSettings] WITH CHECK ADD CONSTRAINT [BOLDTC_TenantSettings_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [BOLDTC_TenantInfo]([Id])
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'BOLDTC_TenantInfo' AND COLUMN_NAME = 'AdditionalParameters')
BEGIN
    ALTER TABLE [BOLDTC_TenantInfo] ADD [AdditionalParameters] nvarchar(max) NULL
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'BOLDTC_TenantInfo' AND COLUMN_NAME = 'ImDbAdditionalParameters')
BEGIN
    ALTER TABLE [BOLDTC_TenantInfo] ADD [ImDbAdditionalParameters] nvarchar(max) NULL
END;
