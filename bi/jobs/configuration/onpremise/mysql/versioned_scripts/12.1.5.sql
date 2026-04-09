CREATE TABLE {database_name}.BOLDBI_AI_REQUESTS (
    MessageId VARCHAR(255) NOT NULL PRIMARY KEY,
    SearchDate DATETIME,
    Message TEXT,
    DatasourceId VARCHAR(255),
    SessionId VARCHAR(255),
    HasError BOOLEAN,
    Response TEXT,
    StatusMessage TEXT,
    AiModel VARCHAR(255),
    TenantId VARCHAR(255),
    UserEmail VARCHAR(255),
    Feedback TEXT,
    UserInfo TEXT,
    RequestType VARCHAR(255),
    Environment VARCHAR(255),
    IsValidResponse BOOLEAN,
    IsWidgetRendered BOOLEAN) ROW_FORMAT=DYNAMIC
;

SET SQL_SAFE_UPDATES = 0;

ALTER TABLE {database_name}.BOLDBI_CustomEmailTemplate ADD COLUMN CustomVisibilityOptions TEXT NOT NULL;

UPDATE {database_name}.BOLDBI_CustomEmailTemplate SET CustomVisibilityOptions = '{}'

SET SQL_SAFE_UPDATES = 1;