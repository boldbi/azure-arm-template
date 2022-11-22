ALTER TABLE [dbo].[BOLDTC_AuthSettings]
ADD [IsDefaultAuthentication] bit NOT NULL DEFAULT 0;

INSERT [BOLDTC_AuthType] ([Name], [ModifiedDate], [IsActive]) VALUES (N'DefaultAuth', GETDATE(), 1);