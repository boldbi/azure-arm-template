CREATE TABLE [Addon] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	StripePlanId nvarchar(255) NOT NULL,
	PlanSchema nvarchar(max),
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_ADDON] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO

CREATE TABLE [TenantAddon] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	AddonId int NOT NULL,
	Quantity int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	LastPaymentDate datetime NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TENANTADDON] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO

INSERT [dbo].[Addon] ([Name], [StripePlanId], [PlanSchema], [ModifiedDate], [IsActive]) VALUES (N'AdditionalDataStorage', N'additional_data_storage', '', '11/21/18 10:57:19', N'True')
Go

ALTER TABLE [TenantAddon] WITH CHECK ADD CONSTRAINT [TenantAddon_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [TenantAddon] CHECK CONSTRAINT [TenantAddon_fk0]
GO
ALTER TABLE [TenantAddon] WITH CHECK ADD CONSTRAINT [TenantAddon_fk1] FOREIGN KEY ([AddonId]) REFERENCES [Addon]([Id])
GO
ALTER TABLE [TenantAddon] CHECK CONSTRAINT [TenantAddon_fk1]
GO