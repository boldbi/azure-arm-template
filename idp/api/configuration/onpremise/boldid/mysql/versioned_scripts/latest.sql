ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD IsRowLevelSecurityEnabled tinyint(1) NOT NULL DEFAULT 1;

ALTER TABLE {database_name}.BOLDTC_AuthSettings ADD EncryptionValues longtext;