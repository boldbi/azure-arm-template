-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldid_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_UserLogin'
      AND COLUMN_NAME = 'SessionId'
);

SET @boldid_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_UserLogin'
      AND COLUMN_NAME = 'SessionId'
      AND DATA_TYPE = 'char'
      AND CHARACTER_MAXIMUM_LENGTH = 38
      AND IS_NULLABLE = 'YES'
);

SET @boldid_sql := IF(
    @boldid_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_UserLogin ADD SessionId char(38) NULL',
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
      AND TABLE_NAME = 'BOLDTC_UserLogin'
      AND COLUMN_NAME = 'Browser'
);

SET @boldid_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_UserLogin'
      AND COLUMN_NAME = 'Browser'
      AND DATA_TYPE = 'varchar'
      AND CHARACTER_MAXIMUM_LENGTH = 255
      AND IS_NULLABLE = 'YES'
);

SET @boldid_sql := IF(
    @boldid_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_UserLogin ADD Browser nvarchar(255) NULL',
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
      AND TABLE_NAME = 'BOLDTC_UserLogin'
      AND COLUMN_NAME = 'LastActive'
);

SET @boldid_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDTC_UserLogin'
      AND COLUMN_NAME = 'LastActive'
      AND DATA_TYPE = 'datetime'
      AND IS_NULLABLE = 'YES'
);

SET @boldid_sql := IF(
    @boldid_column_count = 0,
    'ALTER TABLE {database_name}.BOLDTC_UserLogin ADD LastActive datetime NULL',
    IF(@boldid_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldid_stmt FROM @boldid_sql;
EXECUTE boldid_stmt;
DEALLOCATE PREPARE boldid_stmt;
$$
