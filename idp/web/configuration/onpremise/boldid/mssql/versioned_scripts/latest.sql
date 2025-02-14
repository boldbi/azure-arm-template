CREATE TABLE [BoldTC_AICredentials](
    [Id] uniqueidentifier NOT NULL,
    [AIModel] [int] NOT NULL,
    [AIConfiguration] [nvarchar](4000) NULL,
    [CreatedById] [uniqueidentifier] NULL,
    [ModifiedById] [uniqueidentifier] NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL)
;