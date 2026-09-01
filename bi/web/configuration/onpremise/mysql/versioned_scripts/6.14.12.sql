-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_table_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
);

SET @boldbi_table_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ai_qnawidgethistory'
      AND (
          (COLUMN_NAME = 'searchid' AND DATA_TYPE = 'varchar' AND CHARACTER_MAXIMUM_LENGTH = 255 AND COLUMN_KEY = 'PRI')
          OR (COLUMN_NAME = 'question' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'tableinfo' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'schemasequence' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'fieldinfo' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'message' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'haserror' AND DATA_TYPE = 'tinyint')
          OR (COLUMN_NAME = 'sqlquery' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'uservote' AND DATA_TYPE = 'text')
          OR (COLUMN_NAME = 'isreported' AND DATA_TYPE = 'tinyint')
      )
);

SET @boldbi_sql := IF(
    @boldbi_table_count = 0,
    'CREATE TABLE {database_name}.BOLDBI_ai_qnawidgethistory (
        searchid VARCHAR(255) PRIMARY KEY,
        question TEXT,
        tableinfo TEXT,
        schemasequence TEXT,
        fieldinfo TEXT,
        message TEXT,
        haserror BOOLEAN,
        sqlquery TEXT,
        uservote TEXT,
        isreported BOOLEAN)',
    IF(@boldbi_table_valid = 10, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
