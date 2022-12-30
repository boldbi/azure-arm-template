CREATE TABLE [BOLDBI_UserSession](
	[Id] [uniqueidentifier] PRIMARY KEY NOT NULL,
	[IdpReferenceId]  [uniqueidentifier] NOT NULL,
	[SessionId]  [uniqueidentifier] NOT NULL,
	[DirectoryTypeId] [int] NOT NULL,
	[IpAddress] [nvarchar](255) NOT NULL,
	[Browser] [nvarchar](255) NOT NULL,
	[LoggedInTime] [datetime] NOT NULL,
	[LastActive] [datetime] NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDBI_Item] ADD [IsUploadDraft] Bit Not Null default '0'
;

CREATE TABLE [BOLDBI_BackgroundJobs](
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [JobType] int NOT NULL,
    [ItemId] [uniqueidentifier] NULL,
    [UserId] [int] NULL,
    [JobDetails] [nvarchar](max) NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CompletedDate] [datetime] NOT NULL,
    [Status] [nvarchar](255) NOT NULL,
	[ResourceInfo] [nvarchar](max) NULL,
	[CanIncludeSensitiveInfo] [bit] NOT NULL,
    [IsActive] [bit] NOT NULL)
;