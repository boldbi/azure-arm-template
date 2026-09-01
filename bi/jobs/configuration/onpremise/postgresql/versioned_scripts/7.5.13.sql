ALTER TABLE SyncDS_ai_qnawidgethistory ADD COLUMN search_date timestamp without time zone
;

ALTER TABLE SyncDS_ai_qnawidgethistory ADD COLUMN widgetid text
;

INSERT INTO SyncDS_ExportType (Name,  IsActive) VALUES (N'DashboardCache',1)
;