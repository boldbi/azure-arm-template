CREATE TABLE [BOLDTC_TenantStorageDetails] (
    Id uniqueidentifier NOT NULL,
    TenantInfoId uniqueidentifier NOT NULL,
    StorageType int NOT NULL,
    ConnectionInfo nvarchar(1026),
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive bit NOT NULL,
    CONSTRAINT [PK_BOLDTC_TenantStorageDetails] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'BOLDTC_TenantInfo' AND COLUMN_NAME = 'StorageType')
BEGIN
ALTER TABLE [BOLDTC_TenantInfo] ADD [StorageType] INT NOT NULL DEFAULT 0
END;

IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'BOLDTC_TenantInfo' AND COLUMN_NAME = 'StorageType') AND EXISTS (SELECT 1 FROM BOLDTC_TenantInfo WHERE StorageType = 0)
BEGIN
UPDATE BOLDTC_TenantInfo
SET StorageType = 1
WHERE BlobConnectionString IS NOT NULL AND BlobConnectionString <> ''
END;

