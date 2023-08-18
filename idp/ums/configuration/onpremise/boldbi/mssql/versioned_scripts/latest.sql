CREATE TABLE [BOLDBI_ScheduleRunHistory](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[StartedDate] [datetime] NOT NULL,
	[Message] [nvarchar](max) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL DEFAULT (0),
	[IsActive] [bit] NOT NULL)
;

INSERT INTO [BoldBI_ExportType] (Name, IsActive) SELECT 'PPT', 1
WHERE NOT EXISTS (SELECT Name FROM [BoldBI_ExportType] WHERE Name = 'PPT')
;
INSERT INTO [BoldBI_ExportType] (Name, IsActive) SELECT 'CSV', 1
WHERE NOT EXISTS (SELECT Name FROM [BoldBI_ExportType] WHERE Name = 'CSV')
;