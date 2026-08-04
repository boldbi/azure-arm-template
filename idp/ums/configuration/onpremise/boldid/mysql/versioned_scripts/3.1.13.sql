-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldtc_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_AuthSettings'
      AND COLUMN_NAME = 'ModifiedBy'
      AND DATA_TYPE = 'char'
      AND CHARACTER_MAXIMUM_LENGTH = 38
      AND IS_NULLABLE = 'YES'
);

SET @boldtc_sql := IF(
    @boldtc_column_valid = 1,
    'SELECT 1',
    'ALTER TABLE {database_name}.BOLDTC_AuthSettings MODIFY COLUMN ModifiedBy char(38) NULL'
);

PREPARE boldtc_stmt FROM @boldtc_sql;
EXECUTE boldtc_stmt;
DEALLOCATE PREPARE boldtc_stmt;
$$

SET @boldtc_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_AuthSettings'
      AND COLUMN_NAME = 'CreatedBy'
      AND DATA_TYPE = 'char'
      AND CHARACTER_MAXIMUM_LENGTH = 38
      AND IS_NULLABLE = 'YES'
);

SET @boldtc_sql := IF(
    @boldtc_column_valid = 1,
    'SELECT 1',
    'ALTER TABLE {database_name}.BOLDTC_AuthSettings MODIFY COLUMN CreatedBy char(38) NULL'
);

PREPARE boldtc_stmt FROM @boldtc_sql;
EXECUTE boldtc_stmt;
DEALLOCATE PREPARE boldtc_stmt;
$$
