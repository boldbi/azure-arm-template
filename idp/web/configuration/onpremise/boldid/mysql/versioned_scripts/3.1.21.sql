ALTER TABLE {database_name}.BOLDTC_User ADD Status int NULL;

CREATE TABLE {database_name}.BOLDTC_UserStatus (
	Id int NOT NULL AUTO_INCREMENT,
	Status nvarchar(100) NOT NULL,
        Value int NOT NULL UNIQUE,
        CreatedDate datetime NOT NULL,
        ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_USERSTATUS PRIMARY KEY (Id ASC) 
)
;


INSERT {database_name}.BOLDTC_UserStatus (Status, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'NotActivated', 0, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_UserStatus (Status, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Activated', 1, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_UserStatus (Status, Value, CreatedDate, ModifiedDate, IsActive) VALUES (N'Locked', 2, UTC_TIMESTAMP(), UTC_TIMESTAMP(), 1);


ALTER TABLE {database_name}.BOLDTC_User ADD CONSTRAINT BOLDTC_User_fk1 FOREIGN KEY (Status) REFERENCES {database_name}.BOLDTC_UserStatus(Value)
;
