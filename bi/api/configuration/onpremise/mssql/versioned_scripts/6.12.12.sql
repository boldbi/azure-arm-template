ALTER TABLE [BOLDBI_ScheduleDetail] ADD [DashboardWidgetId] uniqueidentifier Null
;

CREATE TABLE [BoldBI_DSMetrics]  (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   DataSourceID VARCHAR(255),
   IsRefresh bit,
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

ALTER TABLE [BOLDBI_PublishedItem] ADD [ExternalSiteId] [int] NOT NULL DEFAULT 0
;