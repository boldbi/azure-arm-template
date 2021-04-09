ALTER TABLE {database_name}.SyncDS_ItemCommentLog ADD Url varchar(4000) NULL
;

UPDATE {database_name}.SyncDS_ItemCommentLog set Url=''
;

ALTER TABLE {database_name}.SyncDS_ItemCommentLog MODIFY COLUMN Url varchar(4000) NOT NULL
;

ALTER TABLE {database_name}.SyncDS_User  ADD UserTypeId int NOT NULL DEFAULT 0
;

UPDATE {database_name}.SyncDS_User SET UserTypeId = 1 WHERE {database_name}.SyncDS_User.Id In (SELECT ADUSERS from (SELECT {database_name}.SyncDS_User.Id AS ADUSERS from {database_name}.SyncDS_User INNER JOIN {database_name}.SyncDS_ADUser on {database_name}.SyncDS_ADUser.UserId = {database_name}.SyncDS_User.Id) AS ADUSERSLIST)
;

CREATE TABLE {database_name}.SyncDS_AzureADCredential(
	Id int NOT NULL AUTO_INCREMENT,
	TenantName varchar(255),
	ClientId varchar(100),
	ClientSecret varchar(100),
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_AzureADUser(
	Id int NOT NULL AUTO_INCREMENT,
	UserId int NOT NULL,
	AzureADUserId char(38) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_AzureADUser ADD FOREIGN KEY(UserId) REFERENCES {database_name}.SyncDS_User (Id)
;

CREATE TABLE {database_name}.SyncDS_AzureADGroup(
	Id int NOT NULL AUTO_INCREMENT,
	GroupId int NOT NULL,
	AzureADGroupId char(38) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

ALTER TABLE {database_name}.SyncDS_AzureADGroup ADD FOREIGN KEY(GroupId) REFERENCES {database_name}.SyncDS_Group (Id)
;


CREATE TABLE {database_name}.SyncDS_SAMLSettings(
	Id int NOT NULL AUTO_INCREMENT, 
	MetadataURI varchar(4000), 
	IsEnabled tinyint(1) NOT NULL,
	PRIMARY KEY (Id))
;

CREATE TABLE {database_name}.SyncDS_UserType(
	Id int NOT NULL AUTO_INCREMENT,
	Type varchar(100),
	PRIMARY KEY (Id))
;

INSERT into {database_name}.SyncDS_UserType(Type) values('Server User')
;
INSERT into {database_name}.SyncDS_UserType(Type) values('Active Directory User')
;
INSERT into {database_name}.SyncDS_UserType(Type) values('Federation User')
;
INSERT into {database_name}.SyncDS_ItemCommentLogType (Name,IsActive) VALUES ( 'UserMention',1)
;