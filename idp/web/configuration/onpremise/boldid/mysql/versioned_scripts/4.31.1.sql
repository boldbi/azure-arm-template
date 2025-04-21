ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD COLUMN ResourceLimitationSettings LONGTEXT;

ALTER TABLE {database_name}.BOLDTC_User ADD COLUMN ActivationMethod nvarchar(20) NULL;
