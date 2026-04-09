ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN IF NOT EXISTS  DashboardWidgetId char(38)
;

CREATE TABLE IF NOT EXISTS SyncDS_DSMetrics (
   Id SERIAL PRIMARY KEY,
   DataSourceID VARCHAR(255),
   IsRefresh BOOLEAN,
   RefreshStartTime VARCHAR(255),
   RefreshEndTime VARCHAR(255),
   IsIncremental VARCHAR(255),
   TableDetails VARCHAR(255),
   RowsUpdated INTEGER,
   TotalRows INTEGER,
   CustomQuery VARCHAR(700),
   SourceConnectionDetails VARCHAR(255),
   IncrementalRefreshDetails VARCHAR(255),
   ExtractType VARCHAR(255),
   RefreshStatus VARCHAR(255),
   RefreshException VARCHAR(255))
;

INSERT INTO SyncDS_Source (Name, IsActive) SELECT N'Embed', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_Source WHERE Name = N'Embed')
;

ALTER TABLE SyncDS_PublishedItem ADD COLUMN IF NOT EXISTS ExternalSiteId int not null DEFAULT 0
;