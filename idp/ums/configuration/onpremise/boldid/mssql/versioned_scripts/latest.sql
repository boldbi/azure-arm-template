CREATE TABLE [BOLDTC_ActivityLog]
(
    Id int IDENTITY(1,1) NOT NULL,
    EventCategory nvarchar(100) NOT NULL,
    EventType nvarchar(100) NOT NULL,
    EventDate datetime NOT NULL,
    InitiatedBy nvarchar(255) NULL,
    TargetUser nvarchar(255) NULL,
    IpAddress nvarchar(100) NOT NULL,
    AppSource nvarchar(255) NULL,
    AppType nvarchar(255) NULL,
    EventLog nvarchar(max) NULL,
    ClientId nvarchar(100) NULL,
    UserAgent nvarchar(255) NULL,
    IsActive bit NOT NULL,
    CanDelete bit NOT NULL,
    CONSTRAINT [PK_BOLDTC_ActivityLog] PRIMARY KEY CLUSTERED
(
[Id] ASC
) WITH (IGNORE_DUP_KEY = OFF)
    )
;