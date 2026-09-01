-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_source_count := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_Source
    WHERE Name = 'Embed'
);

SET @boldbi_source_valid := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_Source
    WHERE Name = 'Embed'
      AND IsActive = 1
);

SET @boldbi_sql := IF(
    @boldbi_source_count = 0,
    'INSERT INTO {database_name}.BOLDBI_Source (Name, IsActive) VALUES (''Embed'', 1)',
    IF(@boldbi_source_count = @boldbi_source_valid, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
