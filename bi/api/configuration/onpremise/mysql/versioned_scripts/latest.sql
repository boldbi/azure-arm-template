CREATE TABLE {database_name}.BOLDBI_AI_CHAT (
    SearchID VARCHAR(255) PRIMARY KEY,
    SessionID TEXT,
    SearchDateTime DATETIME,
    InputToken INT,
    OutputToken INT,
    TotalToken INT,
    InputTokenCost DOUBLE,
    OutputTokenCost DOUBLE,
    TotalTokensCost DOUBLE,
    UserInfo TEXT,
    TenantID TEXT,
    RequestType TEXT,
    Environment TEXT) ROW_FORMAT=DYNAMIC
;


CREATE TABLE {database_name}.BOLDBI_AI_SESSIONS (
    SessionID VARCHAR(255) PRIMARY KEY,
    SessionStartTime DATETIME,
    SessionEndTime DATETIME,
    InputToken INT,
    OutputToken INT,
    TotalToken INT,
    InputTokenCost DOUBLE,
    OutputTokenCost DOUBLE,
    TotalTokensCost DOUBLE,
    UserInfo TEXT,
    TenantID TEXT,
    Environment TEXT) ROW_FORMAT=DYNAMIC
;

ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD DashboardWidgetIds text NULL
;
ALTER TABLE {database_name}.BOLDBI_ItemLog ADD AnonymousUsername varchar(255) NULL
;