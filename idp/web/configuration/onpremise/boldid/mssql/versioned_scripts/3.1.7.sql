ALTER TABLE [BOLDTC_AuthSettings] ALTER  COLUMN ModifiedBy uniqueidentifier NULL;
ALTER TABLE [BOLDTC_AuthSettings] ALTER  COLUMN CreatedBy uniqueidentifier NULL;

INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'LinkedIn',1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'Google',1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'GitHub',1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'Facebook',1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'Twitter',1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'JWTSSO',1);

INSERT [BOLDTC_AuthType]([Name],[ModifiedDate],[IsActive])VALUES( N'JWTSSO', GETUTCDATE(), 1);

INSERT [BOLDTC_AuthProvider] ([Name], [AuthTypeId], [ModifiedDate], [IsActive]) VALUES ( N'AzureAD', 3, GETUTCDATE(), 1);
INSERT [BOLDTC_AuthProvider] ([Name], [AuthTypeId], [ModifiedDate], [IsActive]) VALUES ( N'JWTSSO', 5, GETUTCDATE(), 1);

ALTER TABLE [BOLDTC_TenantInfo] ADD MaintenanceDatabase nvarchar(255) NULL;
ALTER TABLE [BOLDTC_TenantInfo] ADD ImDbMaintenanceDatabase nvarchar(255) NULL;

IF NOT EXISTS (SELECT * FROM   INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'BOLDTC_UserLog')
BEGIN
CREATE TABLE [BOLDTC_UserLog] (
	Id int IDENTITY(1,1) NOT NULL,
	LogAction nvarchar(255) NOT NULL,
	UserId uniqueidentifier NULL,
	Message nvarchar(max) NOT NULL,
	RequestedById uniqueidentifier NULL,
	IpAddress nvarchar(100) NOT NULL,
	LogDate datetime NOT NULL,
	ReferrerUrl nvarchar(max) NULL,
	IsActive bit NOT NULL,
	AdditionalData nvarchar(max) NULL,
  CONSTRAINT [PK_BOLDTC_UserLog] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)

ALTER TABLE [BOLDTC_UserLog] WITH CHECK ADD CONSTRAINT [BOLDTC_UserLog_fk1] FOREIGN KEY ([UserId]) REFERENCES [BOLDTC_User]([Id])

ALTER TABLE [BOLDTC_UserLog] CHECK CONSTRAINT [BOLDTC_UserLog_fk1]

ALTER TABLE [BOLDTC_UserLog] WITH CHECK ADD CONSTRAINT [BOLDTC_UserLog_fk2] FOREIGN KEY ([RequestedById]) REFERENCES [BOLDTC_User]([Id])

ALTER TABLE [BOLDTC_UserLog] CHECK CONSTRAINT [BOLDTC_UserLog_fk2]

END;

