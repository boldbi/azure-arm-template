Drop Table [BoldBI_ai_qnawidgethistory]
;

CREATE TABLE [BoldBI_ai_qnawidgethistory] (
   searchid VARCHAR(255) PRIMARY KEY,
   question TEXT,
   tableinfo TEXT,
   fieldinfo TEXT,
   message TEXT,
   haserror BIT,
   chartType TEXT,
   uservote TEXT,
   isreported BIT)
;

ALTER TABLE [BOLDBI_ScheduleRunHistory] ADD [LogExist] bit NOT NULL DEFAULT '0'
;