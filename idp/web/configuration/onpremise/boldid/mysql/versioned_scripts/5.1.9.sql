CREATE TABLE {database_name}.BOLDTC_TenantStorageDetails (
    Id char(38) NOT NULL,
    TenantInfoId char(38) NOT NULL,
    StorageType int NOT NULL,
    ConnectionInfo nvarchar(1026),
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_TenantStorageDetails PRIMARY KEY (Id ASC)
);

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD StorageType int NOT NULL DEFAULT 0;

UPDATE {database_name}.BOLDTC_TenantInfo SET StorageType = 1 WHERE BlobConnectionString IS NOT NULL AND BlobConnectionString <> '';