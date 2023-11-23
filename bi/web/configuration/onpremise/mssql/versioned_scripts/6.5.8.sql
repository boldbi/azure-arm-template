CREATE TABLE [BOLDBI_PublishType](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL

);

INSERT into [BOLDBI_PublishType] (Name,IsActive) VALUES ( N'Publish',1)
;

INSERT into [BOLDBI_PublishType] (Name,IsActive) VALUES ( N'Lock',1)
;

INSERT into [BOLDBI_PublishType] (Name,IsActive) VALUES ( N'Unlock',1)
;

ALTER TABLE [BOLDBI_PublishJobs]  ADD [Type] [int] NOT NULL DEFAULT 1
;

ALTER TABLE [BOLDBI_PublishJobs]  ADD FOREIGN KEY([Type]) REFERENCES [BOLDBI_PublishType] ([Id])
;