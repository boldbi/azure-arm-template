CREATE TABLE {database_name}.BOLDBI_Notification (
    Id int NOT NULL AUTO_INCREMENT,
    CurrentUserId int NOT NULL,
    ClubId varchar(100) NOT NULL,
    CommentId int NULL,
    ItemId Char(38) NULL,
    NotificationSource varchar(100) NULL,
    NotifictionDetails varchar(4000) NULL,
    NotificationTo int NULL,    
    ModifiedDate datetime NOT NULL,
    IsRead tinyint NOT NULL,
    IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;