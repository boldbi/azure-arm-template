CREATE TABLE [SyncDS_SlideshowInfo](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[SlideshowId] [uniqueidentifier] NOT NULL,
	[ItemInfo] nvarchar(max) NOT NULL,
	[loopInterval] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_SlideshowInfo]  ADD FOREIGN KEY([SlideshowId]) REFERENCES [SyncDS_Item] ([Id])
;


Insert INTO [SyncDS_ItemType] ([Name], [IsActive]) Values ('Slideshow',1)
;