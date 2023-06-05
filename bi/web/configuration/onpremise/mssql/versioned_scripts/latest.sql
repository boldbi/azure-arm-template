UPDATE [BOLDBI_SettingsType] SET Name='Site Credentials' WHERE Id = 20
;

INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Site Credentials', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Site Credentials')
;

ALTER TABLE [BOLDBI_ScheduleLog] ADD [RequestId] uniqueidentifier Null
;

ALTER TABLE [BOLDBI_ScheduleLog] ADD [LogExist] bit NOT NULL DEFAULT '0'
;

CREATE TABLE [BOLDBI_ScheduleMissingLogs](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[MissingType] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)	
;

ALTER TABLE [BOLDBI_ScheduleDetail] ADD UNIQUE (ScheduleId);

ALTER TABLE [BOLDBI_ScheduleMissingLogs]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [BOLDBI_ScheduleDetail] ([ScheduleId])
;