ALTER TABLE SyncDS_ScheduleDetail ADD COLUMN DashboardViewId  uuid NULL
;

ALTER TABLE SyncDS_DSMetrics ALTER COLUMN CustomQuery SET DATA TYPE Text
;