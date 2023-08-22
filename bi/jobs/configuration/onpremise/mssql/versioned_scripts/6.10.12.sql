INSERT INTO [BOLDBI_PermissionEntity] (Name, EntityType, ItemTypeId, IsActive) SELECT 'All Users', 1, 12, 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_PermissionEntity] WHERE Name = 'All Users')
;

INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) SELECT 30, 3, 1
WHERE NOT EXISTS (SELECT * FROM [BOLDBI_PermissionAccEntity] WHERE PermissionEntityId = 30 AND PermissionAccessId = 3)
;
