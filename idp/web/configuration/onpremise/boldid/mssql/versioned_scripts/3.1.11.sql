ALTER TABLE [BOLDTC_TenantInfo] ADD AdditionalParameters nvarchar(max) NULL;

ALTER TABLE [BOLDTC_TenantInfo] ADD ImDbAdditionalParameters nvarchar(max) NULL;

ALTER TABLE BOLDTC_OAuthToken ADD Id int identity(1,1) not null;

ALTER TABLE BOLDTC_OAuthToken add CONSTRAINT PK_BOLDTC_OAUTHTOKEN primary key(Id);