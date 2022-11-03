CREATE TABLE SyncDS_ItemUserPreference(
    Id SERIAL primary key NOT NULL,
    ItemId uuid NOT NULL,
    UserId int NOT NULL,
    AutosaveFilter varchar(4000) NULL,
    DefaultViewId uuid NULL,
    ModifiedDate timestamp NOT NULL,
    IsActive smallint NOT NULL)
;

INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.DefaultViews',N'DashboardSettings.DefaultViews',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.AutosaveFilter',N'DashboardSettings.AutosaveFilter',now() at time zone 'utc',1)
;
INSERT into SyncDS_LogField (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserDashboardSettings',N'Dashboard Settings in Profile',now() at time zone 'utc',1)
;
Alter Table SyncDS_UserPreference Add Dashboards varchar(4000) NULL
;
ALTER TABLE SyncDS_ItemUserPreference  ADD FOREIGN KEY(ItemId) REFERENCES SyncDS_Item (Id)
;
ALTER TABLE SyncDS_ItemUserPreference  ADD FOREIGN KEY(UserId) REFERENCES SyncDS_User (Id)
;
﻿ALTER TABLE SyncDS_DashboardWidget ADD WidgetInfo varchar(4000)
;
ALTER table SyncDS_MultiTabDashboard Add OrderNumber int NULL
﻿;

ALTER TABLE SyncDS_AzureADCredential ADD EnableGroupUserImport smallint NOT NULL DEFAULT 1
;
ALTER TABLE SyncDS_ADCredential ADD EnableGroupUserImport smallint NOT NULL DEFAULT 1
;

ALTER TABLE SyncDS_Item ADD IsLocked smallint NOT NULL DEFAULT 0
;