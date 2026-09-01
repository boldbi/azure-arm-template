IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'BOLDBI_ScheduleDetail' AND COLUMN_NAME = 'DashboardWidgetId')
BEGIN
    ALTER TABLE [BOLDBI_ScheduleDetail] ADD [DashboardWidgetId] uniqueidentifier NULL
END;


IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'BoldBI_DSMetrics')
BEGIN
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
       RefreshException VARCHAR(255)
    )
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'BOLDBI_PublishedItem' AND COLUMN_NAME = 'ExternalSiteId')
BEGIN
    ALTER TABLE [BOLDBI_PublishedItem] ADD [ExternalSiteId] [int] NOT NULL DEFAULT 0
END;