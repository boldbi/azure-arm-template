------------------------------------------------------------------
-- Write SQL queries in the following order
-- 	1. Create Tables
--	2. Insert Values
--	3. Alter Table Syntax
------------------------------------------------------------------

CREATE TABLE [CouponLog](
	[Id] [uniqueidentifier] NOT NULL,
	[LogType] [nvarchar](255) NOT NULL,
	[CouponId] [uniqueidentifier] NULL,
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
CREATE TABLE [TenantPaymentSubscription] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	StripeCustomerId nvarchar(255) NOT NULL UNIQUE,
	SubscriptionId nvarchar(255),
	PaymentMode int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TENANTPAYMENTSUBSCRIPTION] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantInvoiceDetails] (
	Id uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NOT NULL,
	Amount int NOT Null,
	InvoiceId nvarchar(255) NOT NULL,
	ChargeId nvarchar(255) NOT NULL,
	Status nvarchar(255),
	InvoiceUpdatedDate datetime NULL,
	PeriodStart datetime NULL,
	PeriodEnd datetime NULL,
	PaymentDate datetime NOT NULL,
  CONSTRAINT [PK_TENANTINVOICEDETIALS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantPaymentLog] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NOT NULL,
	InvoiceId nvarchar(255) NOT NULL,
	LogComments nvarchar(max) NOT NULL,
	CreatedDate datetime NOT NULL,
	Status nvarchar(255) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TENANTPAYMENTLOG] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SqlServer] (
	Id int IDENTITY(1,1) NOT NULL,
	ServerName nvarchar(255) NOT NULL UNIQUE,
	Username nvarchar(255) NOT NULL,
	Password nvarchar(255) NOT NULL,
	DatabaseLimit int NOT NULL,
	SqlServerType int NOT NULL,
	TenantType int NOT NULL,
	StorageAccountName nvarchar(255) NOT NULL,
	StorageAccountAccessKey nvarchar(max) NOT NULL,
	ResourceGroupName nvarchar(255) NOT NULL,
	AzureTagKey nvarchar(50) NOT NULL,
    AzureTagValue nvarchar(50) NOT NULL,
	IsAvailable bit NOT NULL DEFAULT '1',
	IsActive bit NOT NULL DEFAULT '1',
  CONSTRAINT [PK_SQLSERVER] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SqlElasticPool] (
	Id int IDENTITY(1,1) NOT NULL,
	PoolName nvarchar(255) NOT NULL UNIQUE,
	SqlServerId int NOT NULL,
	DatabaseLimit int NOT NULL,
	SqlServerType int NOT NULL,
	TenantType int NOT NULL,
	IsAvailable bit NOT NULL DEFAULT '1',
	IsActive bit NOT NULL DEFAULT '1',
  CONSTRAINT [PK_SQLELASTICPOOL] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Tenant] (
	Id uniqueidentifier NOT NULL,
	DNS nvarchar(255) NOT NULL,
	Subdomain nvarchar(255) NOT NULL,
	CustomDomain nvarchar(255) NULL,
	UserId uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	IsDeleted bit NOT NULL,
	IsInternal bit NOT NULL DEFAULT 0,
  CONSTRAINT [PK_TENANT] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SaaSPlan] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	TrialDays int NOT NULL,
	PriorityOrder int NOT NULL,
	TenantTypeId int NOT NULL,
	PlanSchema nvarchar(max),
	SetupName nvarchar(255),
	AdditionalFeatures nvarchar(max),
	PlanAdditionalData nvarchar(max),
	BillingIntervalId int,
	ModifiedDate datetime NOT NULL,
	IsInternal bit NOT NULL,
	IsActive bit NOT NULL,
	IsCustom bit NOT NULL,
	IsSDK bit NOT NULL,
	IsArchived bit NOT NULL,
  CONSTRAINT [PK_SAASPLAN] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantLogType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100),
	IsActive bit,
  CONSTRAINT [PK_TENANTLOGTYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantLog] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	TenantLogType int NOT NULL,
	LogComments nvarchar(max),
	IpAddress nvarchar(100) NULL,
	FromStatus int Null,
	ToStatus int Not Null,
	UpdatedUserId uniqueidentifier NULL,
	SourceTypeId int Null,
	CreatedDate datetime NOT NULL,
	OptionalData nvarchar(max) NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TENANTLOG] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantStatus] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TENANTSTATUS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Coupon](
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
CREATE TABLE [UserPreference] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	Language nvarchar(4000),
	TimeZone nvarchar(100),
	RecordSize int,
	ItemSort nvarchar(4000),
	ItemFilters nvarchar(4000),
	Notifications nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_USERPREFERENCE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [User] (
	Id uniqueidentifier NOT NULL,
	FirstName nvarchar(255) NOT NULL,
	LastName nvarchar(255),
	DisplayName nvarchar(512),
	Username nvarchar(255) NOT NULL,
	Email nvarchar(350) NOT NULL UNIQUE,
	Password nvarchar(260) NOT NULL,
	Contact nvarchar(100),
	Company nvarchar(255) NULL,
	Picture nvarchar(100),
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime,
	LastLogin datetime,
	PasswordChangedDate datetime,
	ActivationExpirationDate datetime NOT NULL,
	ActivationCode nvarchar(255) NOT NULL,
	VerificationCode nvarchar(100) NULL,
	ResetPasswordCode nvarchar(255),
	LastResetAttempt datetime,
	ExternalProviderId nvarchar(512),
	DirectoryTypeId int NOT NULL,
	IsActivated bit NOT NULL,
	IsActive bit NOT NULL,
	IsDeleted bit NOT NULL,
    CONSTRAINT [PK_USER] PRIMARY KEY CLUSTERED
    (
    [Id] ASC
    ) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [User_idx1] NONCLUSTERED
	(
	[Id], [Email], [IsActivated], [IsActive], [IsDeleted]
	)

)
GO
CREATE TABLE [UserLogin] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	DirectoryTypeId int NOT NULL,
	ClientToken nvarchar(4000) NOT NULL,
	IpAddress nvarchar(50) NOT NULL,
	LoggedInDomain nvarchar(255) NOT NULL,
	LoggedInTime datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_USERLOGIN] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TMUserGroup] (
	Id int IDENTITY(1,1) NOT NULL,
	GroupId int NOT NULL,
	UserId uniqueidentifier NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TMUSERGROUP] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TMGroup] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Description nvarchar(1026),
	Color nvarchar(255) NOT NULL,
	DirectoryTypeId int NOT NULL,
	ExternalProviderId nvarchar(512),
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TMGroup] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantUser] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	IsActive bit NOT NULL,
	IsDeleted bit NOT NULL,
    CONSTRAINT [PK_TENANTUSER] PRIMARY KEY CLUSTERED
    (
    [Id] ASC
    ) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [TenantUser_idx1] NONCLUSTERED
	(
	[UserId], [TenantInfoId], [IsActive], [IsDeleted]
	)
)
GO

CREATE TABLE [DirectoryType] (
	Id int IDENTITY(1,1) NOT NULL,
	DirectoryName nvarchar(100) NOT NULL UNIQUE,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_DIRECTORYTYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [RecurrenceType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_RECURRENCETYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Schedule] (
	Id int IDENTITY(1,1) NOT NULL,
	RecurrenceInfo nvarchar(4000) NOT NULL,
	RecurrenceTypeId int NOT NULL,
	ScheduleTypeId int NOT NULL,
	StartDate datetime NOT NULL,
	EndDate datetime NOT NULL,
	EndAfter int NOT NULL,
	NextSchedule datetime NOT NULL,
	IsEnabled bit NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SCHEDULE] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [ScheduleType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SCHEDULETYPE] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [ScheduleLog] (
	Id int IDENTITY(1,1) NOT NULL,
	ScheduleId int NOT NULL,
	ScheduleStatusId int NOT NULL,
	ExecutedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SCHEDULELOG] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [ScheduleStatus] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SCHEDULESTATUS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SAMLSettings] (
	Id int IDENTITY(1,1) NOT NULL,
	MetadataURI nvarchar(4000),
	Authority nvarchar(4000),
	DesignerClientId nvarchar(100),
	TenantName nvarchar(100),
	MobileAppId nvarchar(100),
	IsEnabled bit NOT NULL,
  CONSTRAINT [PK_SAMLSETTINGS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SystemSettings] (
	Id int IDENTITY(1,1) NOT NULL,
	SystemKey nvarchar(255) NOT NULL UNIQUE,
	SystemValue nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SYSTEMSETTINGS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [AzureADCredential] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantName nvarchar(255),
	ClientId nvarchar(100),
	ClientSecret nvarchar(100),
	IsActive bit NOT NULL,
  CONSTRAINT [PK_AZUREADCREDENTIAL] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantType] (
	Id int IDENTITY(1,1) NOT NULL,
	Type nvarchar(255) NOT NULL UNIQUE,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TENANTTYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TenantInfo] (
	Id uniqueidentifier NOT NULL,
	TenantId uniqueidentifier NOT NULL,
	TenantTypeId int NOT NULL,
	ClientSecret nvarchar(512) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	SaaSPlanId int,	
	Quantity int NOT NULL CONSTRAINT DF_TENANTINFO Default 1,
	BlobConnectionString nvarchar(max),
	ConnectionString nvarchar(max),
	TenantSQLServerId int,
	ElasticPoolId int,
	ImDbConnectionString nvarchar(max),
	ImDbSqlServerId int,
	ImDbElasticPoolId int,
	TenantStatus int NOT NULL,
	BillingAddressId uniqueidentifier,
	StatusUpdatedDate datetime NOT NULL,
	PaymentStatus nvarchar(50),
	RecurringPaymentDate datetime,
	IsTrialExpired bit NOT NULL,
	IsActive bit NOT NULL,
	IsDeleted bit NOT NULL,
  CONSTRAINT [PK_TENANTINFO] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [UserBillingAddress] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	BillingEmail nvarchar(255) NOT NULL,
	BillingAddress nvarchar(max) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_USERBILLINGADDRESS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [AccountDeleteRequest] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	UserTenantStatus nvarchar(max) NULL,
	RequestedTime datetime NOT NULL,
	CancelledTime datetime,
	DeletedTime datetime,
	IsCancelled bit,
	IsDeleted bit NOT NULL,
	IsActive bit NOT NULL
  CONSTRAINT [PK_ACCOUNTDELETEREQUEST] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
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
CREATE TABLE [CustomPlan] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	Price int NOT NULL,
	PricePerLicense int Null,
	PlanInfo nvarchar(max),
	HasTrial bit NOT NULL,
	TrialDays int NOT NULL,
	IsEnterprise bit Null,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_CUSTOMPLAN] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Country] (
  [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [Name] [nvarchar](100) NOT NULL,
  [CountryCode] [nvarchar](2) NOT NULL,
  [IsActive] [bit] NOT NULL
)
GO
CREATE TABLE [ExternalIdP] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	Detail nvarchar(max) NOT NULL,
	DirectoryTypeId int NOT NULL,
	CredentialTypeId int NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_EXTERNALIDP] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [IdPCredentialType] (
	Id int IDENTITY(1,1) NOT NULL,
	CredentialType nvarchar(255) NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_IDPCREDENTIALTYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SqlElasticPoolEdition] (
	Id int IDENTITY(1,1) NOT NULL,
	PoolEditionName varchar(255) NOT NULL,
	PoolDtu int NOT NULL,
	PoolStorageinGB int NOT NULL,
	DatabaseDtuMinInGB int NOT NULL,
	DatabaseDtuMaxInGB int NOT NULL,
	DatabaseLimit int NOT NULL,
	Region varchar(255) NOT NULL,
	IsCurrent bit NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_ELASTICPOOLEDITION] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SqlServerEdition] (
	Id int IDENTITY(1,1) NOT NULL,
	Version varchar(255) NOT NULL,
	DatabaseLimit int NOT NULL,
	Region nvarchar(100) NOT NULL,
	IsCurrent bit NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SQLSERVEREDITION] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TMUser] (
	Id int IDENTITY(1,1) NOT NULL,
	UserId uniqueidentifier NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TMUSER] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [SqlServerType] (
	Id int IDENTITY(1,1) NOT NULL,
	SqlServerType nvarchar(255) NOT NULL UNIQUE,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SQLSERVERTYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO
CREATE TABLE [dbo].[OAuthToken](
	[Token] [nvarchar](max) NULL,
	[Ticket] [nvarchar](max) NULL,
	[ModifiedDate] [datetime] NULL
)
Go
CREATE TABLE [dbo].[InternalApps](
	[Id] int IDENTITY(1,1) NOT NULL,
	[ClientId] uniqueidentifier NOT NULL UNIQUE,
	[ClientSecret] nvarchar(max) NOT NULL,
	[Name] nvarchar(100) NOT NULL,
	[URL] nvarchar(max) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[IsActive] bit NOT NULL,
	CONSTRAINT [PK_INTERNALAPPS] PRIMARY KEY CLUSTERED
	  (  [Id] ASC  ) WITH (IGNORE_DUP_KEY = OFF)
)
Go
CREATE TABLE [FormType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Url nvarchar(4000) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_FORMTYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [RegistrationFormVersion] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	FormTypeId int NOT NULL,
	Location nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsLatest bit NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_REGISTRATIONFORMVERSION] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [TermsOfUseVersion] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Location nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsLatest bit NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TERMSOFUSEVERSION] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [PrivacyPolicyVersion] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Location nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsLatest bit NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_PRIVACYPOLICYVERSION] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [PrivacyAcceptance] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	PrivacyPolicyVersion int NOT NULL,
	TermsOfUseVersion int NOT NULL,
	RegistrationFormVersion int NOT NULL,
	IpAddress nvarchar(50) NOT NULL,
	Country nvarchar(100) NOT NULL,
	Url nvarchar(4000) NOT NULL,
	HttpHeaders nvarchar(max) NOT NULL,
	DateTime datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_PRIVACYACCEPTANCE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [FeedBack] (
	Id int IDENTITY(1,1) NOT NULL,
	UserId uniqueidentifier NOT NULL,
	IncidentId int NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	FeedbackFormId int NOT NULL,
	Experience Nvarchar(20) Null,
	FeedbackSubject Nvarchar(20) Null,
	CancelReason Nvarchar(max) Null,
	Comments Nvarchar(max) NULL,
	CanContact bit NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_FEEDBACK] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)

Go
CREATE TABLE [Support] (
	Id int IDENTITY(1,1) NOT NULL,
	IncidentId int NOT NULL,
	UpdateId int NOT NULL,
	TenantInfoId uniqueidentifier NULL,
	IsConciergeSupport bit NOT NULL,
	CreatedBy uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_Support] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)

Go
CREATE TABLE [TenantActivity] (
	Id int IDENTITY(1,1) NOT NULL,
	ItemId uniqueidentifier NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	ItemType nvarchar(max) NOT NULL,
	ItemSubType nvarchar(max) NOT NULL,
	Action nvarchar(max) NOT NULL,
	LoggedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_TenantActivity] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO
Go
CREATE TABLE [PreviewFeatures] (
	Id int IDENTITY(1,1) NOT NULL,
	FeatureName nvarchar(255) NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	Value nvarchar(max) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_PreviewFeatures] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)

Go
CREATE TABLE [KcTenants](
    [Id] [uniqueidentifier] NOT NULL,
    [TenantInfoId] [uniqueidentifier] NOT NULL,
    [KcId] [int] Not NULL,
    [KcName] nvarchar(1024) NOT NULL,
    [CreatedDate] [datetime] NULL,
    [ModifiedDate] [datetime] NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [KcTenant_PK] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (IGNORE_DUP_KEY = OFF))
Go
CREATE TABLE [SSLCertificate](
    [Id] [uniqueidentifier] NOT NULL,
	[ThumbPrint] nvarchar(1024) NOT NULL,
	[HostNames] nvarchar(max) NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[CreatedById] uniqueidentifier NOT NULL,
	[ModifiedById] uniqueidentifier NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [ModifiedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [SSLCertificate_PK] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (IGNORE_DUP_KEY = OFF))
Go
CREATE TABLE [SSLMapping](
    [Id] int IDENTITY(1,1) NOT NULL,
	[TenantId] uniqueidentifier NOT NULL,
	[CertificateId] uniqueidentifier NOT NULL,
	[CreatedById] uniqueidentifier NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [SSLMapping_PK] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (IGNORE_DUP_KEY = OFF))
Go

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

CREATE TABLE [IntranetProductType](
    [Id] int IDENTITY(1,1) NOT NULL,
	[ProductId] int NOT NULL,
	[ProductName] nvarchar(1024) NOT NULL,
	[PlanId] int NULL,
	[OrderTypeId] int NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [IntranetProductType_PK] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (IGNORE_DUP_KEY = OFF))
Go

CREATE TABLE [SourceType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL,
	URL nvarchar(100) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_SOURCETYPE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO

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
	SetupName nvarchar(255),
	CONSTRAINT [PK_PRODUCTVERSION] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
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

CREATE TABLE [LicenseKeyLog] (
	Id uniqueidentifier NOT NULL,
	TenantInfoId uniqueidentifier NOT NULL,
	ProductId int NOT NULL,
	ProductVersionId int NOT NULL,
	ClientIp nvarchar(255) NOT NULL,
	ServerIp nvarchar(255) NOT NULL,
	DomainName nvarchar(255) NOT NULL,
	LicenseKey nvarchar(max) NULL,
	IsSuccess bit NULL,
	CreatedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_LicenseKeyLog] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [EmailValidation] (
	Id uniqueidentifier NOT NULL,
	Email nvarchar(350) NOT NULL,
	FirstName nvarchar(255) NOT NULL,
	LastName nvarchar(255),
	Company nvarchar(255) NULL,
	Phone nvarchar(100),
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

CREATE TABLE [UserLog] (
	Id int IDENTITY(1,1) NOT NULL,
	LogAction nvarchar(255) NOT NULL,
	UserId uniqueidentifier NULL,
	Message nvarchar(max) NOT NULL,
	RequestedById uniqueidentifier NOT NULL,
	IpAddress nvarchar(100) NOT NULL,
	LogDate datetime NOT NULL,
	ReferrerUrl nvarchar(max) NULL,
	IsActive bit NOT NULL,
	AdditionalData nvarchar(max) NULL,
  CONSTRAINT [PK_USERLOG] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [LicenseBenefits] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId UNIQUEIDENTIFIER NOT NULL,
	CreatedBy uniqueidentifier NOT NULL,
	TenantStatus int NOT NULL,
	Notes nvarchar(max) NOT NULL,
	ExpiryDate DATETIME NOT NULL,
	CreatedDate DATETIME NOT NULL,
	ModifiedDate DATETIME NOT NULL,
	IsActive BIT NOT NUll
	CONSTRAINT [PF_LICENSEBENEFITS] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go
Create Table [PricingTier]
(
Id uniqueidentifier NOT NULL,
PricingInterval nvarchar(max) NOT NULL,
TenantInfoId uniqueidentifier NOT NULL,
CompletedMonth int NOT NULL,
CurrentInterval int NOT NULL,
CreatedDate datetime NOT NULL,
ModifiedDate datetime NOT NULL,
IsActive bit NOT NULL
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

CREATE TABLE [Group] (
	Id uniqueidentifier NOT NULL,
	Name nvarchar(255) NOT NULL,
	Description nvarchar(1024) NULL,
	Color nvarchar(7),
	DirectoryTypeId int NOT NULL,
	ExternalProviderId nvarchar(512),
	DirectoryDomainName nvarchar(512),
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_Group] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [Group_idx1] NONCLUSTERED
	(
	[IsActive], [Name]
	)
)
Go

CREATE TABLE [Organization] (
	Id uniqueidentifier NOT NULL,
	Name nvarchar(100) NOT NULL,
	OwnerId uniqueidentifier NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [OrgUser] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsDefault bit NOT NULL,
	IsActive bit NOT NULL,
	IsDeleted bit NOT NULL,
	CONSTRAINT [PK_OrgUser] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [OrgUser_idx1] NONCLUSTERED
	(
	[IsDeleted], [OrgId], [UserId], [IsActive]
	)
)
Go

CREATE TABLE [OrgGroup] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NULL,
	GroupId uniqueidentifier NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_OrgGroup] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [OrgGroup_idx1] NONCLUSTERED
	(
	[OrgId], [SubscriptionId], [GroupId], [IsActive]
	)
)
Go

CREATE TABLE [OrgGroupMember] (
	Id uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	GroupId uniqueidentifier NOT NULL,
	GroupRoleId int NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_OrgGroupMember] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [OrgGroupMember_idx1] NONCLUSTERED
	(
	[UserId], [GroupId], [GroupRoleId], [IsActive]
	)
)
Go

CREATE TABLE [Roles] (
	Id uniqueidentifier NOT NULL,
	Name nvarchar(100) NOT NULL,
	Description nvarchar(max) NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsCustom bit NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [RoleDefinitions] (
	Id uniqueidentifier NOT NULL,
	RoleId uniqueidentifier NOT NULL,
	ProductTypeId int NOT NULL,
	ResourceTypeId int NOT NULL,
	ActionId int NOT NULL,
	CanDo bit NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_RoleDefinitions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [IAMActions] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL UNIQUE,
	Description nvarchar(1024) NULL,
	AccessId int unique NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_IAMActions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [ResourceType] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) NOT NULL UNIQUE,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_ResourceType] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [UserRoles] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	RoleId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	ResourceTypeId int NULL,
	ResourceId uniqueidentifier NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [APILogs] (
	Id uniqueidentifier NOT NULL,
	RequestType nvarchar(20) NOT NULL,
	URL nvarchar(4000) NOT NULL,
	Query nvarchar(4000) NULL,
	RequestBody nvarchar(max) NULL,
	ResponseBody nvarchar(max) NULL,
	RequestTime datetime NOT NULL,
	ResponseTime datetime NOT NULL,
	ServerIP nvarchar(50) NOT NULL,
	ClientIP nvarchar(50) NULL,
	Status int NOT NULL,
	Source int NOT NULL,
	UserId uniqueidentifier NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_APILogs] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

CREATE TABLE [FeatureConfiguration] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Configuration nvarchar(1024) NULL,
	TenantTypeId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_FeatureConfiguration] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [GroupRole] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL UNIQUE,
	Description nvarchar(1024) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_GroupRole] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [InternalDomains] (
	Id int IDENTITY(1,1) NOT NULL,
	Domain nvarchar(255) NOT NULL,
	ModifiedDate datetime NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_InternalDomains] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [ResourceScopes] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL UNIQUE,
	Description nvarchar(1024) NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_ResourceScopes] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [ResourcePermissions] (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) NOT NULL,
	Scope int NOT NULL,
	ProductTypeId int NOT NULL,
	ResourceTypeId int NOT NULL,
	AccessId int NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_ResourcePermissions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [UserPermissions] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NOT NULL,
	UserId uniqueidentifier NOT NULL,
	ResourcePermissionId int NOT NULL,
	ResourceId nvarchar(255) NOT NULL,
	CanDo bit NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_UserPermissions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [UserPermissions_idx1] NONCLUSTERED
	(
	[OrgId], [UserId], [SubscriptionId], [ResourcePermissionId], [ResourceId], [CanDo], [IsActive]
	)
)
Go

CREATE TABLE [GroupPermissions] (
	Id uniqueidentifier NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NOT NULL,
	GroupId uniqueidentifier NOT NULL,
	ResourcePermissionId int NOT NULL,
	ResourceId nvarchar(255) NOT NULL,
	CanDo bit NOT NULL,
	CreatedById uniqueidentifier NOT NULL,
	ModifiedById uniqueidentifier NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_GroupPermissions] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF),
	INDEX [GroupPermissions_idx1] NONCLUSTERED
	(
	[OrgId], [GroupId], [SubscriptionId], [ResourcePermissionId], [ResourceId], [CanDo], [IsActive]
	)
)
Go

CREATE TABLE [PermissionLog] (
	Id bigint IDENTITY(1,1) NOT NULL,
	LogAction nvarchar(255) NOT NULL,
	Message nvarchar(max) NOT NULL,
	OrgId uniqueidentifier NOT NULL,
	SubscriptionId uniqueidentifier NULL,
	AffectedUserId uniqueidentifier NULL,
	UserPermissionId uniqueidentifier NULL,
	AffectedGroupId uniqueidentifier NULL,
	GroupPermissionId uniqueidentifier NULL,
	RequestedById uniqueidentifier NOT NULL,
	IpAddress nvarchar(100) NOT NULL,
	SourceTypeId int NULL,
	LogDate datetime NOT NULL,
	ReferrerUrl nvarchar(max) NOT NULL,
	AdditionalData nvarchar(max) NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_PERMISSIONLOG] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [BillingInterval] (
	Id int NOT NULL,
	Interval nvarchar(255) NOT NULL UNIQUE,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_BILLINGINTERVAL] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO

CREATE TABLE [AzureTags](
    Id uniqueidentifier NOT NULL,
	TenantType int NOT NULL,
	TagKeyValue nvarchar(max) NOT NULL,
	IsActive bit NOT NULL
)
GO

INSERT INTO [AzureTags] (Id, TenantType, TagKeyValue, IsActive) VALUES ('8da2ab70-bb7e-437d-9c80-91ff85172af2', 1, '{"AppName" : "BoldBi", "Approver" : "venkatesanr@syncfusion.com", "BusinessUnit" : "BoldBI", "ProductName" : "BoldBI", "Env" : "Development", "HostModel" : "cloud", "Owner" : "venkatesanr@syncfusion.com", "Requester" : "venkatesanr@syncfusion.com", "StartDate" : "", "Importance" : "Critical"}', 1)

INSERT INTO [AzureTags] (Id, TenantType, TagKeyValue, IsActive) VALUES ('8da2ab70-bb7e-437d-9c80-91ff85172af2', 2, '{"AppName" : "BoldReports_Cloud_App", "Approver" : "balaji.murugesan@syncfusion.com", "BusinessUnit" : "BoldReports", "Env" : "Development", "HostModel" : "cloud", "Importance" : "High", "Owner" : "sankaralingam@syncfusion.com", "Platform" : "NA", "ProductName" : "BoldReports", "Requester" : "sankaralingam@syncfusion.com", "StartDate" : "" }', 1)

