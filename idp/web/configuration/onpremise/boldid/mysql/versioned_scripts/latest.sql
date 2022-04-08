ALTER TABLE {database_name}.BOLDTC_AzureBlob MODIFY COLUMN nvarchar(1024) NULL;

ALTER TABLE {database_name}.BOLDTC_TenantLog ADD OptionalData longtext NULL;