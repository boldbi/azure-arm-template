
CREATE TABLE {database_name}.BOLDBI_ResourceFeatureAccess (
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(4000) NOT NULL,
    Type varchar(4000) NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;
CREATE TABLE {database_name}.BOLDBI_ResourceFeatureAccEntity (
    Id int NOT NULL AUTO_INCREMENT,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessId int NOT NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;
CREATE TABLE {database_name}.BOLDBI_UserResourceFeaturePermission (
    Id int NOT NULL AUTO_INCREMENT,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessJson varchar(4000) NOT NULL,
    ItemId Char(38) NULL,
    UserId int NOT NULL,
    ScopeGroupId int NULL,
    ItemTypeId int NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;
CREATE TABLE {database_name}.BOLDBI_GroupResourceFeaturePermission (
    Id int NOT NULL AUTO_INCREMENT,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessJson varchar(4000) NOT NULL,
    ItemId Char(38) NULL,
    GroupId int NOT NULL,
    ScopeGroupId int NULL,
    ItemTypeId int NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))  ROW_FORMAT=DYNAMIC
;

INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Image',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'PDF',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'PPT',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Excel',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'CSV',N'Export',1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'View Underlying Data',NULL,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Dashboard Parameters',NULL,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,1,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,1,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,1,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,2,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,2,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,2,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,3,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,3,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,3,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,4,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,4,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,4,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,5,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,5,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,5,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,6,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,6,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,6,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,7,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,7,1)
;
INSERT into {database_name}.BOLDBI_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,7,1)
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ResourceFeatureAccEntity'
      AND COLUMN_NAME = 'PermissionEntityId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_PermissionEntity'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ResourceFeatureAccEntity ADD CONSTRAINT FK_BOLDBI_ResourceFeatureAccEntity_PermissionEntityId FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ResourceFeatureAccEntity'
      AND COLUMN_NAME = 'ResourceFeatureAccessId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_ResourceFeatureAccess'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ResourceFeatureAccEntity ADD CONSTRAINT FK_BOLDBI_ResourceFeatureAccEntity_ResourceFeatureAccessId FOREIGN KEY(ResourceFeatureAccessId) REFERENCES {database_name}.BOLDBI_ResourceFeatureAccess (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_UserResourceFeaturePermission'
      AND COLUMN_NAME = 'PermissionEntityId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_PermissionEntity'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_UserResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_UserResourceFeaturePermission_PermissionEntityId FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_UserResourceFeaturePermission'
      AND COLUMN_NAME = 'ItemId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_Item'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_UserResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_UserResourceFeaturePermission_ItemId FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_UserResourceFeaturePermission'
      AND COLUMN_NAME = 'UserId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_User'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_UserResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_UserResourceFeaturePermission_UserId FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_UserResourceFeaturePermission'
      AND COLUMN_NAME = 'ScopeGroupId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_Group'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_UserResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_UserResourceFeaturePermission_ScopeGroupId FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_UserResourceFeaturePermission'
      AND COLUMN_NAME = 'ItemTypeId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_ItemType'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_UserResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_UserResourceFeaturePermission_ItemTypeId FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_GroupResourceFeaturePermission'
      AND COLUMN_NAME = 'PermissionEntityId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_PermissionEntity'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_GroupResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_GroupResourceFeaturePermission_PermissionEntityId FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_GroupResourceFeaturePermission'
      AND COLUMN_NAME = 'ItemId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_Item'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_GroupResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_GroupResourceFeaturePermission_ItemId FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_GroupResourceFeaturePermission'
      AND COLUMN_NAME = 'GroupId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_Group'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_GroupResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_GroupResourceFeaturePermission_GroupId FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_GroupResourceFeaturePermission'
      AND COLUMN_NAME = 'ScopeGroupId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_Group'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_GroupResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_GroupResourceFeaturePermission_ScopeGroupId FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;

SET @boldbi_fk_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_GroupResourceFeaturePermission'
      AND COLUMN_NAME = 'ItemTypeId'
      AND REFERENCED_TABLE_NAME = 'BOLDBI_ItemType'
      AND REFERENCED_COLUMN_NAME = 'Id'
);
SET @boldbi_sql := IF(
    @boldbi_fk_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_GroupResourceFeaturePermission ADD CONSTRAINT FK_BOLDBI_GroupResourceFeaturePermission_ItemTypeId FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)',
    'SELECT 1'
);
PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
;
