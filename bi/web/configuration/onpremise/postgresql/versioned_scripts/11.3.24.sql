CREATE TABLE SyncDS_AICredentials(
Id uuid NOT NULL,
SiteId uuid NULL,
AIModel INTEGER NOT NULL,
AIConfiguration varchar(4000) NULL,
CreatedById uuid NULL,
ModifiedById uuid NULL,
CreatedDate timestamp NOT NULL,
ModifiedDate timestamp NOT NULL,
IsActive smallint NOT NULL,
IsAIModel smallint NOT NULL default 0,
EnableAIFeature smallint NOT NULL default 0,
IsAISummariesEnabledGlobally smallint NOT NULL default 0
)
;
ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN MultiExportType text NULL;

ALTER TABLE SyncDS_ScheduleDetail ALTER COLUMN ExportTypeId DROP NOT NULL;

ALTER TABLE SyncDS_ItemView ADD COLUMN IsWidgetLinking SMALLINT NOT NULL DEFAULT 0;

ALTER TABLE SyncDS_ItemView ALTER COLUMN QueryString TYPE TEXT, ALTER COLUMN QueryString SET NOT NULL;