Drop Table {database_name}.BOLDBI_ai_qnawidgethistory
;

CREATE TABLE {database_name}.BOLDBI_ai_qnawidgethistory (
   searchid VARCHAR(255) PRIMARY KEY,
   question TEXT,
   tableinfo TEXT,
   fieldinfo TEXT,
   message TEXT,
   haserror BOOLEAN,
   chartType TEXT,
   uservote TEXT,
   isreported BOOLEAN)
;

ALTER TABLE {database_name}.BOLDBI_ScheduleRunHistory ADD LogExist tinyint NOT NULL DEFAULT 0
;