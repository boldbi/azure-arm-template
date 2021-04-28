CREATE TABLE [SyncDS_ItemSettings](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemConfig] [nvarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemSettings] ADD CONSTRAINT FK_ItemSettings_ItemId FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;