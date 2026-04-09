CREATE TABLE SyncDS_AI_CHAT (
    SearchID TEXT,
    SessionID TEXT,
    SearchDateTime TIMESTAMP WITH TIME ZONE,
    InputToken INTEGER,
    OutputToken INTEGER,
    TotalToken INTEGER,
    InputTokenCost DOUBLE PRECISION,
    OutputTokenCost DOUBLE PRECISION,
    TotalTokensCost DOUBLE PRECISION,
    UserInfo TEXT,
    TenantID TEXT,
    RequestType TEXT,
    Environment TEXT
);


CREATE TABLE SyncDS_AI_SESSIONS (
    SessionID TEXT Primary key,
    SessionStartTime TIMESTAMP WITH TIME ZONE,
    SessionEndTime TIMESTAMP WITH TIME ZONE,
    InputToken INTEGER,
    OutputToken INTEGER,
    TotalToken INTEGER,
    InputTokenCost DOUBLE PRECISION,
    OutputTokenCost DOUBLE PRECISION,
    TotalTokensCost DOUBLE PRECISION,
    UserInfo TEXT,
    TenantID TEXT,
    Environment TEXT
);


ALTER TABLE SyncDS_ItemLog ADD COLUMN AnonymousUsername varchar(255) NULL
;
ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN DashboardWidgetIds text NULL
;