INSERT INTO [Country] (Name, CountryCode, IsActive) VALUES
('Afghanistan', 'AF', 'true'),
('Aland Islands', 'AX', 'true'),
('Albania', 'AL', 'true'),
('Algeria', 'DZ', 'true'),
('American Samoa', 'AS', 'true'),
('Andorra', 'AD', 'true'),
('Angola', 'AO', 'true'),
('Anguilla', 'AI', 'true'),
('Antarctica', 'AQ', 'true'),
('Antigua and Barbuda', 'AG', 'true'),
('Argentina', 'AR', 'true'),
('Armenia', 'AM', 'true'),
('Aruba', 'AW', 'true'),
('Australia', 'AU', 'true'),
('Austria', 'AT', 'true'),
('Azerbaijan', 'AZ', 'true'),
('Bahrain', 'BH', 'true'),
('Bahamas', 'BS', 'true'),
('Bangladesh', 'BD', 'true'),
('Barbados', 'BB', 'true'),
('Belarus', 'BY', 'true'),
('Belgium', 'BE', 'true'),
('Belize', 'BZ', 'true'),
('Benin', 'BJ', 'true'),
('Bermuda', 'BM', 'true'),
('Bhutan', 'BT', 'true'),
('Bolivia, Plurinational State of', 'BO', 'true'),
('Bonaire, Sint Eustatius and Saba', 'BQ', 'true'),
('Bosnia and Herzegovina', 'BA', 'true'),
('Botswana', 'BW', 'true'),
('Bouvet Island', 'BV', 'true'),
('Brazil', 'BR', 'true'),
('British Indian Ocean Territory', 'IO', 'true'),
('Brunei Darussalam', 'BN', 'true'),
('Bulgaria', 'BG', 'true'),
('Burkina Faso', 'BF', 'true'),
('Burundi', 'BI', 'true'),
('Cambodia', 'KH', 'true'),
('Cameroon', 'CM', 'true'),
('Canada', 'CA', 'true'),
('Cape Verde', 'CV', 'true'),
('Cayman Islands', 'KY', 'true'),
('Central African Republic', 'CF', 'true'),
('Chad', 'TD', 'true'),
('Chile', 'CL', 'true'),
('China', 'CN', 'true'),
('Christmas Island', 'CX', 'true'),
('Cocos (Keeling) Islands', 'CC', 'true'),
('Colombia', 'CO', 'true'),
('Comoros', 'KM', 'true'),
('Congo', 'CG', 'true'),
('Congo, the Democratic Republic of the', 'CD', 'true'),
('Cook Islands', 'CK', 'true'),
('Costa Rica', 'CR', 'true'),
('Cte d''Ivoire', 'CI', 'true'),
('Croatia', 'HR', 'true'),
('Cuba', 'CU', 'false'),
('Curaao', 'CW', 'true'),
('Cyprus', 'CY', 'true'),
('Czech Republic', 'CZ', 'true'),
('Denmark', 'DK', 'true'),
('Djibouti', 'DJ', 'true'),
('Dominica', 'DM', 'true'),
('Dominican Republic', 'DO', 'true'),
('Ecuador', 'EC', 'true'),
('Egypt', 'EG', 'true'),
('El Salvador', 'SV', 'true'),
('Equatorial Guinea', 'GQ', 'true'),
('Eritrea', 'ER', 'true'),
('Estonia', 'EE', 'true'),
('Ethiopia', 'ET', 'true'),
('Falkland Islands (Malvinas)', 'FK', 'true'),
('Faroe Islands', 'FO', 'true'),
('Fiji', 'FJ', 'true'),
('Finland', 'FI', 'true'),
('France', 'FR', 'true'),
('French Guiana', 'GF', 'true'),
('French Polynesia', 'PF', 'true'),
('French Southern Territories', 'TF', 'true'),
('Gabon', 'GA', 'true'),
('Gambia', 'GM', 'true'),
('Georgia', 'GE', 'true'),
('Germany', 'DE', 'true'),
('Ghana', 'GH', 'true'),
('Gibraltar', 'GI', 'true'),
('Greece', 'GR', 'true'),
('Greenland', 'GL', 'true'),
('Grenada', 'GD', 'true'),
('Guadeloupe', 'GP', 'true'),
('Guam', 'GU', 'true'),
('Guatemala', 'GT', 'true'),
('Guernsey', 'GG', 'true'),
('Guinea', 'GN', 'true'),
('Guinea-Bissau', 'GW', 'true'),
('Guyana', 'GY', 'true'),
('Haiti', 'HT', 'true'),
('Heard Island and McDonald Islands', 'HM', 'true'),
('Holy See (Vatican City State)', 'VA', 'true'),
('Honduras', 'HN', 'true'),
('Hong Kong', 'HK', 'true'),
('Hungary', 'HU', 'true'),
('Iceland', 'IS', 'true'),
('India', 'IN', 'true'),
('Indonesia', 'ID', 'true'),
('Iran, Islamic Republic of', 'IR', 'false'),
('Iraq', 'IQ', 'true'),
('Ireland', 'IE', 'true'),
('Isle of Man', 'IM', 'true'),
('Israel', 'IL', 'true'),
('Italy', 'IT', 'true'),
('Jamaica', 'JM', 'true'),
('Japan', 'JP', 'true'),
('Jersey', 'JE', 'true'),
('Jordan', 'JO', 'true'),
('Kazakhstan', 'KZ', 'true'),
('Kenya', 'KE', 'true'),
('Kiribati', 'KI', 'true'),
('Korea, Democratic People''s Republic of', 'KP', 'false'),
('Korea, Republic of', 'KR', 'true'),
('Kuwait', 'KW', 'true'),
('Kyrgyzstan', 'KG', 'true'),
('Lao People''s Democratic Republic', 'LA', 'true'),
('Latvia', 'LV', 'true'),
('Lebanon', 'LB', 'true'),
('Lesotho', 'LS', 'true'),
('Liberia', 'LR', 'true'),
('Libya', 'LY', 'true'),
('Liechtenstein', 'LI', 'true'),
('Lithuania', 'LT', 'true'),
('Luxembourg', 'LU', 'true'),
('Macao', 'MO', 'true'),
('Macedonia, the Former Yugoslav Republic of', 'MK', 'true'),
('Madagascar', 'MG', 'true'),
('Malawi', 'MW', 'true'),
('Malaysia', 'MY', 'true'),
('Maldives', 'MV', 'true'),
('Mali', 'ML', 'true'),
('Malta', 'MT', 'true'),
('Marshall Islands', 'MH', 'true'),
('Martinique', 'MQ', 'true'),
('Mauritania', 'MR', 'true'),
('Mauritius', 'MU', 'true'),
('Mayotte', 'YT', 'true'),
('Mexico', 'MX', 'true'),
('Micronesia, Federated States of', 'FM', 'true'),
('Moldova, Republic of', 'MD', 'true'),
('Monaco', 'MC', 'true'),
('Mongolia', 'MN', 'true'),
('Montenegro', 'ME', 'true'),
('Montserrat', 'MS', 'true'),
('Morocco', 'MA', 'true'),
('Mozambique', 'MZ', 'true'),
('Myanmar', 'MM', 'true'),
('Namibia', 'NA', 'true'),
('Nauru', 'NR', 'true'),
('Nepal', 'NP', 'true'),
('Netherlands', 'NL', 'true'),
('New Caledonia', 'NC', 'true'),
('New Zealand', 'NZ', 'true'),
('Nicaragua', 'NI', 'true'),
('Niger', 'NE', 'true'),
('Nigeria', 'NG', 'true'),
('Niue', 'NU', 'true'),
('Norfolk Island', 'NF', 'true'),
('Northern Mariana Islands', 'MP', 'true'),
('Norway', 'NO', 'true'),
('Oman', 'OM', 'true'),
('Pakistan', 'PK', 'true'),
('Palau', 'PW', 'true'),
('Palestine, State of', 'PS', 'true'),
('Panama', 'PA', 'true'),
('Papua New Guinea', 'PG', 'true'),
('Paraguay', 'PY', 'true'),
('Peru', 'PE', 'true'),
('Philippines', 'PH', 'true'),
('Pitcairn', 'PN', 'true'),
('Poland', 'PL', 'true'),
('Portugal', 'PT', 'true'),
('Puerto Rico', 'PR', 'true'),
('Qatar', 'QA', 'true'),
('Runion', 'RE', 'true'),
('Romania', 'RO', 'true'),
('Russian Federation', 'RU', 'false'),
('Rwanda', 'RW', 'true'),
('Saint Barthlemy', 'BL', 'true'),
('Saint Helena, Ascension and Tristan da Cunha', 'SH', 'true'),
('Saint Kitts and Nevis', 'KN', 'true'),
('Saint Lucia', 'LC', 'true'),
('Saint Martin (French part)', 'MF', 'true'),
('Saint Pierre and Miquelon', 'PM', 'true'),
('Saint Vincent and the Grenadines', 'VC', 'true'),
('Samoa', 'WS', 'true'),
('San Marino', 'SM', 'true'),
('Sao Tome and Principe', 'ST', 'true'),
('Saudi Arabia', 'SA', 'true'),
('Senegal', 'SN', 'true'),
('Serbia', 'RS', 'true'),
('Seychelles', 'SC', 'true'),
('Sierra Leone', 'SL', 'true'),
('Singapore', 'SG', 'true'),
('Sint Maarten (Dutch part)', 'SX', 'true'),
('Slovakia', 'SK', 'true'),
('Slovenia', 'SI', 'true'),
('Solomon Islands', 'SB', 'true'),
('Somalia', 'SO', 'true'),
('South Africa', 'ZA', 'true'),
('South Georgia and the South Sandwich Islands', 'GS', 'true'),
('South Sudan', 'SS', 'true'),
('Spain', 'ES', 'true'),
('Sri Lanka', 'LK', 'true'),
('Sudan', 'SD', 'false'),
('Suriname', 'SR', 'true'),
('Svalbard and Jan Mayen', 'SJ', 'true'),
('Swaziland', 'SZ', 'true'),
('Sweden', 'SE', 'true'),
('Switzerland', 'CH', 'true'),
('Syrian Arab Republic', 'SY', 'false'),
('Taiwan, Province of China', 'TW', 'true'),
('Tajikistan', 'TJ', 'true'),
('Tanzania, United Republic of', 'TZ', 'true'),
('Thailand', 'TH', 'true'),
('Timor-Leste', 'TL', 'true'),
('Togo', 'TG', 'true'),
('Tokelau', 'TK', 'true'),
('Tonga', 'TO', 'true'),
('Trinidad and Tobago', 'TT', 'true'),
('Tunisia', 'TN', 'true'),
('Turkey', 'TR', 'true'),
('Turkmenistan', 'TM', 'true'),
('Turks and Caicos Islands', 'TC', 'true'),
('Tuvalu', 'TV', 'true'),
('Uganda', 'UG', 'true'),
('Ukraine', 'UA', 'true'),
('United Arab Emirates', 'AE', 'true'),
('United Kingdom', 'GB', 'true'),
('United States', 'US', 'true'),
('United States Minor Outlying Islands', 'UM', 'true'),
('Uruguay', 'UY', 'true'),
('Uzbekistan', 'UZ', 'true'),
('Vanuatu', 'VU', 'true'),
('Venezuela, Bolivarian Republic of', 'VE', 'false'),
('Viet Nam', 'VN', 'true'),
('Virgin Islands, British', 'VG', 'true'),
('Virgin Islands, U.S.', 'VI', 'true'),
('Wallis and Futuna', 'WF', 'true'),
('Western Sahara', 'EH', 'true'),
('Yemen', 'YE', 'true'),
('Zambia', 'ZM', 'true'),
('Zimbabwe', 'ZW', 'true')
GO

INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'OrganizationName', N'Bold BI', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'LoginLogo', N'login_logo.png', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MainScreenLogo', N'main_logo.png', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'FavIcon', N'Favicon.png', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'WelcomeNoteText', N'Welcome to Bold BI', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'TimeZone', N'Eastern Standard Time', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'DateFormat', N'MM/dd/yyyy', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'ActivationExpirationDays', N'3', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsAddress', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsAuthType', N'1', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsUserName', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsPassword', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsHost', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsSenderName', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsPort', N'25', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MailSettingsIsSecureAuthentication', N'False', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'BaseUrl', N'https://boldbi.com', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'RecurrenceTypeId', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'RecurrenceInfo', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'MachineName', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'HostDomain', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'IsSecureConnection', N'True', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'IsEnablePoweredBySyncfusion', N'True', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'IsEnableCopyrightInfo', N'True', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'StorageType', N'0', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'ActivationType', N'0', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'InstallationFolder', N'BoldBI', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'CopyrightInformation', N'Copyright &copy 2001 - $$CurrentYear$$ Bold BI Inc.|All Rights Reserved.', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'IsShowPoweredBySyncfusion', N'True', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'IsMarkItemsPublic', N'False', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'AzureBlobStorageContainerName', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'AzureBlobStorageUri', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'ConnectionString', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'ConnectionType', N'', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'TimeFormat', N'False', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'Language', N'en-us', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'DatabaseServerThreshold', N'80', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'ElasticPoolThreshold', N'190', GETDATE(), 1)
INSERT [dbo].[SystemSettings] ([SystemKey], [SystemValue], [ModifiedDate], [IsActive]) VALUES (N'NotificationInfo', N'<?xml version="1.0" encoding="UTF-8"?><NotificationInfo><Notification><ScheduleType>AccountActivationReminder</ScheduleType><Intervals><Days>1</Days></Intervals><ExpireDays>2</ExpireDays></Notification><Notification><ScheduleType>PaymentDetailsUpdateReminder</ScheduleType><Intervals><Days>10</Days><Days>8</Days><Days>5</Days><Days>2</Days><Days>1</Days></Intervals><ExpireDays>30</ExpireDays></Notification><Notification><ScheduleType>MarkForSuspensionReminder</ScheduleType><Intervals><Days>31</Days></Intervals><ExpireDays>31</ExpireDays></Notification><Notification><ScheduleType>SuspendGraceReminder</ScheduleType><Intervals><Days>4</Days></Intervals><ExpireDays>5</ExpireDays></Notification><Notification><ScheduleType>DeletionGraceReminder</ScheduleType><Intervals><Days>4</Days></Intervals><ExpireDays>5</ExpireDays></Notification><Notification><ScheduleType>ResourceDeletionGraceReminder</ScheduleType><Intervals><Days>4</Days></Intervals><ExpireDays>5</ExpireDays></Notification><Notification><ScheduleType>InActivityTenantsReminder</ScheduleType><Intervals><Days>30</Days><Days>45</Days><Days>55</Days><Days>58</Days><Days>59</Days><Days>60</Days></Intervals><ExpireDays>61</ExpireDays></Notification><Notification><ScheduleType>InternalUserResourceDeletionReminder</ScheduleType><Intervals><Days>1</Days><Days>2</Days><Days>3</Days><Days>4</Days></Intervals><ExpireDays>5</ExpireDays></Notification></NotificationInfo>', GETDATE(), 1)

INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'Registration', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'StatusUpdated', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'PaymentUpdated', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'SubscriptionUpdated', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'BillingAddressUpdated', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'BuildInstallation', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'ConciergeSupport', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'PreviewFeatures', 1)
INSERT [dbo].[TenantLogType] ([Name], [IsActive]) VALUES (N'LogsAdded', 1)


INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'AccountActivationPending', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'PaymentPending', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'SubscriptionCreationInProgress', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'SubscriptionCreationFailed', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'DeploymentPending', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'DBDeploymentInProgress', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'DBDeploymentFailed', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'StorageDeploymentInProgress', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'StorageDeploymentFailed', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'ServerDeploymentInProgress', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'ServerDeploymentFailed', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'DeploymentFailed', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'Active', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'SubscriptionCancelled', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'MarkedForSuspension', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'Suspended', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'MarkedForDeletion', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'Expired', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'SubscriptionDeleted', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'DBDeleted', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'StorageDeleted', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'Deleted', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'Trial', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'ActivePaymentRequired', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'TrialNotStarted', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'ActiveBenefits', 1)
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'ActiveDTPayment', 1)

INSERT into [ScheduleStatus] (Name,IsActive) VALUES (N'Success', 1)
INSERT into [ScheduleStatus] (Name,IsActive) VALUES (N'Failure', 1)


INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'Daily', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'DailyWeekDay', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'Weekly', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'Monthly', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'MonthlyDOW', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'Yearly', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'YearlyDOW', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'Time', 1)
INSERT into [RecurrenceType] (Name,IsActive) VALUES (N'Hourly',1)

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 1, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 2, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 3, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 4, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 5, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 6, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 7, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 8, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 9, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 10, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 11, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 12, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 13, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 14, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-02-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-01-04T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 15, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 16, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 17, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 18, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 19, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 20, '02/13/20 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '02/13/20 19:54:53', '02/13/20 19:54:53', N'True' )

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 21, '02/13/20 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', GETDATE(), GETDATE(), N'True' )

INSERT into [ScheduleType] (Name,IsActive) VALUES (N'AccountActivationReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'PaymentDetailsUpdateReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'SuspendGraceReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'DeletionGraceReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'NewTenantListReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'SuspensionPendingTenantListReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'DeletionPendingTenantListReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'SuspendedTenantListReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'DeletedTenantListReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'SubscriptionCancelledTenantListReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'ServerAvailabilityCheckReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'ResourceDeletionGraceReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'ResourceDeletedReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'CreateBlobSnapshotReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'DeleteExpiredBlobSnapshotReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'MarkForSuspensionReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'SubscriptionCancelled', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'KnownCompanyExcessStorageUsageReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'InActivityTenantsReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'ActiveDTPaymentTenantsReminder', 1)
INSERT into [ScheduleType] (Name,IsActive) VALUES (N'InternalUserResourceDeletionReminder', 1)

INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Local',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'AzureAD',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'ExternalDatabase',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'GSuite',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'WindowsAD',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Syncfusion',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'OAuth2',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'OpenIDConnect',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'LinkedIn',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Google',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'GitHub',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Facebook',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Twitter',1)


INSERT into [TMGroup] ([Name],[Description],[Color],[DirectoryTypeId],[ModifiedDate],[IsActive]) VALUES (N'System Administrator','Has administrative rights for the dashboards','#ff0000',1,GETDATE(), 1)

