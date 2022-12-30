INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'WindowsAD', UTC_TIMESTAMP(), 1);

INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'WindowsAD', 6, UTC_TIMESTAMP(), 1);

ALTER TABLE {database_name}.BOLDTC_TenantActivity ADD ChildId longtext NULL
;
ALTER TABLE {database_name}.BOLDTC_TenantActivity ADD DetailActionId int NOT NULL DEFAULT 0
;
ALTER TABLE {database_name}.BOLDTC_TenantActivity ADD ActivityLogInfo longtext NULL
;
