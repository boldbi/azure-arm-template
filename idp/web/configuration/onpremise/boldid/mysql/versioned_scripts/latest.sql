ALTER TABLE {database_name}.BOLDTC_Tenant ADD ProxyFullPathUrl char(255) NULL;

ALTER TABLE {database_name}.BOLDTC_Tenant ADD PreventProxyDomainAutoUpdate tinyint(1) NOT NULL DEFAULT 0;