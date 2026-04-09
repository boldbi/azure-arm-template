INSERT INTO SyncDS_PermissionEntity (Name,EntityType,ItemTypeId, IsActive) SELECT 'All Users',1,12,1
WHERE NOT EXISTS ( SELECT Name FROM SyncDS_PermissionEntity WHERE Name = 'All Users')
;

INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) SELECT 30,3,1
WHERE NOT EXISTS ( SELECT PermissionEntityId FROM SyncDS_PermissionAccEntity WHERE PermissionEntityId = 30 AND PermissionAccessId = 3)
;