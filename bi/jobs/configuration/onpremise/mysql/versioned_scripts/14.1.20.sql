ALTER TABLE {database_name}.BOLDBI_Item ADD COLUMN DashboardLogo varchar(1026) NULL;

ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD AIInsightSummaryEnabled tinyint(1) NOT NULL default 0;

ALTER TABLE {database_name}.BOLDBI_AI_SESSIONS ADD RequestType TEXT,ADD SessionName TEXT,ADD IsActive tinyint NOT NULL DEFAULT 0,ADD HistoryContent TEXT,ADD SessionModifiedTime DATETIME;

ALTER TABLE {database_name}.BOLDBI_ItemLog ADD COLUMN IPAddress varchar(255) NULL;