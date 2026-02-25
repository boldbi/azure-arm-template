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
    ItemId varchar(4000) NULL,
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
    ItemId varchar(4000) NULL,
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

ALTER TABLE  {database_name}.BOLDBI_ResourceFeatureAccEntity  ADD FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_ResourceFeatureAccEntity  ADD FOREIGN KEY(ResourceFeatureAccessId) REFERENCES {database_name}.BOLDBI_ResourceFeatureAccess (Id)
;

ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDBI_User (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission ADD FOREIGN KEY(SettingsTypeId) REFERENCES {database_name}.BOLDBI_SettingsType (Id) 
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_UserResourceFeaturePermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;

ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES {database_name}.BOLDBI_PermissionEntity (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(ItemId) REFERENCES {database_name}.BOLDBI_Item (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(GroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission ADD FOREIGN KEY(SettingsTypeId) REFERENCES {database_name}.BOLDBI_SettingsType (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission ADD  FOREIGN KEY(ScopeGroupId) REFERENCES {database_name}.BOLDBI_Group (Id)
;
ALTER TABLE  {database_name}.BOLDBI_GroupResourceFeaturePermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES {database_name}.BOLDBI_ItemType (Id)
;
