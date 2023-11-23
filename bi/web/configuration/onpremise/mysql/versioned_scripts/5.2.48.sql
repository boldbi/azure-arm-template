CREATE TABLE {database_name}.BOLDBI_Webhook(
	Id int NOT NULL AUTO_INCREMENT,
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
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsEnable tinyint NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_NotificationTrigger(
	Id SERIAL PRIMARY KEY NOT NULL,
	WebhookId int NULL,
	RecurrenceInfo varchar(4000) NOT NULL,
	RetryCount int NOT NULL,
	RequestData longtext NULL,
	WebhookTargetData longtext NULL,
	AdditionalInfo text NULL,
	NextScheduleDate timestamp NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NULL,
	ReferenceId varchar(255) NULL,
	IsActive smallint NOT NULL)
;

CREATE TABLE {database_name}.BOLDBI_WebhookLog(
	Id int NOT NULL AUTO_INCREMENT,
	WebhookId int NULL,
	Event varchar(512) NOT NULL,
	RequestUrl varchar(512) NULL,
	FailureType varchar(512) NOT NULL,
	ReferenceId varchar(255) NULL,
	ResponseMessage text NULL,
	ResponseStatusCode varchar(512) NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_NotificationEvents(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_EventPayloads(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) UNIQUE NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.BOLDBI_EventPayloadsMapping(
	Id int NOT NULL AUTO_INCREMENT,
	EventType int NOT NULL,
	PayloadType int NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;


INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Widgets', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Widgets' LIMIT 1)
;

-- -- PASTE INSERT Queries below this section --------

INSERT INTO {database_name}.BOLDBI_SettingsType (Name, IsActive) SELECT 'Security', 1 FROM DUAL
WHERE NOT EXISTS(SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name='Security' LIMIT 1)
;

INSERT INTO {database_name}.BOLDBI_NotificationEvents (Name, IsActive) SELECT N'Time Drive Dashboard Export',1
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_NotificationEvents WHERE Name = 'Time Drive Dashboard Export' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_NotificationEvents (Name, IsActive) SELECT N'Alert Drive Dashboard Export',1
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_NotificationEvents WHERE Name = 'Alert Drive Dashboard Export' LIMIT 1)
;

INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'Schedule Name',1
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'Schedule Name' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'Schedule Id',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'Schedule Id' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'Dashboard Id',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'Dashboard Id' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'Dashboard Name',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'Dashboard Name' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'Message',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'Message' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'File Content',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'File Content' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'File Extension',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'File Extension' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'Export Format',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'Export Format' LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloads (Name, IsActive) SELECT N'Alert Info',1 
WHERE NOT EXISTS (SELECT Name FROM {database_name}.BOLDBI_EventPayloads WHERE Name = 'Alert Info' LIMIT 1)
;

INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,1,1
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 1 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,2,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 2 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,3,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,4,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 4 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,5,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 5 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,6,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 6 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,7,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 7 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 1,8,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 1 AND PayloadType = 8 LIMIT 1)
;

INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,1,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 1 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,2,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 2 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,3,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 3 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,4,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 4 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,5,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 5 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,6,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 6 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,7,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 7 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,8,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 8 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_EventPayloadsMapping (EventType, PayloadType, IsActive) SELECT 2,9,1 
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_EventPayloadsMapping WHERE EventType = 2 AND PayloadType = 9 LIMIT 1)
;
INSERT INTO {database_name}.BOLDBI_SettingsType (Name,IsActive) SELECT N'Integrations',1
WHERE NOT EXISTS (SELECT * FROM {database_name}.BOLDBI_SettingsType WHERE Name = 'Integrations')
;
-- -- PASTE ALTER Queries below this section --------

ALTER TABLE {database_name}.BOLDBI_WebhookLog  ADD FOREIGN KEY(WebhookId) REFERENCES {database_name}.BOLDBI_Webhook (Id)
;

ALTER TABLE {database_name}.BOLDBI_NotificationTrigger  ADD FOREIGN KEY(WebhookId) REFERENCES {database_name}.BOLDBI_Webhook (Id)
;

ALTER TABLE {database_name}.BOLDBI_EventPayloadsMapping ADD FOREIGN KEY(EventType) REFERENCES {database_name}.BOLDBI_NotificationEvents (Id)
;

ALTER TABLE {database_name}.BOLDBI_EventPayloadsMapping ADD FOREIGN KEY(PayloadType) REFERENCES {database_name}.BOLDBI_EventPayloads (Id)
;