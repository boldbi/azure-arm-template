INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'CORS Settings', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'CORS Settings')
;

ALTER TABLE [BOLDBI_ExternalSites] ADD [ModifiedById] [int] NULL
;
ALTER TABLE [BOLDBI_ExternalSites] ADD [ModifiedDate] [datetime] NULL
;
ALTER TABLE [BOLDBI_ExternalSites] ADD [SiteType] [int] NOT NULL DEFAULT 0
;

ALTER TABLE [BOLDBI_MultiTabDashboard]  ADD [TabName] [nvarchar](255) NULL  
;

ALTER TABLE [BOLDBI_ScheduleDetail] ADD [Subject] [nvarchar](4000) NULL
;

INSERT INTO [BOLDBI_SettingsType] (Name, IsActive) SELECT 'Look and Feel', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_SettingsType] WHERE Name = 'Look and Feel')
;

UPDATE [BOLDBI_SettingsType] SET Name='Data Process' WHERE Name = 'Data Store Settings'
;