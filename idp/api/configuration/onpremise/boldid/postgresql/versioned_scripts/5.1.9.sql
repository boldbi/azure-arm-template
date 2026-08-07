CREATE TABLE BOLDTC_TenantStorageDetails (
    Id uuid NOT NULL,
    TenantInfoId uuid NOT NULL,
    StorageType INT NOT NULL,
    ConnectionInfo VARCHAR(1026),
    CreatedDate TIMESTAMP NOT NULL,
    ModifiedDate TIMESTAMP NOT NULL,
    IsActive smallint NOT NULL,
    CONSTRAINT PK_BOLDTC_TenantStorageDetails PRIMARY KEY (Id)
);

ALTER TABLE BOLDTC_TenantInfo ADD COLUMN IF NOT EXISTS StorageType INT NOT NULL DEFAULT 0;

UPDATE BOLDTC_TenantInfo
SET StorageType = 1
WHERE StorageType = 0
  AND BlobConnectionString IS NOT NULL
  AND BlobConnectionString <> '';