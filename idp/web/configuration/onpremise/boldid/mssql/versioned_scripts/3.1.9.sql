INSERT [BOLDTC_AuthType]([Name],[ModifiedDate],[IsActive])VALUES( N'WindowsAD', GETUTCDATE(), 1);

INSERT [BOLDTC_AuthProvider] ([Name], [AuthTypeId], [ModifiedDate], [IsActive]) VALUES ( N'WindowsAD', 6, GETUTCDATE(), 1);

ALTER TABLE [BOLDTC_TenantActivity] ADD [ChildId] nvarchar(max) NULL
;
ALTER TABLE [BOLDTC_TenantActivity] ADD [DetailActionId] int NOT NULL DEFAULT 0
;
ALTER TABLE [BOLDTC_TenantActivity] ADD [ActivityLogInfo] nvarchar(max) NULL
;