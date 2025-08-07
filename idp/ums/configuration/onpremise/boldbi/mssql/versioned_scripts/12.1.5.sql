CREATE TABLE [BOLDBI_AI_REQUESTS] (
    [MessageId] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [SearchDate] DATETIMEOFFSET,
    [Message] NVARCHAR(MAX),
    [DatasourceId] NVARCHAR(MAX),
    [SessionId] NVARCHAR(MAX),
    [HasError] BIT,
    [Response] NVARCHAR(MAX),
    [StatusMessage] NVARCHAR(MAX),
    [AiModel] NVARCHAR(MAX),
    [TenantId] NVARCHAR(MAX),
    [UserEmail] NVARCHAR(MAX),
    [Feedback] NVARCHAR(MAX),
    [UserInfo] NVARCHAR(MAX),
    [RequestType] NVARCHAR(MAX),
    [Environment] NVARCHAR(MAX),
    [IsValidResponse] BIT,
    [IsWidgetRendered] BIT
);

ALTER TABLE [BOLDBI_CustomEmailTemplate] ADD [CustomVisibilityOptions] NVARCHAR(MAX) NOT NULL CONSTRAINT DF_CustomVisibilityOptions DEFAULT '{}';
