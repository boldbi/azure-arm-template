ALTER TABLE [BOLDBI_ScheduleDetail] ADD [MultiExportType] [nvarchar](max) NULL;

ALTER TABLE [BOLDBI_ScheduleDetail] ALTER COLUMN [ExportTypeId] [int] NULL;

CREATE TABLE [BOLDBI_AICredentials](
[Id] uniqueidentifier NOT NULL,
[AIModel] [int] NOT NULL,
[AIConfiguration] [nvarchar](4000) NULL,
[CreatedById] [uniqueidentifier] NULL,
[ModifiedById] [uniqueidentifier] NULL,
[CreatedDate] [datetime] NOT NULL,
[ModifiedDate] [datetime] NOT NULL,
[IsActive] [bit] NOT NULL,
[IsAIModel][bit] NOT NULL DEFAULT (0),
[EnableAIFeature][bit] NOT NULL DEFAULT (0),
[IsAISummariesEnabledGlobally][bit] NOT NULL DEFAULT (0)
)
;
ALTER TABLE [BOLDBI_ItemView] ALTER COLUMN [QueryString] NVARCHAR(MAX) NOT NULL;

ALTER TABLE [BOLDBI_ItemView] ADD IsWidgetLinking SMALLINT NOT NULL DEFAULT 0;