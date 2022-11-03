INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'WindowsAD', now() at time zone 'utc', 1);

INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'WindowsAD', 6, now() at time zone 'utc', 1);

﻿ALTER TABLE BOLDTC_TenantActivity ADD ChildId varchar(1026) NULL
;
ALTER TABLE BOLDTC_TenantActivity ADD DetailActionId int NOT NULL DEFAULT 0
;
ALTER TABLE BOLDTC_TenantActivity ADD ActivityLogInfo varchar(1026) NULL
;
