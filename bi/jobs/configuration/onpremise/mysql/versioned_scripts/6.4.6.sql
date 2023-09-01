CREATE TABLE {database_name}.BOLDBI_UploadDataSourceMapping(
	Id int NOT NULL AUTO_INCREMENT,
	DownloadedTenantId char(38) NOT NULL,
	DownloadedItemId varchar(255) NOT NULL,
	UploadedItemId char(38) NOT NULL,
	UploadedDate datetime  NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

INSERT into {database_name}.BOLDBI_PermissionAccess (Name, AccessId, IsActive) VALUES ('Download',18,1)
;

INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (12,5,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (13,5,1)
;
INSERT into {database_name}.BOLDBI_PermissionAccEntity (PermissionEntityId, PermissionAccessId, IsActive) VALUES (14,5,1)
;