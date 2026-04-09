CREATE TABLE {database_name}.BOLDTC_ActivityLog
(
    Id int NOT NULL AUTO_INCREMENT,
    EventCategory nvarchar(100) NOT NULL,
    EventType nvarchar(100) NOT NULL,
    EventDate datetime NOT NULL,
    InitiatedBy nvarchar(255) NULL,
    TargetUser nvarchar(255) NULL,
    IpAddress nvarchar(100) NOT NULL,
    AppSource nvarchar(255) NULL,
    AppType nvarchar(255) NULL,
    EventLog longtext NULL,
    ClientId char(38) NULL,
    UserAgent nvarchar(255) NULL,
    IsActive tinyint(1) NOT NULL,
    CanDelete tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_ACTIVITYLOG PRIMARY KEY (Id ASC)
    )
;