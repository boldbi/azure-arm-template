ALTER TABLE [BOLDTC_TenantInfo] ADD ResourceLimitationSettings nvarchar(max);

ALTER TABLE [BOLDTC_User] ADD [ActivationMethod] nvarchar(20) NULL;
