CREATE TABLE IF NOT EXISTS BOLDTC_TenantSettings (
	Id SERIAL NOT NULL,
	TenantInfoId uuid NOT NULL,
	Settings text NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTSETTINGS PRIMARY KEY (Id),
  CONSTRAINT BOLDTC_TenantSettings_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
)
;

ALTER TABLE BOLDTC_TenantInfo ADD COLUMN IF NOT EXISTS  AdditionalParameters varchar(1026) NULL
;

ALTER TABLE BOLDTC_TenantInfo ADD COLUMN IF NOT EXISTS  ImDbAdditionalParameters varchar(1026) NULL
;