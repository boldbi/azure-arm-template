Drop Table SyncDS_ai_qnawidgethistory
;

CREATE TABLE SyncDS_ai_qnawidgethistory (
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

ALTER TABLE SyncDS_ScheduleRunHistory ADD COLUMN LogExist smallint NOT NULL default 0
;