-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldtc_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantInfo'
      AND COLUMN_NAME = 'SchemaName'
);

SET @boldtc_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantInfo'
      AND COLUMN_NAME = 'SchemaName'
      AND DATA_TYPE = 'longtext'
      AND IS_NULLABLE = 'YES'
);

SET @boldtc_sql := IF(
    @boldtc_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD COLUMN SchemaName LONGTEXT',
    IF(@boldtc_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldtc_stmt FROM @boldtc_sql;
EXECUTE boldtc_stmt;
DEALLOCATE PREPARE boldtc_stmt;
$$

SET @boldtc_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantInfo'
      AND COLUMN_NAME = 'Prefix'
);

SET @boldtc_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_TenantInfo'
      AND COLUMN_NAME = 'Prefix'
      AND DATA_TYPE = 'longtext'
      AND IS_NULLABLE = 'YES'
);

SET @boldtc_sql := IF(
    @boldtc_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD COLUMN Prefix LONGTEXT',
    IF(@boldtc_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldtc_stmt FROM @boldtc_sql;
EXECUTE boldtc_stmt;
DEALLOCATE PREPARE boldtc_stmt;
$$
