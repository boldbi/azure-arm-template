CREATE TABLE {database_name}.BOLDBI_CustomEmailTemplate (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IsEnabled BIT,
    DisclaimerContent VARCHAR(255) NOT NULL,
    HeaderContent VARCHAR(255) NULL,
    Subject VARCHAR(255),
    TemplateName VARCHAR(255),
    Language VARCHAR(255) NOT NULL,
    MailBody TEXT NOT NULL,
    CreatedDate DATETIME NOT NULL,
    ModifiedDate DATETIME,
    SendEmailAsHTML BIT NOT NULL,
    IsActive BIT NOT NULL,
	TemplateId INT NOT NULL,
	IsDefaultTemplate BIT NOT NULL,
	IsSystemDefault BIT NOT NULL,
	Description VARCHAR(255) NULL,
	ModifiedBy int NOT NULL,
	TemplateLocalizationKey VARCHAR(255) NULL
);

CREATE TABLE {database_name}.BOLDBI_ApiKeyDetails (
    Id Char(38) NOT NULL,
    Name varchar(255) NOT NULL,
    ModifiedDate datetime NOT NULL,
    CreatedDate datetime NOT NULL,
    LastUsedDate datetime NULL,
    ApiKey varchar(100) NULL,
    TokenValidity datetime NULL,
    CreatedBy int NOT NULL,
    ModifiedBy int NOT NULL,
    IsActive tinyint NOT NULL,
    PRIMARY KEY (Id))
;

INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'API Key', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='API Key' LIMIT 1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationForApiKeyExpiration','UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1 FROM DUAL
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForApiKeyExpiration' LIMIT 1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,'EnableNotificationForApiKeyExpiration','UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1 FROM DUAL 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForApiKeyExpiration' LIMIT 1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationForApiKeyExpiration','NotificationSettings.SystemNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1 FROM DUAL 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForApiKeyExpiration' LIMIT 1)
;

INSERT into {database_name}.BOLDBI_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,'EnableNotificationForApiKeyExpiration','NotificationSettings.MailNotificationSettings.EnableNotificationForApiKeyExpiration',NOW(),1 FROM DUAL 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_LogField WHERE Field = 'EnableNotificationForApiKeyExpiration' LIMIT 1)
;