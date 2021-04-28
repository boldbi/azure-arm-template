UPDATE [SyncDS_ItemType] SET [IsActive] = 1 WHERE [Name] ='Slideshow'
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'Specific Slideshow',0,10,1)
;
INSERT into [SyncDS_PermissionEntity] (Name,EntityType,ItemTypeId, IsActive) VALUES (N'All Slideshow',1,10,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,1,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,2,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,3,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (21,4,1)
;
INSERT INTO [SyncDS_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (22,4,1)
;
INSERT INTO [SyncDS_GroupPermission] (PermissionAccessId, PermissionEntityId, ItemId, GroupId, IsActive) VALUES (1,22,null,1,1)
;
INSERT INTO [SyncDS_GroupPermission] (PermissionAccessId, PermissionEntityId, ItemId, GroupId, IsActive) VALUES (14,22,null,1,1)
;
ALTER TABLE [SyncDS_Item] ADD [IsSampleData] bit null
;
UPDATE [SyncDS_Item] SET [IsSampleData] = 'False' Where [ItemTypeId] = '2'
;
ALTER TABLE [SyncDS_Item] ADD [DataSource] nvarchar(max) null
;