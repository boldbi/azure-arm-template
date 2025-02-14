CREATE TABLE SyncDS_UploadDataSourceMapping (
	Id SERIAL primary key NOT NULL,
	DownloadedTenantId uuid NOT NULL,
	DownloadedItemId varchar(255) NOT NULL,
	UploadedItemId uuid NOT NULL,
	UploadedDate timestamp  NULL,
	IsActive smallint NOT NULL)
;

INSERT INTO SyncDS_PermissionAccess (Name, AccessId, IsActive) VALUES (N'Download',18,1)
;

INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,5,1)
;
INSERT INTO SyncDS_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,5,1)
;