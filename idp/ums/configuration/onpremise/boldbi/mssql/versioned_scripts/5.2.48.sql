INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Widgets', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Widgets')
;

CREATE TABLE [BOLDBI_Webhook](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](512) NOT NULL,
	[Description] [nvarchar](4000) NULL,
	[Url] [nvarchar](512) NOT NULL,
	[UserId] [int] NOT NULL,
	[Security] [nvarchar](512) NULL,
	[Headers] [nvarchar](max) NULL,
	[ContentType] [int] NOT NULL,
	[SubscribedEvent] [nvarchar](512) NOT NULL,
	[Payload] [nvarchar](max) NULL,
	[Failures] [int] NOT NULL,
	[CreatedById] [int] NOT NULL,
	[ModifiedById] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsEnable] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_NotificationTrigger](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[WebhookId] [int] NOT NULL,
	[RecurrenceInfo] [nvarchar](4000) NOT NULL,
	[RetryCount] [int] NOT NULL,
	[RequestData] [nvarchar](max) NULL,
	[WebhookTargetData] [nvarchar](max) NULL,
	[AdditionalInfo] [nvarchar](max) NULL,
	[NextScheduleDate] [datetime] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[ReferenceId] [nvarchar](255) NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_WebhookLog](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[WebhookId] [int] NULL,
	[Event] [nvarchar](512) NOT NULL,
	[RequestUrl] [nvarchar](512) NULL,
	[FailureType] [nvarchar](512) NOT NULL,
	[ReferenceId] [nvarchar](255) NULL,
	[ResponseMessage] [nvarchar](max) NULL,
	[ResponseStatusCode] [nvarchar](512) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_NotificationEvents](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) UNIQUE NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_EventPayloads](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) UNIQUE NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [BOLDBI_EventPayloadsMapping](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[EventType] [int] NOT NULL,
	[PayloadType] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

---- PASTE INSERT Queries below this section --------

INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Security', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Security')
;

INSERT INTO [BOLDBI_NotificationEvents] (Name, IsActive) SELECT N'Time Drive Dashboard Export',1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_NotificationEvents] WHERE Name = 'Time Drive Dashboard Export')
;
INSERT INTO [BOLDBI_NotificationEvents] (Name, IsActive) SELECT N'Alert Drive Dashboard Export',1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_NotificationEvents] WHERE Name = 'Alert Drive Dashboard Export')
;

INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'Schedule Name',1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'Schedule Name')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'Schedule Id',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'Schedule Id')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'Dashboard Id',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'Dashboard Id')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'Dashboard Name',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'Dashboard Name')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'Message',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'Message')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'File Content',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'File Content')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'File Extension',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'File Extension')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'Export Format',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'Export Format')
;
INSERT INTO [BOLDBI_EventPayloads] (Name, IsActive) SELECT N'Alert Info',1 
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_EventPayloads] WHERE Name = 'Alert Info')
;

INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,1,1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,2,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 2)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,3,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 3)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,4,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 4)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,5,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 5)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,6,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 6)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,7,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 7)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 1,8,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 1 AND PayloadType = 8)
;

INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,1,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 1)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,2,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 2)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,3,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 3)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,4,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 4)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,5,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 5)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,6,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 6)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,7,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 7)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,8,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 8)
;
INSERT INTO [BOLDBI_EventPayloadsMapping] (EventType, PayloadType, IsActive) SELECT 2,9,1 
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_EventPayloadsMapping] WHERE EventType = 2 AND PayloadType = 9)
;
INSERT INTO [BOLDBI_SettingsType] (Name,IsActive) SELECT N'Integrations',1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_SettingsType] WHERE Name = 'Integrations')
;

---- PASTE ALTER Queries below this section --------

ALTER TABLE [BOLDBI_EventPayloadsMapping]  ADD FOREIGN KEY([EventType]) REFERENCES [BOLDBI_NotificationEvents] ([Id])
;

ALTER TABLE [BOLDBI_EventPayloadsMapping]  ADD FOREIGN KEY([PayloadType]) REFERENCES [BOLDBI_EventPayloads] ([Id])
;

ALTER TABLE [BOLDBI_NotificationTrigger]  ADD  FOREIGN KEY([WebhookId]) REFERENCES [BOLDBI_Webhook] ([Id])
;

ALTER TABLE [BOLDBI_WebhookLog]  ADD  FOREIGN KEY([WebhookId]) REFERENCES [BOLDBI_Webhook] ([Id])
;