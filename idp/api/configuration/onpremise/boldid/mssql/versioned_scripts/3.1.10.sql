ALTER TABLE [BOLDTC_Tenant] ALTER  COLUMN TenantIdentifier nvarchar(255) NULL;

ALTER TABLE [BOLDTC_Tenant] ADD UseSiteIdentifier bit NOT NULL DEFAULT '1';

WITH TOP1 AS
(
SELECT Top 1 *
FROM BOLDTC_TenantInfo
WHERE [BOLDTC_TenantInfo].TenantTypeId = 4 AND [BOLDTC_TenantInfo].TenantStatus = 13
ORDER BY [BOLDTC_TenantInfo].CreatedDate asc
)

UPDATE TOP1 SET IsMaster = 1
;

