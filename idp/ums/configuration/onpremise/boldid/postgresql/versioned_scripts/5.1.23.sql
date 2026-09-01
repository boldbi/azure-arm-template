ALTER TABLE BOLDTC_SystemSettings ALTER COLUMN SystemValue TYPE text;

CREATE TABLE BOLDTC_TokenVault (
	TenantId uuid NOT NULL,
	IdpUserId uuid NOT NULL,
	AuthUserId uuid NOT NULL,
	AuthProviderId int NOT NULL,
	EncryptedToken text NOT NULL,
	ExpiresAt timestamp NULL,
	UpdatedAt timestamp NOT NULL,
	PRIMARY KEY (TenantId, IdpUserId, AuthProviderId)
);

ALTER TABLE BOLDTC_UserLogin ADD COLUMN EncryptedIdToken varchar(4000) NULL;

ALTER TABLE BOLDTC_UserLogin ADD COLUMN IdTokenExpiresAt timestamp NULL;

ALTER TABLE BOLDTC_UserLogin ADD COLUMN IsUsedForLogout smallint NULL;
