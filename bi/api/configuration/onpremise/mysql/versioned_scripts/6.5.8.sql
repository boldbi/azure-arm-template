CREATE TABLE {database_name}.BOLDBI_PublishType(
	Id int NOT NULL AUTO_INCREMENT,
	Name varchar(100) NOT NULL,
	IsActive tinyint NOT NULL,
	PRIMARY KEY (Id))
;

INSERT into {database_name}.BOLDBI_PublishType (Name, IsActive) Values ('Publish',1)
;

INSERT into {database_name}.BOLDBI_PublishType (Name, IsActive) Values ('Lock',1)
;

INSERT into {database_name}.BOLDBI_PublishType (Name, IsActive) Values ('Unlock',1)
;

ALTER TABLE {database_name}.BOLDBI_PublishJobs ADD Type int NOT NULL DEFAULT 1
;

ALTER TABLE  {database_name}.BOLDBI_PublishJobs  ADD FOREIGN KEY(Type) REFERENCES {database_name}.BOLDBI_PublishType (Id)
;