INSERT [dbo].[BillingInterval] ([Id],[Interval], [IsActive]) VALUES (1, N'Monthly', 1)
INSERT [dbo].[BillingInterval] ([Id],[Interval], [IsActive]) VALUES (3, N'Quarterly', 1)
INSERT [dbo].[BillingInterval] ([Id],[Interval], [IsActive]) VALUES (6, N'HalfYearly', 1)
INSERT [dbo].[BillingInterval] ([Id],[Interval], [IsActive]) VALUES (12, N'Yearly', 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'5 Users', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgxyYJpSQ0aFq3fJQH8lY9dBEyuxDuN6o0St2yX46CmVbqz8JwG8rjHiUlw2FdR8y8vkmeUSFtf82U3fUq+8nemokA4r0JMk/K8mSkbAE6/2E9KodobNGV+uOQSgl4cmcaT4zH8fdfwbS+AeUB0jUmOYJpmOxGYJnRDcolin9CW6g8wv7FSEcYpIPST26ifmxGSZ/PBabXQtV3+AIRydGnVzUeWOSTYA7KLiM+0FwnFO1IUUTTJvMgDMTu7qvA9ryoI1m3il3egjzmABgzBTW6WfnJgeKvTkKfqtaLvnpM+wjOgr+j/Ju8YSOtEVpnzJWfzGzD+eRr4Rw6qIZjft0E0cu7Rtmlq+Sciu04K07vYtMwhZ8iy9TY/evDxkTEaE3IZ3J8+lboP0QhDYADfMjN3jDCrVoTs0sO+clTY+b5qHx17BaM4aadQkH58RfrdgD6UbMJGF76L7xipwDC6nR+6B9Te+g26gV3QGx4TOUKbCMG9Upbrn5RGycX47CypBhKQpxBhi9s3cUnbDlvksLsV7cAlyZWxiUfoFfSw1vlfbWmLx1DqkDi0HbHk0DbiQMHp0txPSeaDx3oyIAuOgWKP2NVv8bjL3f9oJdpyvuNRMrUItYpPB0M/TRFPfZcl/Ka+gUblUr1GYWRTP3iD0l1XclK9Yv/j6RGJwdtstUNXZ8E+2z1dzQXRU3wnnYFcnmeyTsL7aaS+WdTUriSYxG/u5lXU94+YZZc9YYfPIGA9AoA==', null, 1, 30, 0, 1, GETDATE(), 0, 0, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'25 Users', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgxyYJpSQ0aFq3fJQH8lY9dBEyuxDuN6o0St2yX46CmVbqz8JwG8rjHiUlw2FdR8y8vkmeUSFtf82U3fUq+8nemokA4r0JMk/K8mSkbAE6/2E9KodobNGV+uOQSgl4cmcaT4zH8fdfwbS+AeUB0jUmOYJpmOxGYJnRDcolin9CW6g8wv7FSEcYpIPST26ifmxGSZ/PBabXQtV3+AIRydGnVzUeWOSTYA7KLiM+0FwnFO1J1TvH+QQoYTaT/hneIYnszYHsYQHlQYZw4OO46G5EhU4lXLTgpiSNTTNrfoxBjeMtDIn2ex2GtfZL1iODxkRy5DW8LiGLMgpdbdHlbfWOIRyXbGJ/hSi93uHsa8O2tv4Z3XhbW18cpYkr1kxb4Bzc+ZcdnSqXIPsJFrsdgbvMYO6Wk4P2Cxdb2F4duziDIZu3OSj8Oo+8MOxLjM3wcZBxkbcSv5STYA8rU241AIyTBqeHc1paJZBA5cMemiIc+TyMNSVI9buOCibaolnxJE/p7ZuLz/mzTmdarZSMEoIjmHu1fiXJRnq1bh4DZ4k2FcHDnrlya4n91L0mzr6upYc+GwBT2ckv/g4jhpJKsa5ET0qQ3G7512OBPBkUY5a3X0L6ESASWv19WYxCpasV81tvU6BuV0sJ7mOXP+yvK1sXFeNEsOwalM7bg4ntVvSBRDmHsA17Vv6mBkKbIOdxxQWC3asJT1yko2yLYRy4wGyxMlZC0bb5pczmFCr3lvcmF9hV5tspahi2q+4rWMquvd4EQ=', null, 1, 30, 0, 1, GETDATE(), 0, 0, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'50 Users', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgxnm0pkBuOfgwNBP0FYZiADSd3IHutvTo6PvNibpnal61Q6y5k6HCE1OGCVq0KvWLiPYAWnWTjSmG2ohlGTWdZKxoJdcWM4c2ioBsmEAwVPhO3I3iDc8Gr+H5nOLq2c39UfRkRkQ+AHwzhKh/yaOAuKxDHxOIPGU/tXTCORYu/1utxiAymhuP0PZgn0PTj4t1Ube9WrfKTyMYQDkzaGba9dg4EIGldu5dPtJ98LdbUaHa5VCYSG6Wgnq1m7q3p1aOvmw+Y3GLmOb2gqJVIG7pRhTBBCT7qUBgHKhFR88XT+FFMoDZf2OdUOnAArTBM7pyS7o3behS96aW2klZQ2xMlG/ValvZQzruAhx+1cpbf+RJO1kCLn9tpDrCcBC0t5DPtPCw4UNRFnsU7qBilWyCSq74seJ1vKNicQFKJF3IQI1Laa6YbMItelPj4Gz+NIQQz0IjEDxF/yOzr4K7gFzpRKlVb6H3iMIBp0j+vH+fOSaOSHMa+yUovdpvX/c7yjwVyIRW+UbF2W8IO6UbSR9Ie/7XCZkBEbRPWicCl4Mic4KgrLNn2gb7hw+MF/0rbpwxhEDVwf0dh3zsEKlEjY2ygycGSgRY7rWNN5vyeirsHej15GCiqK7+Uyvv8lkpaKmq67lZudl68b7o91oi1av5wR2MqCooxUU62KVgDbb3p1zZ53T37lvNE5uaEeLvOrXrnUJAIk0RXKy4lcRDAguS2NAuHKysCPIavqpw6oH4O97A==', null, 1, 30, 0, 1, GETDATE(), 0, 0, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'75 Users', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgxnm0pkBuOfgwNBP0FYZiADSd3IHutvTo6PvNibpnal61Q6y5k6HCE1OGCVq0KvWLiPYAWnWTjSmG2ohlGTWdZKxoJdcWM4c2ioBsmEAwVPhO3I3iDc8Gr+H5nOLq2c39UfRkRkQ+AHwzhKh/yaOAuKxDHxOIPGU/tXTCORYu/1utxiAymhuP0PZgn0PTj4t1Ube9WrfKTyMYQDkzaGba9dgE/sNwhc1cRnM0VrGl2Ji9H8WxhSS+bT1diNUGPVkUZcF07bCe+WzrA+PGBkvJ1J2X/5QAbilEyC4uZG6V7cezXWcDV153MZ8r4M4VY7OrjqbnGfJgTIS7vizBqd2jcCzgyNnJi9T3VKlUktgxig6F+3B+NSwQtqxGQi73LJymXdTGdJ+9CnO5/QEAEtjc6XR38XkbtMlUSMO2F2m80ZehAzlLhVhZMu04p8+nRK31/aa9X2IEou6NJS5L6QR/WJAlu7GQzCv6Ih0Q020ywqIOR6k4/RIuaNVOwTRBoaKY3HWREcaH5tlEfd48SUDdpOB0b7meh3sWvEEZgT4hAlESF1FHTutZ+XH+AQ+LsGH0auH0Y9QODiNVdfUb2vQ2r/6fxj82SkFPrfDaOacwdIuEBSoNPY+55+W4H4abyv6565hEC1pObz2vg6Y9QT/KuRgbe/r2C2gdyRKQS4aDiVPGkPisYHVH2ljOMzOboeUKe9UNOnmkd1A2gbexQ7ix/CPAjOe0CQZYvAwbFixPXMAI2JF8hD9FCut/BO4fjp9EQ=',  null, 1, 30, 0, 1, GETDATE(), 0, 0, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'100 Users', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgxnm0pkBuOfgwNBP0FYZiADSd3IHutvTo6PvNibpnal61Q6y5k6HCE1OGCVq0KvWLiPYAWnWTjSmG2ohlGTWdZKxoJdcWM4c2ioBsmEAwVPhO3I3iDc8Gr+H5nOLq2c39UfRkRkQ+AHwzhKh/yaOAuKxDHxOIPGU/tXTCORYu/1utxiAymhuP0PZgn0PTj4t1Ube9WrfKTyMYQDkzaGba9dHRQFFa9GRMbMVXQGQg0Jjth3s0HxwUCOf/G6+thgLShbx6psbcU10hlMR6EJHMu4g8mJlEMuWA0OInQLOMGvh+ldbV7Ii9nU16Xz4aInwp4yHsG/qzir3xLvTrepxGFUY53DXLsFqhDydxm2tJJwTF1Yvbf9cWQnvYeFqi+NlpB85Z4tHVTO2yzuHgXqTRIEMi1nqi+UbViGeK52WLH7EH3uDhAw5Qk+xRqXgeO1IoFqzSZHMU2e/8eAjph/x40nSzg9m5TUI4fos3oi8SYRnXH+wTJ6hSP/IXsB0yD0m+EXrlwEOSEaHVSVNgRWpE0lN+/Tza8J+CL9KtcKwbduM7A2Kld/9ciwSrXSEW9MZelnFDhbQghpOnC/OGV3wju5alugIosXqtJ7XGRkeRiwjYhPQt2LWrpsutAZWlk1pg4Qq1cOOVJLZfe++VdJi302ZOoIDPyqDL6vuTTqN0Bh6vYTj4jeHK41iwtSdEqKkYBxr8sUaeka5xfd4tHkIAem6SHwco0m1C/rhWkkWlHEMXbF0Fh+aopva3CZLWZn0Cs=', null, 1, 30, 0, 1, GETDATE(), 0, 0, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'KC Benefits', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgxyYJpSQ0aFq3fJQH8lY9dBEyuxDuN6o0St2yX46CmVbqz8JwG8rjHiUlw2FdR8y8vkmeUSFtf82U3fUq+8nemokA4r0JMk/K8mSkbAE6/2E9KodobNGV+uOQSgl4cmcaT4zH8fdfwbS+AeUB0jUmOYJpmOxGYJnRDcolin9CW6g8wv7FSEcYpIPST26ifmxGSLG+W+hVYNY7oXV3Pk4iqBirlGftktvkvaG1ua0xAKacjq0zND/JLWj2fmouQqGhZ1M+dvKyLiTcvIVBWkCxRXdFEaf7pCuGWuxVlhSgfBvq+ZWTuevkoerL6Dv3xANqnMs7rpSRJSF62B4q7MNSa5M/uvdiQ9d/chGsENg1YxS3ZSk6/tRtbP5H4Pmog0rFmkvvImEyGFmYrBo5rq5vHm7vj3O8RlBXWi7oaoNxopp5aoTAfEILO1E0+UGf6rzWAyguc4alntw/bovsNCKoQuzkskXtdxTS2CbHXPK2gficUrlL7NW/miiEyDGkTVx3YeLcpgikxivk+jMDq4RnuUjbc5hMoG33xe9YAFBZqUwvppi0nqYPBBdC75zRMRFs1lUhkVnuh2JMf6YGRz8nV3mWnNf+htYqPUpnzFxFrG8pS49sWuXZ/8Qu4cgjQgyN37kOodQnJAMPchUCrqF5dbC9oPTJWqJ7BbrBChOagqmEG5pymRXJqDbq0OBgFQrpxgtPwSfng3X2xqKmuY8WCVXv3NEuNY7Jk9RvBLJFOIQnxsPQ9m4191n6Lguy+wWBo=', null, 1, -1, 0, 1, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Bi', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgzjVR9TTeqMcZDzNi8PUcl8S9L30vto2eVpL0pHlAqVYu9+RWpGIj1SdTgZS2abXGqJqtoTb87jqblB96+npLqViUSet+4zm4UA3r6SuITl/cwZB+0X8QDZHW98wPu2ND0225jjv2dQbbmt7Pbkl3NlQOd0Kug92CxGYjmrhlo6U98yGQUTfnQZ6YTWemDbvEMpDpdbX8PVOqqup+e3pI3F6TnUkt584QD+mwcjhJFOITNaHsUk2HT59eWejkcC8C32LrGJraiWOi64ktlg2YMqTfLQBEALz3fklnMokJYqXfZpfbX36CXswoa5OQXRstlOzi0dHfalV8DxCdHlquUJZwm7nM6YR1jGrf5Ppbg5E35Nz6IIhj9gHS6gY1/D8C5PPk99yKPYiGL+zYiNwqhn9vDdb5ByfigYKiIKOtRRrR+TdoU2To/ZcEl5pWy3HV9REx2S8KNg2qB3QH0G0JVbdGnbeIgVfIm50vXIatCnbznYWSLFoaQKSbBUTgV/yHP4XOwvQpimpIJ2NCMruNZkGeFp/NdGBFiOKeNMaCVUBVFjE2CEXOkFF5oSELbMzVhTUc92bwKwPzJlxFqdL9jPLgWzHMMMiq0zpe3Y9Dh17vxae6MOV2VKqV3kW8o61mDW/ILe0IupceulpzXEoe2991XLYp9+BRlUhP59JX0xHf/P7KbgYWaaUXv7QKGti5vHJFDiFd6TXXQHhD+0iXfPqpYRWCvcUuxoKdaTrJKxbHt4rZ7q446m2SO7Hheeyw7z9AI5hzp/5lkUNBgn+6I/woXQNyLB26STGQ8o+nXgqm1WDJhzUhMvu41RRBbj5tZCLCCPcVAMYlAlrDLkNmgDyikVJ4lUTT/hXyX5prDgRX6R7b/2E+pdjbcvRuDkcwk=', null, 1, 7, 4, 1, GETDATE(), 1, 1, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 10', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqU4tk67GR/okSoaPtBHsakgHMkqnJLPNkJL34MhJdpOwjlOlwMZZGCHI6PUhgyK1jR6zG25dZqDRSFjbj/nffezsLoLhsYH8S4wli1nPTOVRR6V+0IwSlR+s9Jh4BzfQYCSa/fgMKAl6Gy0BFNosc7rY+vxEQaFD2a/AUr95K8JcR6wenFNk+BZkSoDApP4IIk7Yh09MTXJ150tVUcHfbssiOLVhVDOT38dOnQWDeinut06TL1DfN/+Z7RvEDELU/xtIc1yOAKjNYkzq3tLjDX1yLvQU5qOq7BnyCjRHGNRh8righ9KA+ZDatN/jcAJx/DcmNO2KLRW3Orle+mtWBPCfZnEpHMqymDnp+uL+Dww9SQOcT6lRkEDYyAsg0iD+1n0E9yiLtQ4tPsivYw4kNEY4H/85TdQWMM1HTER1+DwLw=', null, 'Refresh data every 15 minutes,10-GB storage limit,Access to 85+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding support during trial,Custom Domain,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 'A business plan for teams and organizations of 10 creators and unlimited users with 10 GB storage limit, 15 minutes data refresh, and more.', 1, 15, 2, 1, GETDATE(), 0, 0, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 25', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqU4tk67GR/okSoaPtBHsakgHMkqnJLPNkJL34MhJdpOwjlOlwMZZGCHI6PUhgyK1jRmwxiRXe77A1eUrEYHIqkTmHkLvqbAD+sJOjxGl64p5IZyBiPHpO+RRjfqc56GUtKRcFM2M1rfud8a1LN7ma80yOnr71jNX5sPSy2meZghC0vvXIYsXQ1xbEWPNCiiRiwIxtqRRn0AKanDpOeACaE2lDSaEFSkux0Ircwh9TysMJeIkHZRbvQP86cKww3YYnoMeUM7ApehBs6Wp+weU5TNO50CUk8iNeP9h4JsHHCAChIWASXeYXSqEVWMeHogQ/OgqLTUNCMK2lO/S+GhGYVnwSTMaujPjFC7Qy6jhoI8K+Q7r0XeFs7dC1lPjlzjYPnqX8LEvwqS1pBNauEXMTs0VLvWlAXM8rwYO5uxRAdQ0I=', null,'Web-based support,Access to 75+ data sources,Refresh data every 1 hour,25-GB storage limit,Share public and private dashboards,Onboarding support during trial', 1, 15, 3, 1, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Single User Plan', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVq4fHZvhb3cEukmvW7eHhpSfoqD6iOGN4ylzxQ44/W5Q0AbWBWD4ZxSK9FduvXEGecMiFAfKHs3fO8zN+ZI4Ixhykev1HHuRYb7bxes1ASYW4Qe+uO6HMHFR2oukZORifi9hnRfnY9mA6v+QvYJKCe7juRNZg74jKIa0pqDo4bu04Jc/iGqVIhKhAm79q0xV5uQVoeuCxQLOfq0LCSc7w+si2Co/T/eKfa+RKH0HzSajisByg3LCA1tn7cIlNJoxDdw58R2SWgsHtWfM87Wo8ue2gfSVwZdiDM0NypWg330FkDLGfTkwZViL0S9akDUGZOYdkA97SfrH4UrqcVRL15ruWYMtm58FYOCPcKxQnOQAP6d0SO15d4G3fpFWOQKc+I16heeZ1gdzAiI/mD1l/kdY9/jjM4Hhc9j7tYION5NE4xoOrCD2a62souULXaui7XJJ+TGp9KraX54b8dKorBdqxOAQr1JN/3TcoFDiNKejw/sLM+uVMksPAoWaQKxh33VT6TTDH7TWj6ABFEBlg6S7+ibn7N3cC3KtGTvYxupeax7+aBkXVW2w6B8liQW40yfNQSjzra1MtkTYE2RbQrriT4sOfh0/1ZmQKhzsGfssKhLUbRDd4/qppIrXPHOVd1WL6OMMW4avorNaE5Cyvc1I3fSmGb8eTAH6Z2IE8qUE8dV0pOKvyPWpOkOpkjZug=', null,'Web-based support,Access to 75+ data sources,Refresh data daily,1-GB storage limit,Share public dashboards', 'A plan for individual users with 1GB storage limit and access to 85+ data sources to create unlimited dashboards.', 1, -1, 1, 1, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 10', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwofOke7X7+2XSzsizXrcTKyqNIkCWoSpisYY6sz4rTAyucA1qsskFcYwkvDQ6GwTl4mu0BCLEej2H12xwlSyY9IL/mENXjhWbz+FiKk3Ldp72oHp5gDHFyoQGHfwvB6Us6rKYP077GuP41peMY+2YVBz23zfN+8BHLT3gkrsu0WTnQL3drrYpgUCzkufj586sySmTCeHBPkh8JzTxDaEBiWw3Ubmo3u3gweXiylFkVxjIr2nVRppH4Ps2H7I/wymThQkpmCN+f6KrN+SjvfahxnVkyreoqCs1eg9GUOIk9qrrZd2Er88znwBla3mh8N+515k+whU6AJyxtF9KXoOahthcUSDgzfezPzwZeQE2ecWdRxZaOAvqskKcK56pMxXQ+gyYgEO/xe0ATfAwWeHNiG', 'BoldBIOnPremise','Refresh data every 1 hour,Access to 75+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial', 1, 15, 1, 3, GETDATE(), 0, 0 ,0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 25', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwq1Jf5imL4do0Blmmu3I2Z6l+2dH1bKrRvDvOyoOHlKNvmggiPYS9ANrkWwYhfuAC3NeA9gfdhBCgoYAEg3AIoX7ok+ZGJkOpp+4BxYU7EwOlETv6B3TtbizyQcCjYtj4SIf6Nz7IWZGUeLd1C5YzYFPc3Grg6saH9NpdWfIDqYouLVDLH7W0n+y7GKhvooMaNYQ1Avc5faa9RFuF1iftyLo23ekCb12K7IxomR2i71JmQwE+zfKuGzoEQbxaEEE1/uDnLRo/v53eURWlncvFPPPPKxWtO7KSkQWeXbVtBZU9059++Yh2X4+t7n6TXbEgMFykF8x1XtesMKUxXz+Ityhq7YIihCGv5vzL7zY/6BVfGAE7v8bBNX8bTIgIbeSvAMu/UN1WztS/32fxmpQKsL','BoldBIOnPremise','Refresh data every 1 hour,Access to 75+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial', 1, 15, 2, 3, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 50', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwpL6F3ciVzyUKJP8IVuozE7ZQkw61FtXKXJ9pJC3iX6/yJRYveupiEOSulUB0WLPYPihcXo0sSkAHuQNZsAiUhFR/7MCU5DYmKboBEm29IjFilbt88fWY75yp7R9wEUF0MOMQcQhqaMhYrxYuiIob73vPr/RESPvppvv1AajRGUhiOuOCAfTpd7xVd8aemD20onrZ26bkuStZcoq5Q0kIePnFxprHNm4zQJAJZh/Sev1vVo04hHH6H9HWQNdvk8sFqwfWdmhDjNjwC8i6tFVBQ0DHhlc0uYgEaAcpBRU63BEGBpOhljNzQ6/WLxYoqZG6/5pmLXQmAhhfbHlb54TnqB2eAW2T9NNhCQM1ZX8mO3Lo5KyZxnHyjyT+rq2etlu6NLiVN27DGvIYB5cYeqWZaM','BoldBIOnPremise','Refresh data every 5 min,Access to 75+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 3, 3, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Enterprise', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5nERbg8qTskolbeNnIRgciiCrheYSbH2vPhsA+9ib8ca06/WoYa7wckglRxxoQqii1salaL8jJmKwYG5TnVrsxDUUNSRd6WeHJd1k0ktrRfSNbCHwvePNVEFzoprJw+5vUKCicUZ4Wklnnco382gfSclt792VeSeWcvOIyKtJhxLyor5CfDDwqNfvJSI4rmNi6DoOedF4igVg1bXoCVKo+d61izx1250OXox45US6ZZlOHDwAUvkTHvJ0NZlq2WkG9C9y0lok25NW+JiH1k1UWKTFK32egxB+7431SXRzuvastdEXB2e0qA5hwiFzbb2rn5qfDgwQoZ2vWqgWol0MElOpHDrRetZmsiQUyNvBe8t','BoldBIOnPremise','Refresh data every 5 min,Access to 75+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 4, 3, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Startup', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5gtBGjiCYjzhG16IaSoZi4I01DJmA50yVU+Fk/LkDsKaPwJ9CdnqF1wS63oKNDg2NePYZAJDXkdxuZRs07UkC8U2E4AXGsbKLzlvn3jVzZ/o2RlUoMb1CeyY8awheg5nOqWBQkfI/We+cqfA8uobvQvynfafW5BKZ+x98kAZAhnUD4C6DotuCeRukUEgje33oDqSMR3TWme73fNBYn7yLogn1oqZc/E//uLgcgg869P378nsVcYugfs/eN/PFSqdGB+yY0/MEMzvZjXoZjCZ9VnHtMIQCpw0U8MGGes3B8y0U1qa1PpZJ9fgosfDvD7FoOyF5Y+M3RZ0H2TIHDNJPhg=','BoldBIOnPremise', 1, 15, 0, 3, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Small Business', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+GdKRD8DkW5s2/S7wkzABrW4owF+o+fz8NU/niu/w2wuCn9FUJFx/6bM5jpMX+I+4MS8jYX/r0kQhwE3i1q5RHPC+iw5rIBcN6eJl0FpNQ0DU8zMJdcrfRzWKudtv/sY6GXA8LL3bQXEhbAq8QXXez02/oeUqvER5dmMbVK8fY4VaruYpYGahjdBuK9rYFGMj18J6EqDGL4FCJAVlDEk19TCXxbnjHUAeLifWT/qYAzmnpoUAFQnA27j7UKKTF11GZzMgxfbzjueD/ctjJbVoy0M5twjElu00lvcPC/5HcFjOjetlJ+LF0UfklRrzia2yvseUWAe0aM7G+rrz3BaEim','BoldBIOnPremise', 1, 15, 0, 3, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [AdditionalFeatures], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Enterprise - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5rcwnR0vKnOqCv/mzd9RQ4h64n+7S/rewwNSvfJKl/8PILsOjCsZW4Df7wv6kevq4K+BCatbkGVFZfRQKYasdQbRVKwt/wQ+XIdr/wYseI7wOo0ZONjUXVz37/BM7vf5g4XbB4Np9e4B3MlNM2RoKI1n8keuEzAAtnLlgh31BOsqIHV0SS9KXIZe+3tJC4uELNhjJkGlKy4UatvHVRe9IVfPLkT45nAHe+cr1zbUWbj1DlN2KZPkcTcuttiJ56EP5uu4q9aG4UZEYF0N5rVUMBrWghV/iog2HAM/jRXD5y7ZaDf/GvuyZ5ceM4G7zi4+JLxxzEPqj26rvviYfuB7BYsGSOZwJc81l8OgJrWIDVjDAgnUwF4pXwukhGfS+EwaNg==','BoldBIOnPremise','Refresh data every 5 min,Access to 75+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration,Multi-tenant', 1, 15, 5, 3, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Startup - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5vP5WqXUiy1odl/xSg/jp7XegXlyO6A0n+k1yuKaXIiX9oOM29MfYyeeCdsSu+T5NUj4gWXfPh8ksx5IWogrOsobLcu8HYgjPIsE7hbqalpIaZ1/tdh2GkUEaC0BnUp/0eoEoFG1BHzGD7vn0RV3ZtOfiqMEBE4OSw4YpFJO7cVV6K1kpAbHxy6gmQWLGF+UOZShfDkv6yKYD6AU4mVVmNIINT9jOReBfimg1fFx5aEcSdxlmhLuoAbCL3Y9FUQ7wLE/NtvOfU/hCYIJe4aJxEsUieBmq1lOtzoZwvvxd3nwxCizm3PnFuVE+7vWhGEkKV5cOh/c/ZlhTttm2chcfvDyp1CyQtiRPg162QkABdS5','BoldBIOnPremise', 1, 15, 0, 3, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Small Business - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+Ecya5k3V2lTX/uLxXsJzywdbaBY5YlaOOghR3xNFPDVyVcyA6U+HGEX2SZS+JVEMcN0ZBHBZrT/OsWYNW8NXtYJMNG6rRvVPFCRIK43ptGZbjj5rBAFgq9zNGl82stC2bOrGOZT2E28xvkkm8e89bC99UHmP+gsnYbA62Wpj2wsRBtems2cI57G11MjDpDV50UDqn5Yo22HkPK3Jrw/nPealB05nD9ArD4aqc+PGKplMqJDUe9P9+iZV3GDb8g0P+T4djIWCEIg/AXk/nezQqMXpX+B/JLRQnLHP1TR2U24hRv9wFA/5334Biqj5IFcFZH1L4dryEWVG0WGSrttaMwzkWFBTHLd+0xrlJZ0ZF6WA==','BoldBIOnPremise', 1, 15, 0, 3, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold BI Enterprise (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgzjVR9TTeqMcZDzNi8PUcl8S9L30vto2eVpL0pHlAqVYu9+RWpGIj1SdTgZS2abXGqJqtoTb87jqblB96+npLqViUSet+4zm4UA3r6SuITl/cwZB+0X8QDZHW98wPu2ND0225jjv2dQbbmt7Pbkl3NlQOd0Kug92CxGYjmrhlo6U98yGQUTfnQZ6YTWemDbvEMpDpdbX8PVOqqup+e3pI3F6TnUkt584QD+mwcjhJFOITNaHsUk2HT59eWejkcC8C32LrGJraiWOi64ktlg2YMqTfLQBEALz3fklnMokJYqXfZpfbX36CXswoa5OQXRstlOzi0dHfalV8DxCdHlquUJZwm7nM6YR1jGrf5Ppbg5E35Nz6IIhj9gHS6gY1/D8C5PPk99yKPYiGL+zYiNwqhn9vDdb5ByfigYKiIKOtRRrR+TdoU2To/ZcEl5pWy3HV9REx2S8KNg2qB3QH0G0JVbdGnbeIgVfIm50vXIatCnbznYWSLFoaQKSbBUTgV/yHP4XOwvQpimpIJ2NCMruNZkGeFp/NdGBFiOKeNMaCVUBVFjE2CEXOkFF5oSELbMzVgg3YbZCePYoSyyg6gPeJUM841QQSOSNCjU3RlG5K+8Mz+lCyrYATMyuXSGARw/vbchFwjv/zlj/qXLM5Ja6trXsikizDDV7nOETb5Ck2DhAKrGD5ntHyitCeUlErll9fU+jc3c3Hre/QWyIAv+ERPhJ/6aTaYlpeRITD+ImKUYPgzwoHtNbG728ZJMTIWDpQCDI8qv/y7YA9I7tppGY133bU6NUGZSox4BRzOfdzwuA6Cr9koT8Dp0Satz0s0tTCQh1TTywyBnLyqp0rdawov7RNJpb8Sh87ChyXuRTIPPi71ZqEb6a7KNBrjXTmevZmzmSyBo5wTSvKZsVMqASE81','BoldBIOnPremise', 1, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5vCsYY3vOdx/pM15+tdbVKyHRV3xLv47isIKbVwXRH8zrs4fTGAca0aM2vuusZ3AEaho8u4fsVSuegkRLc9kTda10PK9lVdii0RH3xFqA4LGviK7S2dedafN2KvcIujexdkepAPX3/Mcf4/6sP6JWi2owtHrnR6ojLvJCP3pvjD8LPemCgECU5rKiKyKjiiHc/G0CvZsVBQelasRwNguqW/LJp+g0DWkCWnm3PnFru3TO9c5Nki1k9c9Cw9PFzPrhFG80ssbIIGpCg2f98QzQ5x3RYY56n4DNHKHLMNW4uoeZZM4Ef97gaBfX0WkH49N8aKAkPJPKbMH4fFDHQZKXKo=','BoldBIOnPremise','Refresh data every 5 min,Access to 75+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', '{"Embed":"true"}', 1, 15, 6, 3, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName],[PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Startup Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5iajQ0dq78lOCZ5ESPmtVx65hUewBOV5O//h9z+C6AIksLcyU+9Qt0pDC4iYHH2AJJhMJiRaQf0PU+jJaglWlUFJtsqrR0I/RD5UrfWzJ5ES9+GJ+Lly9uw/dP2JHqysMCSz9dmCIXsI9NAhBnIpsGN48P99wGjWqohEgVN+cGVqKlXuxGt/DUUYNOzPcJjUK6yznNFlCR4sAv4scOh207bs2pcltg8wFqGHyOfT5dFyrqnBy40qc/UE0w1wKQHUO4WMu5OHf+d/4BxwBNTOMAxumdFQWdUIBohLjdA4CusAkTZ7v0hiX+CDrCSasPfrp/wTXpwvL/ZvCvxE30drvY2wiqwFiyCIUv69NMV6HahQ','BoldBIOnPremise','{"Embed":"true"}', 1, 15, 0, 3, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Small Business Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+HV/f1zD1+FSF82V9zEcLKJFZoRZSWtinmgIDTLioccxTeqZW//yCVQ5uAYAHgKCiQ7w30m12P/Wy9vwIW8Eb56q0o/nvOjVwsDil7s1Rc9qJHtrK1JZSnT39rXAQTrSezUV6BP6Ly0vgk4LcvPcU7vOlsCRzu7VPyCM5ej041Ls+9vZbMpyYO/yG3L2ziCgVl93sp+ypyR5wW6EkpE+PyguD89ZPf8SyVpScIjvXa4MBNe7azBnSwYagXNDcuESM3TqP96cMFYPLxU5ahi6b1GpkEYTjPTBFbe+dDN9xhxmVkqcCWYKvztN9PaOgyvUkCdSiN1AfYimhjXIoc0cYUc','BoldBIOnPremise','{"Embed":"true"}', 1, 15, 0, 3, GETDATE(), 1, 0, 0, 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Business 50', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/q1W11rNn8se8tqYEaVAGFZeD0Kypw39gMPZNGPRyq7/rJpS6l/thq5JtdFKBGwpL6F3ciVzyUKJP8IVuozE7ZQkw61FtXKXJ9pJC3iX6/yJRYveupiEOSulUB0WLPYPihcXo0sSkAHuQNZsAiUhFUac6fYLN1Dles/NdZuxEThQDzqpDBRnOL8eHGN8HoLxXuMf3evGyIRjWcnIvAqXgQk87UjB91YvI8RxmaH2o2jWlgE1NbJ8Wc0ekwkH1zseogMXufhXN0upiXrD7mxUblzt4lOpBZxGX27kvWHfQ0FdIb8L8CcjnkqW/2g4w4etuyw4NJufeGSpQyWpQU0AYzJ3Bzzk1n1NzxXIh8qm2B6pCA+ueqLkLjZLsXh8jetk9brPaTBVxhYEx+ZImGl5Bf8ts//zLgrurxYJ/t+LXeDF+0ClQiReCbqNjPCreLML2f7GVZna+fbFZ0yrQ9mZG', null,'Refresh data every 5 min,Access to 75+ data sources,50-GB storage limit,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial,Custom Domain,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 5, 1, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Enterprise', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5nERbg8qTskolbeNnIRgciiCrheYSbH2vPhsA+9ib8cawP6j76+xImpaZka89g0XPbicmVTRZfsP+8jK89cWjK1c0ApNIQb2QinN4Qv1HzvlYhtzIDegPbySw0zbbIZ5ByhlIMLXT6EuBbtUyTiEqprzGCSbFkHvEA9cb9Wer4YXjPuCbRQ7l9/cW4cH8XdyYjhQigESG3/xfwRb6PyE/69mTerZ4TwJpf+F/RbLJPgAPHQLfd+CjPqTf9R3j7SM+ORJC4hs5rMKQQ0LRSrg3RZgI37SpG13ua/nLtiXQYJ0CPxXugSWJsruP/8OgymC5uWavYR2YAf1bhQ/jd8r1yaagXJWAO2hFwvsgR/MPoQ8', null,'Refresh data every 5 min,Access to 75+ data sources,250-GB storage limit,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial,Custom Domain,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 6, 1, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5vCsYY3vOdx/pM15+tdbVKyHRV3xLv47isIKbVwXRH8zXV87K3ryrqs+pSoVj8jWRKoU9qB6xtR4R1Qxl+jhmvxV95H2HaYr/vQBoXYUuhOdRRumL9q+KMrPyG4bxI9oJJCQ0tUIHr0s4eifLytVgypZBVWtHdDbGF0xGu1t/pgPU0Uvb9RipPRY4QFXa64SIHt9pJmdGb/xyHrg9BDHaL7td46HhACvN9N5qYdWgqusGmt3BFAbQ7cZiWjoTvqHrOYa+ICi6VLBWafQvkyCWNgcpTd3gGzZLyBlQzQaVO7vUh9DfxrsCcOAt+M/lDctLrqwuiL0UKS6Q1Q4eOqBDcNcef8c6pqAUq+n7xesEUoV', null,'Refresh data every 5 min,Access to 75+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration','{"Embed":"true"}', 1, 15, 7, 1, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Startup Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5iajQ0dq78lOCZ5ESPmtVx65hUewBOV5O//h9z+C6AIkE8YfcDdCDtO2Hyt6HvQyi3wTnMcRI/8tT7POa1tzIq0Rad5rHLuCDaH9wOXb/I1mKZ5y1cIOi7jZ7M33m20c3l7dXLJuDk9p2Hzmw/hfqoTxEl/Su6Bl3XpUOyPz43lAKZ6hKmt3QH2rdZNxzceHjTsFqpRRL76Ufgnk+WszxA3+W7xw9qbFQKTgQcZalE8CHetsSXe9phLEBzjkJBvb96nqsaQDGkjH7RIqVL8KnxSa1cjg3yhwHNqf96kHzVOBnsQyq4QisMNaRtDLdpWDRKNNyJa+TXP+Cb8TudQLOpdCkKkAdJ0g+2P/jygkZDpO', null,'{"Embed":"true"}', 1, 15, 0, 1, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Small Business Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpieU9VxxB63SL3q+EsEExL2fwihFatgbcpYkig6t5MAVZDUdMEzNL9TK1JGmHx1kyJd1EBq1bNIHhP6OxHKFqbvejkE1GKhbZMo2QAVqT01HzYP+VDqWmYc/9H17f3uDXBoTw7DkyaC3CA2Y1jlJFyXTuQng/bUGcbl6QlrkBcojWyLa7RZ+zTtHnYOdOKvv70ZUlcH1ldl6NoB+0W72yjBVxx4GmH4SJ8eWism68Rg5nvoIDarQ+jw+c/OnrO+l1EHKgKjPeq7QL7PUR7d1527EzV5vL1j0AqFgANqSh3Yw4H1ItcXU9WBuAK/KyU22EQa/uSeqGj+IRj/18n4hFiIY/4b1oNIo/AOGzmBGlXPok3JbIwpL/2eL49OhTOEY2tkkaRxCd1hnMzFOHUWizqCBFfICNsIAVPARhmdnIE5+YJg6XfoG6jlcNLu3YsTRh5uXHW9XvECjHs3gKxubGt+HV/f1zD1+FSF82V9zEcLKJFZoRZSWtinmgIDTLioccxRhuKHribtr07sb679D+fDALgyiWUiYkZU90keagiNGCp0OwF7AgInUcl9KImRPx4ySp895i9LMtsn7fEOAoVMamJBQdVaEmnW2ezkMfWD2njAMn1hE1ZSvngOhpD4j/JH1jwTqknQYljvPcEQcXR9xc9TlN+q8JvQmifRoL+3Dh0DdAy+/+m2FMt2ORatS2gDCzojficK1pJobCbH015i7dtRorA/L/qxLJI9noLZ0dHFFulR/Qzly/5IBC/jrHfyBHnbtk1jOrhzixMLLK5ZybqNStNJE2UYiRu7sKyVRMcS5u8JtxYc8T/oNlffY00Q==', null,'{"Embed":"true"}', 1, 15, 0, 1, GETDATE(), 1, 0, 0, 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 10', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqU4tk67GR/okSoaPtBHsakgHMkqnJLPNkJL34MhJdpOwjlOlwMZZGCHI6PUhgyK1jR6zG25dZqDRSFjbj/nffezsLoLhsYH8S4wli1nPTOVRR6V+0IwSlR+s9Jh4BzfQYC1976CGwqF0wapx3+VO85K5neXcXxax6pZO/fRTv2FyIfUVSyWFbK1pUkOVpN536vaJc58jBd3P6AXDzFEQ/+tch4jYOVJINMei+WHkCzG8SvpictqXZ2Shq7J6qDE2lJB3j84XfkXo1BdZWTLPu1qhqNLzP82hVVzBJAN5ja/YwZjOO+E9NJrLjW3j6l3Mw0+itKSKOES+Jtin83w2KYAP9ro6qGjzdavylRa7R6GLB+QE14MlQSI7x16hf4jsvVjeO1yejyJNTknSBf2wpQYA==', 'BoldReportsOnPremise','Localization,Custom Report Items,Custom Data Sources,Share Public Reports,Share Private Reports,Onboarding Support During Trial', 1, 15, 1, 4, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 25', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqU4tk67GR/okSoaPtBHsakgHMkqnJLPNkJL34MhJdpOwjlOlwMZZGCHI6PUhgyK1jRmwxiRXe77A1eUrEYHIqkTmHkLvqbAD+sJOjxGl64p5IZyBiPHpO+RRjfqc56GUtK5z3oWsxOHMf/2WyaCuvYYIOnBi/rCFlaZw5bThY7oPKBMSUT69p19DewTnzVSlXeBXPdxhndwpYG4APT3IixBhqybhEESeOQpZicxhVvacZPlkHvoNx+L+ywKOiiWyt0alptE2hlinGQraeS8fP//DxUvHcvvX4we9GsePULxRqNbMYTHrtyln5C2z/8KOD8lVeAoMnVApMQadEOBiZIaIKPDDgzvstXoiBow7Ivn8Scanps0SmXWaHzNq/aSJJAlVMSJ7SM43EQdNIpQZ9oQA==', 'BoldReportsOnPremise','Localization,Custom Report Items,Custom Data Sources,Share Public Reports,Share Private Reports,Onboarding Support During Trial', 1, 15, 2, 4, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 50', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqU4tk67GR/okSoaPtBHsakgHMkqnJLPNkJL34MhJdpOwjlOlwMZZGCHI6PUhgyK1jRZd9JTlRNIseMAg24hiLFnlcZZH/eQOJNRD6qx4qVOlERJRKApyD9MuQlfav2wSWAp6fzSJ/iwSHx0CA5KRXQbzgZB/370szlkpV/SfVO0YCIyLehUsTvuZrbDYsIFnVy0zbHGtNiHf8d7V41zWCkDJgOmzmDOqQaHYc6Q39K85Rt7x3RwpKTiy37LHzb3RdXnLv7vwBlH93ojkxZyrizBAiD7GzH7sea7qg2m7T5oU7QDBpbpCy6T8718lt8z5bSdJBGLgYcmbv6RJ/Ee9jTYdWCUWiTTF3onKPIVY0iTAhRuoO2jYQiki/D2lAEUKXrLLksiLiOawHlYFSd420zmQ==','BoldReportsOnPremise','Localization,Custom Report Items,Custom Data Sources,Share Public Reports,Share Private Reports,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 3, 4, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Enterprise', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTeuRdzvb1QxXW9jiB9O6RnWxy5UzmG6cK0EhMjcaB8fpGiaH8HZ4/9uzGtOhC1OIxdC3kH0QEqMaZAkOPJ/q5D1iJu0xmlXu8oVhS7Tt9bnD/mVYjF5f6Lvm6wApq7pSbZ6S93ypvCQ2wtvxhSR4tNToaXkqSFPE7MxDPUD/xhB53tQ8eWBQ5wt4FBLD1Cb9Rg/TpIGn5fjJJqAPcvLKUbS/fnszqHaBn6EjpcjqHR1xypUo1QX1Ueos3r1bb7sA0svSE8jzpDqbcFduukaE4bFoCaeA8p2ZGElU0ylD6rPYcTe8pbwY7MDpPptfzp5MNw==','BoldReportsOnPremise','Localization,Custom Report Items,Custom Data Sources,Share Public Reports,Share Private Reports,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 4, 4, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Custom', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTXuiYHOaO26IX6H5ROhOz/udIYR+ogFDrjr4m/6SxgqjhQ+1wzkiPImXL+Ar74SNW7rlBJS6p08twrCpZlvEiHKZq0Kn07YPvPEK2rH8iPp21ryHomMhxpGNKm+Odi8+bjQKhEBR4PP+uyh60JCvPpOiT0e6Kw+/Tubba9LoNOQjJJQ3ftw+eq2FR+ORF8rvAzyfnWckuqckDk+sBwgO+9Y8MLi2a0AkMdRU5JxMQBPFG3utpJyziz4aXhNut3i3FFDpdtYOVyfkRj17ikgOjqa94lFlP+sdsqhZ90LCQEtu', 'BoldReportsOnPremise', 1, 15, 5, 4, GETDATE(), 1, 1, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTQX5JNu2cMfIeKt1jUBfm7fGOEbNxuakPlpWMBnk2piZ0DwBzGE6xKwORaNbmhltEgHGK01uQdPgvniOJ18LwNrJnQtzaeEyDw9qKedpX6jKAAku9OmILxStgz+KUZWKstLwkIxHEDMjrO6X/R3k//MYy0IPUNH3HzJIcZHLJdanvUljEjyUzzwEreoEm3cm1WM/dohT4ffDDb4j9kW8KTjki8xeDt7LFsCLUi7opT9prA++70XzB7vwfp6YxwYO8DHD6MZb4rJgpNYLtJlgD/wAqydcvEx/PG8jaCUrEwVWSd7kuyXPVjMFbb1f5dcvJw==','BoldReportsOnPremise','Refresh data every 5 min,Access to 75+ data sources,Share Public Reports,Share Private Reports,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration','{"Embed":"true"}', 1, 15, 6, 4, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Startup', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTR1bWir6SP9Xvw8vtfy1GRJyQzhofQwtWCmtlyX0WxhtEFnYxPzHcFglYpnUniOElcsD3HlCsS3mAXGVV0+/9JbmPwdWF80kg/8+lUKnb3nNzukB6/4h/FHcKQNNF/UbFpiNMXQddB/lixcBN0bEkPjFr+WwxJmAeF37N6RExl5WWClXz38BRud4tatIxzqUfCfKszClZX5LQrjIfpYs1FbuXeA9buW7lDaYpEQlb4Y0WWpf6m3wZH8U3yYtSroY9foGZyGNDkpfSRK2SpJGIqb77+TXXcEI0XNKqfhulrUl','BoldReportsOnPremise', 1, 15, 0, 4, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Small Business', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTSLnuEvIEHfaN784ntCQfy+Rw93T5R+kCAvoH5PHhy9gv1Ax/gm2Vd9KFBIJ+7M+oPUrramubE8eiPeu6rsTAt6qjLtm2Y5Dl5GEQi3BZkJ4ewqbjVIURuKsf2VNwN1Bj1yOgCsLl0UZQPY4htnQPLHUi33AtE5782rjy02YqZCbTUQ2MCqOnIH+NU1JCsDQA8JOePZ8Ow+ZxcARzETHzUwISQs0HL+fx3QbZdwTS6AzX2aOROKzZbROfg6CFLX02G1mnn1b5W1u9gyp55uRcKv3Yu3dt37EgAIPmqQ1ycHClzR+lW7LTmQg4ZfjrZzOGg==','BoldReportsOnPremise', 1, 15, 0, 4, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Startup Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTXNL6YOMokewe8B3a9VUNZ1V3WYAWe6EHXT5KuS2nNIEJKQu0KqPBPbsTpMZd5s8AHwkutZPZViu5N6jQf8tGJjzatBxS9pvxFBs6T7MSGMKx9YqKUEL/RZs8MGGaJtByjkxVPjn83NAtjk7up4DnIlGAGOIkFqBMW4/Q5NwhW9pg/BqgtYlqcmVf0eS4fS5fm/cEaKdvthoiEQv5ciq8r2BCbdEqghM/LwFQVFXvJv6Nm0YPtNW+wEENr9W0C4lZc7yB9LW2s5or1O2XgE39Dr6bKjF0+WfORbuKdYLOSzAOQi/YYoXWPOMAoijNaz7bg==','BoldReportsOnPremise','{"Embed":"true"}', 1, 15, 0, 4, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Small Business Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTSLnuEvIEHfaN784ntCQfy8zjVVLkWOhKQt3n4j/shq2RZ7arSJRmD1H8USTwWvzI/X36pK/2nvjwUk+xDTuXPLYfInQlMffd2DP0UA5UYyy3n442kw/wkiCD08lWkLmgO826N3qB6VHMSAFH0mqY8wYd8zSuyi1eDb564bMYhbVCQOIxhl2RSCvocU4baX9wqz5J292c5fCWstcoMxngto8MdL8SmLMa5ALxbfu3f+7x5OwRxrNvCxf/SPs/ZDpBHp9iy5G2xrWjPJyxd0JMn59VmILpCnOb4zZalhfSpLrlTPiFVPuU5Ea/gbiBdzVeAoANVZTSl81jllqni+3V5o=','BoldReportsOnPremise','{"Embed":"true"}', 1, 15, 0, 4, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Enterprise - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTeuRdzvb1QxXW9jiB9O6RnWXrQxSkriOWmMtC9/apjxpVmki43zIQI1WTlCZ0pUPFBlHQW0UTibH3X53rFRSdrDq03Q2z7xC6Dt8eAVNOBq1zEE18VhWqCA3/AAUYG/f+UJHw1L0VJA7SyErUaQCt34euLY/VBr29sTu8zs0RmPDrmWuefGl2VZX5sML7eKzQwyzOfCIh1Y+5znkaxcIBBk3G2p9J3QhsKSWxWP3ddzG4YgacH4ipIL/amDsG6CIiTpeVuEc+gWTrDR/maklL82iAU+81PboHZqIKsx4O8L05AjhwFMawIgMjSOYAVfCL1fLncvoWCa/ndkNHGVBs7Q=','BoldReportsOnPremise','Refresh data every 5 min,Access to 75+ data sources,Share Public Reports,Share Private Reports,Onboarding Support During Trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration,Multi-tenant', 1, 15, 7, 4, GETDATE(), 0, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Startup - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTXNL6YOMokewe8B3a9VUNZ3i/dD4/9r7eTKGs5wf7OqW+9aLUY2A1sIqpVpXbZvOdOVvREyTbVYWYxki8O+aXq3tH7Prv6jbGXeDYK6bbnYhTZpvnQoVDZ5cvzB6jDFLteds31VfTr+Bup9NkkRCarJ2hjbc+LbQ7dKm+FnATyesEfrk8aJhuL8D1K3PzLfNEffT6Bpnm7yLmV1LU66/P6DKwyu3AaSzhvbBv1cppnPIANkZ2h1+7IDSB24aUAtwuDDHx5n7t54I6qjGgDaSzRoolUn4VRx1lrFY5OVEcp7OV6RItrFBsmVZDb5a54uzMg==','BoldReportsOnPremise', 1, 15, 0, 4, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Small Business - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTSLnuEvIEHfaN784ntCQfy+Ig+60MDtrGPezXyWGV68uv2a+qBFDMXg+0YGxLzuIwwHV1SKnYvstYEfdTdwFIv7aPWmot2DNCQ2HZCWPSM+faWYf+HiwCh3FG4xhxc3CJsm6kZku6dEIjJfqdtZDiHnzQujfkzscLEsf3AMTwhnVzjFtSeKPTaXkqs3Tqnn/q7/03KmRNmEAssBVOuKbZH1RhXYB3ior4F0EynUlQHLvoYlV7TMeqDBVwtmLhzbgMlxjH6V1/rKbCwWxP1wS5b9FUuIn+WWmNMC6DtEY9UgKAgpzePAbyEI+MFs8Q6R3T3zT0+sb15DzsbI7rGQIKfg=','BoldReportsOnPremise', 1, 15, 0, 4, GETDATE(), 1, 0, 0, 1, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Bold Reports Viewer SDK', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdFGis8zSTKf+Nv14u7t8g9xONQ4VPrendYK7w1V5vnGpVU3n49gpEMiazH/72z6QLCWWiKLZ+MXXKpnKBcowdixd79wVouNatYndRZhAjEyanT3uMUBRxV/iPA+aok0SVfjoVTi908N6sCWHooBSo2V4O9E/uJrQmgAXaVemEUDdhazhj7riKJU5kV6xwSioeD7mBc9Ww3Cf6Hsh7VtW1RaDMDtzAY5jtY+eOT6lZ9M58COq0904NHGnsxP84UFfKYcHwdzl3ZHe5RDrwapU1WjGvGkiIKOGuS32ftxfgVhAw==', 'BoldReportsOnPremise', 1,15, 0, 4, GETDATE(), 0, 1, 0, 0, 1)
INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Custom-Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTRgDnU0GhGYRoHGtsCmvTzRwpbf2T4fIoKxbtQ8JT+y+hbWpnAB7PLOdsGRWWtVGguJEFEMBwKeVk7VF1MmeHp0GNE2fq8z5MIiFDOLT8chfB0Ivy/VDn1JQYwJXEB6fFgF9GGE8IyUraYUl1QBP5p1hoQ5UPk0lCMU9aL1CW7ejM02jo3Fi4UT3XvuEfCi1IieUVs8a/KNcK8bojQn3k/+IPiLxyNXhal2K8AYUUeTtSSAOrwgYvu7AEAzLneLi3N0G3lCnyOHrDo3j0pgwvQ13oOyO/fgS4kmIm0gH7SHqcAJgt5CAslj3D7qMi/1ZeQ==','BoldReportsOnPremise', 1, 15, 0, 4, GETDATE(), 1, 1, 0, 1, 1)

INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlaZ6433klELE9C2ksEgNSkUbKas8n/awQ/7tnUSvTFqmHPLQ+o18KSnsF7sIe5Qc/J6nkVeb7PH/U942NX/SVaioNSXqKAPBxE424ywY0gyh/flZxxpsjXWUFeB/ytKBkutJ5M4z/QT6Woo3g0lJy3XlQRRSr0712fNu+13qYWQ4Da+v5MYtS9brqazC63kx1gs/nk6UKXcyLzoYh5H9lhyPs96lcUYYzYMYPSHy30q3iIezoasj3/yODw+6HULaDRAPGrEosVc4MbY8KoZ9g+yS8oXB8VyVnKSCEp2uRbygA==', null, 12, 15, 0, 1, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Enterprise (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlZn719TuITRq/Z1r96U+/EeM1DcTkcwcJ1lNs/zZUN+RCfSDjAcimUe1oWHV5KfdQW8gaDQzS2Sl6EqVYAKNqbk8ub/UkzHc1JbAQQUm+w6pE9ofdbHMVC41fS+/i5Hb8aIZXtPvOczU0I89f1pehKDpdEiNFxoC5WRaD/U7mK/DSDptcCRGSyaq3qNjHmEtTBuO4CS+9S61paa+D7Yue0l9H70WGCeY//E48zuySpxZ9/1Yl7LLkyHHJkivIm351Bv35fpSs6xAbiOKtvOrOH3teRJ12S1HN3F/kvIsMJwiqyqSaxvtuvIK9QYaW7lV4w=','BoldBIOnPremise', 12, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72/LT2XgtyCCX7V9KlYVP94MXr64wqM5T6CGNS7bVzTyvypJihWCOtYGf9/NNlQwBZv5KqolljXGvN9hoBsSdrg3cPuvqZmcpUAds61tPX6Xz/LvVec5oi7ftTRZs2yLrAL/gyjXt434NC4h6sMV+cnG8TUmM7ugM2MO5BHD9b1kXz6lfgVfl82aKecuJ50uRzPQ43yOU4aKxY+efndU6beXLoHbxCHHfFLarBpEnE+biY6VyAV8fxuaExujXy4xqw1nwleY9gKWjVDrjn7Cg7ycJBYLJWx1lez2rv3nWbjDo=','BoldReportsOnPremise', 12, 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Reports Viewer SDK (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdEzh1oY/yzboGRRvluxFlFdiYIa4alGN8Dd12GZyL9n451Gn/JR8ausXm1QWpw9tAhUr+1WWatyw1KIBGxNHIYJ/5C9dZK56VrA7KtPBsrOiwbfN+6fe+4dqed1eZ/1bbsRyodui+W36FHqS+VdLxBFULpIs5vtvDnSlHWMQmQReI5EUjURodvSUHdzL20FkNoyF3fN5F3l8nSAtqbIotGzuFbq1vBuZdE5mVfG2Tkp/hvubs+zDaKtZ8toHJEpQGkMAGxkh0HJq0/EaRUctpssNi3RN3/b0auJNTs4NJLUPhP/N2JdkppTxKwfWLf9Ca8=','BoldEmbeddedReportingTools', 12, 15, 0, 4, GETDATE(), 1, 1, 1, 0, 1)

INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlaZ6433klELE9C2ksEgNSkUbKas8n/awQ/7tnUSvTFqmHPLQ+o18KSnsF7sIe5Qc/J6nkVeb7PH/U942NX/SVaioNSXqKAPBxE424ywY0gyh/flZxxpsjXWUFeB/ytKBkutJ5M4z/QT6Woo3g0lJy3XlQRRSr0712fNu+13qYWQ4Da+v5MYtS9brqazC63kx1gs/nk6UKXcyLzoYh5H9lhyPs96lcUYYzYMYPSHy30q3iIezoasj3/yODw+6HULaDRAPGrEosVc4MbY8KoZ9g+yS8oXB8VyVnKSCEp2uRbygA==', null, 15, 0, 1, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Enterprise (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlZn719TuITRq/Z1r96U+/EeM1DcTkcwcJ1lNs/zZUN+RCfSDjAcimUe1oWHV5KfdQW8gaDQzS2Sl6EqVYAKNqbk8ub/UkzHc1JbAQQUm+w6pE9ofdbHMVC41fS+/i5Hb8aIZXtPvOczU0I89f1pehKDpdEiNFxoC5WRaD/U7mK/DSDptcCRGSyaq3qNjHmEtTBuO4CS+9S61paa+D7Yue0l9H70WGCeY//E48zuySpxZ9/1Yl7LLkyHHJkivIm351Bv35fpSs6xAbiOKtvOrOH3teRJ12S1HN3F/kvIsMJwiqyqSaxvtuvIK9QYaW7lV4w=','BoldBIOnPremise', 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72/LT2XgtyCCX7V9KlYVP94MXr64wqM5T6CGNS7bVzTyvypJihWCOtYGf9/NNlQwBZv5KqolljXGvN9hoBsSdrg3cPuvqZmcpUAds61tPX6Xz/LvVec5oi7ftTRZs2yLrAL/gyjXt434NC4h6sMV+cnG8TUmM7ugM2MO5BHD9b1kXz6lfgVfl82aKecuJ50uRzPQ43yOU4aKxY+efndU6beXLoHbxCHHfFLarBpEnE+biY6VyAV8fxuaExujXy4xqw1nwleY9gKWjVDrjn7Cg7ycJBYLJWx1lez2rv3nWbjDo=','BoldReportsOnPremise', 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Report Viewer SDK Custom Annual', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgxnm0pkBuOfgwNBP0FYZiADSd3IHutvTo6PvNibpnal61Q6y5k6HCE1OGCVq0KvWLiPYAWnWTjSmG2ohlGTWdZKxoJdcWM4c2ioBsmEAwVPhO3I3iDc8Gr+H5nOLq2c39UfRkRkQ+AHwzhKh/yaOAuKxDHxOIPGU/tXTCORYu/1umUvfPtLJGHxAM/TOP21HQDP6b+w4pjYGPsRHzh90Rm5yRjOdocEhHNFUiU4hedGd8FD+xyAab1wmaIOC0JfBRdLGkOftp25MluhW7KWO25c1X4ipi5RUinumXlPRufo5kLCtPRyNFrDoM76NuZrgtBm/rX3mnRDVoY+LmyKhzpOQvMBZk90CzL/kA1abys/FdmWXSgqNoRLl3ZNaXdUIFTOfdw3cGc8pwH012h96jqHNNQuMR4JlPXdB66otNLTA5QoyHEo/AoIJHk/eDkHdlI28/ib75NKgIVVFX1WQqSNt518iPPZxZfzoglonSQgN86nWakeQUVjp9aMDpWfcjG1EE59N1MQHrN5G/gfbSXNYCK+rr0jE7l4xsSu9+2taDGkn0wv1ID/WEy5aHTTJ34QnC4Cd3GRyE9X9fx1Rl6o+DRvQtElmnunQsH5wliMyiM+CBWqJg3DBOml6PSX0Xwyyr7CcDIrGN/BG05VYgH7GSAcCzWsFymY37xZ4WyMvcg5ILGBOLL+oQ5Vx6iF/EBB/UmfF6igGLFOHnzutsP90mQedKrPmfGeEY7Vu4ZCCs0UtPj2JLm/iFiX2fXXeRDRg7A+d2/Z9GEyWGLmf4k+5pmAsQS7o2H87V9gXuX6f984ee4Kp4CZ6z33CijbDeFZcZ6+68U+VAdZSDhKu/ew','BoldEmbeddedReportingTools', 15, 0, 4, GETDATE(), 1, 1, 1, 0, 1)

INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Cloud Half-Yearly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlbcrtytcG2txWBe3ubPeigVGMzInR9z7nH1HM13MIi1qXAMLUSbTmVSO+8EEjDxTs3swsId4ZJ7U9O/Mk9IfY9rP5YMhDTTrxpqHuaxuJBLvD6Gg6RbUp/ZeVYatPqTdeYTh8d4nFz2FKW2c1OSDltXLqq3j5wsThkPxJW5m+11ferIPqJeq1RX45LzGw10bqyO3AM5SgW7DfwkuQ2eGcZ6+2kA3iH8inZ1OqjljYheAGvUc+QCj9zKim3+SNPG6ylu97CxYtI9TR7CX6vT5DN32omP87r6I6927u0nvqm4U7jRQlU2kaCvUP7qg/+ZhwQ=', null, 6, 15, 0, 1, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Enterprise Half-Yearly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlayRBfrJtrl+NLav7ugjaAWWPmtsR7e+h+olCK+RKk/2F3Rdf2aQEe7oy1mHY9BnZq/jOJAP2UWUkDwiY4SVK9XBe3mhuG8t9SGWwM5I7NKDMf5ouHFvCPNAGJZRHp4NCkPyfLaEVFLEzHsFIm5uj1Ds465LH4aJfPk1JDiq2nL9QVaidtQyKQ8sueSU9O9tGw30iY97sASwrDNHm2hob8//9YprrvAUNczcTPuHlAK5Fu6KufSVYAN6RptwjK2KFB+YpdtU8bqkJFMy+T2imn7BfzGr5EKCLtNVr87rXofwRITt76S7Y4oc42FIb0bT54=','BoldBIOnPremise', 6, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise Half-Yearly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72IQf4M9n5TdQemPPwXL5Yc57gPFZn1Fy6hLqnwS7RwTfFld3TnvhGKABJi0nncOMVfshYNNb77jAv1C8/O/hWf/pUstn6F0gQALxMh57F9jiZ4ldBIuihd9srpkokrygAJPWuavdYv+1nOPE7HxPCRPZJqQhYIdILcRNRN7YfgM7GflQHAkjH0ph0GAWQwoO/pZsHjzY+yk+2BiK1cKsB4bs3oHfZfZuUY+Bqo3a1SkR9tYBQnNLyRdWswWSpWu2w8BX0Ao4S6FC0ra53gG9IGamTXUtvDI1VYsls9kVKe9JHFqOd0U7wJ2IpfSr1oYuR', 'BoldReportsOnPremise', 6, 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Reports Viewer SDK Half-Yearly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdEzh1oY/yzboGRRvluxFlFd4e9libWH7eCiDu1lrZr2Bz5cfIlZNRFmXQTqCoLA+WIz2m6VhGUuuSnNDkgswtvZxDVggRhQZ9hYP0SLWN0dZNjuHZRpDB3KgcJTT/fgB27XoTgXGKvRobREMFXyzbVVoAn6Po5+iErnP3jw7xCU5Zf7V+YikrCg+NLz7TaOPhtB/LVTQuaWUW5s9/vFuRXcbpNT57YYRjBKniuq0h/1vqoxA/ggkusCt5jg7ogmDKquHduTeH6KeK1UdNs9tQCAq9YArR8HYEdl8jhvn7kSH4ghqHUtR3adOo5/vQ8D0aJB0w102atK3hlxZddJ04RW','BoldEmbeddedReportingTools', 6, 15, 0, 4, GETDATE(), 1, 1, 1, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Cloud Quarterly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlZTgo40ooneiAcoMjhqeglxiYPlhVNLpy3RZxgEC4IiDKcMWJ4ehsuagu5nDRzrxHD+i4x36VHLKWxiAaJ8sZB0ImjONCUHkqQxOWsedzXSAPqrenFZNMUKHNqdUU10DUDHs9aWJ2j6DRpTGHj4ZM98vjHmHGpA2kZa42snPXqd7Q6SXTJM5gxjJ2EXzVusUeJNeYM99ZyZa9LEu3sYRB7OQ3xrw6zyFfF35BmYDunLB4J+NfSArY8LIPD9HySquPl26tLyuXf75lHmQooWT9tbUHEa1x+347FvOoYV/2LqOfiqXZxDAbo8myaV1ScBCmk=', null, 3, 15, 0, 1, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Enterprise Quarterly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlZgGNC3PPzwZtxfpa9yCMyFh3Fgz4BinppmzeoDFW5r8oQkW7lvlZ3Yc9UspqFXRVu3hVZgwRh7vN/xDHXTlXiBiXi8lKVOYUXCOdfA9IuxLsqAq42Usg5HnbPYSE/g4CuwonlOk0ox7ApM9QdZlCW2RXSmJfxIDfMFM+JtH7LUv9NcBlYgnIHjXG5Fa/Nma4AbrTqVVkO6nOxEAMQWVBsJnm0/5lc1h0xJ145E6aG35+EnvD3iaTG/FOl32YmdTHoiRDnJj3ljF365IgijAgEf1Cri1A8N2FGgWnKui4e020eWaMn6XoVv6mxmaeogqLg=', 'BoldBIOnPremise', 3, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise Quarterly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72iq/WSqvwe2nrJs53W3o/9j89S6A8KjNUmn4eaKJL8BYaDAUon6IaQqqHP7RgkmcBECCB7/XNq8yKJD3l742aHmg3HJ2dSLLjf9vgAV7Z6FzV2rj1nL6YvZqBKMQq2IxYCL1Z2kxZSvtsqWGAzwu5HWlKooNs+47u431hxS7sOdoArv/MjaiScgn0+YtMNP12M+tRDca71XqmdgNuhdiTVGrub2mdlp/+rLxT0uK9sTQXqEbb6N/bgoY7Af87ip0he+gbwVjh+6U3SaD4wg0kOBgRu6H8HYYQeQECY9aqtQUPMIFNSTmt00lssNSwvPNb', 'BoldReportsOnPremise', 3, 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Reports Viewer SDK Quarterly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdEzh1oY/yzboGRRvluxFlFdK36qUB+bA23LnhM82cKi4oJs+zGO7h1P465FEAo0tXgzeysK32JLvuYv0tiIn1EqDQNN9+di+3nws7mwsg09hzelR+WfEqpFd5QkcsxWS2kKQTOuyLrjabAKjd+4LysUZlfrnk3+f4OC9rcmFwpCGkOaRv7jSJPeqzqOWWCBySWnohC1NwTIAyfUtpKrGlBIG6ZrJuvbaiVHYM9GUn/Yi6YHqYSBdomt64xdteh5aWD0FMJCzTImtHHi0aUWwE6zSglGqdVFN/H9xCVxHYV9vGtU1XaUnPlzFQXqLAxzSldZ6BbgoPPc2IRnbsw+0zxZ','BoldEmbeddedReportingTools', 3, 15, 0, 4, GETDATE(), 1, 1, 1, 0, 1)

INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Custom Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlbYTmqepuVBchuMlBgiDXIfX+kpRcv9/DA7z9WKanNo0FeV6xm4gbLWhDCKFdqTthuZK5jKdoaRYTGsrgU/NeyHGL12gkA0t9kz5TevFwvy3PyW1+WzBOKIluNl8BLz01z+pfkUycasTq76VN2Hhfi+4AR+OSX/f3o+to40XolYsi3Dovz+6ANbig+3VITy5oG95BEsiwZSou2ZXVp9wfv8INEWpJNIi9bFsusUzU2pY1db/wP9eYNpcKuWp3Oxn/7GmgALEb+CiAdGfJ/VfnapmMFInQanF5fWqcaJ2PHcUw==', null, 1, 15, 0, 1, GETDATE(), 1, 1, 0, 1, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Custom Embedded Annual', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlZcJT4WWpVxU8sZq8N70bPcSwJ3KRIvLxVi7RApI/5FKH71UZsgZQwLdRtzIq89bxevfnswsL1+baKPu9O7kCimNhJXXM8e1faBGX/aVTzlcD6AX7Vphg5imPcoFNGSz10m0FosYgIGlZlXX4V5eT45YM8E5FUFglwE1qZ0JqLxPfJnYMwO4OloY52Lhx+G+SvgNhJvsG1gEqRt0PgK9Y3i1iD/ilhmpFYh/F1uhfZpu8N5E7GWlEUtKFjuIygko6wUcLKxTicztsMGmzHPkg1YF+3veCL9JAPwSaz4TTgudkPo2DVnVLCofCssJNUFjYM=', null, 12, 15, 0, 1, GETDATE(), 1, 1, 0, 1, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Custom Embedded Half-Yearly', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlZcJT4WWpVxU8sZq8N70bPc1l1Ng+ZmI2jUimJDtDhuRrMBi2zZF95Ry57kBtmge9ax5xC7U1dHKtvoqDPnYYdOAoWuAivf0vo3hxwIg5s+I7u/9icG/TvMNz3ClUxkreZdA36hmTpjlF1YU5U0R8SJ2tzs8vdomxgEnQLqLHDWyWAJre0eGV0J+8dFidUn+9qD/N8R2woW+imju0t4w/HR0Jfo8zOaj8PuyDF9sDwwGXLFpcfiw+X3HUk6E8tg5vBZpbSPlKd3z9w9AMu5hJbZ+uVs5wJLuOzP33kqUnLSGlSANfRddEmcakz/xSSj49M=', null, 6, 15, 0, 1, GETDATE(), 1, 1, 0, 1, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Custom Embedded Quarterly', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlZcJT4WWpVxU8sZq8N70bPcbcKiQthKTaRB6cslAxQnxrhnqjTQPlpvtKLWQk9icnJD+MkogI50GTPICiFxSBTtPAmN4Kd182eZfal8xVTn5KkfPyqRR75UoFuJ3N8536DiSWJWpBN7yrR4oy19pobwqnAmqYjYUDbNmHvdR0Scw6WNV6TJ6/d8OT93MKaTdgCWb1ekBi3BQ4Euik62DMW7Unu0m79VtDYWrlcfl8MRkrQU15B5vi+X1CvmoWa/WGuPVJ9DoMOK2USRo2CKyh5HIYItUtbF1Wxj6U6Sos2N89qtgUnlh/DFfAcgQdVI3fE=', null, 3, 15, 0, 1, GETDATE(), 1, 1, 0, 1, 1)

INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Embedded Custom', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlY6gWn2RFAFkJvLfFEYveI9tTEMpANMVMFHGXKJyM3ZHbCZr6EzfHoQ8TIvnkHrzbRs7A8lfMdeJJIFwghtPVNyLwMJwnQOYP2LZTa/UcTDYR23Vz3Y3vJhVtxLgqfelhNP+03dKDx6GiR1ZOTYUxi6KMEH9QamW/T9hFkkn9/MiTbRqd7mg5+X7jHx/CZKnvz3W/t4PfiNSx5WtItJUmoe5sEu9YCGvW4HYIczLqnmwzi1xAkV7TDyJL8LQAFXM64dXfjkjSY0AKBwFDu19oDJxNf+1sU1PvsZzLznTCCHZA==', 'BoldBIOnPremise','{"Embed":"true"}', 1, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Embedded Custom Annual', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlbv5IvQO2QiaXPcIQ2Kl0sTfacQnl0QQJM5vZPgw7stk/Hi1q7Im0pVKh8BzhIdNyndxMuR/7+O58FqqQXATvRm1un4oKsO5pjDcFcP/7kvbw1vyCkECbL3OYkGLtrmX13HmYFjv4wwHtH0YTKeGaMbm5si4oK/mvGK42cLWYY1spxUrIODSQwn3QQ9s+egrxVwX+nac/4kCjGlbPq+cQQAndah7vMGhg3AgEZIAZHNM72x6AZ4TPWd2Q1o2ulp0Ynd07kwkkhp6LipvxQN0NoMyCKegWu6x9o/eXl7napzgHzMvSBbVA62ZhdXlTPearE=', 'BoldBIOnPremise', 12, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Embedded Custom Half-Yearly', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlbv5IvQO2QiaXPcIQ2Kl0sTmOnS5Eo+PeAJ1GOd4i8o182EqJJ6k6LPjcuDryAp6LkzgxsscAVFQtDIZek+cot6MC/iEK/i6PfwNv1D/rjvbYzH9S5aUAygVGFe3OhRWv9AuGaxPHdEzz+SvaPIq08tqloxYcdWNa9RuGvZS1Z0jZkH2aArO6MgrUhmkR2wSOFp3/auE1A35egAE/DJ9KVgqlIrFcyfi9tTbKCbw1ASVvWp1lVJRyqtK/NgDLbEvmIJqD+wIdagnlYGMlLc8koT0XZNCQNoBptN+qDA0rJeDKKo5HzAKyAkMn1CDeLwNdI=', 'BoldBIOnPremise','{"Embed":"true"}', 6, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold BI Embedded Custom Quarterly', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlbv5IvQO2QiaXPcIQ2Kl0sTyrC0kiE2zgzAU+o4osFK56nZ6JuDir/MVopz227AK/V61oDqPB4nvAutnkLRLdqQck17JKyAh0kdpcRnquba4i4rsNwlN7PtuzizGL3tBC5vFknb/7XUrQaTGQ4x5yAPOcnKi1dwRYsPzCccIRCIozeuDy7bs7p88lpvUFuZGAWaOturK4vtlO2S4KeJbVtT0cRZHYWvf7NNAhCkTi4zmSU+pEzSeFIZqhe7qlwP2pqgwYgPqG1agYfYIszBlF3yRbb1Urb2onNVJNb6IDrI1K3oyKN9YU6KAc6SCn9djWk=', 'BoldBIOnPremise','{"Embed":"true"}', 3, 15, 0, 3, GETDATE(), 1, 1, 0, 0, 1)

INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise Custom Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72DWcesbcGl2T1dTg9vRZBcEvzQndVYZP1R5sG29BHnDShE64UQC6sUxLoYwmYkpWyZAY3LXMdpc1A0QWHO8pPLEBj9Z3GGIGBHHNZmNvUFFzfEElY7TtfwMA6L/GXbgW3Hz88FkQ3U1PpvbZDOtFIr55qvhDJ2Df44C8Q4A/n35wU+K3WF9gYhuyfGYhH7eu744LnrV6Ql9a+TAuRl9MXU6IQqZc4NXji6cSI0HNPHQ81hQfohFI0AV+kZHmEUWYHzlw02C1Tkuf4hw8CragW4nTccXOsdeDpvHQWkOPl+j0=', 'BoldReportsOnPremise','{"Embed":"true"}', 1, 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise Custom Embedded Annual', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72d2foW0omyhnepZ0Hq8xUa3FbD61cfHxOcpXpQ/7YR4+CBQst4yG6M9mpg+RB/ZMcxXfwwqkwhAsOFJe3bnb67KtKhUAlCn+TdIeOkVU1sDUb66LNp50vbxRs6R1y9GyKuEx4theoBu9i+REju8wtUc0UqXaMegoM33Ny4tUwPPgsAjGPsEoyu2mK8mMVXM7yqOkKGO4oZyCtLNAWlb+x5S/oJfwS4TFGJ+JkAhWRNp81nhw8Uk6n+1cYb8sfT6dQihIOzHLcKKS7ZtM7scchxGzqg9SIliSqx+CwQXiwXV1z8eM0dsoC+A7XH2CHPaYF', 'BoldReportsOnPremise','{"Embed":"true"}', 12, 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise Custom Embedded Half-Yearly', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72d2foW0omyhnepZ0Hq8xUaxQdVYQUrneY9gAB1vgGHICIt5S05X6yhIy8uaP9l9kNyW5f1jaq0SjYzHqnU6U5aFCH+joLtsnYfrOE0quIKktYvPZtKHCurA1BIJ0imSbBTWa0T8ivgsvRMX6cq1jjBm3XST9lPg4rLLw/H8LvWu3b1nvYDRp45YxBDvc2/L+uYkm30//2y/9yPZ1uK7WRsKXovKgXzp5WdUC5COYQQBqaubHujS6Lh8Y80Dl9V0G9eJ4ZP7t+grG7dJKDGcKphOikF9BNFDwvrDJ+Vs0ROjviay5JmKEnTcd/XdLSkpJJ', 'BoldReportsOnPremise','{"Embed":"true"}', 6, 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)
INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports On-Premise Custom Embedded Quarterly', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72d2foW0omyhnepZ0Hq8xUa/CdHNm300mNoLHsoq6xaPaiUZGUieLNlNNr7SMOyDgUxdVLKWl8b+8ollc+NdP0Tt4JfYaRHl3CeWzItOBhNvRZM8A+WMDwzfTJHTYzwTFGMGVUFYeMeH3lVhdXVfuUvUcBb0WS/v1+9ACLpL6WKpcaprQOaAh8WqCCQeTyMKk/vJtCPEQwG+EUpNV75ij497k+Vq8LYJ2Ad61Iz5vEY5g3Z1Zc0sVPbBP2Bh7FptlYNxmDM/CNiKtOj4Uk9rf8n9bG5ewB1+v2xCeps/js7N4AIlEzPEd2EhKH34QEzVtQ', 'BoldReportsOnPremise','{"Embed":"true"}', 3, 15, 0, 4, GETDATE(), 1, 1, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 5', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgxnm0pkBuOfgwNBP0FYZiADSd3IHutvTo6PvNibpnal61Q6y5k6HCE1OGCVq0KvWLiPYAWnWTjSmG2ohlGTWdZKxoJdcWM4c2ioBsmEAwVPhO3I3iDc8Gr+H5nOLq2c39UfRkRkQ+AHwzhKh/yaOAuKxDHxOIPGU/tXTCORYu/1umUvfPtLJGHxAM/TOP21HQDP6b+w4pjYGPsRHzh90Rm5yRjOdocEhHNFUiU4hedGd8FD+xyAab1wmaIOC0JfBRdLGkOftp25MluhW7KWO25c1X4ipi5RUinumXlPRufo5kLCtPRyNFrDoM76NuZrgtBm/rX3mnRDVoY+LmyKhzpOQvMBZk90CzL/kA1abys/FdmWXSgqNoRLl3ZNaXdUIFTOfdw3cGc8pwH012h96jqHNNQuMR4JlPXdB66otNLTA5QoyHEo/AoIJHk/eDkHdlIrbFwEw01MIWqTDUcSHCrG4hvLp8djt9WLHiRj8FV9MDDYDelUGSQKNH+YEbhQH204UU8T0UUBypE18DszW9owr7Qryxv6P6dkW0pDKxMY6njW4uNph22/ukDeVk0OJiJR9nm1pZb0VG9vzXauZmTiUWdSyL7wgJCDcK8L2TPK+6fJVqZ4EdpoKM3lLHl1mmrj1iEd4CmRo4Rg/f4F936WRMjik24Llq7ehAMASRVRBHTE9CZLWi7+6D6OxEGz6c+d2wEilj8F8+i4osJV6XW5DG8qEN02rzsVKhmlv8Ms73JZLAS1MkZopj7sSa8g+ov0tSEprxm+DTQ8lG1ResGfQyIar/QgfUB/gmBcoawdNRpoUCjKMYHHjqr7wuvmajO4Loo+rTkdPtTM2eYUFuGK', null, 'Web-based support,Refresh data every 15 minutes,5-GB storage limit,Access to 85+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding support during trial,Custom Domain,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 'A starter plan for business teams of 5 creators and unlimited users with 5 GB storage limit, 15 minutes data refresh, and more.', 1, 15, 1, 1, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Premium', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTZuFEU8LDj+30iiT2n9wAGKdFVv6ap1+5qrslumRzTCowTVhyeHGvS90uLdjsrqX1MJ1znkoFMBNYa33yWXQRO9ogM9WLNKRIGbVM1uqRd5fCdZlUdmVKZG0SLJ58iqtPBa9HxASyy7XMQC9gnqVeTkb+onUyGYUyXSqdvJVWCMV4mEeoF5kEAIfqSdNseKPVZMqhL+sfw4oqwJTsm/gQycS6ksDErruAlWY6kCktnFxfe6iFj9/r7S4wvjqp+J5rDFRUxTJNrEpy+2KHPLX1ZlYLQYs0K2sd1E9jhSnop1XPU0gecyuqknbu1Kf9u818w==','null','Refresh data every 5 minutes,25-GB storage limit,Access to 85+ data sources,Share Public Dashboards,Share Private Dashboards,Onboarding support during trial,Custom Domain,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 'A premium plan for large teams and organizations of unlimited creators and users with 25 GB storage limit, 5 minutes data refresh, and more.', 1, 15, 3, 1, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Single User Plan', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVq4fHZvhb3cEukmvW7eHhpSfoqD6iOGN4ylzxQ44/W5Q0AbWBWD4ZxSK9FduvXEGecMiFAfKHs3fO8zN+ZI4Ixhykev1HHuRYb7bxes1ASYW4Qe+uO6HMHFR2oukZORifi9hnRfnY9mA6v+QvYJKCe7juRNZg74jKIa0pqDo4bu04Jc/iGqVIhKhAm79q0xV5uQVoeuCxQLOfq0LCSc7w+si2Co/T/eKfa+RKH0HzSajisByg3LCA1tn7cIlNJoxDdw58R2SWgsHtWfM87Wo8ue2gfSVwZdiDM0NypWg330FkDLGfTkwZViL0S9akDUGZOYdkA97SfrH4UrqcVRL15ruWYMtm58FYOCPcKxQnOQAP6d0SO15d4G3fpFWOQKc+I16heeZ1gdzAiI/mD1l/kdY9/jjM4Hhc9j7tYION5NE4xoOrCD2a62souULXaui7XJJ+TGp9KraX54b8dKorBdqxOAQr1JN/3TcoFDiNKejw/sLM+uVMksPAoWaQKxh1JWiXahjzVV6hqEsdl3Ev38t4TMAkxNMR9x2L9EVcPgb37h9zYtCPYjgUnV4+41vi0gZ4sK38860E513mLy3MkTZ9z6XyiOhSVkS9qxO7D2eaA3l0+Th+iXQegaC4Cz4q3JdTGZavCUWTP80McMqc41pZciHD3BQZzF0emsltSthGaZlPw6ED2PIE7I5DmXuk=', null,'Web-based support,Access to 75+ data sources,Refresh data daily,1-GB storage limit,Share public reports','A plan for individual users with 30+ easy-to-use drag and drop widgets to create unlimited reports.', 1, -1, 0, 2, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 5', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqU4tk67GR/okSoaPtBHsakgHMkqnJLPNkJL34MhJdpOwjlOlwMZZGCHI6PUhgyK1jRWgO/jLPpytIH11SMg7ydV+w0Hi0ZBpDW/CgYZ+bXFZQg4Z9V5ZYtrSbkP4CzwNIpYlSZE0oHQQc64CEYF8RIt4MJnrXT0A7c9QRwXrrlLj2inHN4nAkUv+kWU0x+POkKApeyAz8S05DszAdDL3npPuFiXxjkmNGkxINoTIJauzahd2U12jyZD1/bF0rVOMhdU88oAEO95wPP9lfVjojtZxjtCKFIu8zu+EawRQeHPUziIb/XqJ+aP9HZsPRoPBuZK6DPbZB+D81irViLCTR2E3bhTjsjn66WVOSULIwu+Xvzf6KNMA9MXf5R2dliXoRIBcsM84Uu67ToNQGv3BAai9ihIHkajmU7zbbdP8oPQeU=', null, 'Export to multiple file formats,25+ Drag and Drop widgets,Web-based support,Share public and private reports,Onboarding support during trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 'A starter plan for business teams of 5 creators and unlimited users with custom branding and more.', 1, 15, 1, 2, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business 10', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqU4tk67GR/okSoaPtBHsakgHMkqnJLPNkJL34MhJdpOwjlOlwMZZGCHI6PUhgyK1jR6zG25dZqDRSFjbj/nffezsLoLhsYH8S4wli1nPTOVRR6V+0IwSlR+s9Jh4BzfQYCSa/fgMKAl6Gy0BFNosc7rY+vxEQaFD2a/AUr95K8JcR6wenFNk+BZkSoDApP4IIk7Yh09MTXJ150tVUcHfbssiOLVhVDOT38dOnQWDeinut06TL1DfN/+Z7RvEDELU/xuhCDU4SG+a6aMRzYB4guvm69MFqjE/VlBZm56LvJaP51RKx+4irhnbT1Y+YiS++LT2i/ZwV7cWOIJIzd4FiscM5w3zoOxe/47/9hw1VfC/eUoJ7jDjWBXTXfY4TFUOOu4Nmdz8JmLQNY+cV3yihy0YEYYkSa2VdKQ9YbdKsQsN8=', null, 'Export to multiple file formats,25+ Drag and Drop widgets,Web-based support,Share public and private reports,Onboarding support during trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 'A business plan for teams and organizations of 10 creators and unlimited users with custom branding and more.', 1, 15, 2, 2, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [Description], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Premium', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTZuFEU8LDj+30iiT2n9wAGKdFVv6ap1+5qrslumRzTCowTVhyeHGvS90uLdjsrqX1MJ1znkoFMBNYa33yWXQRO9ogM9WLNKRIGbVM1uqRd5fCdZlUdmVKZG0SLJ58iqtPBa9HxASyy7XMQC9gnqVeTkb+onUyGYUyXSqdvJVWCMV/s/Ez43XN9VGHY+hpYKCHdfBL7iIucDV7TFNvKGfK0DHChKBfrZJ9lg9/kA0rTtwaN1c1uj5b7EYuLiibp8xDrqdXrSShclKcXY8TXlh++95x2GQxlnpAAByDmbgGkVJmL/dGaKmUIfntaiMgHniTA==','null','Export to multiple file formats,25+ Drag and Drop widgets,Share public and private reports,Onboarding support during trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 'A premium plan for large teams and organizations of unlimited creators and users with custom branding, and more.', 1, 15, 3, 2, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Custom', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgzjVR9TTeqMcZDzNi8PUcl8S9L30vto2eVpL0pHlAqVYu9+RWpGIj1SdTgZS2abXGqJqtoTb87jqblB96+npLqViUSet+4zm4UA3r6SuITl/cwZB+0X8QDZHW98wPu2ND0225jjv2dQbbmt7Pbkl3NlQOd0Kug92CxGYjmrhlo6U98yGQUTfnQZ6YTWemDbvEMpDpdbX8PVOqqup+e3pI3F6TnUkt584QD+mwcjhJFOITNaHsUk2HT59eWejkcC8C32LrGJraiWOi64ktlg2YMqTfLQBEALz3fklnMokJYqXfZpfbX36CXswoa5OQXRstlOzi0dHfalV8DxCdHlquUJZwm7nM6YR1jGrf5Ppbg5E35Nz6IIhj9gHS6gY1/D8C5PPk99yKPYiGL+zYiNwqhn9vDdb5ByfigYKiIKOtRRrR+TdoU2To/ZcEl5pWy3HV9REx2S8KNg2qB3QH0G0JVbdGnbeIgVfIm50vXIatCnbznYWSLFoaQKSbBUTgV/yHP4XOwvQpimpIJ2NCMruNZkGeFp/NdGBFiOKeNMaCVUBR+KXWeiwAEzyk5gqBdwsFQ71YoP6XyyMcgMHLl0h7BNSPZ7LtZ7eOjCc76m3vBnHeMlGZoyK0Lx1kBjiYNmoJgm1+iWBqFt5JvjZ+u4WLFIVmJPs4dFyHs9dDATwM69s/55ZqXtb1rrMtqxUzbYRJw0uVUSJ6zwCz+DCfiX1JeyNgdJ5ASscWZfiFG7A4zFoYun2cWUFIP74SxdA/HLOj0PdYuZwTNykhdbjzKgLrMh8Q8yV7HxguP+NsqwGx2LF75SkAz/mr8ebxLYKyQ97KPIBzntxEQCCnezBNfwh4xT9ldwEU4+WNOdknyypbz46eTvQ7Ld4ow4Al/RjsE8oIU=', null, null, 1, 15, 0, 2, GETDATE(), 1, 1, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Bold BI Enterprise Standard', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlYpW6UC7Us8i30kQxV2MKXwYrJzWxBg4/edTS5Qnig3V5rPZ1QyZsnmPO28VO9tTyZl52BJbJt0RxMScUVhIzqxsbKfmu9iB7ugUHH+oda2093572FnBARbdX4OQ5XxsOf/va2QdLAaJXhWo0z5IHY7oJ16STAehGlKN9xmwNBX3QxJcFZQu6OWQhG9nMVYMj68zkSDtswFUmU1QxDaOLzk1IjnGPRo0bW7kAf/jbgqi7k8poQRyc+0C1WN1opqP1YJoyXyYEWhtzKwlSSRRJQm0FzhIh58lf3OUKLZszpMwM5PBwV6uEoIPIAnExTpeHE=','BoldBIOnPremise','Access to 75+ data sources,Share public and private dashboards,Onboarding support during trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 1, 3, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Bold Reports On-Premise Standard', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdH0lN4e9YSrOWr8LYgiJK72fTZSPpiArO2E2qwZYARn7NbJOve97vys5mZtgrwRcr7R+RknThkBmWNknKZWAp5ArDCZ7QoANmxJss7m36YgWBhlmfTkgHZ0sdBxVkPNTr938nHZoeVnD1t7bVwSVuwZ/BTxOB6O3n4/2190g0gHey0E61015V7yScfG5Z7R6V0xssCRRYyAQyzDDY4diBE32sqfEJT3/QMX3i6ZBVR5JEqZcA8rhI6beotXqN7j0YnUlbpRy3LrPgycgGSTqTOKY9Z/JU0A+Y8z8LaO1DngCACdDrixstrNzQ0s4r1hHus=','BoldReportsOnPremise','Localization,Custom Report Items,Custom Data Sources,Share public and private reports,Onboarding support during trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration', 1, 15, 1, 4, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Bold BI Embedded Standard', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTcBZykDiy0KRW9rVEx9owlYc2c4MchbUYUkrOQbldiLzAsph1GcZd/kOhIye6hmVeRvSZ5KNJhXWc0axq8lbIZlofS7UNv9E/1D/DQyyYGJ59AjPAXP/ynV8qu19+hbeb6UYdIzN3ubWWiH5yUud89f8Iwiu2e8KbcNhPF/g0vQMs5/tQzCekxxrLrEnnicQN6NVzsCg+dGvkc7Lv2bUieU43e31eRY7Bwu4iKR8SGptwQt+khHGl1+eLwd2HbQTiEOV6JbU3MxuDAH0bI4UZQkecAq+rP9uDQi1VvJd1XbyhfqU7gxuc9DZIYedAq7LU80OdN25aoRNTnEyOpK79kc=','BoldBIOnPremise','Access to 75+ data sources,Share public and private dashboards,Onboarding support during trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration','{"Embed":"true"}', 1, 15, 1, 3, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Bold Reports Embedded Standard', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdE+rUDB9TTsNg/we2tK9L5dqfphauzmh0Rz2W6XkoIXE12wdk1FcqUer8RvPGF2d5mPRJIQo72W1dO2xMMqnORrWFGEfkUZEDXvBKfVh3DtKzvP+0EpTVydyIq+D9SSnAkJW2VS7GxTgy/PUonCkXGIJZ7NjzpW5Rp3t8iVdI1ItZyjOk09f4V1jtH/h06CByAmk27E+M1pa1ziMrdkTL7SwIPRVGoinRUJWWYmoMaQYILLgu+mHEg3Ni5fDGDfR2jpd/HLTnPjjrv01ZgD7kdUQ+wb+f1R3hKnju1OvvNYzzQX77BS6/VbddxZW5uhSB8=','BoldReportsOnPremise','Localization,Custom Report Items,Custom Data Sources,Share public and private reports,Onboarding support during trial,Custom Branding,Office 365 Integration,Azure Active Directory Integration','{"Embed":"true"}', 1, 15, 1, 4, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdG+g+H6mu1QA6dgwFlnskrFvg20Tily65yUrimB4GbPcdS7p5C7+4B6vxNCT4FiJDwP+p/8PiW6gC76zohiEMTy0wyM9UhjYru81fbX4a/XjFo6XlhpicGcda4/wz22FsxpQHm7P+axTgxgalfxg2N+ejv/IsBZ5IWc56dP/mCQBNj/utAjpd0qNCzpev6G5qDt5F1IQh7Tg6ZbgQSycQUHtvyQt1AASlE21UA5G3jYOUcWgGvWCTvQ8MA9w5obS3Tw1MZO/a+BfAK0tBdZAMmYSyvshZRWuHGkiQYZpQsFrA==', null, null, 12, 15, 0, 2, GETDATE(), 1, 1, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports Cloud Half-Yearly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdEf+OAZfKZ6G/WTslPh+9uCX5DqPUiKUeVOX8WhidUt+nHWwwy9WPS7eVfHtIMlRveqojyNJAeEYZvKRTM6rMUJQd8C2sqY7aFGkARe58hEzHg1awSL9z6p0Nbi3vgT5ZkzupGIDB7xV3EJxLVLfnHqW5pkTfnkTSYhEmdIQKdOhTk1eAduxGtI+mpd8T7XEHPwsfJgT/+VW5ZEj2mar3ugTBCVIYZUXkiY78+sFmpIHOdUx76amzWoroSMzCL13IC/X0mqumqIdowGRU7mwcNTjYviYgKie9cKa0Cd04gK/+RI7sDPi5mIc3w3jX0Ca7M=', null, null, 6, 15, 0, 2, GETDATE(), 1, 1, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES(N'Bold Reports Cloud Quarterly (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdEt6M3HJ/MPUhT1z0M3J2KJ9NGXtTZI1AJqn8Z81ZcumJsQAqbxeNdClBU85uAEIAxw8fyX/tDBv53SDi16y5r5eNRINMtf4BwdEVWgX5Hz0JcLIQ352QyIa9aSG01y0T8AUjYxf4TLUL0UqCLBQM1NN1+NZd1GbUUvVoSTO7HJZd6sI+0Jt+FFUY9w/nWU2BBoQIoP2PSWbCvv1+seEwoh3WwKRGEWudrhiWfB0DOgrzcB9hG573YYFuxrhw5Xvf73Kz/1PDW5nXZql5l8ZG8FFNkHLy23XVUxA9gXGf5SHb0TaYMT1HlkLVpxFUr56Ok=', null, null, 3, 15, 0, 2, GETDATE(), 1, 1, 0, 0,1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Solo', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1JV58gKZc+URTViEMR4Ou5Ot5rT8j1GPoUGP7og38ynlFjNGcDkRKn6Qz2qDBUyepLOXBTL8uN5iKLYQSTb3WM8a2gBn5kRk1H/EnDFWfSjIZ7dh0NllLC2IqVl/b9FRDfs+4oqkaqEEHUUwOU2cYsw29/4THwvODq7tGrmq4rXHDRRPxgvdUKmRzcDAvRIKCV28UGif+f9qsRVD+FLl2AzzcNSwm3M6Xwm4sdUy/CBPyPlbHIh7cdQhWLn7anLC3NcCGXb/jLx33lF4FSWl0oshxAwr7Jl6bDRhv2ltkc3lUEIV3BjmR8mGnVzwD4VFFPkX/0FPcc8UmQ4OOVLZkctrawwQ7DNud8wdyYVaFA2wQjKknP2Nr9apoCyCFd1Iegtrd4I3xy78UqUYMf+2k2F7bljeikvZ5hr74vBJhyG7ZAvtoLdPopbV3ofFoU7pWyxnMCUeob9GO7RVoTSK4VMvIe4soNyhNRotKhAu+n0CiJ6OaRjFvI3WLVlK5vnz/LZPWKz/ud1YcXFlhDEGYkJaZDwbzvgn30wg9E9Jawyd6BsTsbaQHnYAVOSDHOc7GPX8Jpa4KZsBUTj0h/u6NSWscI7zopk+vW79Tc9UB17m1zCHJRxsZwXYVQ916orjwKzJTId752mtCRh7Liyrxf81t/QIS2v3ZYfUy4QavdwvWbAYLikUReeWy24+ZpFvoEJewZMJmPSZFpt+JZkgyYnDew0J7QdzDp5RLHlJYy+O', null, null, null, '{"CustomBranding": "2"}', 1, -1, 1, 5, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Enterprise', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1HTqhNPjGV28mBNUecFExLDjkzZNhcfKHhcp2+bHyJ7spOEX2vROWLiAxoGGqgC7kmO96WwXXMvMUkGA/UJKNk1B2bN9Gc/chEQK+CdHKQzgASBXQ1vSCKPVBXwybCTq2DzXRVp0TJQfTssZ1QWrLxAWheLEF5KZxT8YG3zwlMi6b2/khXFAaLlbuVkmL3mV8q62TVuNWNEgpzPrSJagOnFsAQQnGvVQ9Dig1jrS2/4vZbfxozjgmYj+ZMF0imN6688J9YmatOaZRvP/hM98FhFOw18jAKQ69ICejfU3QSYa8ToYzX1bi+YZOC/mTWuAV+VBsPbh7HEgE3IXbWq9WPkmWJBBeWY0fnt2Kyfv2FlSn8BkavSNbuXi9fHLnzZ8aaWz8OpNLzGDlBS74aPp98Pj3M2E5c0LMybzwsj3jANkelKBNwzNzo3Ej5UFwn1SEaCYy6nb4ecRKEuVFIT6ih6+FWieFvUU7JzkVUTj/UUZW7lFPJXAQJe5eeKzbuBiXtHzv6hIcrL5cBCC5VzU+msAndFci/aQVxWpCMY9oqdL1wmPsBNgrf77R8iHu2uRhKwLzJdU3Qr6GooSR2J6ibRAFQ8pLdcDRunCkvyAqVYnGO5dL1MX79Lq9TWghbp4iYTHKCmJXfP1vNvqRzth5yXEcXSFplklvKDvrdTvqlbDnB67hMFqIxby8LyeP22CiRo7pI5/uaTtGDQFyO4zq6uzHxMIVO42FW1fNPOfhXO+', null, null, null, '{"CustomBranding": "2"}', 1, 15, 2, 5, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Professional', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1MXJZ7WVyjLXn+AC+4a9k+7af0P2T9k39AuTgIOA23JdCNuuDEFm4QgcZfijzmyYgtvWQhHfIsqTehK37sDvzaSTKFMpLs0oWl7el7X5xUhZjC+gjlHFgb9iAvJVhOCReoW4zhnOXbmVqBXNcQTxUappdWnip5rFEXwgrDhSBpZcYif2NzVmPkzI8LD0ni7tsb+jVNSI0CyBAYFHFMujRAQY88dOnd5OxV2b3wZXqUAYtala/LakxsUG5bsDTvA80JXJrmRfDT11AU/08hjW1iGyS8B9yuvsFNHfcpwYQeOmQFZntfBFMbpJHVQzGyKtWACouPMgpMfN88st4NZT6PIrZ1RCyQJCl7nWALrfREFLRJOsuex6MjcVDKdntpY9aTcycXG//NP4KbGKqmUVpXef0gr71yLDkOkbAKP220o9qsp94jef7zfXFIqyHq3qGyiPUbvqFDTjuVgW9ICE6ovwTgwtId86LPdS3oI5tvb+7CrYSNvtYdpz6Z9muvcQ2lQwMLnkjOYP7mK2HwxKnvyLHxTmSGsX4DrSrEcwYkppdyWMYuCzxDHpyIUlvomCe2YrT3QrSHmONGrqkglBPcOUJ8EhRzL+dM1qbBYh0J6CUW8tZbrPnbrooJ41jl4ZZyqzTEV8nmu/GP4zLtMv2oLyoSsrlWeqL1/PyRAL8TnAtxEajd11tCOWVqxVrHpHQvBs+afuUVNVvQl/HXsSKDVamocrfscBpnGVpl8d8jxz', null, null, null, '{"CustomBranding": "2"}', 1, 15, 3, 5, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1JlFoT0ZCmHsDJNJH/Yr9+eLmkf79GFXAti5iJh3kBLKGjdCq6/YZSfzlLkRBDdAAXY8OvagVarJo5ye9nGcBB2xGQc6LwAmTj9soxNLMiCzaU2kIsC8LAtyFDG2kZ7PvshscbmlZ5G29rmkY290/DoKCB3NMs4WHsXoIiMexiA8CfTBuXqORUiRD6Oc/VRk+Grlsu0NqZX7xaIAK+X2+ohQJSl+1RKcn4oTeu2TJ7lzvLCVcIzbKw3r4ym0OU8ke+sc+1GBFjQOWv2ki83vodnJU7FsazYz+e9DKKsKZExQ9Fugtf+ehE2kY9ijAnBsbZlGJo259/XvFez6m+fVoiju6llFw19B5ZaZxFMTgVk6s5UriSZZvPPdBiuIm1lunGYIwcPjDPDIWtkokFwACIEVTnDdXTMPcBf5BU9xR2ul4Fe9HCMjhXAOOW50wlPORYPjBOwF5P0Se8JDDqgq6yY6gVV8s/jKaBoLT1hNmqZxTSjBPTU+Y9i7U52MW3fc8QgwV5GFwX4YH0SMl+QBosRYgU+jTg0HdRvzh+QcBtF3QEk8TlTcSQY0j7eJC8Ar6zecFwrJeK9IFYBCFRyJvmthS7jyoe/dI7MJNY0H5xVqlojCBF5l+oIAp7rKt0wXhhdRuB4nK9lwOlcv6rdluMEuIER8gOmbcZcOq3DN5ofcvTPzs1FxxFI679vBEK38ygINR8ocUbzYg08epARCjWcK5Y5ZI52ewcmN2VPs6HrM', null, null, null, '{"CustomBranding": "2"}', 1, 15, 4, 5, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Custom', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1Dv01XV20LtLGFeduU1eRJ4ilu5aZWhv0DEHNLO6EY1cMDJgFnIYH9jQzeifQTiceZ+1VIpgie2IAJQHiXqj6yVowaLbloovyZKjEZJwqeDoE29UNJq0FYiptZ85drtnGlu94E1G01ab2DXhknUNDCnvQmtQuIGa5kTM2WjNEl58j+hlSu8I04+joeIz2i6iYoJED/dmW8cX+er6qDCs8SkJ8EHHw2dUGEVPvNVeHAgbrDYo+1Drqjvd8thCZw/4THFIwyW7a/e4cBw5zP6F/lpZBikKWkrDPac32pGkUV9R4szYTLY9iPZlipdOgs3yHnQy5iODjN8S7eIwcK4EWxzRtP6I7hqS1yGK8hJsr2cXFMttCvgjQ+eGmeAN9shYxLvmhO5Rl+RI1mEnraQxBx3WBtrIB1Bco+HrytAEopU8f/7RFzaWA2/I6Ti1UAH12GSkyynKpqqAwRM1N2bj/dFcK2BbAdeUzmSRoWRPTdzEI3aTjnypwLClivb8rUwiYRFWy2Om8ji8AgZpAcfXeNu5xdIwIt2mj/wfk/o3ePwzaaSYGHfTdeI0xr46jkx4an7WVzWaSYgnpCfiWF1bBfHX78qjhHeJVp50kDuiGd4TUlnu4EHnOuEmcREfULm+ChEzLhOHdl6b+6qm9thotYzCV7kWA1UN+5SbZF1RUCM2XY2ZPfK8TI+muTXdYEAi7KBRpLYNOLdFACtGIB7qdxc=', null, null, null, '{"CustomBranding": "2"}', 1, 15, 0, 5, GETDATE(), 1, 1, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Enterprise', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1HTqhNPjGV28mBNUecFExLDjkzZNhcfKHhcp2+bHyJ7sT4GPDmsCI6aaLOeEXtFp6JgpLNeP48w+lE6LOVu/nv3VaHB7iICaf++p2JVDQD1Tv8puUVnV59Jx6EaaaIUczOyTY03ZYQJ2TwKQ4ivt9aBNyVH+AZe/jByBYU8ybNzG+TC5VRU6or0qDvhvg/u1WHRa9IaPbAzJnZL4tlP2MXhl3M0mOjtcjz7z7jKsMqoGdlIe2Kjiep45WFruzEiZNtKN7VB0D9fbSw9MDLmG64wFeqOECB+TCG61HP1jkf4cHu1I1dbisepAP6jcEjLcmErLwGYDjaZqMSyqSsDHTpTFCogvymFSzt2VKFLwKwB4GF8Is7y8kKcmMiZKPdziCpuvdOEZyaGkJ0hbpA/k2w4OOIv+zFX9ZZ8oqXcG/rn26rj0H5twdM0O03nQxvovNbo1/oDeH6gkHQSygA6baKwfrT7KuksCwhVPaSj8siBLF0JRNjLZQzBzfGjFfmIPwd7zCZeLU3tUlM80FZF11OLvjGv1pVo5TeO4/ggiU0dUrl+Eox3m9BBRCpWI60R5c2c7njufBluKeOUiMJglu+B1AVnV9zO7i96J5e281BPZ/RPJoylnarfvIB9Haf01hK/gJ4ZHQSAABhdOBfO7dlybJG1rLM3BN8Yp0D8KzairDUFjIQkcUXSgsekpCia9fiMczkOStyNDo50g/r+Fat+ikOCGt0YyeKySRbSPWSLw', null, null, null, '{"CustomBranding": "2"}', 12, 15, 1, 5, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Professional', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1MXJZ7WVyjLXn+AC+4a9k+7af0P2T9k39AuTgIOA23Jd06O88clwxwNFvPwxyEIMxTsUoSFsyskYKND+/n1xpnDTX3vC1Be9y4X/7ecHfyYkPeBuYMJ5sszrSi1NYwVdsdtPEq1qo83yoa6LOno5Seo26ZQebi4WkUgAuCIkM82rqpA1NK5BitnV349jKfzLMjeleNn12k2gZHxb5BDNVAH9gPZkvPWklPP552RZBzosvETmZfR6AlFlpG9woSOTMYWQ/jyUiH/HdY3hhLnDAwJD32YB3IAIosClnCHlDH6v/13vESICUTCd7Gr4vhItpTkrsJ0wlqfEPVjhaM47nejd9KXFcFZj/4YjSJVkoLLkmVVRGP5Bq5Py8sdsaMoQAmAtt1PlFnjagJK+0FeEsd2fCWUcjY7h1Awye0g4FOeDEac3oQ8aWp+sK1y6rRrkTin2zFkETlyVJ5g3LknngHZsUoVTCuHYX0hJp4cH2CZclzsmhCtrsGUXYqgKzvvGBlujROJdlYtdcpMxUsozra+iiZB3OlE4wh45BnYOUGCve6U8OdURjd7Jj6rr0RknhpY/PzjYVacHhdemnZf2iEJ32m6/rpoof5p2KCMU/JPnqR+9qrxnug/vaod6aDJARDp5RVJgNpqckqd/9ICxtn7Ev0Kr7edssS2tI0763To22/gQZGkUfPFPAGat9pO37daEprYg1qDQaFxIYZ9NSC6bgjP+pO915BvXgcwg5gYz', null, null, null, '{"CustomBranding": "2"}', 12, 15, 2, 5, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Business', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1JlFoT0ZCmHsDJNJH/Yr9+eLmkf79GFXAti5iJh3kBLKFZyiwx9DW6Wx8HbgwJHlMQwjdgUiCXVN/qXGg1b9nJolSAevWU+mGvhR4BLpvFyz3rGd7FJrxdGAb1w2KyWXuLqHYCkGQOUX22H2oH1aRMdrejsBUwAQ3SSIzYGWAoSW3oBOW3gExjZUy76Y0v9/3LHLTX8/se/OU8YLhQLUxMDFF2jFOIUEiMcnn/87xRe+i0JPBQS0+CphTOhOI+VQKVjgc3uunBXksJ7bzLnetyLQoFRlmdpSOvl2Z7FfSZintQ7HWfwrEUSOI0jk3+5sWwvSzzDccKU8WItsRVTt6v5UxTJZsKEUbvK/90SOb++aBkEwwzVu6HvGwehJV9KCDzSuVku3AOnvnv0301CwUa1S15yVzuD1J4JG5kOJTiBidFDy+a0kfxjvChCdfvoTiw8HTRNT8pSkOxmRGccW+nE7ESz9cC66bsN+tJNEaVmsb8Oam6wyo8QEXdtUAxNo2oHwREid14s7tiuzHpD1DT34vfPMNJAJdvTEfHHyHkrWri0jDZk94DBmX6SLosdgy0wi7slKENuMxV/MWCa69BNVYhsRWjBPiGU7slNu8yyGw9TmIRyb6G/54BrI8bCP54GCLFwDKE9voJVh3h8f2tyRdsa+ztVtyM0X67paHUBfupB6HcaUQCxVenOZBXgFo90iHtqpSbvtEtt8t1SwepJQB2PD9mAwbB2NKTBwmwvd', null, null, null, '{"CustomBranding": "2"}', 12, 15, 3, 5, GETDATE(), 0, 0, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [PlanAdditionalData], [BillingIntervalId], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Custom', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1Dv01XV20LtLGFeduU1eRJ4ilu5aZWhv0DEHNLO6EY1cMDJgFnIYH9jQzeifQTiceZ+1VIpgie2IAJQHiXqj6yVowaLbloovyZKjEZJwqeDoE29UNJq0FYiptZ85drtnGlu94E1G01ab2DXhknUNDCnvQmtQuIGa5kTM2WjNEl58gRr/+BIsnR1PMYUvxawQlaJiCwEGACrAquHYn/nsmpTLY9NHW9sn79Be44pfrd/J2dp8zHykZhOrxJCftMwSMn1biatr0DYeVAALMCQykNAhdlSAsdfy/C/ULd3oe62BvEsPP12Q9mF8wXJXxRdP6N+g7nXQy4dxN2i+6YQxmZiQTMrLbyNUdCIa02ukLzasdI21yPfuoR3Nr3GuNXfz1tm1/eTupowJNvBdCEyJIaCfHiXMBB8f0ypGf0331IgNOBujJHibOGYGeoY+igPtHV39PrgpaiRBPcBXVNTPpEozJ525eGLcZU/q5te0gBy3c1PdN9PAGkHcsC1Nu/Gxm/j161wshB05uPbg2OTKkV8qEd+UoIlW30RQPH37/mNcQPy957trZ2KO4a+cGTB7bilR6wQ4oINtfABPhg+SaIShrEITjlFxStQ9ASQ2TK6423LhMaKmwiLD7TbLhmtfEDT7nOUGppkvWyLfXNwK85WR2pWVK2ECawZpo3yQqOERBF9+/IGsW6D2FISWBBrXCwrOPo4FraRT5ndx8mBdlkg=', null, null, null, '{"CustomBranding": "2"}', 12, 15, 0, 5, GETDATE(), 1, 1, 0, 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Reports Source Code Add On', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpiaLZjpY3jCn9usSQoqPTQ2OY4N6fvkfVFSNBYAP0WDJvLAyGkrzNLU4mxgRSYmqHhthZu945AW9EtSXlQZSdbkdyJO8Pc22XSHIRdG2gc5QrwhF410KR2UESa0DOkPWZUe48gywQPEtSCoRs/nCZkn+7zGkFFM6FEAScYIa+WuRZwahhz3M4sVPkifv8e06Yi37+x1u4yzAX/HLYPgLsyWvdRiXGrYzAXmbComjkOyRTH/ShpB4hF/spuMPrH/1xYVVylQO4GcEGANrvwU6G7nX4xihkQcz4foUJLsWm8TDgFBsHzZ98+SZgEt/exCyWVarXpdQo3gNkQplsZUfIGEzg0fwZ/Y0+BoS3+/lF0uRAenvULjD1BT4TaAT5TxmTTLkmdGXv0WhnScRKlvjMiys2UgmEq140DpOoY4QeGdFXHYmJZSPrD2Vp0fny7WtpcIqAzfkQHzNQZ+qIMRd18qMoy+Ml0OLE4XMo2BDuedZ8bfgahlMd0t8ron7wMx2bNFGtndN5eT2UDBF6ridXmMW98m41b+SSQp60FXVm8gpqon6pDoKVvDqbBx9XKhID4Q94jyGjKem/fX5n4pOr5au5CHlv/hDM9nI/5YwRJcx3Tl5yXw9g3C3R+ZlUuIpjnxoBQq3sM8hzOec/xUT06sJjC1q1ZXhAeFJCVzPGSly/OoHtHQhKEgvVKnyVUQ86oeh0oOewL+38kqD96Eb2LHzAn4PXBxsoa87UTnWNG95JGpRHki7X+56h+eqmrJFO9I+JE+769V489xMhzemx5KU=', N'BoldReportViewerSDKSourceAddon', 15, 1, 4, GETDATE(), 1, 0, 0, 0, 0)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Reports Source Code Add On Custom', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpiaLZjpY3jCn9usSQoqPTQ2OY4N6fvkfVFSNBYAP0WDJvLAyGkrzNLU4mxgRSYmqHhthZu945AW9EtSXlQZSdbkdyJO8Pc22XSHIRdG2gc5QrwhF410KR2UESa0DOkPWZUe48gywQPEtSCoRs/nCZkn+7zGkFFM6FEAScYIa+WuRZwahhz3M4sVPkifv8e06Yi37+x1u4yzAX/HLYPgLsyWvdRiXGrYzAXmbComjkOyRTH/ShpB4hF/spuMPrH/1xYVVylQO4GcEGANrvwU6G7nX4xihkQcz4foUJLsWm8TDgFBsHzZ98+SZgEt/exCyWVarXpdQo3gNkQplsZUfIGEzg0fwZ/Y0+BoS3+/lF0uRAenvULjD1BT4TaAT5TxmTTLkmdGXv0WhnScRKlvjMiys2UgmEq140DpOoY4QeGdFXHYmJZSPrD2Vp0fny7WtpcIqAzfkQHzNQZ+qIMRd18qMwcJYlRDop5H3YeGMYd20SsD1B3YfTk1iqNdmwNHODVpYx97n46PGrYPjL27jI/1FAl8pLGs6w1cbq5VgDbzvtGdJfKxyxLzLbJ9iToKZnA/QLxe51mTTpjqF+57JFrgf4Mxd4S2A7Vnp5fS6krgAnAz8KSlQtzFv1hXdmBFsLIGxvVm7Unk3h+z74hxjXzP+lK3BYM0SoiGAkQX4WnvcGplrBrBVyNcCGNH4ZtraHSAyvb9j9se6kPj44oxLYLMvwYPU27VGGtfqhg2EodgLPxYHgZcwtg4f+UR99sw86oPdtTuq3oHsJeVLWPtEKwfo=', N'BoldReportViewerSDKSourceAddon', 15, 1, 4, GETDATE(), 1, 1, 0, 0, 0)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [SetupName], [AdditionalFeatures], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) values (N'Pay Per Use', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JxsAXeFXmEVMvyAJfzbgh1A9wjVfbmPIAnt5TPhWOz7d73MeRHZSMgkNTYBA71TvAiAHOs1BdUt1ypu59uYG557grhsJCOeFF23w8uBKEOvTs0Cy/fdYFmtG4ZL6axgBmngIo0p4L3KhgQ/fCpDYuJN2g7uRdPUerga0YTeJLPdcek70EZiMoaBqCtpv1yRkygJJj37M+EuUZumTieGZJl8HOVHJ6XQ/s7GxuRiLBMYWLN2wo852RUCl82dwUmLE5B5VbAuDcGAcb/BJzMoISIhaRMrKxeUQGowxcMtD1rLVVJInzGv3Xhq8CSwAqDgWt4Tau9JKcAqUskvDS9BvdF/fe1MxshuGb3z9+6BUAPWmMR1Eu5BULtvRjLUZaRvUgK20ylHSxL3v0KGzi1sFR257A5y3rhPEW1HACznHbPDDTQZgmgrflFZIgqTBwD3HyltenpqYpJMi+6Jks+xaaKAD8R87r42Mc4ZmyTv5WM2ACdIA2qahTmiToGeN78shUo4/OiuD1YIW4GhKZHfi+G3M9mDB5L5fyuZ8uxATN/vmT7UZIzV6olRgFWA9/FsHTv4kp+moXj3KZOnltLQvQLtYweq30IW8GIBpTcGMnkiS/eH3GzOFi6WnjFjVq3ejEWua1kOc9w4yAtkD1InQUDMjnH6wQquOW8wMMNXTe51pVpiRubBvW+LBU2PZQGf9YhDuCse+YGOCbwqPvQ/Cnglj1Dn/ymYD4Q0LlTpE8wZDEFv1DN+BxCfZ7jwBDZc1j', null, null, -1, 0, 5, GETDATE(), 0, 0, 0, 0, 0)

