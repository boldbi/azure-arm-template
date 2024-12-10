CREATE TABLE [BOLDBI_CustomEmailTemplate](
    [Id] [int] IDENTITY(1,1) primary key NOT NULL,
    [IsEnabled] [bit] NULL,
    [DisclaimerContent] [nvarchar](255) NOT NULL,
    [HeaderContent] [nvarchar](255) NULL,
    [Subject] [nvarchar](255) NULL,
    [TemplateName] [nvarchar](255) NULL,
    [Language] [nvarchar](255) NOT NULL,
    [MailBody] [nvarchar](max) NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NULL,
    [SendEmailAsHTML] [bit] NOT NULL,
    [IsActive] [bit] NOT NULL,
    [TemplateId] [int] NOT NULL,
    [IsDefaultTemplate][bit] NOT NULL,
    [IsSystemDefault][bit] NOT NULL,
    [Description][nvarchar](255) NULL,
    [ModifiedBy][int] NOT NULL,
    [TemplateLocalizationKey][nvarchar](255) NULL)
;

CREATE TABLE [BOLDBI_ApiKeyDetails] (
    [Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
    [Name] [nvarchar](255) NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [LastUsedDate] [datetime] NULL,
    [ApiKey] nvarchar(100) NULL,
    [TokenValidity] [datetime] NULL,
    [CreatedBy] [int] NOT NULL,
    [ModifiedBy] [int] NOT NULL,
    [IsActive] [bit] NOT NULL)
;


INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'API Key', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'API Key')
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForApiKeyExpiration',N'UserNotificationSettings.UserMailNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForApiKeyExpiration')
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 2,N'EnableNotificationForApiKeyExpiration',N'UserNotificationSettings.UserSystemNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForApiKeyExpiration')
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForApiKeyExpiration',N'NotificationSettings.MailNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForApiKeyExpiration')
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) SELECT 3,N'EnableNotificationForApiKeyExpiration',N'NotificationSettings.SystemNotificationSettings.EnableNotificationForApiKeyExpiration',GETDATE(),1 
WHERE NOT EXISTS (SELECT Field FROM [BOLDBI_LogField] WHERE Field = N'EnableNotificationForApiKeyExpiration')
;