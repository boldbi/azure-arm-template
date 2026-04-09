CREATE TABLE SyncDS_AI_REQUESTS (
    MessageId TEXT PRIMARY KEY NOT NULL,
    SearchDate TIMESTAMP WITH TIME ZONE,
    Message TEXT,
    DatasourceId TEXT,
    SessionId TEXT,
    HasError BOOLEAN,
    Response TEXT,
    StatusMessage TEXT,
    AiModel TEXT,
    TenantId TEXT,
    UserEmail TEXT,
    Feedback TEXT,
    UserInfo TEXT,
    RequestType TEXT,
    Environment TEXT,
    IsValidResponse BOOLEAN,
    IsWidgetRendered BOOLEAN
);

ALTER TABLE SyncDS_CustomEmailTemplate ADD COLUMN CustomVisibilityOptions text NOT NULL DEFAULT '{}';