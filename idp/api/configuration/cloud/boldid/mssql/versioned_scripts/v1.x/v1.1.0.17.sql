ALTER TABLE TenantLog ADD IpAddress VARCHAR(100) NULL;

CREATE TABLE [IntranetProductType](
    [Id] int IDENTITY(1,1) NOT NULL,
	[ProductId] int NOT NULL,
	[ProductName] nvarchar(1024) NOT NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [IntranetProductType_PK] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (IGNORE_DUP_KEY = OFF))
Go

--development & staging product ids
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7822, N'BoldBI', 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7823, N'BoldBISubscription', 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7824, N'Others', 1)

--production product ids - check with website team before using this query.
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7826, N'BoldBI', 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7823, N'BoldBISubscription', 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7824, N'Others', 1)

GO
CREATE TABLE [SalesRequests] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_SALESREQUESTS] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)

Alter Table [CustomPlan] Add [IsEnterprise] Bit Null Default '0';