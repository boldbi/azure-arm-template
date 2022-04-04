ALTER TABLE [LicenseBenefits] ADD CreatedBy uniqueidentifier NULL, TenantStatus int NULL;

Update [LicenseBenefits] set TenantStatus = '26'

ALTER TABLE [LicenseBenefits] ALTER Column TenantStatus int NOT NULL

ALTER TABLE [LicenseBenefits] WITH CHECK ADD CONSTRAINT [LicenseBenefits_fk1] FOREIGN KEY ([TenantStatus]) REFERENCES [TenantStatus]([Id])
GO
ALTER TABLE [LicenseBenefits] CHECK CONSTRAINT [LicenseBenefits_fk1]
GO

ALTER TABLE [LicenseBenefits]  WITH CHECK ADD  CONSTRAINT [LicenseBenefits_fk2] FOREIGN KEY([CreatedBy]) REFERENCES [User] ([Id])

GO
ALTER TABLE [LicenseBenefits] CHECK CONSTRAINT [LicenseBenefits_fk2]
GO