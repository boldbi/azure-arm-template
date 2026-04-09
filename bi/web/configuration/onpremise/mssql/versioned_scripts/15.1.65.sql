CREATE TABLE [BOLDBI_ResourceFeatureAccess] (
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [Name] [nvarchar](4000) NOT NULL,
    [Type] [nvarchar](4000) NULL,
    IsActive [bit] NOT NULL
);

CREATE TABLE [BOLDBI_ResourceFeatureAccEntity] (
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [PermissionEntityId] [int] NOT NULL,
    [ResourceFeatureAccessId] [int] NOT NULL,
    [IsActive] [bit] NOT NULL
);

CREATE TABLE [BOLDBI_UserResourceFeaturePermission] (
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [PermissionEntityId] [int] NOT NULL,
    [ResourceFeatureAccessJson] [nvarchar](MAX) NOT NULL,
    [ItemId] [UNIQUEIDENTIFIER] NULL,
    [UserId] [int] NOT NULL,
    [ScopeGroupId] [int] NULL,
    [ItemTypeId] [int] NULL,
    [IsActive] [bit] NOT NULL
);

CREATE TABLE [BOLDBI_GroupResourceFeaturePermission] (
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [PermissionEntityId] [int] NOT NULL,
    [ResourceFeatureAccessJson] [nvarchar](MAX) NOT NULL,
    [ItemId] [UNIQUEIDENTIFIER] NULL,
    [GroupId] [int] NOT NULL,
    [ScopeGroupId] [int] NULL,
    [ItemTypeId] [int] NULL,
    [IsActive] [bit] NOT NULL
);

INSERT into [BOLDBI_ResourceFeatureAccess] (Name,Type,IsActive) VALUES (N'Image',N'Export',1)
;
INSERT into [BOLDBI_ResourceFeatureAccess] (Name,Type,IsActive) VALUES (N'PDF',N'Export',1)
;
INSERT into [BOLDBI_ResourceFeatureAccess] (Name,Type,IsActive) VALUES (N'PPT',N'Export',1)
;
INSERT into [BOLDBI_ResourceFeatureAccess] (Name,Type,IsActive) VALUES (N'Excel',N'Export',1)
;
INSERT into [BOLDBI_ResourceFeatureAccess] (Name,Type,IsActive) VALUES (N'CSV',N'Export',1)
;
INSERT into [BOLDBI_ResourceFeatureAccess] (Name,Type,IsActive) VALUES (N'View Underlying Data',NULL,1)
;
INSERT into [BOLDBI_ResourceFeatureAccess] (Name,Type,IsActive) VALUES (N'Dashboard Parameters',NULL,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,1,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,1,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,1,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,2,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,2,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,2,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,3,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,3,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,3,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,4,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,4,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,4,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,5,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,5,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,5,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,6,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,6,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,6,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (12,7,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (13,7,1)
;
INSERT into [BOLDBI_ResourceFeatureAccEntity] (PermissionEntityId,ResourceFeatureAccessId,IsActive) VALUES (14,7,1)
;

ALTER TABLE [BOLDBI_ResourceFeatureAccEntity]  ADD FOREIGN KEY([PermissionEntityId]) REFERENCES [BOLDBI_PermissionEntity] ([Id])
;
ALTER TABLE [BOLDBI_ResourceFeatureAccEntity]  ADD FOREIGN KEY([ResourceFeatureAccessId]) REFERENCES [BOLDBI_ResourceFeatureAccess] ([Id])
;

ALTER TABLE [BOLDBI_UserResourceFeaturePermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [BOLDBI_PermissionEntity] ([Id])
;
ALTER TABLE [BOLDBI_UserResourceFeaturePermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_UserResourceFeaturePermission]  ADD  FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_UserResourceFeaturePermission] ADD FOREIGN KEY ([SettingsTypeId]) REFERENCES [BOLDBI_SettingsType] (Id) 
;
ALTER TABLE [BOLDBI_UserResourceFeaturePermission]  ADD  FOREIGN KEY([ScopeGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_UserResourceFeaturePermission]  ADD  FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;

ALTER TABLE [BOLDBI_GroupResourceFeaturePermission]  ADD  FOREIGN KEY([PermissionEntityId]) REFERENCES [BOLDBI_PermissionEntity] ([Id])
;
ALTER TABLE [BOLDBI_GroupResourceFeaturePermission]  ADD  FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_GroupResourceFeaturePermission]  ADD  FOREIGN KEY([GroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_GroupResourceFeaturePermission] ADD FOREIGN KEY ([SettingsTypeId]) REFERENCES [BOLDBI_SettingsType] (Id)
;
ALTER TABLE [BOLDBI_GroupResourceFeaturePermission]  ADD  FOREIGN KEY([ScopeGroupId]) REFERENCES [BOLDBI_Group] ([Id])
;
ALTER TABLE [BOLDBI_GroupResourceFeaturePermission]  ADD  FOREIGN KEY([ItemTypeId]) REFERENCES [BOLDBI_ItemType] ([Id])
;
