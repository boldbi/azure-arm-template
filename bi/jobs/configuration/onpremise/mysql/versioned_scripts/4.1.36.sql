-- BOLD_UPGRADE_RERUN_SAFE: true
-- BOLD_UPGRADE_IDEMPOTENT_VALIDATED: true
-- BOLD_UPGRADE_STATEMENT_SEPARATOR: $$

SET @boldbi_logfield_count := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_LogField
    WHERE ModuleId = 10
      AND Field = 'DashboardSettings.Theming'
);

SET @boldbi_logfield_valid := (
    SELECT COUNT(*)
    FROM {database_name}.BOLDBI_LogField
    WHERE ModuleId = 10
      AND Field = 'DashboardSettings.Theming'
      AND Description = 'DashboardSettings.Theming'
      AND IsActive = 1
);

SET @boldbi_sql := IF(
    @boldbi_logfield_count = 0,
    'INSERT INTO {database_name}.BOLDBI_LogField (ModuleId, Field, Description, ModifiedDate, IsActive) VALUES (10, ''DashboardSettings.Theming'', ''DashboardSettings.Theming'', NOW(), 1)',
    IF(@boldbi_logfield_count = @boldbi_logfield_valid, 'SELECT 1', 'CALL BOLD_UPGRADE_VALIDATION_FAILED()')
);

PREPARE boldbi_stmt FROM @boldbi_sql;
EXECUTE boldbi_stmt;
DEALLOCATE PREPARE boldbi_stmt;
$$
