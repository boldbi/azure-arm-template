CREATE TABLE [BOLDBI_ItemUserPreference](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[UserId] [int] NOT NULL,
	[AutosaveFilter] [nvarchar](4000) NULL,
	[DefaultViewId] [uniqueidentifier] NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (13,N'UserDashboardSettings',N'Dashboard Settings in Profile',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.DefaultViews',N'DashboardSettings.DefaultViews',GETDATE(),1)
;
INSERT into [BOLDBI_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (10,N'DashboardSettings.AutosaveFilter',N'DashboardSettings.AutosaveFilter',GETDATE(),1)
;
Alter Table [BOLDBI_UserPreference] Add Dashboards nVarchar(4000) NULL
;
ALTER TABLE [BOLDBI_ItemUserPreference]  ADD FOREIGN KEY([ItemId]) REFERENCES [BOLDBI_Item] ([Id])
;
ALTER TABLE [BOLDBI_ItemUserPreference]  ADD FOREIGN KEY([UserId]) REFERENCES [BOLDBI_User] ([Id])
;
ALTER TABLE [BOLDBI_DashboardWidget] ADD WidgetInfo varchar(max)
;
ALTER table [BOLDBI_MultiTabDashboard] Add [OrderNumber] int NULL
;

ALTER TABLE [BOLDBI_AzureADCredential] ADD [EnableGroupUserImport] bit NOT NULL DEFAULT(1)
;
ALTER TABLE [BOLDBI_ADCredential] ADD [EnableGroupUserImport] bit NOT NULL DEFAULT(1)
;

ALTER TABLE [BOLDBI_Item] ADD [IsLocked] [bit] NOT NULL DEFAULT 0
;