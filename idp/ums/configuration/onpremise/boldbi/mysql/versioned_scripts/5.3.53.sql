INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'CORS Settings', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='CORS Settings' LIMIT 1)
;

ALTER TABLE {database_name}.BOLDBI_ExternalSites ADD ModifiedById int NULL
;
ALTER TABLE {database_name}.BOLDBI_ExternalSites ADD ModifiedDate datetime NULL
;
ALTER TABLE {database_name}.BOLDBI_ExternalSites ADD SiteType int NOT NULL DEFAULT 0
;

ALTER TABLE {database_name}.BOLDBI_MultiTabDashboard ADD TabName varchar(255) NULL
;
ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD COLUMN Subject varchar(4000) NULL AFTER RecurrenceInfo
;

INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Look and Feel', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Look and Feel' LIMIT 1)
;

UPDATE {database_name}.BOLDBI_SettingsType SET Name='Data Process' WHERE Name = 'Data Store Settings'
;