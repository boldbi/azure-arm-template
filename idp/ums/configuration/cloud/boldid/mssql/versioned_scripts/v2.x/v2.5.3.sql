CREATE TABLE [ReleaseType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_RELEASETYPE] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

INSERT INTO [ReleaseType] ([Name],[ModifiedDate],[IsActive]) VALUES (N'Main',GETDATE(),1)
INSERT INTO [ReleaseType] ([Name],[ModifiedDate],[IsActive]) VALUES (N'Service Pack',GETDATE(),1)
INSERT INTO [ReleaseType] ([Name],[ModifiedDate],[IsActive]) VALUES (N'Beta',GETDATE(),1)
GO

CREATE TABLE [ProductVersion] (
	Id int IDENTITY(1,1) NOT NULL,
	Major int NOT NULL,
	Minor int NOT NULL,
	Patch int NOT NULL,
	DisplayVersion nvarchar(50) NOT NULL,
	ProductTypeId int NOT NULL,
	ReleaseTypeId int NOT NULL,
	ReleaseDate datetime NOT NULL,
	IsLatest bit NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_PRODUCTVERSION] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

ALTER TABLE [ProductVersion] WITH CHECK ADD CONSTRAINT [ProductVersion_fk0] FOREIGN KEY ([ProductTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [ProductVersion] CHECK CONSTRAINT [ProductVersion_fk0]
GO
ALTER TABLE [ProductVersion] WITH CHECK ADD CONSTRAINT [ProductVersion_fk1] FOREIGN KEY ([ReleaseTypeId]) REFERENCES [ReleaseType]([Id])
GO
ALTER TABLE [ProductVersion] CHECK CONSTRAINT [ProductVersion_fk1]
GO

CREATE TABLE [SubscriptionUsage] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	OperatingSystem nvarchar(50) NOT NULL,
	OsBuildVersion nvarchar(50) NULL,
	IpAddress nvarchar(50) NOT NULL,
	ProductVersionId int NOT NULL,
	InstallationDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SUBSCRIPTIONUSAGE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO

ALTER TABLE [SubscriptionUsage] WITH CHECK ADD CONSTRAINT [SubscriptionUsage_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [SubscriptionUsage] CHECK CONSTRAINT [SubscriptionUsage_fk0]
GO
ALTER TABLE [SubscriptionUsage] WITH CHECK ADD CONSTRAINT [SubscriptionUsage_fk1] FOREIGN KEY ([ProductVersionId]) REFERENCES [ProductVersion]([Id])
GO
ALTER TABLE [SubscriptionUsage] CHECK CONSTRAINT [SubscriptionUsage_fk1]
GO

ALTER TABLE [SaaSPlan] ADD 	[TrialDays] int NULL, [PriorityOrder] int NULL, [TenantTypeId] int NULL;

ALTER TABLE [SaaSPlan] WITH CHECK ADD CONSTRAINT [SaaSPlan_fk1] FOREIGN KEY ([TenantTypeId]) REFERENCES [TenantType]([Id])

GO
ALTER TABLE [SaaSPlan] CHECK CONSTRAINT [SaaSPlan_fk1]

GO

CREATE TABLE [OrderType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar (100) NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_ORDERTYPE] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'TrialNotStarted', 1)

Update [TenantType] set [Type] = 'BoldBI' where Id = 1;

Go

Update [TenantType] set [Type] = 'BoldReports' where Id = 2;

Go

INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldBIOnPremise',1)

Go

INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldReportsOnPremise',1)

Go

Update [SaaSPlan] set [TrialDays] = 30 ,[PriorityOrder] = 0, [TenantTypeId] = 1  where Id IN (1,2,3,4,5)

Go

Update [SaaSPlan] set [TrialDays] = -1 ,[PriorityOrder] = 0, [TenantTypeId] = 1  where Id = 6

Go

Update [SaaSPlan] set [TrialDays] = 7 ,[PriorityOrder] = 4, [TenantTypeId] = 1  where Id = 7

Go

Update [SaaSPlan] set [TrialDays] = 15 ,[PriorityOrder] = 2, [TenantTypeId] = 1  where Id = 8

Go

Update [SaaSPlan] set [TrialDays] = 15 ,[PriorityOrder] = 3, [TenantTypeId] = 1  where Id = 9

Go

Update [SaaSPlan] set [TrialDays] = -1 ,[PriorityOrder] = 1, [TenantTypeId] = 1  where Id = 10

Go

ALTER TABLE [IntranetProductType] ADD 	[PlanId] int NULL,[OrderTypeId] int null

ALTER TABLE [IntranetProductType] WITH CHECK ADD CONSTRAINT [IntranetProductType_fk0] FOREIGN KEY ([PlanId]) REFERENCES [SaasPlan]([Id])
GO
ALTER TABLE [IntranetProductType] CHECK CONSTRAINT [IntranetProductType_fk0]
GO
ALTER TABLE [IntranetProductType] WITH CHECK ADD CONSTRAINT [IntranetProductType_fk1] FOREIGN KEY ([OrderTypeId]) REFERENCES [OrderType]([Id])
GO
ALTER TABLE [IntranetProductType] CHECK CONSTRAINT [IntranetProductType_fk1]
GO

INSERT [dbo].[OrderType] ([Name], [IsActive]) VALUES ( N'Main', 1)
INSERT [dbo].[OrderType] ([Name], [IsActive]) VALUES ( N'Renewal', 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Business 10', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwofOke7X7+2XSzsizXrcTKyqNIkCWoSpisYY6sz4rTAyucA1qsskFcYwkvDQ6GwTl4mu0BCLEej2H12xwlSyY9IL/mENXjhWbz+FiKk3Ldp72oHp5gDHFyoQGHfwvB6Us6rKYP077GuP41peMY+2YVBz23zfN+8BHLT3gkrsu0WTnQL3drrYpgUCzkufj586sySmTCeHBPkh8JzTxDaEBiWw3Ubmo3u3gweXiylFkVxjIr2nVRppH4Ps2H7I/wymThQkpmCN+f6KrN+SjvfahxnVkyreoqCs1eg9GUOIk9qrrZd2Er88znwBla3mh8N+515k+whU6AJyxtF9KXoOahthcUSDgzfezPzwZeQE2ecWdRxZaOAvqskKcK56pMxXQ+gyYgEO/xe0ATfAwWeHNiG', 15, 1, 3, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Business 25', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwq1Jf5imL4do0Blmmu3I2Z6l+2dH1bKrRvDvOyoOHlKNvmggiPYS9ANrkWwYhfuAC3NeA9gfdhBCgoYAEg3AIoX7ok+ZGJkOpp+4BxYU7EwOlETv6B3TtbizyQcCjYtj4SIf6Nz7IWZGUeLd1C5YzYFPc3Grg6saH9NpdWfIDqYouLVDLH7W0n+y7GKhvooMaNYQ1Avc5faa9RFuF1iftyLo23ekCb12K7IxomR2i71JmQwE+zfKuGzoEQbxaEEE1/uDnLRo/v53eURWlncvFPPPPKxWtO7KSkQWeXbVtBZU9059++Yh2X4+t7n6TXbEgMFykF8x1XtesMKUxXz+Ityhq7YIihCGv5vzL7zY/6BVfGAE7v8bBNX8bTIgIbeSvAMu/UN1WztS/32fxmpQKsL', 15, 2, 3, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Business 50', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwpL6F3ciVzyUKJP8IVuozE7ZQkw61FtXKXJ9pJC3iX6/yJRYveupiEOSulUB0WLPYPihcXo0sSkAHuQNZsAiUhFR/7MCU5DYmKboBEm29IjFilbt88fWY75yp7R9wEUF0MOMQcQhqaMhYrxYuiIob73vPr/RESPvppvv1AajRGUhiOuOCAfTpd7xVd8aemD20onrZ26bkuStZcoq5Q0kIePnFxprHNm4zQJAJZh/Sev1vVo04hHH6H9HWQNdvk8sFqwfWdmhDjNjwC8i6tFVBQ0DHhlc0uYgEaAcpBRU63BEGBpOhljNzQ6/WLxYoqZG6/5pmLXQmAhhfbHlb54TnqB2eAW2T9NNhCQM1ZX8mO3Lo5KyZxnHyjyT+rq2etlu6NLiVN27DGvIYB5cYeqWZaM', 15, 3, 3, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Enterprise', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5nERbg8qTskolbeNnIRgciiCrheYSbH2vPhsA+9ib8ca06/WoYa7wckglRxxoQqii1salaL8jJmKwYG5TnVrsxDUUNSRd6WeHJd1k0ktrRfSNbCHwvePNVEFzoprJw+5vUKCicUZ4Wklnnco382gfSclt792VeSeWcvOIyKtJhxLyor5CfDDwqNfvJSI4rmNi6DoOedF4igVg1bXoCVKo+d61izx1250OXox45US6ZZlOHDwAUvkTHvJ0NZlq2WkG9C9y0lok25NW+JiH1k1UWKTFK32egxB+7431SXRzuvastdEXB2e0qA5hwiFzbb2rn5qfDgwQoZ2vWqgWol0MElOpHDrRetZmsiQUyNvBe8t', 15, 4, 3, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Startup', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5gtBGjiCYjzhG16IaSoZi4I01DJmA50yVU+Fk/LkDsKaPwJ9CdnqF1wS63oKNDg2NePYZAJDXkdxuZRs07UkC8U2E4AXGsbKLzlvn3jVzZ/o2RlUoMb1CeyY8awheg5nOqWBQkfI/We+cqfA8uobvQvynfafW5BKZ+x98kAZAhnUD4C6DotuCeRukUEgje33oDqSMR3TWme73fNBYn7yLogn1oqZc/E//uLgcgg869P378nsVcYugfs/eN/PFSqdGB+yY0/MEMzvZjXoZjCZ9VnHtMIQCpw0U8MGGes3B8y0U1qa1PpZJ9fgosfDvD7FoOyF5Y+M3RZ0H2TIHDNJPhg=', 15, 0, 3, GETDATE(), 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Small Business', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+GdKRD8DkW5s2/S7wkzABrW4owF+o+fz8NU/niu/w2wuCn9FUJFx/6bM5jpMX+I+4MS8jYX/r0kQhwE3i1q5RHPC+iw5rIBcN6eJl0FpNQ0DU8zMJdcrfRzWKudtv/sY6GXA8LL3bQXEhbAq8QXXez02/oeUqvER5dmMbVK8fY4VaruYpYGahjdBuK9rYFGMj18J6EqDGL4FCJAVlDEk19TCXxbnjHUAeLifWT/qYAzmnpoUAFQnA27j7UKKTF11GZzMgxfbzjueD/ctjJbVoy0M5twjElu00lvcPC/5HcFjOjetlJ+LF0UfklRrzia2yvseUWAe0aM7G+rrz3BaEim', 15, 0, 3, GETDATE(), 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Enterprise - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5rcwnR0vKnOqCv/mzd9RQ4h64n+7S/rewwNSvfJKl/8PILsOjCsZW4Df7wv6kevq4K+BCatbkGVFZfRQKYasdQbRVKwt/wQ+XIdr/wYseI7wOo0ZONjUXVz37/BM7vf5g4XbB4Np9e4B3MlNM2RoKI1n8keuEzAAtnLlgh31BOsqIHV0SS9KXIZe+3tJC4uELNhjJkGlKy4UatvHVRe9IVfPLkT45nAHe+cr1zbUWbj1DlN2KZPkcTcuttiJ56EP5uu4q9aG4UZEYF0N5rVUMBrWghV/iog2HAM/jRXD5y7ZaDf/GvuyZ5ceM4G7zi4+JLxxzEPqj26rvviYfuB7BYsGSOZwJc81l8OgJrWIDVjDAgnUwF4pXwukhGfS+EwaNg==', 15, 5, 3, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Startup - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5vP5WqXUiy1odl/xSg/jp7XegXlyO6A0n+k1yuKaXIiX9oOM29MfYyeeCdsSu+T5NUj4gWXfPh8ksx5IWogrOsobLcu8HYgjPIsE7hbqalpIaZ1/tdh2GkUEaC0BnUp/0eoEoFG1BHzGD7vn0RV3ZtOfiqMEBE4OSw4YpFJO7cVV6K1kpAbHxy6gmQWLGF+UOZShfDkv6yKYD6AU4mVVmNIINT9jOReBfimg1fFx5aEcSdxlmhLuoAbCL3Y9FUQ7wLE/NtvOfU/hCYIJe4aJxEsUieBmq1lOtzoZwvvxd3nwxCizm3PnFuVE+7vWhGEkKV5cOh/c/ZlhTttm2chcfvDyp1CyQtiRPg162QkABdS5', 15, 0, 3, GETDATE(), 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Small Business - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+Ecya5k3V2lTX/uLxXsJzywdbaBY5YlaOOghR3xNFPDVyVcyA6U+HGEX2SZS+JVEMcN0ZBHBZrT/OsWYNW8NXtYJMNG6rRvVPFCRIK43ptGZbjj5rBAFgq9zNGl82stC2bOrGOZT2E28xvkkm8e89bC99UHmP+gsnYbA62Wpj2wsRBtems2cI57G11MjDpDV50UDqn5Yo22HkPK3Jrw/nPealB05nD9ArD4aqc+PGKplMqJDUe9P9+iZV3GDb8g0P+T4djIWCEIg/AXk/nezQqMXpX+B/JLRQnLHP1TR2U24hRv9wFA/5334Biqj5IFcFZH1L4dryEWVG0WGSrttaMwzkWFBTHLd+0xrlJZ0ZF6WA==', 15, 0, 3, GETDATE(), 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Custom', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgzjVR9TTeqMcZDzNi8PUcl8S9L30vto2eVpL0pHlAqVYu9+RWpGIj1SdTgZS2abXGqJqtoTb87jqblB96+npLqViUSet+4zm4UA3r6SuITl/cwZB+0X8QDZHW98wPu2ND0225jjv2dQbbmt7Pbkl3NlXszlipWxWIC757mykWxVkJxZDRstjgIRy5E3oEvlufGQzo7vYaL0iQxrpYMNsUExmM2ldAHu94hR42bbQEBFsfZX+ca1DZfV+QH2RUWO4PKHg2YK632pixZsXYNlFLajw9drIfeS/AEbXUEHHBnEYfK7NcGWtsiR3sCoQw8fdXdtWqPYzWvtsA44QSrNmOUL3+A46//PjCd4UNXCwOIf/5D1qY/S0FQh/Ss9uUNUJXNT+xZtjIkjsWOCFOzL9s3AmFAYo7To4j+gbYtGvpn/8qgXTFzvHeaqu/T1pop0wrEilmo/vD7XUAt59LBk0bmPUutr9wwVp+ag4iLwdJNi3MoIpWPuxvVGNF3l1qGArbvDjcg9Y6jLeagciV9OqGWK+f/++erX8Oe/dHu41ewdNqTeVtAQw0SgiOf1PDJZ6cQz1ZLO3te6IuJ3kMOcoNvtcR0X9UGuMfDZqi/ojdxalKCHMVtGUXZnS2Z5eSd4msNFK5bgcK1UDhWvTgEE+bmo7pkdY/jeN5jAjeOF03n5jCkfTBCzko5lxSBYlz9044UNyTrecw6fMUQYtSDHaGAjfu3Qwm+7apu2pan3oEGCGUiV6vetXONvrW+NZ7zRZhcyrUnBRVtWarcICVPoi3nscposMxJFfI8rb1lFZVVSYgnsVej4Pcqi2bGwAPDzvlZiT3E3Dn5fNUaIQhKK/jIZ6PqhTwCDAXi453+4l2CS/HsvWeYRjkcj7z3Usd6usVmm0IB248Le/w83J5oup9s2iahrSyQzx05VPvExTU5cGGD+V2AGOlqewwYc8j57ev/Qo20SnkSjaf3tGAqtQHi/', 15, 0, 3, GETDATE(), 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5vCsYY3vOdx/pM15+tdbVKyHRV3xLv47isIKbVwXRH8zrs4fTGAca0aM2vuusZ3AEaho8u4fsVSuegkRLc9kTda10PK9lVdii0RH3xFqA4LGviK7S2dedafN2KvcIujexdkepAPX3/Mcf4/6sP6JWi2owtHrnR6ojLvJCP3pvjD8LPemCgECU5rKiKyKjiiHc/G0CvZsVBQelasRwNguqW/LJp+g0DWkCWnm3PnFru3TO9c5Nki1k9c9Cw9PFzPrhFG80ssbIIGpCg2f98QzQ5x3RYY56n4DNHKHLMNW4uoeZZM4Ef97gaBfX0WkH49N8aKAkPJPKbMH4fFDHQZKXKo=', 15, 6, 3, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Startup Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5iajQ0dq78lOCZ5ESPmtVx65hUewBOV5O//h9z+C6AIksLcyU+9Qt0pDC4iYHH2AJJhMJiRaQf0PU+jJaglWlUFJtsqrR0I/RD5UrfWzJ5ES9+GJ+Lly9uw/dP2JHqysMCSz9dmCIXsI9NAhBnIpsGN48P99wGjWqohEgVN+cGVqKlXuxGt/DUUYNOzPcJjUK6yznNFlCR4sAv4scOh207bs2pcltg8wFqGHyOfT5dFyrqnBy40qc/UE0w1wKQHUO4WMu5OHf+d/4BxwBNTOMAxumdFQWdUIBohLjdA4CusAkTZ7v0hiX+CDrCSasPfrp/wTXpwvL/ZvCvxE30drvY2wiqwFiyCIUv69NMV6HahQ', 15, 0, 3, GETDATE(), 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Small Business Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+HV/f1zD1+FSF82V9zEcLKJFZoRZSWtinmgIDTLioccxTeqZW//yCVQ5uAYAHgKCiQ7w30m12P/Wy9vwIW8Eb56q0o/nvOjVwsDil7s1Rc9qJHtrK1JZSnT39rXAQTrSezUV6BP6Ly0vgk4LcvPcU7vOlsCRzu7VPyCM5ej041Ls+9vZbMpyYO/yG3L2ziCgVl93sp+ypyR5wW6EkpE+PyguD89ZPf8SyVpScIjvXa4MBNe7azBnSwYagXNDcuESM3TqP96cMFYPLxU5ahi6b1GpkEYTjPTBFbe+dDN9xhxmVkqcCWYKvztN9PaOgyvUkCdSiN1AfYimhjXIoc0cYUc', 15, 0, 3, GETDATE(), 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Business 50', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwpL6F3ciVzyUKJP8IVuozE7ZQkw61FtXKXJ9pJC3iX6/yJRYveupiEOSulUB0WLPYPihcXo0sSkAHuQNZsAiUhFUac6fYLN1Dles/NdZuxEThQDzqpDBRnOL8eHGN8HoLxXuMf3evGyIRjWcnIvAqXgQk87UjB91YvI8RxmaH2o2jWlgE1NbJ8Wc0ekwkH1zseogMXufhXN0upiXrD7mxUblzt4lOpBZxGX27kvWHfQ0FdIb8L8CcjnkqW/2g4w4etuyw4NJufeGSpQyWpQU0AYzJ3Bzzk1n1NzxXIh8qm2B6pCA+ueqLkLjZLsXh8jetk9brPaTBVxhYEx+ZImGl5Bf8ts//zLgrurxYJ/t+LXeDF+0ClQiReCbqNjPCreLML2f7GVZna+fbFZ0yrQ9mZG', 15, 5, 1, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Enterprise', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5nERbg8qTskolbeNnIRgciiCrheYSbH2vPhsA+9ib8cawP6j76+xImpaZka89g0XPbicmVTRZfsP+8jK89cWjK1c0ApNIQb2QinN4Qv1HzvlYhtzIDegPbySw0zbbIZ5ByhlIMLXT6EuBbtUyTiEqprzGCSbFkHvEA9cb9Wer4YXjPuCbRQ7l9/cW4cH8XdyYjhQigESG3/xfwRb6PyE/69mTerZ4TwJpf+F/RbLJPgAPHQLfd+CjPqTf9R3j7SM+ORJC4hs5rMKQQ0LRSrg3RZgI37SpG13ua/nLtiXQYJ0CPxXugSWJsruP/8OgymC5uWavYR2YAf1bhQ/jd8r1yaagXJWAO2hFwvsgR/MPoQ8', 15, 6, 1, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5vCsYY3vOdx/pM15+tdbVKyHRV3xLv47isIKbVwXRH8zXV87K3ryrqs+pSoVj8jWRKoU9qB6xtR4R1Qxl+jhmvxV95H2HaYr/vQBoXYUuhOdRRumL9q+KMrPyG4bxI9oJJCQ0tUIHr0s4eifLytVgypZBVWtHdDbGF0xGu1t/pgPU0Uvb9RipPRY4QFXa64SIHt9pJmdGb/xyHrg9BDHaL7td46HhACvN9N5qYdWgqusGmt3BFAbQ7cZiWjoTvqHrOYa+ICi6VLBWafQvkyCWNgcpTd3gGzZLyBlQzQaVO7vUh9DfxrsCcOAt+M/lDctLrqwuiL0UKS6Q1Q4eOqBDcNcef8c6pqAUq+n7xesEUoV', 15, 7, 1, GETDATE(), 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Startup Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5iajQ0dq78lOCZ5ESPmtVx65hUewBOV5O//h9z+C6AIkE8YfcDdCDtO2Hyt6HvQyi3wTnMcRI/8tT7POa1tzIq0Rad5rHLuCDaH9wOXb/I1mKZ5y1cIOi7jZ7M33m20c3l7dXLJuDk9p2Hzmw/hfqoTxEl/Su6Bl3XpUOyPz43lAKZ6hKmt3QH2rdZNxzceHjTsFqpRRL76Ufgnk+WszxA3+W7xw9qbFQKTgQcZalE8CHetsSXe9phLEBzjkJBvb96nqsaQDGkjH7RIqVL8KnxSa1cjg3yhwHNqf96kHzVOBnsQyq4QisMNaRtDLdpWDRKNNyJa+TXP+Cb8TudQLOpdCkKkAdJ0g+2P/jygkZDpO', 15, 0, 1, GETDATE(), 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Small Business Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+HV/f1zD1+FSF82V9zEcLKJFZoRZSWtinmgIDTLioccxRhuKHribtr07sb679D+fDALgyiWUiYkZU90keagiNGCp0OwF7AgInUcl9KImRPx4ySp895i9LMtsn7fEOAoVMamJBQdVaEmnW2ezkMfWD2njAMn1hE1ZSvngOhpD4j/JH1jwTqknQYljvPcEQcXR9xc9TlN+q8JvQmifRoL+3Dh0DdAy+/+m2FMt2ORatS2gDCzojficK1pJobCbH015i7dtRorA/L/qxLJI9noLZ0dHFFulR/Qzly/5IBC/jrHfyBHnbtk1jOrhzixMLLK5ZybqNStNJE2UYiRu7sKyVRMcS5u8JtxYc8T/oNlffY00Q==', 15, 0, 1, GETDATE(), 1, 1)

Update [IntranetProductType] set [OrderTypeId] = 1, [PlanId] = 7  where Id = 1

Go

Update [IntranetProductType] set [OrderTypeId] = 2, [PlanId] = 7  where Id = 2

Go

--development & staging product ids

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 8, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 8, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 9, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 9, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 10, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 10, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7847, N'BoldBIOnPremiseSingleTenantBusiness10', 1, 11, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7848, N'BoldBIOnPremiseSingleTenantBusiness10Subscription', 2, 11, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7849, N'BoldBIOnPremiseSingleTenantBusiness25', 1, 12, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7850, N'BoldBIOnPremiseSingleTenantBusiness25Subscription', 2, 12, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7851, N'BoldBIOnPremiseSingleTenantBusiness50', 1, 13, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7852, N'BoldBIOnPremiseSingleTenantBusiness50Subscription', 2, 13, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7853, N'BoldBIOnPremiseSingleTenantEnterprise', 1, 14, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7854, N'BoldBIOnPremiseSingleTenantEnterpriseSubscription', 2, 14, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7857, N'BoldBIOnPremiseSingleTenantStartup', 1, 15, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7858, N'BoldBIOnPremiseSingleTenantStartupSubscription', 2, 15, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7861, N'BoldBIOnPremiseSingleTenantSmallBusiness', 1, 16, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7862, N'BoldBIOnPremiseSingleTenantSubscriptionSmallBusiness', 2, 16, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7855, N'BoldBIOnPremiseMultiTenantEnterprise', 1, 17, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7856, N'BoldBIOnPremiseMultiTenantEnterpriseSubscription', 2, 17, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7859, N'BoldBIOnPremiseMultiTenantStartup', 1, 18, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7860, N'BoldBIOnPremiseMultiTenantStartupSubscription', 2, 18, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7863, N'BoldBIOnPremiseMultiTenantSmallBusiness', 1, 19, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7864, N'BoldBIOnPremiseMultiTenantSmallBusinessSubscription', 2, 19, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7873, N'BoldBIOnPremiseSingleTenantCustom', 1, 20, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7875, N'BoldBIOnPremiseSingleTenantCustomSubscription', 2, 20, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7865, N'BoldBIEmbeddedOnPremiseEnterprise', 1, 21, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7866, N'BoldBIEmbeddedOnPremiseEnterpriseSubscription', 2, 21, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7867, N'BoldBIEmbeddedOnPremiseStartup', 1, 22, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7868, N'BoldBIEmbeddedOnPremiseStartupSubscription', 2, 22, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7869, N'BoldBIEmbeddedOnPremiseSmallBusiness', 1, 23, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7870, N'BoldBIEmbeddedOnPremiseSmallBusinessSubscription', 2, 23, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 24, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 24, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 25, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 25, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 26, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 26, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 27, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 27, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 28, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 28, 1)


--production product ids - check with website team before using this query.
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 8, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 8, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 9, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 9, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 10, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 10, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7846, N'BoldBIOnPremiseSingleTenantBusiness10', 1, 11, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7847, N'BoldBIOnPremiseSingleTenantBusiness10Subscription', 2, 11, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7848, N'BoldBIOnPremiseSingleTenantBusiness25', 1, 12, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7849, N'BoldBIOnPremiseSingleTenantBusiness25Subscription', 2, 12, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7850, N'BoldBIOnPremiseSingleTenantBusiness50', 1, 13, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7851, N'BoldBIOnPremiseSingleTenantBusiness50Subscription', 2, 13, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7852, N'BoldBIOnPremiseSingleTenantEnterprise', 1, 14, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7853, N'BoldBIOnPremiseSingleTenantEnterpriseSubscription', 2, 14, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7856, N'BoldBIOnPremiseSingleTenantStartup', 1, 15, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7857, N'BoldBIOnPremiseSingleTenantStartupSubscription', 2, 15, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7860, N'BoldBIOnPremiseSingleTenantSmallBusiness', 1, 16, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7861, N'BoldBIOnPremiseSingleTenantSubscriptionSmallBusiness', 2, 16, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7854, N'BoldBIOnPremiseMultiTenantEnterprise', 1, 17, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7855, N'BoldBIOnPremiseMultiTenantEnterpriseSubscription', 2, 17, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7858, N'BoldBIOnPremiseMultiTenantStartup', 1, 18, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7859, N'BoldBIOnPremiseMultiTenantStartupSubscription', 2, 18, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7862, N'BoldBIOnPremiseMultiTenantSmallBusiness', 1, 19, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7863, N'BoldBIOnPremiseMultiTenantSmallBusinessSubscription', 2, 19, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7872, N'BoldBIOnPremiseSingleTenantCustom', 1, 20, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7874, N'BoldBIOnPremiseSingleTenantCustomSubscription', 2, 20, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7864, N'BoldBIEmbeddedOnPremiseEnterprise', 1, 21, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7865, N'BoldBIEmbeddedOnPremiseEnterpriseSubscription', 2, 21, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7866, N'BoldBIEmbeddedOnPremiseStartup', 1, 22, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7867, N'BoldBIEmbeddedOnPremiseStartupSubscription', 2, 22, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7868, N'BoldBIEmbeddedOnPremiseSmallBusiness', 1, 23, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7869, N'BoldBIEmbeddedOnPremiseSmallBusinessSubscription', 2, 23, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 24, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 24, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 25, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 25, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 26, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 26, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 27, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 27, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 28, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 28, 1)

CREATE TABLE [TenantVersion] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	ProductVersionId int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_TENANTVERSION] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

