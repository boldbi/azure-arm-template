ALTER TABLE BOLDTC_TenantInfo ADD IsRowLevelSecurityEnabled smallint NOT NULL DEFAULT 1
;

ALTER TABLE BOLDTC_AuthSettings ADD EncryptionValues text
;
