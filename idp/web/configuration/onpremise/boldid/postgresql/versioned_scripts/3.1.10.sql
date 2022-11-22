ALTER TABLE BOLDTC_Tenant ALTER COLUMN TenantIdentifier DROP NOT NULL;

ALTER TABLE BOLDTC_Tenant ADD UseSiteIdentifier smallint NOT NULL DEFAULT 1;

WITH cte AS (
   SELECT id, row_number() OVER (ORDER BY BOLDTC_TenantInfo.CreatedDate DESC NULLS LAST) AS rn
   FROM   BOLDTC_TenantInfo   
   ORDER  BY BOLDTC_TenantInfo.CreatedDate ASC NULLS LAST
   LIMIT  1
   )
UPDATE BOLDTC_TenantInfo a
SET IsMaster = 1
FROM cte
WHERE cte.id = a.id;