ALTER TABLE [TenantVersion] WITH CHECK ADD CONSTRAINT [TenantVersion_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [TenantVersion] CHECK CONSTRAINT [TenantVersion_fk0]
GO
ALTER TABLE [TenantVersion] WITH CHECK ADD CONSTRAINT [TenantVersion_fk1] FOREIGN KEY ([ProductVersionId]) REFERENCES [ProductVersion]([Id])
GO
ALTER TABLE [TenantVersion] CHECK CONSTRAINT [TenantVersion_fk1]
GO

CREATE TABLE [LicenseKeyLog] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	ProductId int NOT NULL,
	ProductVersionId int NOT NULL,
	ClientIp nvarchar(255) NOT NULL,
	ServerIp nvarchar(255) NOT NULL,
	DomainName nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_LicenseKeyLog] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

ALTER TABLE [LicenseKeyLog] WITH CHECK ADD CONSTRAINT [LicenseKeyLog_fk1] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [LicenseKeyLog] CHECK CONSTRAINT [LicenseKeyLog_fk1]
GO

ALTER TABLE [LicenseKeyLog] WITH CHECK ADD CONSTRAINT [LicenseKeyLog_fk2] FOREIGN KEY ([ProductId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [LicenseKeyLog] CHECK CONSTRAINT [LicenseKeyLog_fk2]
GO

ALTER TABLE [LicenseKeyLog] WITH CHECK ADD CONSTRAINT [LicenseKeyLog_fk3] FOREIGN KEY ([ProductVersionId]) REFERENCES [ProductVersion]([Id])
GO
ALTER TABLE [LicenseKeyLog] CHECK CONSTRAINT [LicenseKeyLog_fk3]
GO

INSERT INTO [ProductVersion] ([Major],[Minor],[Patch],[DisplayVersion],[ProductTypeId],[ReleaseTypeId],[ReleaseDate],[IsLatest],[IsActive]) VALUES (N'2',N'5',N'3',N'2.5.3',N'3',N'1',GETDATE(),1,1)
GO