-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldid_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantUser'
      AND COLUMN_NAME = 'LastAccessedDate'
);

SET @boldid_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantUser'
      AND COLUMN_NAME = 'LastAccessedDate'
      AND DATA_TYPE = 'datetime'
      AND IS_NULLABLE = 'YES'
);

SET @boldid_sql := IF(
    @boldid_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_TenantUser ADD COLUMN LastAccessedDate datetime NULL',
    IF(@boldid_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldid_stmt FROM @boldid_sql;
EXECUTE boldid_stmt;
DEALLOCATE PREPARE boldid_stmt;
$$
