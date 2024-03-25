ALTER TABLE {database_name}.BOLDBI_ai_qnawidgethistory ADD search_date TIMESTAMP
;

ALTER TABLE {database_name}.BOLDBI_ai_qnawidgethistory ADD widgetid VARCHAR(255);
;

INSERT into {database_name}.BOLDBI_ExportType (Name,IsActive) VALUES ('DashboardCache', 1)
;