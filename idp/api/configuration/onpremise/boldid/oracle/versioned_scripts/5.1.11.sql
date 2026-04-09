CREATE TABLE BOLDTC_TenantInactivity (
    Id VARCHAR2(36) PRIMARY KEY,
    TenantId VARCHAR2(36) NOT NULL,
    TenantInfoId VARCHAR2(36) NOT NULL,
    TenantType NUMBER NOT NULL,
    DNS VARCHAR2(255) NOT NULL,
    TenantIdentifier VARCHAR2(255) NOT NULL,
    Email VARCHAR2(255) NOT NULL,
    FirstName VARCHAR2(255) NOT NULL,
    LastName VARCHAR2(255) NOT NULL,
    LoggedInTime TIMESTAMP NOT NULL,
    ReminderEmailCount NUMBER NOT NULL,
    MarkedForSuspension NUMBER(1) NOT NULL,
    DeletionReminderSentOn TIMESTAMP NULL,
    IsPermanentlyDeleted NUMBER(1) NOT NULL,
    IsRecordsDeletedInMetaTables NUMBER(1) NOT NULL,
    IsActive NUMBER(1) NOT NULL
);