-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_qna_table_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
);

SET @boldbi_qna_required_columns := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND (
          (COLUMN_NAME = 'searchid' AND DATA_TYPE = 'varchar' AND CHARACTER_MAXIMUM_LENGTH = 255 AND COLUMN_KEY = 'PRI')
          OR (COLUMN_NAME = 'question' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'tableinfo' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'fieldinfo' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'message' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'haserror' AND DATA_TYPE = 'tinyint')
          OR (COLUMN_NAME = 'uservote' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'isreported' AND DATA_TYPE = 'tinyint')
      )
);

SET @boldbi_sql := IF(
    @boldbi_qna_table_count = 0,
    'CREATE TABLE {database_name}.BOLDBI_ai_qnawidgethistory (
        searchid VARCHAR(255) PRIMARY KEY,
        question TEXT,
        tableinfo TEXT,
        fieldinfo TEXT,
        message TEXT,
        haserror BOOLEAN,
        chartType TEXT,
        uservote TEXT,
        isreported BOOLEAN)',
    IF(@boldbi_qna_required_columns = 8, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$

SET @boldbi_charttype_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND COLUMN_NAME = 'chartType'
);

SET @boldbi_charttype_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND COLUMN_NAME = 'chartType'
      AND DATA_TYPE = 'text'
);

SET @boldbi_sql := IF(
    @boldbi_charttype_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ai_qnawidgethistory ADD chartType TEXT',
    IF(@boldbi_charttype_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$

SET @boldbi_logexist_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ScheduleRunHistory'
      AND COLUMN_NAME = 'LogExist'
);

SET @boldbi_logexist_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ScheduleRunHistory'
      AND COLUMN_NAME = 'LogExist'
      AND DATA_TYPE = 'tinyint'
      AND IS_NULLABLE = 'NO'
      AND COLUMN_DEFAULT IN ('0', 'b''0''')
);

SET @boldbi_sql := IF(
    @boldbi_logexist_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ScheduleRunHistory ADD LogExist tinyint NOT NULL DEFAULT 0',
    IF(@boldbi_logexist_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
