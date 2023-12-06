CREATE TABLE [BoldBI_ai_qnawidgethistory] (
   searchid VARCHAR(255) PRIMARY KEY,
   question TEXT,
   tableinfo TEXT,
   schemasequence TEXT,
   fieldinfo TEXT,
   message TEXT,
   haserror BIT,
   sqlquery TEXT,
   uservote TEXT,
   isreported BIT)
;
