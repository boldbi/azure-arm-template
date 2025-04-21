ALTER TABLE BOLDTC_TenantInfo ADD IsRowLevelSecurityEnabled NUMBER(1) DEFAULT 1 NOT NULL;

ALTER TABLE BOLDTC_AuthSettings ADD EncryptionValues NCLOB;