-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_column_count := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_Group'
      AND COLUMN_NAME = 'GroupLogo'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_Group'
      AND COLUMN_NAME = 'GroupLogo'
      AND DATA_TYPE = 'varchar'
      AND CHARACTER_MAXIMUM_LENGTH = 1026
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_Group ADD COLUMN GroupLogo varchar(1026) NULL',
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
      AND TABLE_NAME = 'BOLDBI_Item'
      AND COLUMN_NAME = 'PublishedDate'
);

SET @boldbi_column_valid := (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'BOLDBI_Item'
      AND COLUMN_NAME = 'PublishedDate'
      AND DATA_TYPE = 'datetime'
      AND IS_NULLABLE = 'YES'
);

SET @boldbi_sql := IF(
    @boldbi_column_count = 0,
    'ALTER TABLE {database_name}.BOLDBI_Item ADD COLUMN PublishedDate datetime NULL',
    IF(@boldbi_column_valid = 1, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$

SET @boldbi_exporttype_count := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_ExportType
    WHERE Name = 'DatasourceCache'
);

SET @boldbi_exporttype_valid := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_ExportType
    WHERE Name = 'DatasourceCache'
      AND IsActive = 1
);

SET @boldbi_sql := IF(
    @boldbi_exporttype_count = 0,
    'INSERT INTO {database_name}.BOLDBI_ExportType (Name, IsActive) VALUES (''DatasourceCache'', 1)',
    IF(@boldbi_exporttype_count = @boldbi_exporttype_valid, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
