CREATE TABLE BOLDBI_AI_SESSIONS (
    "SessionID" VARCHAR2(255) PRIMARY KEY,
    "SessionStartTime" TIMESTAMP,
    "SessionEndTime" TIMESTAMP,
    "InputToken" NUMBER,
    "OutputToken" NUMBER,
    "TotalToken" NUMBER,
    "InputTokenCost" FLOAT,
    "OutputTokenCost" FLOAT,
    "TotalTokensCost" FLOAT,
    "UserInfo" VARCHAR2(255),
    "TenantID" VARCHAR2(255),
    "Environment" VARCHAR2(255)
);

CREATE TABLE BOLDBI_AI_CHAT (
    "SearchID" VARCHAR2(255) PRIMARY KEY,
    "SessionID" VARCHAR2(255),
    "SearchDateTime" TIMESTAMP,
    "InputToken" NUMBER,
    "OutputToken" NUMBER,
    "TotalToken" NUMBER,
    "InputTokenCost" FLOAT,
    "OutputTokenCost" FLOAT,
    "TotalTokensCost" FLOAT,
    "UserInfo" VARCHAR2(255),
    "TenantID" VARCHAR2(255),
    "RequestType" VARCHAR2(255),
    "Environment" VARCHAR2(255)
);


ALTER TABLE BOLDBI_ItemLog Add AnonymousUsername NVARCHAR2(255) NULL
;
ALTER TABLE BOLDBI_ScheduleDetail ADD DashboardWidgetIds CLOB
;