CREATE TABLE BOLDTC_AICredentials(
Id uuid NOT NULL,
AIModel INTEGER NOT NULL,
AIConfiguration varchar(4000) NULL,
CreatedById uuid NULL,
ModifiedById uuid NULL,
CreatedDate timestamp NOT NULL,
ModifiedDate timestamp NOT NULL,
IsActive smallint NOT NULL)
;