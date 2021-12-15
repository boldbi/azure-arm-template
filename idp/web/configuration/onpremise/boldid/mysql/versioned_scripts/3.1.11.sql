
ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD AdditionalParameters longtext NULL;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD ImDbAdditionalParameters longtext NULL;

ALTER TABLE {database_name}.BOLDTC_OAuthToken ADD COLUMN id INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (id);