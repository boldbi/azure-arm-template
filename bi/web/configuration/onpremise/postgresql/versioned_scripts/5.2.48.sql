INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Widgets', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Widgets')
;

CREATE TABLE SyncDS_Webhook(
	Id  SERIAL PRIMARY KEY NOT NULL,
	Name varchar(512) NOT NULL,
	Description varchar(4000) NULL,
	Url varchar(512) NOT NULL,
	UserId int NOT NULL,
	Security varchar(512) NULL,
	Headers text NULL,
	ContentType int NOT NULL,
	SubscribedEvent varchar(512) NOT NULL,
	Payload text NULL,
	Failures int NOT NULL,
	CreatedById int NOT NULL,
	ModifiedById int NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsEnable smallint NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_NotificationTrigger(
	Id SERIAL PRIMARY KEY NOT NULL,
	WebhookId int NULL,
	RecurrenceInfo varchar(4000) NOT NULL,
	RetryCount int NOT NULL,
	RequestData text NULL,
	WebhookTargetData text NULL,
	AdditionalInfo text NULL,
	NextScheduleDate timestamp NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NULL,
	ReferenceId varchar(255) NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_WebhookLog(
	Id SERIAL PRIMARY KEY NOT NULL,
	WebhookId int NULL,
	Event varchar(512) NOT NULL,
	RequestUrl varchar(512) NULL,
	FailureType varchar(512) NOT NULL,
	ReferenceId varchar(255) NULL,
	ResponseMessage text NULL,
	ResponseStatusCode varchar(512) NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_NotificationEvents(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_EventPayloads(
	Id SERIAL PRIMARY KEY NOT NULL,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE SyncDS_EventPayloadsMapping(
	Id SERIAL PRIMARY KEY NOT NULL,
	EventType int NOT NULL,
	PayloadType int NOT NULL,
	IsActive smallint NOT NULL)
;
---- PASTE INSERT Queries below this section --------

INSERT INTO SyncDS_SettingsType (Name, IsActive) SELECT N'Security', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_SettingsType WHERE Name = N'Security')
;

INSERT INTO SyncDS_NotificationEvents (Name, IsActive) SELECT N'Time Drive Dashboard Export',1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_NotificationEvents WHERE Name = 'Time Drive Dashboard Export')
;
INSERT INTO SyncDS_NotificationEvents (Name, IsActive) SELECT N'Alert Drive Dashboard Export',1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_NotificationEvents WHERE Name = 'Alert Drive Dashboard Export')
;

INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'Schedule Name',1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'Schedule Name')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'Schedule Id',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'Schedule Id')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'Dashboard Id',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'Dashboard Id')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'Dashboard Name',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'Dashboard Name')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'Message',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'Message')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'File Content',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'File Content')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'File Extension',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'File Extension')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'Export Format',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'Export Format')
;
INSERT INTO SyncDS_EventPayloads (Name, IsActive) SELECT N'Alert Info',1 
WHERE NOT EXISTS (SELECT Name FROM SyncDS_EventPayloads WHERE Name = 'Alert Info')
;

INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,1,1
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,2,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 2)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,3,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 3)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,4,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 4)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,5,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 5)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,6,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 6)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,7,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 7)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,8,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 8)
;

INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,1,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 1)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,2,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 2)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,3,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 3)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,4,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 4)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,5,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 5)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,6,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 6)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,7,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 7)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,8,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 8)
;
INSERT INTO SyncDS_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,9,1 
WHERE NOT EXISTS (SELECT * FROM SyncDS_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 9)
;
INSERT INTO SyncDS_SettingsType (Name,IsActive) SELECT N'Integrations',1
WHERE NOT EXISTS (SELECT * FROM SyncDSI_SettingsType WHERE Name = 'Integrations')
;

---- PASTE ALTER Queries below this section --------

ALTER TABLE SyncDS_WebhookLog  ADD FOREIGN KEY(WebhookId) REFERENCES SyncDS_Webhook (Id)
;

ALTER TABLE SyncDS_NotificationTrigger  ADD FOREIGN KEY(WebhookId) REFERENCES SyncDS_Webhook (Id)
;

ALTER TABLE SyncDS_EventPayloadsMapping ADD FOREIGN KEY(EventType) REFERENCES SyncDS_NotificationEvents (Id)
;

ALTER TABLE SyncDS_EventPayloadsMapping ADD FOREIGN KEY(PayloadType) REFERENCES SyncDS_EventPayloads (Id)
;