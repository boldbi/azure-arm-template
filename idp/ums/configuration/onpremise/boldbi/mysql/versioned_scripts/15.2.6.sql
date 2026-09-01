ALTER TABLE {database_name}.BOLDBI_ApiKeyDetails ADD IsApiKeyViewed tinyint(1) NOT NULL default 1;

-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ApiKeyDetails'
      AND COLUMN_NAME = 'IsApiKeyViewed'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ApiKeyDetails'
      AND COLUMN_NAME = 'IsApiKeyViewed'
      AND COLUMN_TYPE = 'tinyint(1)'
      AND IS_NULLABLE = 'NO'
      AND COLUMN_DEFAULT = '1'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ApiKeyDetails ADD IsApiKeyViewed tinyint(1) NOT NULL default 1',
    IF(@boldbi_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
