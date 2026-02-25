CREATE TABLE SyncDS_ResourceFeatureAccess (
    Id SERIAL PRIMARY KEY NOT NULL,
    Name varchar(4000) NOT NULL,
    Type varchar(4000) NULL,
    IsActive smallint NOT NULL
);
CREATE TABLE SyncDS_ResourceFeatureAccEntity (
    Id SERIAL PRIMARY KEY NOT NULL,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessId int NOT NULL,
    IsActive smallint NOT NULL
);
CREATE TABLE SyncDS_UserResourceFeaturePermission (
    Id SERIAL PRIMARY KEY NOT NULL,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessJson varchar(4000) NOT NULL,
    ItemId uuid NULL,
    UserId int NOT NULL,
    ScopeGroupId int NULL,
    ItemTypeId int NULL,
    IsActive smallint NOT NULL
);
CREATE TABLE SyncDS_GroupResourceFeaturePermission (
    Id SERIAL PRIMARY KEY NOT NULL,
    PermissionEntityId int NOT NULL,
    ResourceFeatureAccessJson varchar(4000) NOT NULL,
    ItemId uuid NULL,
    GroupId int NOT NULL,
    ScopeGroupId int NULL,
    ItemTypeId int NULL,
    IsActive smallint NOT NULL
);

INSERT into SyncDs_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Image',N'Export',1)
;
INSERT into SyncDs_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'PDF',N'Export',1)
;
INSERT into SyncDs_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'PPT',N'Export',1)
;
INSERT into SyncDs_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Excel',N'Export',1)
;
INSERT into SyncDs_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'CSV',N'Export',1)
;
INSERT into SyncDs_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'View Underlying Data',NULL,1)
;
INSERT into SyncDs_ResourceFeatureAccess (Name,Type,IsActive) VALUES (N'Dashboard Parameters',NULL,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,1,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,1,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,1,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,2,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,2,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,2,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,3,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,3,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,3,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,4,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,4,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,4,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,5,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,5,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,5,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,6,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,6,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,6,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,7,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,7,1)
;
INSERT into SyncDs_ResourceFeatureAccEntity (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,7,1)
;

ALTER TABLE SyncDS_ResourceFeatureAccEntity  ADD FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_ResourceFeatureAccEntity  ADD FOREIGN KEY(ResourceFeatureAccessId) REFERENCES SyncDS_ResourceFeatureAccess (Id)
;

ALTER TABLE SyncDS_UserResourceFeaturePermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_UserResourceFeaturePermission  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_UserResourceFeaturePermission  ADD  FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
ALTER TABLE SyncDS_UserResourceFeaturePermission  ADD FOREIGN KEY(SettingsTypeId) REFERENCES SyncDS_SettingsType (Id) 
;
ALTER TABLE SyncDS_UserResourceFeaturePermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_UserResourceFeaturePermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;

ALTER TABLE SyncDS_GroupResourceFeaturePermission  ADD  FOREIGN KEY(PermissionEntityId) REFERENCES SyncDS_PermissionEntity (Id)
;
ALTER TABLE SyncDS_GroupResourceFeaturePermission  ADD  FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_GroupResourceFeaturePermission  ADD  FOREIGN KEY(GroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_GroupResourceFeaturePermission  ADD FOREIGN KEY(SettingsTypeId) REFERENCES SyncDS_SettingsType (Id)
;
ALTER TABLE SyncDS_GroupResourceFeaturePermission  ADD  FOREIGN KEY(ScopeGroupId) REFERENCES SyncDS_Group (Id)
;
ALTER TABLE SyncDS_GroupResourceFeaturePermission  ADD  FOREIGN KEY(ItemTypeId) REFERENCES SyncDS_ItemType (Id)
;
