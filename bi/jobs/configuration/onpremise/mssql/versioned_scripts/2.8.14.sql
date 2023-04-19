CREATE TABLE [BOLDBI_ItemSettings](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[ItemConfig] [nvarchar](4000) NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDBI_ItemSettings] ADD CONSTRAINT FK_ItemSettings_ItemId FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;

ALTER TABLE [BOLDBI_Item] ADD [IsLocked] [bit] NOT NULL DEFAULT 0
;