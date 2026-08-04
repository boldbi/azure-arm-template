-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ScheduleDetail'
      AND COLUMN_NAME = 'DashboardViewId'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ScheduleDetail'
      AND COLUMN_NAME = 'DashboardViewId'
      AND DATA_TYPE = 'char'
      AND CHARACTER_MAXIMUM_LENGTH = 38
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD DashboardViewId Char(38) NULL',
    IF(@boldbi_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$

SET @boldbi_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_DSMetrics'
      AND COLUMN_NAME = 'CustomQuery'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_DSMetrics'
      AND COLUMN_NAME = 'CustomQuery'
      AND DATA_TYPE = 'text'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 1 AND @boldbi_column_valid = 0,
    'ALTER TABLE {database_name}.BOLDBI_DSMetrics MODIFY CustomQuery text',
    IF(@boldbi_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
