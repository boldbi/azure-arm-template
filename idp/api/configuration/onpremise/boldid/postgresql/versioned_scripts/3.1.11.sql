ALTER TABLE BOLDTC_TenantInfo ADD AdditionalParameters varchar(1026) NULL;

ALTER TABLE BOLDTC_TenantInfo ADD ImDbAdditionalParameters varchar(1026) NULL;

ALTER TABLE  BOLDTC_AuthSettings ALTER COLUMN Settings Type varchar(4000);

ALTER TABLE BOLDTC_OAuthToken ADD Id SERIAL NOT NULL;

ALTER TABLE BOLDTC_OAuthToken add CONSTRAINT PK_BOLDTC_OAUTHTOKEN primary key(Id);