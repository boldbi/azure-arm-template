ALTER TABLE {database_name}.SyncDS_User  ADD PasswordChangedDate datetime NULL
;
ALTER TABLE {database_name}.SyncDS_SAMLSettings ADD Authority VARCHAR(4000)
;
ALTER TABLE {database_name}.SyncDS_SAMLSettings ADD DesignerClientId VARCHAR(100)
;
ALTER TABLE {database_name}.SyncDS_SAMLSettings ADD TenantName VARCHAR(100)
;
ALTER TABLE {database_name}.SyncDS_PermissionEntity ADD ItemTypeId INT 
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=3 WHERE {database_name}.SyncDS_PermissionEntity.Id =1
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=1 WHERE {database_name}.SyncDS_PermissionEntity.Id =2
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=3 WHERE {database_name}.SyncDS_PermissionEntity.Id =3
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=1 WHERE {database_name}.SyncDS_PermissionEntity.Id =4
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=1 WHERE {database_name}.SyncDS_PermissionEntity.Id =5
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=4 WHERE {database_name}.SyncDS_PermissionEntity.Id =6
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=4 WHERE {database_name}.SyncDS_PermissionEntity.Id =7
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=6 WHERE {database_name}.SyncDS_PermissionEntity.Id =8
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=6 WHERE {database_name}.SyncDS_PermissionEntity.Id =9
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=7 WHERE {database_name}.SyncDS_PermissionEntity.Id =10
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=7 WHERE {database_name}.SyncDS_PermissionEntity.Id =11
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=2 WHERE {database_name}.SyncDS_PermissionEntity.Id =12
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=1 WHERE {database_name}.SyncDS_PermissionEntity.Id =13
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=2 WHERE {database_name}.SyncDS_PermissionEntity.Id =14
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=8 WHERE {database_name}.SyncDS_PermissionEntity.Id =15
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=8 WHERE {database_name}.SyncDS_PermissionEntity.Id =16
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=5 WHERE {database_name}.SyncDS_PermissionEntity.Id =17
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=5 WHERE {database_name}.SyncDS_PermissionEntity.Id =18
;
UPDATE {database_name}.SyncDS_PermissionEntity SET ItemTypeId=9 WHERE {database_name}.SyncDS_PermissionEntity.Id =19
;
ALTER TABLE {database_name}.SyncDS_PermissionEntity MODIFY COLUMN ItemTypeId INT NOT NULL
;
ALTER TABLE {database_name}.SyncDS_PermissionEntity ADD Foreign key(ItemTypeId) references {database_name}.SyncDS_ItemType (Id)
;

DROP TABLE {database_name}.SyncDS_ReportDataSource;

DROP TABLE {database_name}.SyncDS_DataSourceDetail;


CREATE TABLE {database_name}.SyncDS_DashboardDataSource(
	Id int NOT NULL AUTO_INCREMENT,
	DashboardItemId char(38) NOT NULL,
	DataSourceName varchar(255) NOT NULL,
	DataSourceItemId char(38) NOT NULL,
	VersionNumber int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_DashboardDataSource  ADD FOREIGN KEY(DashboardItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_DashboardDataSource  ADD FOREIGN KEY(DataSourceItemId) REFERENCES {database_name}.SyncDS_Item (Id)
;
ALTER TABLE {database_name}.SyncDS_DashboardDataSource  ADD FOREIGN KEY(VersionNumber) REFERENCES {database_name}.SyncDS_ItemVersion (Id)
;
ALTER TABLE {database_name}.SyncDS_SystemSettings ADD CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE(`Key`)
;