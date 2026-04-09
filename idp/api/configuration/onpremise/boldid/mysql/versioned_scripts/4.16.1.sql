CREATE TABLE {database_name}.BOLDTC_UserAttributes(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1024) NULL,
	Encrypt tinyint NOT NULL,
	UserId char(38) NOT NULL,
	CreatedById char(38) NULL,
	ModifiedById char(38) NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE  {database_name}.BOLDTC_UserAttributes ADD FOREIGN KEY(UserId) REFERENCES {database_name}.BOLDTC_User (Id)
;