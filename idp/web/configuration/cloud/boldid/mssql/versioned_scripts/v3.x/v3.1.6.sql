CREATE TABLE [PaymentMode] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_PAYMENTMODE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO

Create Table [PricingTier]
(
Id uniqueidentifier NOT NULL,
PricingInterval nvarchar(max) NOT NULL,
TenantInfoId uniqueidentifier NOT NULL,
CompletedMonth int NOT NULL,
CurrentInterval int NOT NULL,
CreatedDate datetime NOT NULL,
ModifiedDate datetime NOT NULL,
IsActive bit default 0
 CONSTRAINT [PK_PRICINGTIER] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)

CREATE TABLE [CustomerBalanceLog] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	PricingTierId uniqueidentifier NOT NULL,
	PricingInterval nvarchar(max) NOT NULL,
	FromCustomerBalance int NOT NULL,
	ToCustomerBalance int NOT NULL,
	TierDiscountAmount int NOT NULL,
	PaymentMonth int NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_CUSTOMERBALANCELOG] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO

INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldBIWebsite', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldReportsWebsite', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldSignWebsite', N'', GetDate(), 1)
﻿INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldSignApp', N'', GetDate(), 1)

INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'ActiveDTPayment', 1)

INSERT [dbo].[PaymentMode] ([Name], [IsActive]) VALUES (N'Stripe', 1)
INSERT [dbo].[PaymentMode] ([Name], [IsActive]) VALUES (N'DirectTrac', 1)

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 20, '02/13/20 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '02/13/20 19:54:53', '02/13/20 19:54:53', N'True' )

INSERT into [ScheduleType] (Name,IsActive) VALUES (N'ActiveDTPaymentTenantsReminder', 1)

ALTER TABLE [TenantPaymentSubscription] ALTER Column [SubscriptionId] nvarchar(255) NULL

ALTER TABLE [TenantPaymentSubscription] ADD [PaymentMode] int NOT NULL default 1

-- Give constarin name for SubscriptionId and StripeCustomerId
ALTER TABLE [TenantPaymentSubscription]  DROP CONSTRAINT '';
ALTER TABLE [TenantPaymentSubscription]  DROP CONSTRAINT '';

ALTER TABLE [TenantPaymentSubscription] WITH CHECK ADD CONSTRAINT [TenantPaymentSubscription_fk1] FOREIGN KEY ([PaymentMode]) REFERENCES [PaymentMode]([Id])
GO
ALTER TABLE [TenantPaymentSubscription] CHECK CONSTRAINT [TenantPaymentSubscription_fk1]
GO

ALTER TABLE [TenantPaymentLog] ADD [InvoiceId] nvarchar(255) NULL

ALTER TABLE [TenantInvoiceDetails] ADD Status nvarchar(255) NULL, InvoiceUpdatedDate datetime NULL, PeriodStart datetime NULL, PeriodEnd datetime NULL

Update [TenantInvoiceDetails] set Status = 'success' where ChargeId != ''
