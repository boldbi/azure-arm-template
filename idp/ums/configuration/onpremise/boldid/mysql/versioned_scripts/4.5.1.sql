-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldtc_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_UserLogin'
      AND COLUMN_NAME = 'IpAddress'
      AND DATA_TYPE = 'varchar'
      AND CHARACTER_MAXIMUM_LENGTH = 255
      AND IS_NULLABLE = 'NO'
);

SET @boldtc_sql := IF(
    @boldtc_column_valid = 1,
    'SELECT 1',
    'ALTER TABLE {database_name}.BOLDTC_UserLogin MODIFY COLUMN IpAddress nvarchar(255) NOT NULL'
);

PREPARE boldtc_stmt FROM @boldtc_sql;
EXECUTE boldtc_stmt;
DEALLOCATE PREPARE boldtc_stmt;
$$
