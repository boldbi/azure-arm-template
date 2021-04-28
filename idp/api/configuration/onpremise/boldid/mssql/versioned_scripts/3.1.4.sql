ALTER TABLE [BOLDTC_TenantInfo] ADD [IsMaster] bit NOT NULL DEFAULT 0
;
WITH TOP1 AS
(
SELECT Top 1 *
FROM BOLDTC_TenantInfo
WHERE [BOLDTC_TenantInfo].TenantTypeId = 3 AND [BOLDTC_TenantInfo].TenantStatus = 13
ORDER BY [BOLDTC_TenantInfo].CreatedDate asc
)
UPDATE TOP1 SET IsMaster = 1
;
ALTER TABLE [BOLDTC_TenantInfo] ADD [IsolationCode] nvarchar(4000) 
;
ALTER TABLE [BOLDTC_TenantInfo] ADD [IsTenantIsolationCodeEnabled] bit NOT NULL DEFAULT 0
;