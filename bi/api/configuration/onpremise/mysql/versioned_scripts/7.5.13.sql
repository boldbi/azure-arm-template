-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND COLUMN_NAME = 'search_date'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND COLUMN_NAME = 'search_date'
      AND DATA_TYPE = 'timestamp'
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ai_qnawidgethistory ADD search_date TIMESTAMP',
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
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND COLUMN_NAME = 'widgetid'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND COLUMN_NAME = 'widgetid'
      AND DATA_TYPE = 'varchar'
      AND CHARACTER_MAXIMUM_LENGTH = 255
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ai_qnawidgethistory ADD widgetid VARCHAR(255)',
    IF(@boldbi_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$

SET @boldbi_exporttype_count := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_ExportType
    WHERE Name = 'DashboardCache'
);

SET @boldbi_exporttype_valid := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_ExportType
    WHERE Name = 'DashboardCache'
      AND IsActive = 1
);

SET @boldbi_sql := IF(
    @boldbi_exporttype_count = 0,
    'INSERT INTO {database_name}.BOLDBI_ExportType (Name, IsActive) VALUES (''DashboardCache'', 1)',
    IF(@boldbi_exporttype_count = @boldbi_exporttype_valid, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
