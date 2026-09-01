INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'CORS Settings', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'CORS Settings')
;

ALTER TABLE SyncDS_ExternalSites ADD COLUMN ModifiedById int NULL
;
ALTER TABLE SyncDS_ExternalSites ADD COLUMN ModifiedDate timestamp NULL
;
ALTER TABLE SyncDS_ExternalSites ADD COLUMN SiteType int not null DEFAULT 0
;

ALTER TABLE SyncDS_MultiTabDashboard ADD COLUMN TabName varchar(255) NULL
;

ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN Subject varchar(4000) NULL
;

INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Look and Feel', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Look and Feel')
;

UPDATE SyncDS_SettingsType SET Name='Data Process' WHERE Name = 'Data Store Settings'
;