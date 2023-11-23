CREATE TABLE [BOLDBI_UploadDataSourceMapping](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [DownloadedTenantId] [uniqueidentifier] NOT NULL,
    [DownloadedItemId] [nvarchar](255) NOT NULL,
    [UploadedItemId] [uniqueidentifier] NOT NULL,
    [UploadedDate] [datetime] NULL,
    [IsActive] [bit] NULL)
;

INSERT INTO [BOLDBI_PermissionAccess] (Name, AccessId, IsActive) VALUES (N'Download',18,1)
;

INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,5,1)
;
INSERT INTO [BOLDBI_PermissionAccEntity] (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,5,1)
;