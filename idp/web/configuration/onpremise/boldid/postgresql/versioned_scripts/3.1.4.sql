ALTER TABLE BOLDTC_TenantInfo ADD IsMaster smallint NOT NULL DEFAULT 0
;
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
ALTER TABLE BOLDTC_TenantInfo ADD IsolationCode varchar(4000)
;
ALTER TABLE BOLDTC_TenantInfo ADD IsTenantIsolationCodeEnabled smallint NOT NULL DEFAULT 0
;