INSERT[dbo].[SaaSPlan]([Name], [PlanSchema], [SetupName], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsCustom], [IsSDK], [IsArchived], [IsActive]) VALUES (N'Bold Report Viewer SDK (Custom)', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdHPdcRRFU/hgrM8sT/JdgtMNIOgtlU7QLq/cfKFveV7GxfNFzjiZ8UYNW/5CLmwP1Kmi06z5jSjNWuXucMH+THbcLRHrmNwwI+55PzP0wN5LnTb+lBFbDe6qak1veYwimA0NzibFfZagIk0g2wJ1cxxa5Ju1B98M12d0v0lB5YM2ZFCiceYn8XfmDYlBP2VxAY8W6sMm9xYujP2Z9M0mUQt/qLUQUq9c7nJ5o3ciD1OYzBAcGjX1TbGyCKSxvw8KA7FOX8FxOZd8ZLrKROjK90B1NJZ6MC72hY94VuobYt3vBGenbo9rrFMIV8cbsugS1w=','BoldEmbeddedReportingTools', 15, 0, 4, GETDATE(), 1, 1, 1, 0, 1)

INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldBI',1)
INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldReports',1)
INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldBIOnPremise',1)
INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldReportsOnPremise',1)
INSERT into [TenantType] ([Type],IsActive) VALUES (N'BoldSign',1)

INSERT [dbo].[Addon] ([Name], [StripePlanId], [PlanSchema], [ModifiedDate], [IsActive]) VALUES (N'AdditionalDataStorage', N'additional_data_storage', '', GetDate(), N'True')
INSERT [dbo].[Addon] ([Name], [StripePlanId], [PlanSchema], [ModifiedDate], [IsActive]) VALUES (N'CustomDomain', N'custom_domain', '', GetDate(), N'True')

INSERT INTO [SqlServerEdition] VALUES('V12', 4000, 'East US', 1, 1)
GO

INSERT INTO [SqlElasticPoolEdition] ([PoolEditionName],[PoolDtu],[PoolStorageinGB],[DatabaseDtuMinInGB],[DatabaseDtuMaxInGB],[DatabaseLimit],[IsCurrent],[IsActive],[Region]) VALUES('Standard', 50, 50, 0, 50, 190, 1, 1, 'East US')
GO

INSERT into [IdPCredentialType] ([CredentialType],IsActive) VALUES (N'SSO',1);
INSERT into [IdPCredentialType] ([CredentialType],IsActive) VALUES (N'API',1);
GO

INSERT INTO [User]
           ([Id]
           ,[FirstName]
           ,[LastName]
           ,[DisplayName]
		   ,[Username]
           ,[Email]
           ,[Password]
           ,[Contact]
           ,[Picture]
           ,[CreatedDate]
           ,[ModifiedDate]
           ,[LastLogin]
           ,[PasswordChangedDate]
           ,[ActivationExpirationDate]
           ,[ActivationCode]
           ,[ResetPasswordCode]
           ,[LastResetAttempt]
           ,[ExternalProviderId]
           ,[DirectoryTypeId]
           ,[IsActivated]
           ,[IsActive]
           ,[IsDeleted])
     VALUES
           ('00000000-0000-0000-0000-000000000001', 'System', 'Administrator', 'System Administrator', 'system-administrator', 'system@boldbi.com', 'N/A', null, null, GetDate(), GetDate(),   GetDate(),
           GetDate(),
           GetDate(),
           'N\A',
           null,
           null,
           null,
           1,
           'true',
           'true',
           'false')
GO

INSERT into [SqlServerType] ([SqlServerType],[ModifiedDate],[IsActive]) VALUES (N'TenantSqlServer',GetDate(),1)
GO
INSERT into [SqlServerType] ([SqlServerType],[ModifiedDate],[IsActive]) VALUES (N'IntermediateSqlServer',GetDate(),1)
Go

INSERT INTO [SqlServer] ([ServerName],[UserName],[Password],[DatabaseLimit],[SqlServerType],[TenantType],[StorageAccountName],[StorageAccountAccessKey],[ResourceGroupName],[AzureTagKey],[AzureTagValue],[IsAvailable],[IsActive]) VALUES (N'dev-boldbi-tenants',N'dashboard-admin',N'',3900,1,1,N'saasnet',N'4ujBKaPKh9CMVrqAKSdLXgVh+gtNM33pR9YkwZIOnZaKn7pgTAW1gZY+eqTsUmiHwHvKVcXQQPtH5r/x8m44hUOGtV9Lsg7nYJ+uDaalkfnO7XbxcIhoyFuVDM7udZVT',N'dev-boldbi',N'DataPlatform',N'ds-cloud-dev',N'True',N'True');
GO
INSERT INTO [SqlElasticPool] ([PoolName],[SqlServerId],[DatabaseLimit],[SqlServerType],[TenantType],[IsAvailable],[IsActive]) VALUES (N'dev-boldbi-tenant-pool',1,95,1,1,N'True',N'True');
GO
INSERT INTO [SqlServer] ([ServerName],[UserName],[Password],[DatabaseLimit],[SqlServerType],[TenantType],[StorageAccountName],[StorageAccountAccessKey],[ResourceGroupName],[AzureTagKey],[AzureTagValue],[IsAvailable],[IsActive]) VALUES (N'dev-boldbi-datastore',N'datastore-admin',N'',3900,2,1,N'saasnet',N'4ujBKaPKh9CMVrqAKSdLXgVh+gtNM33pR9YkwZIOnZaKn7pgTAW1gZY+eqTsUmiHwHvKVcXQQPtH5r/x8m44hUOGtV9Lsg7nYJ+uDaalkfnO7XbxcIhoyFuVDM7udZVT',N'dev-boldbi',N'DataPlatform',N'ds-cloud-dev',N'True',N'True');
GO
INSERT INTO [SqlElasticPool] ([PoolName],[SqlServerId],[DatabaseLimit],[SqlServerType],[TenantType],[IsAvailable],[IsActive]) VALUES (N'dev-boldbi-data-pool',2,95,2,1,N'True',N'True');
GO
INSERT INTO [SqlServer] ([ServerName],[UserName],[Password],[DatabaseLimit],[SqlServerType],[TenantType],[StorageAccountName],[StorageAccountAccessKey],[ResourceGroupName],[AzureTagKey],[AzureTagValue],[IsAvailable],[IsActive]) VALUES (N'dev-boldreports-tenants',N'enterprise-server-admin',N'',3900,1,2,N'devboldreportstenants',N'FED3gyHUhQ8Q6t9aFWzTnex5kNzmBGxky0IbX1DU8M4fYrV4E1EWa4Siqc/5MqMt9sWbu0QmBB/8JzICeknuWWxqSjFNYBZM+MgqTpzGx0DrJRVEnaLgwgN/Uj5iY9/z',N'dev-boldreports-cloud',N'DataPlatform',N'rs-cloud-dev',N'True',N'True');
GO
INSERT INTO [SqlElasticPool] ([PoolName],[SqlServerId],[DatabaseLimit],[SqlServerType],[TenantType],[IsAvailable],[IsActive]) VALUES (N'dev-boldreports-tenants-001',1,95,1,2,N'True',N'True');
GO

INSERT [dbo].[PrivacyPolicyVersion] ([Name], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES ('Privacy_Policy_v1', 'https://cdn.boldbi.com/documents/legal/privacy-policy/v1.png', GETDATE(), GETDATE(), 1, 1)
INSERT [dbo].[TermsOfUseVersion] ([Name], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES ('Terms_Of_Use_v1', 'https://cdn.boldbi.com/documents/legal/terms-of-use/v1.png', GETDATE(), GETDATE(), 1, 1)
INSERT [dbo].[FormType] ([Name], [Url], [CreatedDate], [ModifiedDate], [IsActive]) VALUES ('Registration_Form_v1', ' https://app.boldbi.com/bi/register', GETDATE(), GETDATE(), 1)
INSERT [dbo].[FormType] ([Name], [Url], [CreatedDate], [ModifiedDate], [IsActive]) VALUES ('Activation_Form_v1', 'http://id.boldbi.com/accounts/activate', GETDATE(), GETDATE(), 1)
INSERT [dbo].[RegistrationFormVersion] ([Name], [FormTypeId], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES ('Registration_Form_v1', 1, 'https://cdn.boldbi.com/documents/forms/registration-form/v1.png', GETDATE(), GETDATE(), 1, 1)
INSERT [dbo].[RegistrationFormVersion] ([Name], [FormTypeId], [Location], [CreatedDate], [ModifiedDate], [IsLatest], [IsActive]) VALUES ('Activation_Form_v1', 2, 'https://cdn.boldbi.com/documents/forms/activation-form/v1.png', GETDATE(), GETDATE(), 1, 1)

INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Website', N'https://syncfusion.com', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Intranet', N'https://intranet.syncfusion.com', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Tenant Management', N'https://app.boldbi.com', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Dashboard Server', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Identity Provider', N'https://id.boldbi.com', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Installer', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldBIWebsite', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldReportsWebsite', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldSignWebsite', N'', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'BoldSignApp', N'', GetDate(), 1)
INSERT [dbo].[SourceType]([Name], [URL], [ModifiedDate], [IsActive]) VALUES(N'TenantManagementWebJob', N'', getdate(), 1)
INSERT [dbo].[SourceType]([Name], [URL], [ModifiedDate], [IsActive]) VALUES(N'ReportServer', N'', getdate(), 1)

INSERT INTO [ReleaseType] ([Name],[ModifiedDate],[IsActive]) VALUES (N'Main',GETDATE(),1)
INSERT INTO [ReleaseType] ([Name],[ModifiedDate],[IsActive]) VALUES (N'Service Pack',GETDATE(),1)
INSERT INTO [ReleaseType] ([Name],[ModifiedDate],[IsActive]) VALUES (N'Beta',GETDATE(),1)

INSERT [dbo].[OrderType] ([Name], [IsActive]) VALUES ( N'Main', 1)
INSERT [dbo].[OrderType] ([Name], [IsActive]) VALUES ( N'Renewal', 1)

INSERT [dbo].[PaymentMode] ([Name], [IsActive]) VALUES (N'Stripe', 1)
INSERT [dbo].[PaymentMode] ([Name], [IsActive]) VALUES (N'DirectTrac', 1)

INSERT INTO [ProductVersion] ([Major],[Minor],[Patch],[DisplayVersion],[ProductTypeId],[ReleaseTypeId],[ReleaseDate],[IsLatest],[IsActive]) VALUES (N'2',N'5',N'3',N'2.5.3',N'3',N'1',GETDATE(),1,1)
GO

INSERT INTO [ProductVersion] ([Major],[Minor],[Patch],[DisplayVersion],[ProductTypeId],[ReleaseTypeId],[ReleaseDate],[IsLatest],[IsActive]) VALUES (N'2',N'5',N'0',N'2.5.0',N'4',N'1',GETDATE(),1,1)
GO

INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.com', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.net', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.org', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.io', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.de', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('syncfusion.co', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldbi.com', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldreports.com', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldsign.com', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('boldid.net', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('sfn.io', getdate(), 1)
INSERT [dbo].[InternalDomains] ([Domain], [ModifiedDate], [IsActive]) VALUES('essentialpdf.com', getdate(), 1)
GO

INSERT into [ResourceType] (Name,IsActive) VALUES (N'Category',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Dashboard',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Report',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Datasource',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Dataset',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'File',1)
INSERT into [ResourceType] (Name,IsActive) VALUES (N'Schedule',1)
INSERT into [ResourceType] (Name,IsActive) values (N'Widget',1)
INSERT into [ResourceType] (Name,IsActive) values (N'ItemView',1)
INSERT INTO [ResourceType] (Name,IsActive) Values ('Slideshow',1)
INSERT INTO [ResourceType] (Name,IsActive) Values ('Document',1)
INSERT INTO [ResourceType] (Name,IsActive) Values ('Template',1)
INSERT INTO [ResourceType] (Name,IsActive) Values ('Form',1)
INSERT INTO [ResourceType] (Name,IsActive) Values ('Signature',1)
GO

INSERT into [FeatureConfiguration] ([Name], [Configuration], [TenantTypeId], [ModifiedDate], [IsActive]) VALUES (N'Groups', N'{"users_group_limit": 1}', 5, GetDate(), N'True')
GO

INSERT into [GroupRole] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'Admin', N'', GetDate(), N'True')
INSERT into [GroupRole] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'TeamAdmin', N'', GetDate(), N'True')
INSERT into [GroupRole] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'Member', N'', GetDate(), N'True')
GO

INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Create', N'Enables Create operations (Post).', 1, GetDate(), GetDate(), N'True')
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'View', N'Enables read operations (GET).', 2, GetDate(), GetDate(), N'True')
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Write', N'Enables write operations (PUT or PATCH).', 6, GetDate(), GetDate(), N'True')
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Delete', N'Enables view and delete operations (DELETE).', 10, GetDate(), GetDate(), N'True')
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Full Control', N'The wildcard character grants access to all operations that match the string.', 14, GetDate(), GetDate(), N'True')
INSERT into [IAMActions] ([Name], [Description], [AccessId], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (N'Use', N'Enables to use.', 32, GetDate(), GetDate(), N'True')
GO

INSERT into [ResourceScopes] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'SpecificResource', N'', GetDate(), N'True')
INSERT into [ResourceScopes] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'AllResources', N'', GetDate(), N'True')
INSERT into [ResourceScopes] ([Name], [Description], [ModifiedDate], [IsActive]) VALUES (N'ResourcesInCollection', N'', GetDate(), N'True')
GO

INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document View', 3, 5, 11, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document Write', 3, 5, 11, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document Delete', 3, 5, 11, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Document Full Control', 3, 5, 11, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Create', 2, 5, 11, 1, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document View', 2, 5, 11, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Write', 2, 5, 11, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Delete', 2, 5, 11, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Document Full Control', 2, 5, 11, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document View', 1, 5, 11, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document Write', 1, 5, 11, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document Delete', 1, 5, 11, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Document Full Control', 1, 5, 11, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template View', 3, 5, 12, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template Write', 3, 5, 12, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template Delete', 3, 5, 12, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Template Full Control', 3, 5, 12, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Create', 2, 5, 12, 1, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template View', 2, 5, 12, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Write', 2, 5, 12, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Delete', 2, 5, 12, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Template Full Control', 2, 5, 12, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template View', 1, 5, 12, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template Write', 1, 5, 12, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template Delete', 1, 5, 12, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Template Full Control', 1, 5, 12, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form View', 3, 5, 13, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form Write', 3, 5, 13, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form Delete', 3, 5, 13, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Collection Form Full Control', 3, 5, 13, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Create', 2, 5, 13, 1, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form View', 2, 5, 13, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Write', 2, 5, 13, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Delete', 2, 5, 13, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'All Form Full Control', 2, 5, 13, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form View', 1, 5, 13, 2, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form Write', 1, 5, 13, 6, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form Delete', 1, 5, 13, 10, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Specific Form Full Control', 1, 5, 13, 14, GetDate(), N'True')
INSERT INTO [ResourcePermissions] ([Name], [Scope], [ProductTypeId], [ResourceTypeId], [AccessId], [ModifiedDate], [IsActive]) VALUES (N'Signature', 3, 5, 14, 32, GetDate(), N'True')
GO

ALTER TABLE [AzureTags] WITH CHECK ADD CONSTRAINT [AzureTags_fk0] FOREIGN KEY ([TenantType]) REFERENCES [TenantType]([Id])
Go
ALTER TABLE [AzureTags] CHECK CONSTRAINT [AzureTags_fk0]
GO

ALTER TABLE [CouponLog] WITH CHECK ADD CONSTRAINT [CouponLog_fk0] FOREIGN KEY ([CouponLogTypeId]) REFERENCES [CouponLogType]([Id])
GO
ALTER TABLE [CouponLog] CHECK CONSTRAINT [CouponLog_fk0]
GO

ALTER TABLE [CouponLog]  WITH CHECK ADD  CONSTRAINT [CouponLog_fk1] FOREIGN KEY([UserId]) REFERENCES [User] ([Id])

GO
ALTER TABLE [CouponLog] CHECK CONSTRAINT [CouponLog_fk1]
GO

ALTER TABLE [TenantPaymentSubscription] WITH CHECK ADD CONSTRAINT [TenantPaymentSubscription_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

GO
ALTER TABLE [TenantPaymentSubscription] CHECK CONSTRAINT [TenantPaymentSubscription_fk0]
GO
ALTER TABLE [TenantPaymentSubscription] WITH CHECK ADD CONSTRAINT [TenantPaymentSubscription_fk1] FOREIGN KEY ([PaymentMode]) REFERENCES [PaymentMode]([Id])
GO
ALTER TABLE [TenantPaymentSubscription] CHECK CONSTRAINT [TenantPaymentSubscription_fk1]
GO

ALTER TABLE [TenantInvoiceDetails] WITH CHECK ADD CONSTRAINT [TenantInvoiceDetails_fk0] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantPaymentSubscription]([Id])
GO

ALTER TABLE [TenantPaymentLog] WITH CHECK ADD CONSTRAINT [TenantPaymentLog_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

GO
ALTER TABLE [TenantPaymentLog] CHECK CONSTRAINT [TenantPaymentLog_fk0]
GO
ALTER TABLE [TenantPaymentLog] WITH CHECK ADD CONSTRAINT [TenantPaymentLog_fk1] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantPaymentSubscription]([Id])

GO
ALTER TABLE [TenantPaymentLog] CHECK CONSTRAINT [TenantPaymentLog_fk1]
GO

ALTER TABLE [SqlElasticPool] WITH CHECK ADD CONSTRAINT [SqlElasticPool_fk0] FOREIGN KEY ([SqlServerId]) REFERENCES [SqlServer]([Id])

GO
ALTER TABLE [SqlElasticPool] CHECK CONSTRAINT [SqlElasticPool_fk0]
GO


ALTER TABLE [Tenant] WITH CHECK ADD CONSTRAINT [Tenant_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

GO
ALTER TABLE [Tenant] CHECK CONSTRAINT [Tenant_fk0]
GO
ALTER TABLE [Tenant] WITH CHECK ADD CONSTRAINT [Tenant_fk1] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])

GO
ALTER TABLE [Tenant] CHECK CONSTRAINT [Tenant_fk1]
GO

ALTER TABLE [TenantLog] WITH CHECK ADD CONSTRAINT [TenantLog_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

GO
ALTER TABLE [TenantLog] CHECK CONSTRAINT [TenantLog_fk0]
GO
ALTER TABLE [TenantLog] WITH CHECK ADD CONSTRAINT [TenantLog_fk1] FOREIGN KEY ([TenantLogType]) REFERENCES [TenantLogType]([Id])

GO
ALTER TABLE [TenantLog] CHECK CONSTRAINT [TenantLog_fk1]
GO
ALTER TABLE [TenantLog] WITH CHECK ADD CONSTRAINT [TenantLog_fk2] FOREIGN KEY ([ToStatus]) REFERENCES [TenantStatus]([Id])

GO
ALTER TABLE [TenantLog] CHECK CONSTRAINT [TenantLog_fk2]
GO

ALTER TABLE [TenantLog] WITH CHECK ADD CONSTRAINT [TenantLog_fk3] FOREIGN KEY ([SourceTypeId]) REFERENCES [SourceType]([Id])

GO
ALTER TABLE [TenantLog] CHECK CONSTRAINT [TenantLog_fk3]
GO

ALTER TABLE [Coupon]  WITH CHECK ADD  CONSTRAINT [Coupon_fk0] FOREIGN KEY([ApplicableProduct]) REFERENCES [TenantType] ([Id])
GO
ALTER TABLE [Coupon] CHECK CONSTRAINT [Coupon_fk0]
GO

ALTER TABLE [Coupon]  WITH CHECK ADD  CONSTRAINT [Coupon_fk1] FOREIGN KEY([CreatedBy]) REFERENCES [User] ([Id])
GO
ALTER TABLE [Coupon] CHECK CONSTRAINT [Coupon_fk1]
GO

ALTER TABLE [Coupon]  WITH CHECK ADD  CONSTRAINT [Coupon_fk2] FOREIGN KEY([ModifiedBy]) REFERENCES [User] ([Id])

GO
ALTER TABLE [Coupon] CHECK CONSTRAINT [Coupon_fk2]
GO

ALTER TABLE [UserPreference] WITH CHECK ADD CONSTRAINT [UserPreference_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

GO
ALTER TABLE [UserPreference] CHECK CONSTRAINT [UserPreference_fk0]
GO

ALTER TABLE [User] WITH CHECK ADD CONSTRAINT [User_fk0] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [DirectoryType]([Id])

GO
ALTER TABLE [User] CHECK CONSTRAINT [User_fk0]
GO

ALTER TABLE [UserLogin] WITH CHECK ADD CONSTRAINT [UserLogin_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

GO
ALTER TABLE [UserLogin] CHECK CONSTRAINT [UserLogin_fk0]
GO

ALTER TABLE [UserLogin] WITH CHECK ADD CONSTRAINT [UserLogin_fk1] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [DirectoryType]([Id])
GO

ALTER TABLE [UserLogin] CHECK CONSTRAINT [UserLogin_fk1]
GO

ALTER TABLE [TMUserGroup] WITH CHECK ADD CONSTRAINT [TMUserGroup_fk0] FOREIGN KEY ([GroupId]) REFERENCES [TMGroup]([Id])

GO
ALTER TABLE [TMUserGroup] CHECK CONSTRAINT [TMUserGroup_fk0]
GO
ALTER TABLE [TMUserGroup] WITH CHECK ADD CONSTRAINT [TMUserGroup_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

GO
ALTER TABLE [TMUserGroup] CHECK CONSTRAINT [TMUserGroup_fk1]
GO

ALTER TABLE [TMGroup] WITH CHECK ADD CONSTRAINT [TMGroup_fk0] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [DirectoryType]([Id])

GO
ALTER TABLE [TMGroup] CHECK CONSTRAINT [TMGroup_fk0]
GO

ALTER TABLE [TenantUser] WITH CHECK ADD CONSTRAINT [TenantUser_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

GO
ALTER TABLE [TenantUser] CHECK CONSTRAINT [TenantUser_fk0]
GO
ALTER TABLE [TenantUser] WITH CHECK ADD CONSTRAINT [TenantUser_fk1] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

GO
ALTER TABLE [TenantUser] CHECK CONSTRAINT [TenantUser_fk1]
GO

ALTER TABLE [Schedule] WITH CHECK ADD CONSTRAINT [Schedule_fk0] FOREIGN KEY ([RecurrenceTypeId]) REFERENCES [RecurrenceType]([Id])

GO
ALTER TABLE [Schedule] CHECK CONSTRAINT [Schedule_fk0]
GO
ALTER TABLE [Schedule] WITH CHECK ADD CONSTRAINT [Schedule_fk1] FOREIGN KEY ([ScheduleTypeId]) REFERENCES [ScheduleType]([id])

GO
ALTER TABLE [Schedule] CHECK CONSTRAINT [Schedule_fk1]
GO
ALTER TABLE [Schedule] WITH CHECK ADD CONSTRAINT [Schedule_fk2] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])

GO
ALTER TABLE [Schedule] CHECK CONSTRAINT [Schedule_fk2]
GO
ALTER TABLE [Schedule] WITH CHECK ADD CONSTRAINT [Schedule_fk3] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])

GO
ALTER TABLE [Schedule] CHECK CONSTRAINT [Schedule_fk3]
GO

ALTER TABLE [ScheduleLog] WITH CHECK ADD CONSTRAINT [ScheduleLog_fk0] FOREIGN KEY ([ScheduleId]) REFERENCES [Schedule]([id])

GO
ALTER TABLE [ScheduleLog] CHECK CONSTRAINT [ScheduleLog_fk0]
GO
ALTER TABLE [ScheduleLog] WITH CHECK ADD CONSTRAINT [ScheduleLog_fk1] FOREIGN KEY ([ScheduleStatusId]) REFERENCES [ScheduleStatus]([Id])

GO
ALTER TABLE [ScheduleLog] CHECK CONSTRAINT [ScheduleLog_fk1]
GO

ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [TenantInfo_fk0] FOREIGN KEY ([TenantId]) REFERENCES [Tenant]([Id])

GO
ALTER TABLE [TenantInfo] CHECK CONSTRAINT [TenantInfo_fk0]
GO
ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [TenantInfo_fk1] FOREIGN KEY ([TenantTypeId]) REFERENCES [TenantType]([Id])

GO
ALTER TABLE [TenantInfo] CHECK CONSTRAINT [TenantInfo_fk1]
GO
ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [TenantInfo_fk2] FOREIGN KEY ([SaaSPlanId]) REFERENCES [SaaSPlan]([Id])

GO
ALTER TABLE [TenantInfo] CHECK CONSTRAINT [TenantInfo_fk2]
GO
ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [TenantInfo_fk3] FOREIGN KEY ([TenantSQLServerId]) REFERENCES [SqlServer]([Id])

GO
ALTER TABLE [TenantInfo] CHECK CONSTRAINT [TenantInfo_fk3]
GO
ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [TenantInfo_fk4] FOREIGN KEY ([ElasticPoolId]) REFERENCES [SqlElasticPool]([Id])

GO
ALTER TABLE [TenantInfo] CHECK CONSTRAINT [TenantInfo_fk4]
GO
ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [TenantInfo_fk5] FOREIGN KEY ([TenantStatus]) REFERENCES [TenantStatus]([Id])

GO
ALTER TABLE [TenantInfo] CHECK CONSTRAINT [TenantInfo_fk5]
GO

ALTER TABLE [UserBillingAddress] WITH CHECK ADD CONSTRAINT [UserBillingAddress_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserBillingAddress] WITH CHECK ADD CONSTRAINT [UserBillingAddress_fk1] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [UserBillingAddress] CHECK CONSTRAINT [UserBillingAddress_fk0]
GO

ALTER TABLE [AccountDeleteRequest] WITH CHECK ADD CONSTRAINT [AccountDeleteRequest_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

GO
ALTER TABLE [AccountDeleteRequest] CHECK CONSTRAINT [AccountDeleteRequest_fk0]

GO

ALTER TABLE [TenantAddon] WITH CHECK ADD CONSTRAINT [TenantAddon_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [TenantAddon] CHECK CONSTRAINT [TenantAddon_fk0]
GO
ALTER TABLE [TenantAddon] WITH CHECK ADD CONSTRAINT [TenantAddon_fk1] FOREIGN KEY ([AddonId]) REFERENCES [Addon]([Id])
GO
ALTER TABLE [TenantAddon] CHECK CONSTRAINT [TenantAddon_fk1]
GO

ALTER TABLE [CustomPlan] WITH CHECK ADD CONSTRAINT [CustomPlan_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [CustomPlan] CHECK CONSTRAINT [CustomPlan_fk0]
GO

ALTER TABLE [ExternalIdP] WITH CHECK ADD CONSTRAINT [ExternalIdP_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [ExternalIdP] CHECK CONSTRAINT [ExternalIdP_fk0]
GO
ALTER TABLE [ExternalIdP] WITH CHECK ADD CONSTRAINT [ExternalIdP_fk1] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [DirectoryType]([Id])
GO
ALTER TABLE [ExternalIdP] CHECK CONSTRAINT [ExternalIdP_fk1]
GO
ALTER TABLE [ExternalIdP] WITH CHECK ADD CONSTRAINT [ExternalIdP_fk2] FOREIGN KEY ([CredentialTypeId]) REFERENCES [IdPCredentialType]([Id])
GO
ALTER TABLE [ExternalIdP] CHECK CONSTRAINT [ExternalIdP_fk2]
GO

ALTER TABLE [TMUser] WITH CHECK ADD CONSTRAINT [TMUser_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [TMUser] CHECK CONSTRAINT [TMUser_fk0]
GO
ALTER TABLE [SqlServer] WITH CHECK ADD CONSTRAINT [SqlServer_fk0] FOREIGN KEY ([SqlServerType]) REFERENCES [SqlServerType]([Id])
Go
ALTER TABLE [SqlElasticPool] WITH CHECK ADD CONSTRAINT [SqlElasticPool_fk1] FOREIGN KEY ([SqlServerType]) REFERENCES [SqlServerType]([Id])
Go
ALTER TABLE [SqlElasticPool] WITH CHECK ADD CONSTRAINT [SqlElasticPool_fk2] FOREIGN KEY ([TenantType]) REFERENCES [TenantType]([Id])
Go
ALTER TABLE [SqlServer] WITH CHECK ADD CONSTRAINT [SqlServer_fk1] FOREIGN KEY ([TenantType]) REFERENCES [TenantType]([Id])
Go
ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [ImDbElasticPoolId] FOREIGN KEY ([ImDbElasticPoolId]) REFERENCES [SqlElasticPool]([Id])
Go
ALTER TABLE [TenantInfo] WITH CHECK ADD CONSTRAINT [IDbSqlServerId] FOREIGN KEY ([ImDbSqlServerId]) REFERENCES [SqlServer]([Id])
Go
ALTER TABLE [RegistrationFormVersion] WITH CHECK ADD CONSTRAINT [RegistrationFormVersion_fk0] FOREIGN KEY ([FormTypeId]) REFERENCES [FormType]([Id])

GO

ALTER TABLE [PrivacyAcceptance] WITH CHECK ADD CONSTRAINT [PrivacyAcceptance_fk0] FOREIGN KEY ([PrivacyPolicyVersion]) REFERENCES [PrivacyPolicyVersion]([Id])

GO

ALTER TABLE [PrivacyAcceptance] WITH CHECK ADD CONSTRAINT [PrivacyAcceptance_fk1] FOREIGN KEY ([TermsOfUseVersion]) REFERENCES [TermsOfUseVersion]([Id])

GO

ALTER TABLE [PrivacyAcceptance] WITH CHECK ADD CONSTRAINT [PrivacyAcceptance_fk2] FOREIGN KEY ([RegistrationFormVersion]) REFERENCES [RegistrationFormVersion]([Id])

GO
ALTER TABLE [FeedBack] WITH CHECK ADD CONSTRAINT [FeedBack_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

Go

ALTER TABLE [FeedBack] WITH CHECK ADD CONSTRAINT [FeedBack_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

Go

ALTER TABLE [Support] WITH CHECK ADD CONSTRAINT [Support_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

Go

ALTER TABLE [Support] WITH CHECK ADD CONSTRAINT [Support_fk1] FOREIGN KEY ([CreatedBy]) REFERENCES [User]([Id])

Go

ALTER TABLE [TenantActivity] WITH CHECK ADD CONSTRAINT [TenantActivity_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

Go

ALTER TABLE [TenantActivity] WITH CHECK ADD CONSTRAINT [TenantActivity_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

Go

ALTER TABLE [PreviewFeatures] WITH CHECK ADD CONSTRAINT [PreviewFeatures_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

Go

ALTER TABLE [KcTenants] WITH CHECK ADD CONSTRAINT [KcTenant_FK0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])

Go

ALTER TABLE [SSLCertificate] WITH CHECK ADD CONSTRAINT [SSLCertificate_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])

GO

ALTER TABLE [SSLMapping] WITH CHECK ADD CONSTRAINT [SSLMapping_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])

GO

ALTER TABLE [SSLMapping] WITH CHECK ADD CONSTRAINT [SSLMapping_fk1] FOREIGN KEY ([TenantId]) REFERENCES [Tenant]([Id])

GO

ALTER TABLE [SSLMapping] WITH CHECK ADD CONSTRAINT [SSLMapping_fk2] FOREIGN KEY ([CertificateId]) REFERENCES [SSLCertificate]([Id])

GO

ALTER TABLE [SaaSPlan] WITH CHECK ADD CONSTRAINT [SaaSPlan_fk1] FOREIGN KEY ([TenantTypeId]) REFERENCES [TenantType]([Id])

GO
ALTER TABLE [SaaSPlan] CHECK CONSTRAINT [SaaSPlan_fk1]
GO

ALTER TABLE [SaaSPlan] WITH CHECK ADD CONSTRAINT [SaaSPlan_fk2] FOREIGN KEY ([BillingIntervalId]) REFERENCES [BillingInterval]([Id])
GO
ALTER TABLE [SaaSPlan] CHECK CONSTRAINT [SaaSPlan_fk2]
GO

ALTER TABLE [ProductVersion] WITH CHECK ADD CONSTRAINT [ProductVersion_fk0] FOREIGN KEY ([ProductTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [ProductVersion] CHECK CONSTRAINT [ProductVersion_fk0]
GO
ALTER TABLE [ProductVersion] WITH CHECK ADD CONSTRAINT [ProductVersion_fk1] FOREIGN KEY ([ReleaseTypeId]) REFERENCES [ReleaseType]([Id])
GO
ALTER TABLE [ProductVersion] CHECK CONSTRAINT [ProductVersion_fk1]
GO
ALTER TABLE [SubscriptionUsage] WITH CHECK ADD CONSTRAINT [SubscriptionUsage_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [SubscriptionUsage] CHECK CONSTRAINT [SubscriptionUsage_fk0]
GO
ALTER TABLE [SubscriptionUsage] WITH CHECK ADD CONSTRAINT [SubscriptionUsage_fk1] FOREIGN KEY ([ProductVersionId]) REFERENCES [ProductVersion]([Id])
GO
ALTER TABLE [SubscriptionUsage] CHECK CONSTRAINT [SubscriptionUsage_fk1]
GO
ALTER TABLE [TenantVersion] WITH CHECK ADD CONSTRAINT [TenantVersion_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [TenantVersion] CHECK CONSTRAINT [TenantVersion_fk0]
GO
ALTER TABLE [TenantVersion] WITH CHECK ADD CONSTRAINT [TenantVersion_fk1] FOREIGN KEY ([ProductVersionId]) REFERENCES [ProductVersion]([Id])
GO
ALTER TABLE [TenantVersion] CHECK CONSTRAINT [TenantVersion_fk1]
GO

ALTER TABLE [IntranetProductType] WITH CHECK ADD CONSTRAINT [IntranetProductType_fk0] FOREIGN KEY ([PlanId]) REFERENCES [SaasPlan]([Id])
GO
ALTER TABLE [IntranetProductType] CHECK CONSTRAINT [IntranetProductType_fk0]
GO
ALTER TABLE [IntranetProductType] WITH CHECK ADD CONSTRAINT [IntranetProductType_fk1] FOREIGN KEY ([OrderTypeId]) REFERENCES [OrderType]([Id])
GO
ALTER TABLE [IntranetProductType] CHECK CONSTRAINT [IntranetProductType_fk1]
GO

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

ALTER TABLE [EmailValidation] WITH CHECK ADD CONSTRAINT [EmailValidation_fk0] FOREIGN KEY ([SaaSPlanId]) REFERENCES [SaaSPlan]([Id])
GO
ALTER TABLE [EmailValidation] CHECK CONSTRAINT [EmailValidation_fk0]
GO
ALTER TABLE [EmailValidation] WITH CHECK ADD CONSTRAINT [EmailValidation_fk1] FOREIGN KEY ([ProductId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [EmailValidation] CHECK CONSTRAINT [EmailValidation_fk1]
GO

ALTER TABLE [SalesRequests] WITH CHECK ADD CONSTRAINT [SalesRequests_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
Go
ALTER TABLE [SalesRequests] CHECK CONSTRAINT [SalesRequests_fk0]
GO
ALTER TABLE [SalesRequests] WITH CHECK ADD CONSTRAINT [SalesRequests_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
Go
ALTER TABLE [SalesRequests] CHECK CONSTRAINT [SalesRequests_fk1]
GO

ALTER TABLE [UserLog] WITH CHECK ADD CONSTRAINT [UserLog_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
Go
ALTER TABLE [UserLog] CHECK CONSTRAINT [UserLog_fk1]
GO
ALTER TABLE [UserLog] WITH CHECK ADD CONSTRAINT [UserLog_fk2] FOREIGN KEY ([RequestedById]) REFERENCES [User]([Id])
Go
ALTER TABLE [UserLog] CHECK CONSTRAINT [UserLog_fk2]
GO

ALTER TABLE [LicenseBenefits] WITH CHECK ADD CONSTRAINT [LicenseBenefits_fk1] FOREIGN KEY ([TenantStatus]) REFERENCES [TenantStatus]([Id])
GO
ALTER TABLE [LicenseBenefits] CHECK CONSTRAINT [LicenseBenefits_fk1]
GO

ALTER TABLE [LicenseBenefits]  WITH CHECK ADD  CONSTRAINT [LicenseBenefits_fk2] FOREIGN KEY([CreatedBy]) REFERENCES [User] ([Id])

GO
ALTER TABLE [LicenseBenefits] CHECK CONSTRAINT [LicenseBenefits_fk2]
GO

ALTER TABLE [Group] WITH CHECK ADD CONSTRAINT [Group_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Group] CHECK CONSTRAINT [Group_fk0]
GO
ALTER TABLE [Group] WITH CHECK ADD CONSTRAINT [Group_fk1] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Group] CHECK CONSTRAINT [Group_fk1]
GO
ALTER TABLE [Group] WITH CHECK ADD CONSTRAINT [Group_fk2] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [DirectoryType]([Id])
GO
ALTER TABLE [Group] CHECK CONSTRAINT [Group_fk2]
GO

ALTER TABLE [Organization] WITH CHECK ADD CONSTRAINT [Organization_fk0] FOREIGN KEY ([OwnerId]) REFERENCES [User]([Id])
GO
ALTER TABLE [Organization] CHECK CONSTRAINT [Organization_fk0]
GO
ALTER TABLE [Organization] WITH CHECK ADD CONSTRAINT [Organization_fk1] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Organization] CHECK CONSTRAINT [Organization_fk1]
GO
ALTER TABLE [Organization] WITH CHECK ADD CONSTRAINT [Organization_fk2] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Organization] CHECK CONSTRAINT [Organization_fk2]
GO

ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk0]
GO
ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk1]
GO
ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk2] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk2]
GO
ALTER TABLE [OrgUser] WITH CHECK ADD CONSTRAINT [OrgUser_fk3] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgUser] CHECK CONSTRAINT [OrgUser_fk3]
GO

ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk0]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk1] FOREIGN KEY([SubscriptionId]) REFERENCES [TenantInfo] ([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk1]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk2] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk2]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk3] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk3]
GO
ALTER TABLE [OrgGroup] WITH CHECK ADD CONSTRAINT [OrgGroup_fk4] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroup] CHECK CONSTRAINT [OrgGroup_fk4]
GO

ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk0] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk0]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk1] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk1]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk2] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk2]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk3] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk3]
GO
ALTER TABLE [OrgGroupMember] WITH CHECK ADD CONSTRAINT [OrgGroupMember_fk4] FOREIGN KEY ([GroupRoleId]) REFERENCES [GroupRole]([Id])
GO
ALTER TABLE [OrgGroupMember] CHECK CONSTRAINT [OrgGroupMember_fk4]
GO

