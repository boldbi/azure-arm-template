ALTER TABLE BOLDTC_TenantInfo ADD COLUMN ResourceLimitationSettings varchar(4000);

ALTER TABLE BOLDTC_User ADD ActivationMethod varchar(20) NULL;
