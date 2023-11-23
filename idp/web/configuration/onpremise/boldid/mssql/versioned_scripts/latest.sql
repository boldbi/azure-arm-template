CREATE TABLE [BOLDTC_UserAttributes](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Value] [nvarchar](4000) NOT NULL,
	[Description] [nvarchar](1024) NULL,
	[Encrypt] [bit] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[CreatedById] [uniqueidentifier] NULL,
	[ModifiedById] [uniqueidentifier] NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL)
;

ALTER TABLE [BOLDTC_UserAttributes] ADD FOREIGN KEY([UserId]) REFERENCES [BOLDTC_User] ([Id])
;