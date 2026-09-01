ALTER TABLE [BOLDBI_Item] ADD [DashboardLogo] [nvarchar](1026) NULL;

ALTER TABLE [BOLDBI_ScheduleDetail] ADD [AIInsightSummaryEnabled] [bit] NOT NULL DEFAULT 0;

ALTER TABLE [BOLDBI_AI_SESSIONS] ADD [RequestType] NVARCHAR(MAX),[SessionName] NVARCHAR(MAX),[IsActive] [bit] NOT NULL DEFAULT (0),[HistoryContent] NVARCHAR(MAX),[SessionModifiedTime] DATETIMEOFFSET;

ALTER TABLE [BOLDBI_ItemLog] ADD [IPAddress] [nvarchar](255) NULL;