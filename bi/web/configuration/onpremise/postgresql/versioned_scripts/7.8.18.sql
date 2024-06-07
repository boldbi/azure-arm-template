CREATE TABLE [BOLDBI_Notification] (
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [CurrentUserId] [int] NOT NULL,
    [ClubId] nvarchar(100) NOT NULL,
    [CommentId] [int] NULL,
    [ItemId] [uniqueidentifier] NULL,
    [NotificationSource] nvarchar(100) NULL,
    [NotifictionDetails] nvarchar(4000) NULL,
    [NotificationTo] [int] NULL,    
    [ModifiedDate] [datetime] NOT NULL,
    [IsRead] [bit] NOT NULL,
    [IsActive] [bit] NOT NULL)
;