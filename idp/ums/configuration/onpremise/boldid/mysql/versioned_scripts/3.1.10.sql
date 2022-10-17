ALTER TABLE {database_name}.BOLDTC_Tenant MODIFY COLUMN TenantIdentifier char(255) NULL;

ALTER TABLE {database_name}.BOLDTC_Tenant ADD UseSiteIdentifier tinyint NOT NULL DEFAULT 1;

Update {database_name}.BOLDTC_TenantInfo TOP1,
(SELECT *
FROM {database_name}.BOLDTC_TenantInfo
WHERE {database_name}.BOLDTC_TenantInfo.TenantTypeId = 4 AND {database_name}.BOLDTC_TenantInfo.TenantStatus = 13
ORDER BY {database_name}.BOLDTC_TenantInfo.CreatedDate asc LIMIT 1
) T2
SET TOP1.IsMaster = 1;

