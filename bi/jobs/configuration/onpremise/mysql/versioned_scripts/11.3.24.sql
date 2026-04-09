CREATE TABLE {database_name}.BOLDBI_AICredentials(
Id char(38) NOT NULL,
AIModel INT NOT NULL,
AIConfiguration varchar(4000) NULL,
CreatedById char(38) NULL,
ModifiedById char(38) NULL,
CreatedDate datetime NOT NULL,
ModifiedDate datetime NOT NULL,
IsActive tinyint NOT NULL,
IsAISummariesEnabledGlobally tinyint NOT NULL DEFAULT 0,
EnableAIFeature tinyint NOT NULL DEFAULT 0,
IsAIModel tinyint NOT NULL DEFAULT 0,
PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;
ALTER TABLE {database_name}.BOLDBI_ScheduleDetail ADD MultiExportType text NULL;

ALTER TABLE {database_name}.BOLDBI_ScheduleDetail MODIFY ExportTypeId int NULL;

ALTER TABLE {database_name}.BOLDBI_ItemView MODIFY QueryString text NOT NULL;

ALTER TABLE {database_name}.BOLDBI_ItemView ADD IsWidgetLinking tinyint(1) NOT NULL default 0;