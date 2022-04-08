ALTER TABLE [SyncDS_User] ADD [PasswordChangedDate] datetime NULL
;
ALTER TABLE [SyncDS_SAMLSettings] ADD [Authority] NVARCHAR(4000)
;
ALTER TABLE [SyncDS_SAMLSettings] ADD [DesignerClientId] NVARCHAR(100)
;
ALTER TABLE [SyncDS_SAMLSettings] ADD [TenantName] NVARCHAR(100)
;
ALTER TABLE [SyncDS_PermissionEntity] ADD  [ItemTypeId] INT 
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=3 WHERE Id =1
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=1 WHERE Id =2
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=3 WHERE Id =3
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=1 WHERE Id =4
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=1 WHERE Id =5
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=4 WHERE Id =6
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=4 WHERE Id =7
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=6 WHERE Id =8
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=6 WHERE Id =9
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=7 WHERE Id =10
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=7 WHERE Id =11
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=2 WHERE Id =12
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=1 WHERE Id =13
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=2 WHERE Id =14
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=8 WHERE Id =15
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=8 WHERE Id =16
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=5 WHERE Id =17
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=5 WHERE Id =18
;
UPDATE [SyncDS_PermissionEntity] SET [ItemTypeId]=9 WHERE Id =19
;
ALTER TABLE [SyncDS_PermissionEntity] ALTER COLUMN [ItemTypeId] INT NOT NULL
;
ALTER TABLE [SyncDS_PermissionEntity] ADD Foreign key([ItemTypeId]) references SyncDS_ItemType([Id])
;

DROP TABLE [SyncDS_ReportDataSource]
;

DROP TABLE [SyncDS_DataSourceDetail]
;

CREATE TABLE [SyncDS_DashboardDataSource](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[DashboardItemId] [uniqueidentifier] NOT NULL,
	[DataSourceName] [nvarchar](255) NOT NULL,
	[DataSourceItemId] [uniqueidentifier] NOT NULL,
	[VersionNumber] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([DashboardItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([DataSourceItemId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_DashboardDataSource]  ADD FOREIGN KEY([VersionNumber]) REFERENCES [SyncDS_ItemVersion] ([Id])
;
ALTER TABLE [SyncDS_SystemSettings] ADD CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE ([Key])
;