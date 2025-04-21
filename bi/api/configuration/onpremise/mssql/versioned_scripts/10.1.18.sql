CREATE TABLE [BOLDBI_AI_SESSIONS] (
[SessionID] NVARCHAR(255) PRIMARY KEY,
[SessionStartTime] DATETIMEOFFSET,
[SessionEndTime] DATETIMEOFFSET,
[InputToken] INT,
[OutputToken] INT,
[TotalToken] INT,
[InputTokenCost] FLOAT,
[OutputTokenCost] FLOAT,
[TotalTokensCost] FLOAT,
[UserInfo] NVARCHAR(MAX),
[TenantID] NVARCHAR(MAX),
[Environment] NVARCHAR(MAX)
);

CREATE TABLE [BOLDBI_AI_CHAT] (
[SearchID] NVARCHAR(255) PRIMARY KEY,
[SessionID] NVARCHAR(MAX),
[SearchDateTime] DATETIMEOFFSET,
[InputToken] INT,
[OutputToken] INT,
[TotalToken] INT,
[InputTokenCost] FLOAT,
[OutputTokenCost] FLOAT,
[TotalTokensCost] FLOAT,
[UserInfo] NVARCHAR(MAX),
[TenantID] NVARCHAR(MAX),
[RequestType] NVARCHAR(MAX),
[Environment] NVARCHAR(MAX)
);

ALTER TABLE [BOLDBI_ScheduleDetail] ADD [DashboardWidgetIds] [nvarchar](max) NULL
;
ALTER TABLE [BOLDBI_ItemLog] Add [AnonymousUsername] [nvarchar](255) NULL
;
