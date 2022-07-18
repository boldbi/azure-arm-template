INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableUserScheduleNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserScheduleNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableUserScheduleNotification')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableUserProfileNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserProfileNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableUserProfileNotification')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableResourceShareNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableResourceShareNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableResourceShareNotification')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableUserSynchronizationNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserSynchronizationNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableUserSynchronizationNotification')
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationOnUserMention',N'NotificationSettings.SystemNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.SystemNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.MailNotificationSettings.EnableNotificationForDashboardOwner',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.MailNotificationSettings.EnableNotificationForAccessibleUser',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationOnUserMention',N'NotificationSettings.MailNotificationSettings.EnableNotificationOnUserMention',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.MailNotificationSettings.EnableNotificationWhenWatchEnabled',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableUserScheduleNotification',N'NotificationSettings.MailNotificationSettings.EnableUserScheduleNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableUserScheduleNotification')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableUserProfileNotification',N'NotificationSettings.MailNotificationSettings.EnableUserProfileNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableUserProfileNotification')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableResourceShareNotification',N'NotificationSettings.MailNotificationSettings.EnableResourceShareNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableResourceShareNotification')
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableUserSynchronizationNotification',N'NotificationSettings.MailNotificationSettings.EnableUserSynchronizationNotification',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableUserSynchronizationNotification')
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 1,N'FooterLogo',N'SiteSettings.FooterLogo',GETDATE(),1
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'FooterLogo')
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 1,N'CopyrightInformation',N'SiteSettings.CopyrightInformation',GETDATE(),1
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'CopyrightInformation')
;

CREATE TABLE [BOLDBI_EmailActivityLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Event] [nvarchar](255) NOT NULL,
	[RecipientEmail] [nvarchar](255) NOT NULL,
	[SenderEmail] [nvarchar](255) NOT NULL,
	[MailSubject] [nvarchar](255) NOT NULL,
	[MailBody] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[InitiatedBy] int NOT NULL,
	[UserId] [int] NULL,
	[GroupId] [int] NULL,
	[ItemId] [uniqueidentifier] NULL,
	[CommentId] [int] NULL,
	[PermissionId] [int] NULL,
	[Status] [int] NOT NULL,
	[StatusMessage] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDBI_EmailActivityLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_EmailActivityLog]  ADD  FOREIGN KEY([GroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_EmailActivityLog]  ADD  FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_EmailActivityLog]  ADD FOREIGN KEY([CommentId]) REFERENCES [BOLDBI_Comment] ([Id])
;

ALTER TABLE [BOLDBI_Item] DROP COLUMN [UnlistedCode]
;