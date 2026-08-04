CREATE TABLE {database_name}.BOLDTC_TokenVault (
	TenantId CHAR(38) NOT NULL,
	IdpUserId CHAR(38) NOT NULL,
	AuthUserId CHAR(38) NOT NULL,
	AuthProviderId INT NOT NULL,
	EncryptedToken LONGTEXT NOT NULL,
	ExpiresAt DATETIME(6) NULL,
	UpdatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	CONSTRAINT PK_BOLDTC_TokenVault PRIMARY KEY (TenantId, IdpUserId, AuthProviderId)
) ROW_FORMAT=DYNAMIC
;

ALTER TABLE {database_name}.BOLDTC_UserLogin ADD EncryptedIdToken nvarchar(4000) NULL;

ALTER TABLE {database_name}.BOLDTC_UserLogin ADD IdTokenExpiresAt datetime NULL;

ALTER TABLE {database_name}.BOLDTC_UserLogin ADD IsUsedForLogout tinyint NULL;

ALTER TABLE {database_name}.BOLDTC_SystemSettings MODIFY SystemValue LONGTEXT;
