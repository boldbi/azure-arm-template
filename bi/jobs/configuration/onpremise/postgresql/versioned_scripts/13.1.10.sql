ALTER TABLE SyncDS_Group ADD COLUMN GroupLogo varchar(1026) NULL;
ALTER TABLE SyncDS_Item ADD COLUMN PublishedDate timestamp NULL
;

INSERT INTO SyncDS_exporttype (Name, IsActive) SELECT N'DatasourceCache', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_exporttype WHERE Name = N'DatasourceCache')
;

ALTER TABLE SyncDS_SystemLog  ADD CONSTRAINT UK_SyncDS_SystemSettings_Key_SiteId UNIQUE (Key, SiteId);