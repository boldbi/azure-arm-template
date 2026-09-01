CREATE TABLE [BOLDTC_UserToken] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	Name nvarchar(255) NOT NULL,
	Value nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_BOLDTC_USERTOKEN] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
;

ALTER TABLE [BOLDTC_User] ADD [IsMfaEnabled] bit NOT NULL DEFAULT '0';

ALTER TABLE [BOLDTC_User] ADD [MfaType] int NULL;

CREATE TABLE [BOLDTC_MfaType] (
	Id int IDENTITY(1,1) NOT NULL,
	Type nvarchar(100) NOT NULL,
	Value int NOT NULL UNIQUE,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_BOLDTC_MFATYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
;

INSERT into [BOLDTC_MfaType] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Authenticator', 1, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_MfaType] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Email', 2, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_MfaType] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'SMS', 3, GETUTCDATE(), GETUTCDATE(), 1)
;

ALTER TABLE [BOLDTC_User] WITH CHECK ADD CONSTRAINT [BOLDTC_User_fk2] FOREIGN KEY ([MfaType]) REFERENCES [BOLDTC_MfaType]([Value])
;
ALTER TABLE [BOLDTC_User] CHECK CONSTRAINT [BOLDTC_User_fk2]
;

ALTER TABLE [BOLDTC_UserLog] ADD [Source] int NULL;

CREATE TABLE [BOLDTC_Source] (
	Id int IDENTITY(1,1) NOT NULL,
	Type nvarchar(100) NOT NULL,
	Value int NOT NULL UNIQUE,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_BOLDTC_SOURCE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
;

INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Identity Provider Web', 1, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Identity Provider API', 2, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Tenant Management Web', 3, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Dashboard Server Web', 4, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Dashboard Server API', 5, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Dashboard Server Jobs', 6, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Report Server Web', 7, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Report Server API', 8, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Report Server Jobs', 9, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_Source] ([Type],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Admin Utility', 10, GETUTCDATE(), GETUTCDATE(), 1)
;

ALTER TABLE [BOLDTC_UserLog] WITH CHECK ADD CONSTRAINT [BOLDTC_UserLog_fk3] FOREIGN KEY ([Source]) REFERENCES [BOLDTC_Source]([Value])
;
ALTER TABLE [BOLDTC_UserLog] CHECK CONSTRAINT [BOLDTC_UserLog_fk3]
;

CREATE TABLE [BOLDTC_EmailActivityLog](
	Id int IDENTITY(1,1) NOT NULL,
	Event nvarchar(255) NOT NULL,
	RecipientEmail nvarchar(255) NOT NULL,
	SenderEmail nvarchar(255) NOT NULL,
	MailSubject nvarchar(255) NOT NULL,
	MailBody nvarchar(max) NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NULL,
	InitiatedBy nvarchar(255) NULL,
	UserId uniqueidentifier NOT NULL,
	Status int NOT NULL,
	StatusMessage nvarchar(max) NULL,
	IsActive bit NOT NULL
	 CONSTRAINT [PK_BOLDTC_EMAILACTIVITYLOG] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
  
  )
;

ALTER TABLE [BOLDTC_EmailActivityLog] WITH CHECK ADD CONSTRAINT [BOLDTC_EmailActivityLog_fk0] FOREIGN KEY ([UserId]) REFERENCES [BOLDTC_User]([Id])
;
