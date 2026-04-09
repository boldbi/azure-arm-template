INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.OAuth2',N'UserDirectory.OAuth2',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.OpenIDConnect',N'UserDirectory.OpenIDConnect',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'UserDirectory.AuthControl',N'UserDirectory.AuthControl',GETDATE(),1)
;
INSERT into [SyncDS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (1,N'EmbedSettings',N'EmbedSettings',GETDATE(),1)
;

ALTER TABLE [BOLDBI_Item] ADD [IsLocked] [bit] NOT NULL DEFAULT 0
;