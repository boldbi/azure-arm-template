ALTER TABLE {database_name}.BOLDBI_Group ADD COLUMN GroupLogo varchar(1026) NULL;
ALTER TABLE {database_name}.BOLDBI_Item ADD COLUMN PublishedDate datetime NULL;

INSERT INTO {database_name}.BOLDBI_ExportType (Name, IsActive) SELECT 'DatasourceCache', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_ExportType WHERE Name='DatasourceCache' LIMIT 1)
;