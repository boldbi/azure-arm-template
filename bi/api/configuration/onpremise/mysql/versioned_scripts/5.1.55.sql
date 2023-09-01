INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationForDashboardOwner','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1 FROM DUAL 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForDashboardOwner' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationForAccessibleUser','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1 FROM DUAL 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForAccessibleUser' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationOnUserMention','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationOnUserMention',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationOnUserMention' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationWhenWatchEnabled','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationWhenWatchEnabled' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationForDashboardOwner','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForDashboardOwner' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationForAccessibleUser','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForAccessibleUser' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationOnUserMention','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationOnUserMention',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationOnUserMention' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationWhenWatchEnabled','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationWhenWatchEnabled' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableUserScheduleNotification','UserNotificationSettings.UserMailNotificationSettings.EnableUserScheduleNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableUserScheduleNotification' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableUserProfileNotification','UserNotificationSettings.UserMailNotificationSettings.EnableUserProfileNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableUserProfileNotification' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableResourceShareNotification','UserNotificationSettings.UserMailNotificationSettings.EnableResourceShareNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableResourceShareNotification' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableUserSynchronizationNotification','UserNotificationSettings.UserMailNotificationSettings.EnableUserSynchronizationNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableUserSynchronizationNotification' LIMIT 1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationForDashboardOwner','NotificationSettings.SystemNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForDashboardOwner' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationForAccessibleUser','NotificationSettings.SystemNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1 FROM DUAL 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForAccessibleUser' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationOnUserMention','NotificationSettings.SystemNotificationSettings.EnableNotificationOnUserMention',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationOnUserMention' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationWhenWatchEnabled','NotificationSettings.SystemNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationWhenWatchEnabled' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationForDashboardOwner','NotificationSettings.MailNotificationSettings.EnableNotificationForDashboardOwner',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForDashboardOwner' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationForAccessibleUser','NotificationSettings.MailNotificationSettings.EnableNotificationForAccessibleUser',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForAccessibleUser' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationOnUserMention','NotificationSettings.MailNotificationSettings.EnableNotificationOnUserMention',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationOnUserMention' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationWhenWatchEnabled','NotificationSettings.MailNotificationSettings.EnableNotificationWhenWatchEnabled',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationWhenWatchEnabled' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableUserScheduleNotification','NotificationSettings.MailNotificationSettings.EnableUserScheduleNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableUserScheduleNotification' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableUserProfileNotification','NotificationSettings.MailNotificationSettings.EnableUserProfileNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableUserProfileNotification' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableResourceShareNotification','NotificationSettings.MailNotificationSettings.EnableResourceShareNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableResourceShareNotification' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableUserSynchronizationNotification','NotificationSettings.MailNotificationSettings.EnableUserSynchronizationNotification',NOW(),1 FROM DUAL  
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableUserSynchronizationNotification' LIMIT 1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 1,'FooterLogo','SiteSettings.FooterLogo',NOW(),1 FROM DUAL 
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field='FooterLogo' LIMIT 1)
;
INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 1,'CopyrightInformation','SiteSettings.CopyrightInformation',NOW(),1 FROM DUAL 
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field='CopyrightInformation' LIMIT 1)
;

CREATE TABLE {database_name}.BOLDBI_EmailActivityLog(
	Id int NOT NULL AUTO_INCREMENT,
	Event varchar(255) NOT NULL,
	RecipientEmail varchar(255) NOT NULL,
	SenderEmail varchar(255) NOT NULL,
	MailSubject varchar(255) NOT NULL,
	MailBody text NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime  NULL,
	InitiatedBy int NOT NULL,
	UserId int NULL,
	GroupId int NULL,
	ItemId Char(38) NULL,
	CommentId int NULL,
	PermissionId int NULL,
	Status int NOT NULL,
	StatusMessage text NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;


ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD  FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE {database_name}.BOLDBI_EmailActivityLog  ADD FOREIGN KEY(CommentId) REFERENCES {database_name}.BOLDBI_Comment (Id)
;

ALTER TABLE {database_name}.BOLDBI_Item  DROP COLUMN UnlistedCode
;