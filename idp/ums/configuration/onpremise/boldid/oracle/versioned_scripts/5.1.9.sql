CREATE TABLE BOLDTC_TenantStorageDetails (
    Id VARCHAR2(36) NOT NULL,
    TenantInfoId VARCHAR2(36) NOT NULL,
    StorageType NUMBER NOT NULL,
    ConnectionInfo CLOB,
    CreatedDate TIMESTAMP NOT NULL,
    ModifiedDate TIMESTAMP NOT NULL,
    IsActive NUMBER(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_TenantStorageDetails PRIMARY KEY (Id)
); 

ALTER TABLE BOLDTC_TenantInfo ADD StorageType NUMBER DEFAULT 0 NOT NULL;


UPDATE BOLDTC_TenantInfo SET StorageType = 1 WHERE StorageType = 0 AND BlobConnectionString IS NOT NULL AND TO_CHAR(BlobConnectionString) <> '';