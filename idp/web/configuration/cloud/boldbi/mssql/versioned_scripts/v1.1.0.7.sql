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

CREATE TABLE [SyncDS_PermissionLogType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[Name] [nvarchar](100) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL)
;

INSERT into [SyncDS_PermissionLogType] (Name,IsActive) VALUES ( N'PermissionAdded',1)
;
INSERT into [SyncDS_PermissionLogType] (Name,IsActive) VALUES ( N'PermissionRemoved',1)
;

CREATE TABLE [SyncDS_UserPermissionLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[UserId] [int] NOT NULL,	
	[AffectedUserId] [int] NOT NULL,
	[UserPermissionId] [int] NULL,
	[LogTypeId] [int] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([LogTypeId]) REFERENCES [SyncDS_PermissionLogType] ([Id])
;
ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([UserPermissionId]) REFERENCES [SyncDS_UserPermission] ([Id])
;
ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_UserPermissionLog]  ADD  FOREIGN KEY([AffectedUserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_GroupPermissionLog](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[UserId] [int] NOT NULL,	
	[AffectedGroupId] [int] NOT NULL,
	[GroupPermissionId] [int] NULL,
	[LogTypeId] [int] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([LogTypeId]) REFERENCES [SyncDS_PermissionLogType] ([Id])
;
ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([GroupPermissionId]) REFERENCES [SyncDS_GroupPermission] ([Id])
;
ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;
ALTER TABLE [SyncDS_GroupPermissionLog]  ADD  FOREIGN KEY([AffectedGroupId]) REFERENCES [SyncDS_Group] ([Id])
;