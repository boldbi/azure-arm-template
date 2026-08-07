-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_Item'
      AND COLUMN_NAME = 'DashboardLogo'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_Item'
      AND COLUMN_NAME = 'DashboardLogo'
      AND DATA_TYPE = 'varchar'
      AND CHARACTER_MAXIMUM_LENGTH = 1026
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_Item ADD COLUMN DashboardLogo varchar(1026) NULL',
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
      AND TABLE_NAME = 'BOLDBI_ScheduleDetail'
      AND COLUMN_NAME = 'AIInsightSummaryEnabled'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ScheduleDetail'
      AND COLUMN_NAME = 'AIInsightSummaryEnabled'
      AND DATA_TYPE = 'tinyint'
      AND IS_NULLABLE = 'NO'
      AND COLUMN_DEFAULT IN ('0', 'b''0''')
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD AIInsightSummaryEnabled tinyint(1) NOT NULL default 0',
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
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'RequestType'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'RequestType'
      AND DATA_TYPE = 'text'
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_AI_SESSIONS ADD RequestType TEXT',
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
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'SessionName'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'SessionName'
      AND DATA_TYPE = 'text'
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_AI_SESSIONS ADD SessionName TEXT',
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
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'IsActive'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'IsActive'
      AND DATA_TYPE = 'tinyint'
      AND IS_NULLABLE = 'NO'
      AND COLUMN_DEFAULT IN ('0', 'b''0''')
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_AI_SESSIONS ADD IsActive tinyint NOT NULL DEFAULT 0',
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
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'HistoryContent'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'HistoryContent'
      AND DATA_TYPE = 'text'
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_AI_SESSIONS ADD HistoryContent TEXT',
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
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'SessionModifiedTime'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_AI_SESSIONS'
      AND COLUMN_NAME = 'SessionModifiedTime'
      AND DATA_TYPE = 'datetime'
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_AI_SESSIONS ADD SessionModifiedTime DATETIME',
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
      AND TABLE_NAME = 'BOLDBI_ItemLog'
      AND COLUMN_NAME = 'IPAddress'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_ItemLog'
      AND COLUMN_NAME = 'IPAddress'
      AND DATA_TYPE = 'varchar'
      AND CHARACTER_MAXIMUM_LENGTH = 255
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_ItemLog ADD COLUMN IPAddress varchar(255) NULL',
    IF(@boldbi_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
