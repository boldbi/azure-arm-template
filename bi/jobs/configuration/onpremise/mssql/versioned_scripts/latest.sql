ALTER TABLE [BOLDBI_Group] ADD [GroupLogo] [nvarchar](1026) NULL;
ALTER TABLE [BOLDBI_Item] ADD PublishedDate DATETIME NULL;

INSERT INTO [BOLDBI_ExportType] (Name, IsActive) SELECT 'DatasourceCache', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_ExportType] WHERE Name = 'DatasourceCache')
;

ALTER TABLE [BOLDBI_SystemSettings] ADD CONSTRAINT UK_BOLDBI_SystemSettings_Key_SiteId UNIQUE([Key], SiteId)
;