ALTER TABLE [Roles] WITH CHECK ADD CONSTRAINT [Roles_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Roles] CHECK CONSTRAINT [Roles_fk0]
GO
ALTER TABLE [Roles] WITH CHECK ADD CONSTRAINT [Roles_fk1] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [Roles] CHECK CONSTRAINT [Roles_fk1]
GO

ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk0] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk0]
GO
ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk1] FOREIGN KEY ([ProductTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk1]
GO
ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk2] FOREIGN KEY ([ResourceTypeId]) REFERENCES [ResourceType]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk2]
GO
ALTER TABLE [RoleDefinitions] WITH CHECK ADD CONSTRAINT [RoleDefinitions_fk3] FOREIGN KEY ([ActionId]) REFERENCES [IAMActions]([Id])
GO
ALTER TABLE [RoleDefinitions] CHECK CONSTRAINT [RoleDefinitions_fk3]
GO

ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk0]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk1] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk1]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk2] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk2]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk3] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk3]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk4] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk4]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk5] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk5]
GO
ALTER TABLE [UserRoles] WITH CHECK ADD CONSTRAINT [UserRoles_fk6] FOREIGN KEY ([ResourceTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [UserRoles] CHECK CONSTRAINT [UserRoles_fk6]
GO

ALTER TABLE [APILogs] WITH CHECK ADD CONSTRAINT [APILogs_fk1] FOREIGN KEY ([Source]) REFERENCES [SourceType]([Id])
GO
ALTER TABLE [APILogs] CHECK CONSTRAINT [APILogs_fk1]
GO

ALTER TABLE [FeatureConfiguration] WITH CHECK ADD CONSTRAINT [FeatureConfiguration_fk1] FOREIGN KEY ([TenantTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [FeatureConfiguration] CHECK CONSTRAINT [FeatureConfiguration_fk1]
GO

ALTER TABLE [dbo].[ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk0] FOREIGN KEY([Scope]) REFERENCES [ResourceScopes]([Id])
GO
ALTER TABLE [dbo].[ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk0]
GO
ALTER TABLE [dbo].[ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk1] FOREIGN KEY([ProductTypeId]) REFERENCES [TenantType]([Id])
GO
ALTER TABLE [dbo].[ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk1]
GO
ALTER TABLE [dbo].[ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk2] FOREIGN KEY ([ResourceTypeId]) REFERENCES [ResourceType]([Id])
GO
ALTER TABLE [dbo].[ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk2]
GO
ALTER TABLE [dbo].[ResourcePermissions]  WITH CHECK ADD  CONSTRAINT [ResourcePermissions_fk3] FOREIGN KEY ([AccessId]) REFERENCES [IAMActions]([AccessId])
GO
ALTER TABLE [dbo].[ResourcePermissions] CHECK CONSTRAINT [ResourcePermissions_fk3]
GO

ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk0]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk1] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk1]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk2] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk2]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk3] FOREIGN KEY ([ResourcePermissionId]) REFERENCES [ResourcePermissions]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk3]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk4] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk4]
GO
ALTER TABLE [UserPermissions] WITH CHECK ADD CONSTRAINT [UserPermissions_fk5] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [UserPermissions] CHECK CONSTRAINT [UserPermissions_fk5]
GO

ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk0] FOREIGN KEY ([OrgId]) REFERENCES [Organization]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk0]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk1] FOREIGN KEY ([SubscriptionId]) REFERENCES [TenantInfo]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk1]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk2] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk2]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk3] FOREIGN KEY ([ResourcePermissionId]) REFERENCES [ResourcePermissions]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk3]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk4] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk4]
GO
ALTER TABLE [GroupPermissions] WITH CHECK ADD CONSTRAINT [GroupPermissions_fk5] FOREIGN KEY ([ModifiedById]) REFERENCES [User]([Id])
GO
ALTER TABLE [GroupPermissions] CHECK CONSTRAINT [GroupPermissions_fk5]
GO

ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk0] FOREIGN KEY([OrgId]) REFERENCES [Organization] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk0]
GO
ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk1] FOREIGN KEY([SubscriptionId]) REFERENCES [TenantInfo] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk1]
GO
ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk2] FOREIGN KEY([AffectedUserId]) REFERENCES [User] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk2]
GO
ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk3] FOREIGN KEY([UserPermissionId]) REFERENCES [UserPermissions] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk3]
GO
ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk4] FOREIGN KEY([AffectedGroupId]) REFERENCES [Group] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk4]
GO
ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk5] FOREIGN KEY([GroupPermissionId]) REFERENCES [GroupPermissions] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk5]
GO
ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk6] FOREIGN KEY([RequestedById]) REFERENCES [User] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk6]
GO
ALTER TABLE [dbo].[PermissionLog]  WITH CHECK ADD  CONSTRAINT [PermissionLog_fk7] FOREIGN KEY([SourceTypeId]) REFERENCES [TenantType] ([Id])
GO
ALTER TABLE [PermissionLog] CHECK CONSTRAINT [PermissionLog_fk7]
GO

--development & staging product ids
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 7, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 7, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 8, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 8, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 9, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 9, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7822, N'BoldBI', 1, 10, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 10, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7824, N'Others', null, null, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBIAdditionalDataStorage', null, null, 1)

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

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7873, N'Bold BI Enterprise (Custom)', 1, 20, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7875, N'Bold BI Enterprise (Custom) Subscription', 2, 20, 1)

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

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7878, N'BoldReportsOnPremiseSingleTenantBusiness10', 1, 29, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7879, N'BoldReportsOnPremiseSingleTenantBusiness10Subscription', 2, 29, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7880, N'BoldReportsOnPremiseSingleTenantBusiness25', 1, 30, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7881, N'BoldReportsOnPremiseSingleTenantBusiness25Subscription', 2, 30, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7882, N'BoldReportsOnPremiseSingleTenantBusiness50', 1, 31, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7883, N'BoldReportsOnPremiseSingleTenantBusiness50Subscription', 2, 31, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7884, N'BoldReportsOnPremiseSingleTenantEnterprise', 1, 32, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7885, N'BoldReportsOnPremiseSingleTenantEnterpriseSubscription', 2, 32, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7894, N'BoldReportsOnPremiseSingleTenantCustom', 1, 33, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7895, N'BoldReportsOnPremiseSingleTenantCustomSubscription', 2, 33, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7896, N'Bold Reports Embedded', 1, 34, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7897, N'Bold Reports Embedded Subscription', 2, 34, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7898, N'Bold Reports Startup', 1, 35, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7899, N'Bold Reports Startup Subscription', 2, 35, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7900, N'Bold Reports Small Business', 1, 36, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7901, N'Bold Reports Small Business Subscription', 2, 36, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7902, N'Bold Reports Startup Embedded', 1, 37, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7903, N'Bold Reports Startup Embedded Subscription', 2, 37, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7904, N'Bold Reports Small Business Embedded', 1, 38, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7905, N'Bold Reports Small Business Embedded Subscription', 2, 38, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7906, N'Bold Reports Multi-tenant - Enterprise', 1, 39, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7907, N'Bold Reports Multi-tenant - Enterprise Subscription', 2, 39, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7908, N'Bold Reports Multi-tenant - Startup', 1, 40, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7909, N'Bold Reports Multi-tenant - Startup Subscription', 2, 40, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7910, N'Bold Reports Multi-tenant - Small Business', 1, 41, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7911, N'Bold Reports Multi-tenant - Small Business Subscription', 2, 41, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7916, N'Bold Reports On-Premise Viewer SDK', 1, 42, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7915, N'Bold Reports On-Premise Viewer SDK Subscription', 2, 42, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7917, N'Bold Reports On-Premise Embedded - Custom', 1, 43, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7918, N'Bold Reports On-Premise Embedded - Custom Subscription', 2, 43, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7927, N'Bold BI Annual Custom', 1, 44, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7928, N'Bold BI Annual Custom Subscription', 2, 44, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7929, N'Bold BI Enterprise (Custom) Annual', 1, 45, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7930, N'BBold BI Enterprise (Custom) Annual Subscription', 2, 45, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7931, N'Bold Reports On-Premise Annual Custom', 1, 46, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7932, N'Bold Reports On-Premise Annual Custom Subscription', 2, 46, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7933, N'Bold Reports On-Premise Viewer SDK Annual Custom', 1, 47, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7934, N'Bold Reports On-Premise Viewer SDK Annual Custom Subscription', 2, 47, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7935, N'Bold BI Cloud Half-Yearly (Custom)', 1, 48, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7936, N'Bold BI Cloud Half-Yearly Subscription (Custom)', 2, 48, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7939, N'Bold BI Enterprise Half-Yearly (Custom)', 1, 49, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7940, N'Bold BI Enterprise Half-Yearly (Custom) Subscription', 2, 49, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7943, N'Bold Reports On-Premise Half-Yearly (Custom)', 1, 50, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7944, N'Bold Reports On-Premise Half-Yearly Subscription (Custom)', 2, 50, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7945, N'Bold Reports Viewer SDK Half-Yearly (Custom)', 1, 51, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7946, N'Bold Reports Viewer SDK Half-Yearly Subscription (Custom)', 2, 51, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7937, N'Bold BI Cloud Quarterly (Custom)', 1, 52, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7938, N'Bold BI Cloud Quarterly Subscription (Custom)', 2, 52, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7941, N'Bold BI Enterprise Quarterly (Custom)', 1, 53, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7942, N'Bold BI Enterprise Quarterly (Custom) Subscription', 2, 53, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7947, N'Bold Reports On-Premise Quarterly (Custom)', 1, 54, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7948, N'Bold Reports On-Premise Quarterly Subscription (Custom)', 2, 54, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7949, N'Bold Reports Viewer SDK Quarterly (Custom)', 1, 55, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7950, N'Bold Reports Viewer SDK Quarterly Subscription (Custom)', 2, 55, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7951, N'Bold BI Custom Embedded', 1, 56, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7952, N'Bold BI Custom Embedded Subscription', 2, 56, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7953, N'Bold BI Custom Embedded Annual', 1, 57, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7954, N'Bold BI Custom Embedded Annual Subscription', 2, 57, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7955, N'Bold BI Custom Embedded Half-Yearly', 1, 58, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7956, N'Bold BI Custom Embedded Half-Yearly Subscription', 2, 58, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7957, N'Bold BI Custom Embedded Quarterly', 1, 59, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7958, N'Bold BI Custom Embedded Quarterly Subscription', 2, 59, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7959, N'Bold BI Embedded Custom', 1, 60, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7960, N'Bold BI Embedded Custom Subscription', 2, 60, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7961, N'Bold BI Embedded Custom Annual', 1, 61, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7962, N'Bold BI Embedded Custom Annual Subscription', 2, 61, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7963, N'Bold BI Embedded Custom Half-Yearly', 1, 62, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7964, N'Bold BI Embedded Custom Half-Yearly Subscription', 2, 62, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7965, N'Bold BI Embedded Custom Quarterly', 1, 63, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7966, N'Bold BI Embedded Custom Quarterly Subscription', 2, 63, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7967, N'Bold Reports On-Premise Custom Embedded', 1, 64, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7968, N'Bold Reports On-Premise Custom Embedded Subscription', 2, 64, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7969, N'Bold Reports On-Premise Custom Embedded Annual', 1, 65, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7970, N'Bold Reports On-Premise Custom Embedded Annual Subscription', 2, 65, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7971, N'Bold Reports On-Premise Custom Embedded Half-Yearly', 1, 66, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7972, N'Bold Reports On-Premise Custom Embedded Half-Yearly Subscription', 2, 66, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7973, N'Bold Reports On-Premise Custom Embedded Quarterly', 1, 67, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7974, N'Bold Reports On-Premise Custom Embedded Quarterly Subscription', 2, 67, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8007, N'Bold BI Cloud Business 5', 1, 68, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8008, N'Bold BI Cloud Business 5 Subscription', 2, 68, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8009, N'Bold BI Cloud Premium', 1, 69, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8010, N'Bold BI Cloud Premium Subscription', 2, 69, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8011, N'Bold Reports Cloud Single User', 1, 70, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8012, N'Bold Reports Cloud Single User Subscription', 2, 70, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8013, N'Bold Reports Cloud Business 5', 1, 71, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8014, N'Bold Reports Cloud Business 5 Subscription', 2, 71, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8015, N'Bold Reports Cloud Business 10', 1, 72, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8016, N'Bold Reports Cloud Business 10 Subscription', 2, 72, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8017, N'Bold Reports Cloud Premium', 1, 73, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8018, N'Bold Reports Cloud Premium Subscription', 2, 73, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8019, N'Bold Reports Cloud Custom', 1, 74, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8020, N'Bold Reports Cloud Custom Subscription', 2, 74, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8027, N'Bold BI Enterprise Standard', 1, 75, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8028, N'Bold BI Enterprise Standard Subscription', 2, 75, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8031, N'Bold Reports On-Premise Standard', 1, 76, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8032, N'Bold Reports On-Premise Standard', 2, 76, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8029, N'Bold BI On-Premise Embedded Standard', 1, 77, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8030, N'Bold BI On-Premise Embedded Standard Subscription', 2, 77, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8033, N'Bold Reports On-Premise Embedded Standard', 1, 78, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8034, N'Bold Reports On-Premise Embedded Standard Subscription', 2, 78, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8021, N'Bold Reports Cloud Bold Reports Custom', 1, 79, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8022, N'Bold Reports Cloud Bold Reports Custom Subscription', 2, 79, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8023, N'Bold Reports Cloud Half-Yearly Custom', 1, 80, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8024, N'Bold Reports Cloud Half-Yearly Custom Subscription', 2, 80, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8025, N'Bold Reports Cloud Quarterly Custom', 1, 81, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8026, N'Bold Reports Cloud Quarterly Custom Subscription', 2, 81, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8035, N'Bold Sign Solo', 1, 82, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8036, N'Bold Sign Solo Subscription', 2, 82, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8037, N'Bold Sign Starter', 1, 83, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8038, N'Bold Sign Starter Subscription', 2, 83, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8039, N'Bold Sign Professional', 1, 84, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8040, N'Bold Sign Professional Subscription', 2, 84, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8041, N'Bold Sign Business', 1, 85, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8042, N'Bold Sign Business Subscription', 2, 85, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8043, N'Bold Sign Custom', 1, 86, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8044, N'Bold Sign Custom Subscription', 2, 86, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8045, N'Bold Sign Starter Yearly', 1, 87, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8046, N'Bold Sign Starter Yearly Subscription', 2, 87, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8047, N'Bold Sign Professional Yearly', 1, 88, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8048, N'Bold Sign Professional Yearly Subscription', 2, 88, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8049, N'Bold Sign Business Yearly', 1, 89, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8050, N'Bold Sign Business Yearly Subscription', 2, 89, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8051, N'Bold Sign Custom Yearly', 1, 90, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8052, N'Bold Sign Custom Yearly Subscription', 2, 90, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8060, N'Bold Reports Viewer SDK', 1, 94, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8061, N'Bold Reports Viewer SDK Subscription', 2, 94, 1)

--production product ids - check with website team before using this query.

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 7, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 7, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 8, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 8, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 9, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 9, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7826, N'BoldBI', 1, 10, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7823, N'BoldBISubscription', 2, 10, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7824, N'Others', null, null, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7827, N'BoldBIAdditionalDataStorage', null, null, 1)

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

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7872, N'Bold BI Enterprise (Custom)', 1, 20, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7874, N'Bold BI Enterprise (Custom) Subscription', 2, 20, 1)

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

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7885, N'BoldReportsOnPremiseSingleTenantBusiness10', 1, 29, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7886, N'BoldReportsOnPremiseSingleTenantBusiness10Subscription', 2, 29, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7887, N'BoldReportsOnPremiseSingleTenantBusiness25', 1, 30, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7888, N'BoldReportsOnPremiseSingleTenantBusiness25Subscription', 2, 30, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7889, N'BoldReportsOnPremiseSingleTenantBusiness50', 1, 31, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7890, N'BoldReportsOnPremiseSingleTenantBusiness50Subscription', 2, 31, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7891, N'BoldReportsOnPremiseSingleTenantEnterprise', 1, 32, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7892, N'BoldReportsOnPremiseSingleTenantEnterpriseSubscription', 2, 32, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7893, N'BoldReportsOnPremiseSingleTenantCustom', 1, 33, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7894, N'BoldReportsOnPremiseSingleTenantCustomSubscription', 2, 33, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7895, N'Bold Reports Embedded', 1, 34, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7896, N'Bold Reports Embedded Subscription', 2, 34, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7897, N'Bold Reports Startup', 1, 35, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7898, N'Bold Reports Startup Subscription', 2, 35, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7899, N'Bold Reports Small Business', 1, 36, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7900, N'Bold Reports Small Business Subscription', 2, 36, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7901, N'Bold Reports Startup Embedded', 1, 37, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7902, N'Bold Reports Startup Embedded Subscription', 2, 37, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7903, N'Bold Reports Small Business Embedded', 1, 38, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7904, N'Bold Reports Small Business Embedded Subscription', 2, 38, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7905, N'Bold Reports Multi-tenant - Enterprise', 1, 39, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7906, N'Bold Reports Multi-tenant - Enterprise Subscription', 2, 39, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7907, N'Bold Reports Multi-tenant - Startup', 1, 40, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7908, N'Bold Reports Multi-tenant - Startup Subscription', 2, 40, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7909, N'Bold Reports Multi-tenant - Small Business', 1, 41, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7910, N'Bold Reports Multi-tenant - Small Business Subscription', 2, 41, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7913, N'Bold Reports On-Premise Viewer SDK', 1, 42, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7914, N'Bold Reports On-Premise Viewer SDK Subscription', 2, 42, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7915, N'Bold Reports On-Premise Embedded - Custom', 1, 43, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7916, N'Bold Reports On-Premise Embedded - Custom Subscription', 2, 43, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7925, N'Bold BI Annual Custom', 1, 44, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7926, N'Bold BI Annual Custom Subscription', 2, 44, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7927, N'Bold BI Enterprise (Custom) Annual', 1, 45, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7928, N'Bold BI Enterprise (Custom) Annual Subscription', 2, 45, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7929, N'Bold Reports On-Premise Annual Custom', 1, 46, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7930, N'Bold Reports On-Premise Annual Custom Subscription', 2, 46, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7931, N'Bold Reports On-Premise Viewer SDK Annual Custom', 1, 47, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7932, N'Bold Reports On-Premise Viewer SDK Annual Custom Subscription', 2, 47, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7933, N'Bold BI Cloud Half-Yearly (Custom)', 1, 48, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7934, N'Bold BI Cloud Half-Yearly Subscription (Custom)', 2, 48, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7937, N'Bold BI Enterprise Half-Yearly (Custom)', 1, 49, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7938, N'Bold BI Enterprise Half-Yearly (Custom) Subscription', 2, 49, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7941, N'Bold Reports On-Premise Half-Yearly (Custom)', 1, 50, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7942, N'Bold Reports On-Premise Half-Yearly Subscription (Custom)', 2, 50, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7943, N'Bold Reports Viewer SDK Half-Yearly (Custom)', 1, 51, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7944, N'Bold Reports Viewer SDK Half-Yearly Subscription (Custom)', 2, 51, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7935, N'Bold BI Cloud Quarterly (Custom)', 1, 52, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7936, N'Bold BI Cloud Quarterly Subscription (Custom)', 2, 52, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7939, N'Bold BI Enterprise Quarterly (Custom)', 1, 53, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7940, N'Bold BI Enterprise Quarterly (Custom) Subscription', 2, 53, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7945, N'Bold Reports On-Premise Quarterly (Custom)', 1, 54, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7946, N'Bold Reports On-Premise Quarterly Subscription (Custom)', 2, 54, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7947, N'Bold Reports Viewer SDK Quarterly (Custom)', 1, 55, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7948, N'Bold Reports Viewer SDK Quarterly Subscription (Custom)', 2, 55, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7949, N'Bold BI Custom Embedded', 1, 56, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7950, N'Bold BI Custom Embedded Subscription', 2, 56, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7951, N'Bold BI Custom Embedded Annual', 1, 57, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7952, N'Bold BI Custom Embedded Annual Subscription', 2, 57, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7953, N'Bold BI Custom Embedded Half-Yearly', 1, 58, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7954, N'Bold BI Custom Embedded Half-Yearly Subscription', 2, 58, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7955, N'Bold BI Custom Embedded Quarterly', 1, 59, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7956, N'Bold BI Custom Embedded Quarterly Subscription', 2, 59, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7957, N'Bold BI Embedded Custom', 1, 60, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7958, N'Bold BI Embedded Custom Subscription', 2, 60, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7959, N'Bold BI Embedded Custom Annual', 1, 61, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7960, N'Bold BI Embedded Custom Annual Subscription', 2, 61, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7961, N'Bold BI Embedded Custom Half-Yearly', 1, 62, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7962, N'Bold BI Embedded Custom Half-Yearly Subscription', 2, 62, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7963, N'Bold BI Embedded Custom Quarterly', 1, 63, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7964, N'Bold BI Embedded Custom Quarterly Subscription', 2, 63, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7965, N'Bold Reports On-Premise Custom Embedded', 1, 64, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7966, N'Bold Reports On-Premise Custom Embedded Subscription', 2, 64, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7967, N'Bold Reports On-Premise Custom Embedded Annual', 1, 65, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7968, N'Bold Reports On-Premise Custom Embedded Annual Subscription', 2, 65, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7969, N'Bold Reports On-Premise Custom Embedded Half-Yearly', 1, 66, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7970, N'Bold Reports On-Premise Custom Embedded Half-Yearly Subscription', 2, 66, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7971, N'Bold Reports On-Premise Custom Embedded Quarterly', 1, 67, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7972, N'Bold Reports On-Premise Custom Embedded Quarterly Subscription', 2, 67, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8005, N'Bold BI Cloud Business 5', 1, 68, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8006, N'Bold BI Cloud Business 5 Subscription', 2, 68, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8007, N'Bold BI Cloud Premium', 1, 69, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8008, N'Bold BI Cloud Premium Subscription', 2, 69, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8009, N'Bold Reports Cloud Single User', 1, 70, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8010, N'Bold Reports Cloud Single User Subscription', 2, 70, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8011, N'Bold Reports Cloud Business 5', 1, 71, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8012, N'Bold Reports Cloud Business 5 Subscription', 2, 71, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8013, N'Bold Reports Cloud Business 10', 1, 72, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8014, N'Bold Reports Cloud Business 10 Subscription', 2, 72, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8015, N'Bold Reports Cloud Premium', 1, 73, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8016, N'Bold Reports Cloud Premium Subscription', 2, 73, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8017, N'Bold Reports Cloud Custom', 1, 74, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8018, N'Bold Reports Cloud Custom Subscription', 2, 74, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8025, N'Bold BI Enterprise Standard', 1, 75, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8026, N'Bold BI Enterprise Standard Subscription', 2, 75, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8029, N'Bold Reports On-Premise Standard', 1, 76, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8030, N'Bold Reports On-Premise Standard', 2, 76, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8027, N'Bold BI On-Premise Embedded Standard', 1, 77, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8028, N'Bold BI On-Premise Embedded Standard Subscription', 2, 77, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8031, N'Bold Reports On-Premise Embedded Standard', 1, 78, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8032, N'Bold Reports On-Premise Embedded Standard Subscription', 2, 78, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8019, N'Bold Reports Cloud Bold Reports Custom', 1, 79, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8020, N'Bold Reports Cloud Bold Reports Custom Subscription', 2, 79, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8021, N'Bold Reports Cloud Half-Yearly Custom', 1, 80, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8022, N'Bold Reports Cloud Half-Yearly Custom Subscription', 2, 80, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8023, N'Bold Reports Cloud Quarterly Custom', 1, 81, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8024, N'Bold Reports Cloud Quarterly Custom Subscription', 2, 81, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8033, N'Bold Sign Solo', 1, 82, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8034, N'Bold Sign Solo Subscription', 2, 82, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8035, N'Bold Sign Starter', 1, 83, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8036, N'Bold Sign Starter Subscription', 2, 83, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8037, N'Bold Sign Professional', 1, 84, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8038, N'Bold Sign Professional Subscription', 2, 84, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8039, N'Bold Sign Business', 1, 85, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8040, N'Bold Sign Business Subscription', 2, 85, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8041, N'Bold Sign Custom', 1, 86, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8042, N'Bold Sign Custom Subscription', 2, 86, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8043, N'Bold Sign Starter Yearly', 1, 87, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8044, N'Bold Sign Starter Yearly Subscription', 2, 87, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8045, N'Bold Sign Professional Yearly', 1, 88, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8046, N'Bold Sign Professional Yearly Subscription', 2, 88, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8047, N'Bold Sign Business Yearly', 1, 89, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8048, N'Bold Sign Business Yearly Subscription', 2, 89, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8049, N'Bold Sign Custom Yearly', 1, 90, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8050, N'Bold Sign Custom Yearly Subscription', 2, 90, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8058, N'Bold Reports Viewer SDK', 1, 94, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (8059, N'Bold Reports Viewer SDK Subscription', 2, 94, 1)