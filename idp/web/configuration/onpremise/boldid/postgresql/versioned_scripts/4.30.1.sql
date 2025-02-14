CREATE TABLE BOLDTC_ActivityLog
(
    Id SERIAL,
    EventCategory varchar(100) NOT NULL,
    EventType varchar(100) NOT NULL,
    EventDate timestamp NOT NULL,
    InitiatedBy uuid NULL,
    TargetUser uuid NULL,
    IpAddress varchar(100) NOT NULL,
    AppSource varchar(255) NULL,
    AppType varchar(255) NULL,
    EventLog text NULL,
    ClientId varchar(100) NULL,
    UserAgent varchar(255) NULL,
    IsActive smallint NOT NULL,
    CanDelete smallint NOT NULL,
    CONSTRAINT PK_BOLDTC_ACTIVITYLOG PRIMARY KEY (Id)
)
;