INSERT into [SyncDS_PermissionEntity] (Name,EntityType,IsActive) VALUES (N'All Datasets',1, 1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,IsActive) VALUES (N'Specific Dataset',0, 1)
;

UPDATE [SyncDS_systemsettings] set Value='Login_Logo.png' where [Key] = 'LoginLogo' and [Value] Like 'Syncfusion_Login_Logo.png'
;

UPDATE [SyncDS_systemsettings] set Value='Main_Logo.png' where [Key] = 'MainScreenLogo' and [Value] Like 'Syncfusion_Main_Logo.png'
;

UPDATE [SyncDS_systemsettings] set Value='Favicon.png' where [Key] = 'FavIcon' and [Value] Like 'Syncfusion_Favicon.png'
;

sp_rename 'SyncDS_ActiveDirectoryCredentials','SyncDS_ADCredential';

sp_rename 'SyncDS_SubscribedExternalRecipient','SyncDS_SubscrExtnRecpt';

sp_rename 'SyncDS_ScheduleLogExternalRecipient','SyncDS_SchdLogExtnRecpt';

sp_rename 'SyncDS_ActiveDirectoryGroup','SyncDS_ADGroup';

sp_rename 'SyncDS_ActiveDirectoryUser','SyncDS_ADUser';

CREATE TABLE [SyncDS_FavoriteItem](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[IsActive] [bit] NOT NULL)
;
	
ALTER TABLE [SyncDS_FavoriteItem]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_FavoriteItem]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_User] ALTER COLUMN LastName nvarchar(255) null
;
ALTER TABLE [SyncDS_User] ALTER COLUMN Email nvarchar(255) null
;
ALTER TABLE [SyncDS_User] ALTER COLUMN Email nvarchar(512) null
;
ALTER TABLE [SyncDS_Item] ADD [IsPublic] bit NOT NULL DEFAULT(0)
;
CREATE TABLE [SyncDS_ItemView](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemViewId] [uniqueidentifier] NOT NULL,
	[QueryString] [nvarchar](4000) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([ItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([ItemViewId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_ItemView]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

insert into [SyncDS_ItemType] (Name,IsActive) values (N'ItemView',1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,IsActive) VALUES (N'Specific ItemView',0, 1)
;