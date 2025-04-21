INSERT INTO {database_name}.BOLDBI_ItemLogType (Name, IsActive) SELECT 'Downloaded', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_ItemLogType WHERE Name='Downloaded' LIMIT 1)
;