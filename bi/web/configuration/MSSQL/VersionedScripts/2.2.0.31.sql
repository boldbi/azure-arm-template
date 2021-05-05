CREATE TABLE [SyncDS_Homepage](
	[Id] [uniqueidentifier] primary key NOT NULL,
	[Name] nvarchar(255) NOT NULL,
	[UserId] [int] NOT NULL,
	[ItemInfo] nvarchar(4000) NOT NULL,
	[ItemType] nvarchar(100) NOT NULL,
	[IsDefaultHomepage] bit NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] bit NOT NULL)
;

ALTER TABLE [SyncDS_Homepage]  ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_DBCredential](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [DatabaseType] [nvarchar](255) NOT NULL,
    [ConnectionString] [nvarchar](4000) NOT NULL,
    [UserNameSchema] [nvarchar](255) NOT NULL,
    [UserNameTable] [nvarchar](255) NOT NULL,
    [UserNameColumn] [nvarchar](255) NOT NULL,
    [FirstNameSchema] [nvarchar](255) NOT NULL,
    [FirstNameTable] [nvarchar](255) NOT NULL,
    [FirstNameColumn] [nvarchar](255) NOT NULL,
    [LastNameSchema] [nvarchar](255) NOT NULL,
    [LastNameTable] [nvarchar](255) NOT NULL,
    [LastNameColumn] [nvarchar](255) NOT NULL,
    [EmailSchema] [nvarchar](255) NOT NULL,
    [EmailTable] [nvarchar](255) NOT NULL,
    [EmailColumn] [nvarchar](255) NOT NULL,
    [IsActiveSchema] [nvarchar](255) NOT NULL,
    [IsActiveTable] [nvarchar](255) NOT NULL,
    [IsActiveColumn] [nvarchar](255) NOT NULL,
    [Status]  [nvarchar](255) NOT NULL,
    [ActiveStatusValue]  [nvarchar](255) NOT NULL,
    [EmailRelationId] [int] NULL,
    [FirstNameRelationId] [int] NULL,
    [LastNameRelationId] [int] NULL,
    [IsActiveRelationId] [int] NULL,
    [IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_TableRelation](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [LeftTable] [nvarchar](255) NOT NULL,
    [LeftTableColumnName] [nvarchar](255) NOT NULL,	
    [LeftTableCondition]  [nvarchar](255) NOT NULL,
    [LeftTableName]  [nvarchar](255) NOT NULL,
    [LeftTableSchema] [nvarchar](255) NOT NULL,
    [Relationship] [nvarchar](255) NOT NULL,
    [RightTable] [nvarchar](255) NOT NULL,
    [RightTableColumnName] [nvarchar](255) NOT NULL,	
    [RightTableCondition]  [nvarchar](255) NOT NULL,
    [RightTableName]  [nvarchar](255) NOT NULL,
    [RightTableSchema] [nvarchar](255) NOT NULL)
;

CREATE TABLE [SyncDS_MultiDashboardMap](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ParentDashboardId] [uniqueidentifier] NOT NULL,
	[ChildDashboardId] [uniqueidentifier] NOT NULL,
	[DashboardDesignerId] [uniqueidentifier] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_MultiDashboardMap]  ADD FOREIGN KEY([ParentDashboardId]) REFERENCES [SyncDS_Item] ([Id])
;
ALTER TABLE [SyncDS_MultiDashboardMap]  ADD FOREIGN KEY([ChildDashboardId]) REFERENCES [SyncDS_Item] ([Id])
;

CREATE TABLE [SyncDS_DataNotification](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[ScheduleId] [uniqueidentifier] NOT NULL,
	[Frequency] [int] NULL,
	[ConditionCategory] [int] NOT NULL,
	[PreviousValue]  text NULL,
	[PreviousData] text NULL,
	[IsActive] [bit] NOT NULL,
	[ColumnInfo] text NOT NULL,
	[ConditionInfo] text NULL,
	[ItemName] nvarchar(255) NOT NULL)
;

ALTER TABLE [SyncDS_DataNotification]  ADD FOREIGN KEY([ScheduleId]) REFERENCES [SyncDS_Item] ([Id])
;

ALTER TABLE [SyncDS_ScheduleDetail]  ADD [EmailContent] [nvarchar](4000) NULL
;

ALTER TABLE [SyncDS_ScheduleDetail]  ADD [IsDataChanges] Bit Not Null default '0'
;

ALTER TABLE [SyncDS_ScheduleDetail]  ADD [IsTimeInterval] Bit Not Null default '0'
;
ALTER TABLE [SyncDS_ScheduleDetail]  ALTER COLUMN  [RecurrenceTypeId] [int] NULL
;
ALTER TABLE [SyncDS_ScheduleDetail] ALTER COLUMN [RecurrenceInfo] [nvarchar](4000)  NULL
;
ALTER TABLE [SyncDS_ScheduleDetail]  ALTER COLUMN  [StartDate] [datetime] NULL
;
ALTER TABLE [SyncDS_ScheduleDetail] ALTER COLUMN [EndDate] [datetime] NULL
;
ALTER TABLE [SyncDS_ScheduleDetail]  ALTER COLUMN  [EndAfter] [int] NULL
;
ALTER TABLE [SyncDS_ScheduleDetail] ALTER COLUMN [NextSchedule] [datetime] NULL
;

CREATE TABLE [SyncDS_ConditionCategory](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] nvarchar(255) NULL,
	[IsActive] [bit] NOT NULL
)
;

INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Increases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Continuously Increases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Decreases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Continuously Decreases',1)
;
INSERT into [SyncDS_ConditionCategory] (Name,IsActive) VALUES (N'Value Changes',1)
;
ALTER TABLE [SyncDS_SAMLSettings] ADD [MobileAppId] nvarchar(100) NULL
;
INSERT into [SyncDS_RecurrenceType] (Name,IsActive) VALUES (N'Hourly', 1)
;