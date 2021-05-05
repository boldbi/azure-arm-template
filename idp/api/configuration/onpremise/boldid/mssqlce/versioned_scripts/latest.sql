
INSERT [BOLDTC_AuthType]([Name],[ModifiedDate],[IsActive]) VALUES( N'DefaultAuth', GETUTCDATE(), 1);

ALTER TABLE [dbo].[BOLDTC_AuthSettings]
ADD [IsDefaultAuthentication] bit NOT NULL DEFAULT('0');