CREATE TABLE [EmailValidation] (
	Id uniqueidentifier NOT NULL,
	Email nvarchar(350) NOT NULL,
	FirstName nvarchar(255) NOT NULL,
	LastName nvarchar(255),
	Company nvarchar(255) NULL,
	Phone nvarchar(20),
	ProductId int NOT NULL,
	PlanId int NULL,
	IpAddress nvarchar(100) NULL,
	CreatedDate datetime NOT NULL,
	HttpStatusCode int NOT NULL,
	ApiResponse nvarchar(1024) NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_EmailValidation] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

ALTER TABLE [EmailValidation] WITH CHECK ADD CONSTRAINT [EmailValidation_fk0] FOREIGN KEY ([SaaSPlanId]) REFERENCES [SaaSPlan]([Id])
GO
ALTER TABLE [EmailValidation] WITH CHECK ADD CONSTRAINT [EmailValidation_fk1] FOREIGN KEY ([ProductId]) REFERENCES [TenantType]([Id])
GO