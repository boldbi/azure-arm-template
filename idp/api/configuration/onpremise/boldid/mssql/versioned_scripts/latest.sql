ALTER TABLE [BOLDTC_TenantInfo] ADD [IsRowLevelSecurityEnabled] bit NOT NULL DEFAULT 1
;

ALTER TABLE [BOLDTC_AuthSettings] ADD [EncryptionValues] nvarchar(max)
;