INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForDashboardOwner',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForAccessibleUser',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationOnUserMention',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationWhenWatchEnabled',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableUserScheduleNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserScheduleNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableUserScheduleNotification')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableUserProfileNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserProfileNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableUserProfileNotification')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableResourceShareNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableResourceShareNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableResourceShareNotification')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableUserSynchronizationNotification',N'UserNotificationSettings.UserMailNotificationSettings.EnableUserSynchronizationNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableUserSynchronizationNotification')
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationOnUserMention',N'NotificationSettings.SystemNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.SystemNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForDashboardOwner',N'NotificationSettings.MailNotificationSettings.EnableNotificationForDashboardOwner',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForDashboardOwner')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForAccessibleUser',N'NotificationSettings.MailNotificationSettings.EnableNotificationForAccessibleUser',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForAccessibleUser')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationOnUserMention',N'NotificationSettings.MailNotificationSettings.EnableNotificationOnUserMention',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationOnUserMention')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationWhenWatchEnabled',N'NotificationSettings.MailNotificationSettings.EnableNotificationWhenWatchEnabled',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationWhenWatchEnabled')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableUserScheduleNotification',N'NotificationSettings.MailNotificationSettings.EnableUserScheduleNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableUserScheduleNotification')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableUserProfileNotification',N'NotificationSettings.MailNotificationSettings.EnableUserProfileNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableUserProfileNotification')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableResourceShareNotification',N'NotificationSettings.MailNotificationSettings.EnableResourceShareNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableResourceShareNotification')
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableUserSynchronizationNotification',N'NotificationSettings.MailNotificationSettings.EnableUserSynchronizationNotification',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableUserSynchronizationNotification')
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 1,N'FooterLogo',N'SiteSettings.FooterLogo',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'FooterLogo')
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 1,N'CopyrightInformation',N'SiteSettings.CopyrightInformation',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'CopyrightInformation')
;

CREATE TABLE SyncDS_EmailActivityLog(
	Id  SERIAL PRIMARY KEY NOT NULL,
	Event varchar(255) NOT NULL,
	RecipientEmail varchar(255) NOT NULL,
	SenderEmail varchar(255) NOT NULL,
	MailSubject varchar(255) NOT NULL,
	MailBody text NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp  NULL,
	InitiatedBy int NOT NULL,
	UserId int NULL,
	GroupId int NULL,
	ItemId uuid NULL,
	CommentId int NULL,
	PermissionId int NULL,
	Status int NOT NULL,
	StatusMessage text NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE SyncDS_EmailActivityLog  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_EmailActivityLog  ADD  FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_EmailActivityLog  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_EmailActivityLog  ADD FOREIGN KEY(CommentId) REFERENCES SyncDS_Comment (Id)
;

ALTER TABLE SyncDS_Item DROP COLUMN UnlistedCode
;

ALTER TABLE SyncDS_SlideshowInfo ALTER COLUMN ItemInfo TYPE text
;