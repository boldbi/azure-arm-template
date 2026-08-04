-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldid_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantInfo'
      AND COLUMN_NAME = 'ResourceLimitationSettings'
);

SET @boldid_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantInfo'
      AND COLUMN_NAME = 'ResourceLimitationSettings'
      AND DATA_TYPE = 'longtext'
      AND IS_NULLABLE = 'YES'
);

SET @boldid_sql := IF(
    @boldid_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD COLUMN ResourceLimitationSettings LONGTEXT',
    IF(@boldid_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldid_stmt FROM @boldid_sql;
EXECUTE boldid_stmt;
DEALLOCATE PREPARE boldid_stmt;
$$

SET @boldid_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_User'
      AND COLUMN_NAME = 'ActivationMethod'
);

SET @boldid_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_User'
      AND COLUMN_NAME = 'ActivationMethod'
      AND DATA_TYPE = 'varchar'
      AND CHARACTER_MAXIMUM_LENGTH = 20
      AND IS_NULLABLE = 'YES'
);

SET @boldid_sql := IF(
    @boldid_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_User ADD COLUMN ActivationMethod nvarchar(20) NULL',
    IF(@boldid_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldid_stmt FROM @boldid_sql;
EXECUTE boldid_stmt;
DEALLOCATE PREPARE boldid_stmt;
$$
