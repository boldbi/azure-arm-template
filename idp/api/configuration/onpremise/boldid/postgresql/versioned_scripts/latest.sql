CREATE TABLE BOLDTC_UserAttributes(
	Id SERIAL primary key NOT NULL,
	Name varchar(255) NOT NULL,
	Value varchar(4000) NOT NULL,
	Description varchar(1024) NULL,
	Encrypt smallint NOT NULL,
	UserId uuid NOT NULL,
	CreatedById uuid NULL,
	ModifiedById uuid NULL,
	CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL)
;

ALTER TABLE BOLDTC_UserAttributes ADD FOREIGN KEY(UserId) REFERENCES BOLDTC_User (Id)
;