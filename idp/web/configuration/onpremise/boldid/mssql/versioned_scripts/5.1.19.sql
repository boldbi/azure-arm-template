ALTER TABLE [BOLDTC_Tenant] ADD ProxyFullPathUrl nvarchar(255) NULL;

ALTER TABLE [BOLDTC_Tenant] ADD PreventProxyDomainAutoUpdate bit NOT NULL DEFAULT 0;

