UPDATE [PermissionEntity] SET [Name]='Specific File' WHERE Id=9
;

ALTER TABLE [SystemSettings] ALTER COLUMN Value ntext null
;

CREATE TABLE [SubscribedExternalRecipient](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[SubscribedById] [int] NOT NULL,
	[EmailIds] [NVARCHAR](4000) NOT NULL,
	[SubscribedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL);
	
ALTER TABLE [SubscribedExternalRecipient]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [Item] ([Id])
;
ALTER TABLE [SubscribedExternalRecipient]  ADD FOREIGN KEY([SubscribedById]) REFERENCES [User] ([Id])
;

CREATE TABLE [ScheduleLogExternalRecipient](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[ScheduleStatusId] [int] NOT NULL,
	[DeliveredEmailId] [NVARCHAR](150) NOT NULL,
	[DeliveredDate] [datetime] NOT NULL,
	[IsOnDemand] [bit] NOT NULL,	
	[IsActive] [bit] NOT NULL);
	
ALTER TABLE [ScheduleLogExternalRecipient]  ADD FOREIGN KEY([ScheduleStatusId]) REFERENCES [ScheduleStatus] ([Id])
;
ALTER TABLE [ScheduleLogExternalRecipient]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [Item] ([Id])
;