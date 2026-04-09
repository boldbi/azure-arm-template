CREATE TABLE SyncDS_CustomEmailTemplate (
    Id SERIAL PRIMARY KEY,
    IsEnabled smallint,
    DisclaimerContent VARCHAR(255) NOT NULL,
    HeaderContent VARCHAR(255) NULL,
    Subject VARCHAR(255),
    TemplateName VARCHAR(255),
    Language VARCHAR(255) NOT NULL,
    MailBody TEXT NOT NULL,
    CreatedDate TIMESTAMP NOT NULL,
    ModifiedDate TIMESTAMP,
	SendEmailAsHTML smallint NOT NULL,
    IsActive smallint NOT NULL,
	TemplateId INTEGER NOT NULL,
	IsDefaultTemplate smallint NOT NULL,
	IsSystemDefault smallint NOT NULL,
	Description VARCHAR(255) NULL,
	ModifiedBy int NULL,
	TemplateLocalizationKey VARCHAR(255) NULL
);

CREATE TABLE SyncDS_ApiKeyDetails (
    Id uuid primary key NOT NULL,
    Name varchar(255) NOT NULL,
    ModifiedDate timestamp NOT NULL,
    CreatedDate timestamp NOT NULL,
    LastUsedDate timestamp NULL,
    ModifiedBy int NOT NULL,
    ApiKey varchar(100) NULL,
    CreatedBy int NOT NULL,
    TokenValidity timestamp NULL,
    IsActive smallint NOT NULL)
;

INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'API Key', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'API Key')
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForApiKeyExpiration',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForApiKeyExpiration',now() at time zone 'utc',1
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForApiKeyExpiration')
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForApiKeyExpiration',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForApiKeyExpiration',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForApiKeyExpiration')
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForApiKeyExpiration',N'NotificationSettings.MailNotificationSettings.EnableNotificationForApiKeyExpiration',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForApiKeyExpiration')
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForApiKeyExpiration',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForApiKeyExpiration',now() at time zone 'utc',1 
WHERE NOT EXISTS (SELECT Field FROM SyncDS_LogField WHERE Field = N'EnableNotificationForApiKeyExpiration')
;