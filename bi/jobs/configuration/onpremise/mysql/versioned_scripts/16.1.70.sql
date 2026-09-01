ALTER TABLE {database_name}.BOLDBI_Group ADD IsAdminGroup tinyint(1) NOT NULL default 0;

UPDATE {database_name}.BOLDBI_Group SET IsAdminGroup = 1 WHERE Name = 'System Administrator';