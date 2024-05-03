CREATE TABLE SyncDS_Notification (
    Id SERIAL primary key NOT NULL,
    CurrentUserId int NOT NULL,
    ClubId varchar(100) NOT NULL,
    CommentId int NULL,
    ItemId uuid NULL,
    NotificationSource varchar(100) NULL,
    NotifictionDetails varchar(4000) NULL,
    NotificationTo int NULL,    
    ModifiedDate timestamp NOT NULL,
    IsRead smallint NOT NULL,
    IsActive smallint NOT NULL)
;