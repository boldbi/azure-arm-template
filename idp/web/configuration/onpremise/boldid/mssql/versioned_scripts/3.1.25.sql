INSERT [BOLDTC_AuthType]([Name],[ModifiedDate],[IsActive])VALUES( N'AzureADB2C', GETUTCDATE(), 1);
INSERT [BOLDTC_AuthProvider] ([Name], [AuthTypeId], [ModifiedDate], [IsActive]) VALUES (N'AzureADB2C', 7, GETUTCDATE(), 1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'AzureADB2C',1);