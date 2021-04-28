DROP TABLE [Coupon]
DROP TABLE [CouponLog]
DROP TABLE [CouponLogType]

CREATE TABLE [dbo].[Coupon](
	[Id] [uniqueidentifier] NOT NULL,
	[Coupon] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[CouponType] [nvarchar](255) NOT NULL,
	[CouponValue] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[ExpiryDate] [datetime] NOT NULL,
	[LimitPerUser] [int] NULL,
	[MinQuantity] [int] NOT NULL,
	[MaxQuantity] [int] NOT NULL,
	[ApplicableProduct] [int] NOT NULL,
	[ApplicablePlans] [nvarchar](255) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_COUPON] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)

GO

ALTER TABLE [dbo].[Coupon]  WITH CHECK ADD  CONSTRAINT [Coupon_fk0] FOREIGN KEY([ApplicableProduct])
REFERENCES [dbo].[TenantType] ([Id])
GO

ALTER TABLE [dbo].[Coupon] CHECK CONSTRAINT [Coupon_fk0]
GO

ALTER TABLE [dbo].[Coupon]  WITH CHECK ADD  CONSTRAINT [Coupon_fk1] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Coupon] CHECK CONSTRAINT [Coupon_fk1]
GO

ALTER TABLE [dbo].[Coupon]  WITH CHECK ADD  CONSTRAINT [Coupon_fk2] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Coupon] CHECK CONSTRAINT [Coupon_fk2]
GO

CREATE TABLE [dbo].[CouponLog](
	[Id] [uniqueidentifier] NOT NULL,
	[LogType] [nvarchar](255) NOT NULL,
	[CouponId] [uniqueidentifier] NULL,
	[TenantInfoId] [uniqueidentifier] NULL,
	[UserId] [uniqueidentifier] NULL,
	[IpAddress] [nvarchar](255) NOT NULL,
	[Comments] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[AdditionalData] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_COUPONLog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)

GO

ALTER TABLE [dbo].[CouponLog]  WITH CHECK ADD  CONSTRAINT [CouponLog_fk0] FOREIGN KEY([CouponId])
REFERENCES [dbo].[Coupon] ([Id])
GO

ALTER TABLE [dbo].[CouponLog] CHECK CONSTRAINT [CouponLog_fk0]
GO

ALTER TABLE [dbo].[CouponLog]  WITH CHECK ADD  CONSTRAINT [CouponLog_fk1] FOREIGN KEY([TenantInfoId])
REFERENCES [dbo].[TenantInfo] ([Id])
GO

ALTER TABLE [dbo].[CouponLog] CHECK CONSTRAINT [CouponLog_fk1]
GO

ALTER TABLE [dbo].[CouponLog]  WITH CHECK ADD  CONSTRAINT [CouponLog_fk2] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[CouponLog] CHECK CONSTRAINT [CouponLog_fk2]
GO