CREATE TABLE BOLDBI_AI_REQUESTS (
    "MessageId" VARCHAR2(255) PRIMARY KEY,
    "SearchDate" TIMESTAMP,
    "Message" VARCHAR2(255),
    "DatasourceId" VARCHAR2(255),
    "SessionId" VARCHAR2(255),
    "HasError" NUMBER(1),
    "Response" VARCHAR2(255),
    "StatusMessage" VARCHAR2(255),
    "AiModel" VARCHAR2(255),
    "TenantId" VARCHAR2(255),
    "UserEmail" VARCHAR2(255),
    "Feedback" VARCHAR2(255),
    "UserInfo" VARCHAR2(255),
    "RequestType" VARCHAR2(255),
    "Environment" VARCHAR2(255),
    "IsValidResponse" NUMBER(1),
    "IsWidgetRendered" NUMBER(1)
);

ALTER TABLE BOLDBI_CustomEmailTemplate ADD CustomVisibilityOptions CLOB;

UPDATE BOLDBI_CustomEmailTemplate SET CustomVisibilityOptions = '{}';

ALTER TABLE BOLDBI_CustomEmailTemplate MODIFY CustomVisibilityOptions NOT NULL;