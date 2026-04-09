ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD DashboardWidgetId Char(38) NULL
;

CREATE TABLE {database_name}.BOLDBI_DSMetrics (
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

ALTER TABLE {database_name}.BOLDBI_PublishedItem ADD ExternalSiteId int NOT NULL DEFAULT 0
;