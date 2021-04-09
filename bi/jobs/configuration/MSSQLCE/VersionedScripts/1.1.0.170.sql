insert into [ItemType] (Name,IsActive) values (N'Widget',1)
;
insert into PermissionEntity (Name,EntityType,IsActive) values('All Widgets',1,1)
;
insert into PermissionEntity (Name,EntityType,IsActive) values('Specific Widget',0,1)
;
insert into [GroupPermission] (PermissionAccessId,PermissionEntityId,GroupId,IsActive) values(1,15,1,1)
;
ALTER TABLE [UserPreference] ADD [Notifications] nvarchar(4000) NULL
;

CREATE TABLE [Comment](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Comment] [NVARCHAR](4000) NOT NULL,
    [ItemId] [uniqueidentifier] NOT NULL,
    [UserId] [int] NOT NULL,
    [ParentId] [int] NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [ModifiedById] [int] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

ALTER TABLE [Comment] ADD FOREIGN KEY([ItemId]) REFERENCES [Item] ([Id])
;
ALTER TABLE [Comment] ADD FOREIGN KEY([UserId]) REFERENCES [User] ([Id])
;
ALTER TABLE [Comment] ADD FOREIGN KEY([ModifiedById]) REFERENCES [User] ([Id])
; 

CREATE TABLE [ItemWatch](
            [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
            [ItemId] [uniqueidentifier] NOT NULL,
            [UserId] [int] NOT NULL,
            [ModifiedDate] [datetime] NOT NULL,
			[IsWatched] [bit] NOT NULL,
            [IsActive] [bit] NOT NULL)
;

ALTER TABLE [ItemWatch] ADD FOREIGN KEY([ItemId]) REFERENCES [Item] ([Id])
;
ALTER TABLE [ItemWatch] ADD FOREIGN KEY([UserId]) REFERENCES [User] ([Id])
; 

CREATE TABLE [ItemCommentLogType](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Name] [nvarchar](100) NULL,
    [IsActive] [bit] NULL)
;

CREATE TABLE [ItemCommentLog](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [ItemCommentLogTypeId] [int] NOT NULL,
    [CurrentUserId] [int] NOT NULL,    
    [CommentId] [int] NOT NULL,
    [ClubId] nvarchar(100) NOT NULL,
    [RepliedFor] [int] NULL,
    [OldValue] nvarchar(4000) NULL,
    [NewValue] nvarchar(4000) NULL,
    [NotificationTo] [int] NULL,    
    [ModifiedDate] [datetime] NOT NULL,
    [IsRead] [bit] NOT NULL,
    [IsActive] [bit] NOT NULL)
;

ALTER TABLE [ItemCommentLog]  ADD FOREIGN KEY([CurrentUserId]) REFERENCES [User] ([Id])
;
ALTER TABLE [ItemCommentLog]  ADD FOREIGN KEY([ItemCommentLogTypeId]) REFERENCES [ItemCommentLogType] ([Id])
;
ALTER TABLE [ItemCommentLog]  ADD FOREIGN KEY([CommentId]) REFERENCES [Comment] ([Id])
;
ALTER TABLE [ItemCommentLog]  ADD FOREIGN KEY([RepliedFor]) REFERENCES [Comment] ([Id])
;
ALTER TABLE [ItemCommentLog]  ADD FOREIGN KEY([NotificationTo]) REFERENCES [User] ([Id])
;

CREATE TABLE [DashboardWidget] (
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardItemId] [uniqueidentifier] NOT NULL,
	[WidgetItemId] [uniqueidentifier] NOT NULL,
	[WidgetDesignerId] [uniqueidentifier] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [DashboardWidget]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [Item] ([Id])
;
ALTER TABLE [DashboardWidget]  ADD FOREIGN KEY([WidgetItemId]) REFERENCES [Item] ([Id])
;
ALTER TABLE [Item] ALTER COLUMN [Name] [nvarchar](255) NOT NULL
;
ALTER TABLE [ItemVersion] ALTER COLUMN [ItemName] [nvarchar](265) NULL
;

INSERT into [ItemCommentLogType] (Name,IsActive) VALUES ( N'Added',1)
;
INSERT into [ItemCommentLogType] (Name,IsActive) VALUES ( N'Edited',1)
;
INSERT into [ItemCommentLogType] (Name,IsActive) VALUES ( N'Deleted',1)
;
INSERT into [ItemCommentLogType] (Name,IsActive) VALUES ( N'Upvoted',1)
;
INSERT into [ItemCommentLogType] (Name,IsActive) VALUES ( N'Downvoted',1)
;
INSERT into [ItemCommentLogType] (Name,IsActive) VALUES ( N'Replied',1)
;

ALTER TABLE [SystemSettings] ADD [ModifiedDate] datetime NULL
;

UPDATE [SystemSettings] SET [ModifiedDate]=GetDate()
;

ALTER TABLE [SystemSettings] ALTER COLUMN [ModifiedDate] datetime NOT NULL
;

ALTER TABLE [UserPreference] ADD [Language_new] nvarchar(4000) NULL
;

UPDATE [UserPreference] SET [Language_new] = [Language]
;

ALTER TABLE [UserPreference] DROP column [Language]
;

ALTER TABLE [UserPreference] ADD [Language] nvarchar(4000) NULL
;

UPDATE [UserPreference] SET [Language] = [Language_new]
;

ALTER TABLE [UserPreference] DROP column [Language_new]
;