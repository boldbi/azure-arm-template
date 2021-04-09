ALTER TABLE [SystemSettings] ADD [Value_new] nvarchar(4000) NULL
;

UPDATE [SystemSettings] SET [Value_new] = [Value]
;

ALTER TABLE [SystemSettings] DROP column [Value]
;

ALTER TABLE [SystemSettings] ADD [Value] nvarchar(4000) NULL
;

UPDATE [SystemSettings] SET [Value] = [Value_new]
;

ALTER TABLE [SystemSettings] DROP column [Value_new]
;

ALTER TABLE [ScheduleDetail] ADD [RecurrenceInfo_new] nvarchar(4000) NULL
;

UPDATE [ScheduleDetail] SET [RecurrenceInfo_new] = [RecurrenceInfo] 
;

ALTER TABLE [ScheduleDetail] DROP COLUMN [RecurrenceInfo]
;

ALTER TABLE [ScheduleDetail] ADD [RecurrenceInfo] nvarchar(4000) NULL
;

UPDATE [ScheduleDetail] SET [RecurrenceInfo] = [RecurrenceInfo_new]
;

ALTER TABLE [ScheduleDetail] DROP column [RecurrenceInfo_new]
;

ALTER TABLE [ItemVersion] ADD [Comment_new] nvarchar(1026) NULL
;

UPDATE [ItemVersion] SET [Comment_new] = [Comment] 
;

ALTER TABLE [ItemVersion] DROP COLUMN [Comment]
;

ALTER TABLE [ItemVersion] ADD [Comment] nvarchar(1026) NULL
;

UPDATE [ItemVersion] SET [Comment] = [Comment_new]
;

ALTER TABLE [ItemVersion] DROP column [Comment_new]
;

ALTER TABLE [UserLogin] ADD [ClientToken_new] nvarchar(4000) NULL
;

UPDATE [UserLogin] SET [ClientToken_new] = [ClientToken]
;

ALTER TABLE [UserLogin] DROP column [ClientToken]
;

ALTER TABLE [UserLogin] ADD [ClientToken] nvarchar(4000) NULL
;

UPDATE [UserLogin] SET [ClientToken] = [ClientToken_new]
;

ALTER TABLE [UserLogin] DROP column [ClientToken_new]
;

ALTER TABLE [UserLogin] ALTER COLUMN [ClientToken] nvarchar(4000) NOT NULL
;

ALTER TABLE [UserPreference] DROP COLUMN [ItemSort]
;

ALTER TABLE [UserPreference] ADD [ItemSort] nvarchar(4000) null
;

ALTER TABLE [UserPreference] DROP COLUMN [ItemFilters]
;

ALTER TABLE [UserPreference] ADD [ItemFilters] nvarchar(4000) null
;

ALTER TABLE [UserPermission] ADD PRIMARY KEY ([Id])
;

ALTER TABLE [GroupPermission] ADD PRIMARY KEY ([Id])
;

ALTER TABLE [ServerVersion] ADD [Id] int NULL
;

UPDATE [ServerVersion] SET [Id]=1
;

ALTER TABLE [ServerVersion] ALTER COLUMN [Id] [int] NOT NULL
;

ALTER TABLE [ServerVersion] ADD PRIMARY KEY ([Id])
;

CREATE TABLE ActiveDirectoryUser(
Id int IDENTITY(1,1) primary key NOT NULL,
UserId int not null,
ActiveDirectoryUserId uniqueidentifier not null,
IsActive bit not null)
;

ALTER TABLE [ActiveDirectoryUser] ADD FOREIGN KEY([UserId]) REFERENCES [User] ([Id])
;

CREATE TABLE ActiveDirectoryGroup(
Id int IDENTITY(1,1) primary key NOT NULL,
GroupId int not null,
ActiveDirectoryGroupId uniqueidentifier not null,
IsActive bit not null)
;

ALTER TABLE [ActiveDirectoryGroup] ADD FOREIGN KEY([GroupId]) REFERENCES [Group] ([Id])
;

CREATE TABLE ActiveDirectoryCredentials(
Id int IDENTITY(1,1) primary key NOT NULL,
Username nvarchar(100),
Password nvarchar(100),
LdapUrl nvarchar(255),
EnableSsl bit not null,
DistinguishedName nvarchar(150),
PortNo int not null,
IsActive bit not null)
;

ALTER TABLE [Item] ALTER COLUMN [Name] [nvarchar](255) NOT NULL
;
ALTER TABLE [ItemVersion] ALTER COLUMN [ItemName] [nvarchar](265) NULL
;