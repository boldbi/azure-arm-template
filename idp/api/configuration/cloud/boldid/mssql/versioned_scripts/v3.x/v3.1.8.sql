CREATE TABLE [StripeBalanceType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_STRIPEBALANCETYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO

INSERT [dbo].[StripeBalanceType] ([Name], [IsActive]) VALUES (N'Credit', 1)
INSERT [dbo].[StripeBalanceType] ([Name], [IsActive]) VALUES (N'Debit', 1)

ALTER TABLE [CustomerBalanceLog] ADD [StripeBalanceType] int NOT NULL default 1

ALTER TABLE [CustomerBalanceLog] WITH CHECK ADD CONSTRAINT [CustomerBalanceLog_fk1] FOREIGN KEY ([StripeBalanceType]) REFERENCES [StripeBalanceType]([Id])
GO