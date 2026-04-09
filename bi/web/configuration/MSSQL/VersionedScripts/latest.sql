ALTER TABLE [SyncDS_ItemCommentLogType] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_ConditionCategory] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_ExportType] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_ItemLogType] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_ItemType] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_PermissionEntity] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_RecurrenceType] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_SystemLogType] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_UserLogType] ADD UNIQUE ([Name])
;
ALTER TABLE [SyncDS_UserType] ADD UNIQUE ([Type])
;

CREATE TABLE [SyncDS_PermissionAccess](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) UNIQUE NOT NULL,
	[AccessId] [int] UNIQUE NOT NULL,
	[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_PermissionAccEntity](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[PermissionEntityId] [int] NOT NULL,
	[PermissionAccessId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_PermissionAccEntity]  ADD FOREIGN KEY([PermissionEntityId]) REFERENCES [SyncDS_PermissionEntity] ([Id])
;
ALTER TABLE [SyncDS_PermissionAccEntity]  ADD FOREIGN KEY([PermissionAccessId]) REFERENCES [SyncDS_PermissionAccess] ([Id])
;

INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Create',1,1)
;																	    
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read',2,1)
;																	    
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write',6,1)
;																	    
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete',14,1)
;																	    
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Download',18,1)
;																	    
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Download',22,1)
;																	    
INSERT INTO [SyncDS_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Read, Write, Delete, Download',30,1)
;

INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(4,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(6,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(10,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(12,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(13,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(15,1,1)
;			
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(12,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(13,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(14,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(4,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(5,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(10,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(11,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(15,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(16,2,1)
;			
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(4,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(5,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(10,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(11,3,1)
;			
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(4,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(5,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(10,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(11,4,1)
;			
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(12,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(13,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(14,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(15,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(16,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(6,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(7,5,1)
;			
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(12,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(13,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(14,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(15,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(16,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(6,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(7,6,1)
;			
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(12,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(13,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(14,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(6,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(7,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(15,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES(16,7,1)
;

INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,5,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,6,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (8,7,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (9,7,1)
;

UPDATE [SyncDS_UserPermission] SET [PermissionAccessId]='18' WHERE [PermissionAccessId]='2' AND [PermissionEntityId] NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE [SyncDS_UserPermission] SET [PermissionAccessId]='22' WHERE [PermissionAccessId]='6' AND [PermissionEntityId] NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE [SyncDS_UserPermission] SET [PermissionAccessId]='30' WHERE [PermissionAccessId]='14' AND [PermissionEntityId] NOT IN ('4', '5', '10', '11', '19', '20')
;


UPDATE [SyncDS_GroupPermission] SET [PermissionAccessId]='18' WHERE [PermissionAccessId]='2' AND [PermissionEntityId] NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE [SyncDS_GroupPermission] SET [PermissionAccessId]='22' WHERE [PermissionAccessId]='6' AND [PermissionEntityId] NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE [SyncDS_GroupPermission] SET [PermissionAccessId]='30' WHERE [PermissionAccessId]='14' AND [PermissionEntityId] NOT IN ('4', '5', '10', '11', '19', '20')
;

sp_rename 'SyncDS_MultiDashboardMap', 'SyncDS_MultiTabDashboard'
;

CREATE TABLE [SyncDS_CustomExpression](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardId] [uniqueidentifier] NOT NULL,
	[WidgetId] [uniqueidentifier] NOT NULL,
	[DatasourceId] nvarchar(255) NOT NULL,
	[UserId] [int] NOT NULL,
	[Name] nvarchar(255) NULL,
	[Expression] nvarchar(4000) NOT NULL,
	[ColumnInfo] nvarchar(4000) NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([DashboardId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([WidgetId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_CustomExpression]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_HomepageItemFilter](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[HomepageId] [uniqueidentifier] NOT NULL,
	[FilterId] [int] NOT NULL,
	[QueryString] [nvarchar](4000) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_HomepageItemFilter]  ADD FOREIGN KEY([HomepageId]) REFERENCES [SyncDS_Homepage] ([Id])
;