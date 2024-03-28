ALTER TABLE [BoldBI_ai_qnawidgethistory] ADD [search_date] DATETIME
;

ALTER TABLE [BoldBI_ai_qnawidgethistory] ADD [widgetid] NVARCHAR(255)
;

INSERT into [BOLDBI_ExportType] (Name,IsActive) VALUES (N'DashboardCache', 1)
;
ALTER TABLE [BOLDBI_BackgroundJobs]  ADD [ParentJobId] [int] NULL
;