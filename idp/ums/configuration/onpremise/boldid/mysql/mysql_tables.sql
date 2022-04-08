CREATE TABLE {database_name}.BOLDTC_CouponLogType (
	Id int NOT NULL AUTO_INCREMENT,
	Name longtext NOT NULL,
	IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_COUPONLOGTYPE PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_CouponLog (
	Id int NOT NULL AUTO_INCREMENT,
	CouponLogTypeId int NOT NULL,
	PaymentLogId char(38),
	LogComments int NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_COUPONLOG PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_TenantPaymentSubscription (
	Id char(38) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	StripeCustomerId nvarchar(255) NOT NULL UNIQUE,
	SubscriptionId nvarchar(255) NOT NULL UNIQUE,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTPAYMENTSUBSCRIPTION PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_TenantInvoiceDetails (
	Id char(38) NOT NULL,
	SubscriptionId char(38) NOT NULL,
	Amount int NOT Null,
	InvoiceId nvarchar(255) NOT NULL,
	ChargeId nvarchar(255) NOT NULL,
	PaymentDate datetime NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTINVOICEDETIALS PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_TenantPaymentLog (
	Id char(38) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	SubscriptionId char(38) NOT NULL,
	LogComments longtext NOT NULL,
	CreatedDate datetime NOT NULL,
	Status nvarchar(255) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTPAYMENTLOG PRIMARY KEY (id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_ServerVersion(
	Id int PRIMARY KEY NOT NULL,
	VersionNumber nvarchar(20) NOT NULL
)
;
CREATE TABLE {database_name}.BOLDTC_SqlServer (
	Id int NOT NULL AUTO_INCREMENT,
	ServerName nvarchar(255) NOT NULL UNIQUE,
	Username nvarchar(255) NOT NULL,
	Password nvarchar(255) NOT NULL,
	DatabaseLimit int NOT NULL,
	SqlServerType int NOT NULL,
	TenantType int NOT NULL,
	IsAvailable tinyint(1) NOT NULL DEFAULT '1',
	IsActive tinyint(1) NOT NULL DEFAULT '1',
  CONSTRAINT PK_BOLDTC_SQLSERVER PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_SqlElasticPool (
	Id int NOT NULL AUTO_INCREMENT,
	PoolName nvarchar(255) NOT NULL UNIQUE,
	SqlServerId int NOT NULL,
	DatabaseLimit int NOT NULL,
	SqlServerType int NOT NULL,
	TenantType int NOT NULL,
	IsAvailable tinyint(1) NOT NULL DEFAULT '1',
	IsActive tinyint(1) NOT NULL DEFAULT '1',
  CONSTRAINT PK_BOLDTC_SQLELASTICPOOL PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_Tenant (
	Id char(38) NOT NULL,
	DNS nvarchar(255) NOT NULL,
	Subdomain nvarchar(255) NULL,
	TenantIdentifier nvarchar(255) NULL,
	TenantName nvarchar(255)NOT NULL,
	CustomDomain nvarchar(255) NULL,
	UseSiteIdentifier tinyint NOT NULL DEFAULT 1,
	UserId char(38) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	IsDeleted tinyint(1) NOT NULL,
	IsInternal tinyint(1) NOT NULL DEFAULT 0,
  CONSTRAINT PK_BOLDTC_TENANT PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_SaaSPlan (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(255) NOT NULL,
	PlanSchema longtext,
	ModifiedDate datetime NOT NULL,
	IsInternal tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SAASPLAN PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_TenantLogType (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(100),
	IsActive tinyint(1),
  CONSTRAINT PK_BOLDTC_TENANTLOGTYPE PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_TenantLog (
	Id char(38) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	TenantLogType int NOT NULL,
	LogComments longtext,
	IpAddress nvarchar(100) NULL,
	FromStatus int Null,
	ToStatus int Not Null,
	UpdatedUserId char(38) NULL,
	SourceTypeId int Null,
	OptionalData longtext NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTLOG PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_TenantStatus (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(100) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTSTATUS PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_Coupon (
	Id int NOT NULL AUTO_INCREMENT,
	Coupon nvarchar(255) NOT NULL UNIQUE,
	CouponLimit int NOT NULL,
	CouponDuration int NOT NULL,
	CouponExpirationDate int NOT NULL,
	CreateDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	CreatedById char(38) NOT NULL,
	ModifiedById char(38) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_COUPON PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_UserPreference (
	Id char(38) NOT NULL,
	UserId char(38) NOT NULL,
	Language nvarchar(4000),
	TimeZone nvarchar(100),
	RecordSize int,
	ItemSort nvarchar(4000),
	ItemFilters nvarchar(4000),
	Notifications nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_USERPREFERENCE PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_User (
	Id char(38) NOT NULL,
	FirstName nvarchar(255) NOT NULL,
	LastName nvarchar(255),
	DisplayName nvarchar(512),
	Username nvarchar(255) NOT NULL,
	Email nvarchar(350) NOT NULL UNIQUE,
	Password nvarchar(512) NOT NULL,
	Contact nvarchar(20),
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
	IsActivated tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	IsDeleted tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_USER PRIMARY KEY (Id ASC)
)
;

CREATE TABLE {database_name}.BOLDTC_UserLogin (
	Id char(38) NOT NULL,
	UserId char(38) NOT NULL,
	DirectoryTypeId int not null,
	ClientToken nvarchar(4000) NOT NULL,
	IpAddress nvarchar(50) NOT NULL,
	LoggedInDomain nvarchar(255) NOT NULL,
	LoggedInTime datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_USERLOGIN PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TMUserGroup (
	Id int NOT NULL AUTO_INCREMENT,
	GroupId int NOT NULL,
	UserId char(38) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TMUSERGROUP PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TMGroup (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(255) NOT NULL,
	Description nvarchar(1026),
	Color nvarchar(255) NOT NULL,
	DirectoryTypeId int NOT NULL,
	ExternalProviderId nvarchar(512),
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TMGroup PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TenantUser (
	Id char(38) NOT NULL,
	UserId char(38) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTUSER PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_DirectoryType (
	Id int NOT NULL AUTO_INCREMENT,
	DirectoryName nvarchar(100) NOT NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_DIRECTORYTYPE PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_RecurrenceType (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(100) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_RECURRENCETYPE PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_Schedule (
	Id int NOT NULL AUTO_INCREMENT,
	RecurrenceInfo nvarchar(4000) NOT NULL,
	RecurrenceTypeId int NOT NULL,
	ScheduleTypeId int NOT NULL,
	StartDate datetime NOT NULL,
	EndDate datetime NOT NULL,
	EndAfter int NOT NULL,
	NextSchedule datetime NOT NULL,
	IsEnabled tinyint(1) NOT NULL,
	CreatedById char(38) NOT NULL,
	ModifiedById char(38) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULE PRIMARY KEY (id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_ScheduleType (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(100) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULETYPE PRIMARY KEY (id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_ScheduleLog (
	Id int NOT NULL AUTO_INCREMENT,
	ScheduleId int NOT NULL,
	ScheduleStatusId int NOT NULL,
	ExecutedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULELOG PRIMARY KEY (id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_ScheduleStatus (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(100) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULESTATUS PRIMARY KEY (Id ASC)

)
;
CREATE TABLE {database_name}.BOLDTC_SAMLSettings (
	Id int NOT NULL AUTO_INCREMENT,
	ApplicationId nvarchar(100),
	ApplicationIdURI nvarchar(4000),
	TenantName nvarchar(100),
	MobileApplicationId nvarchar(100),
	IsEnabled tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SAMLSETTINGS PRIMARY KEY 
  (
  Id ASC
  )

)
;
CREATE TABLE {database_name}.BOLDTC_SystemSettings (
	Id int NOT NULL AUTO_INCREMENT,
	SystemKey nvarchar(255) NOT NULL UNIQUE,
	SystemValue nvarchar(4000),
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SYSTEMSETTINGS PRIMARY KEY 
  (
  Id ASC
  )

)
;
CREATE TABLE {database_name}.BOLDTC_AzureADCredential (
	Id int NOT NULL AUTO_INCREMENT,
	TenantName nvarchar(255),
	ClientId nvarchar(100),
	ClientSecret nvarchar(100),
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREADCREDENTIAL PRIMARY KEY 
  (
  Id ASC
  )

)
;
CREATE TABLE {database_name}.BOLDTC_TenantType (
	Id int NOT NULL AUTO_INCREMENT,
	Type nvarchar(255) NOT NULL UNIQUE,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTTYPE PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TenantInfo (
	Id char(38) NOT NULL,
	TenantId char(38) NOT NULL,
	TenantTypeId int NOT NULL,
	ClientSecret nvarchar(512) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	SaaSPlanId int,
	DatabaseType int Default 0,
	BlobConnectionString longtext,
	ConnectionString longtext,
	AdditionalParameters longtext,
	MaintenanceDatabase char(255) NULL,
	TenantSQLServerId int,
	ElasticPoolId int,
	ImDbDatabaseType int Default 0,
	ImDbConnectionString longtext,
	ImDbSqlServerId int,
	ImDbElasticPoolId int,
	ImDbMaintenanceDatabase char(255) NULL,
	ImDbAdditionalParameters longtext,
	TenantStatus int NOT NULL,
	BillingAddressId char(38),
	StatusUpdatedDate datetime NOT NULL,
	PaymentStatus nvarchar(50),
	RecurringPaymentDate datetime,
	IsTrialExpired tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
	IsDeleted tinyint(1) NOT NULL,
	IsMaster tinyint(1) NOT NULL,
	IsolationCode nvarchar(4000),
	IsTenantIsolationCodeEnabled tinyint(1) NOT NULL DEFAULT '0',
	UseCustomBranding tinyint(1) NOT NULL,
	IsNewImDbDatabase tinyint(1) NOT NULL,
	IsNewDatabase tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTINFO PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_UserBillingAddress (
	Id char(38) NOT NULL,
	UserId char(38) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	BillingEmail nvarchar(255) NOT NULL,
	BillingAddress longtext NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_USERBILLINGADDRESS PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_AccountDeleteRequest (
	Id char(38) NOT NULL,
	UserId char(38) NOT NULL,
	UserTenantStatus longtext NULL,
	RequestedTime datetime NOT NULL,
	CancelledTime datetime,
	DeletedTime datetime,
	IsCancelled tinyint(1),
	IsDeleted tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_ACCOUNTDELETEREQUEST PRIMARY KEY (Id ASC )
)
;
CREATE TABLE {database_name}.BOLDTC_Addon (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(255) NOT NULL,
	StripePlanId nvarchar(255) NOT NULL,
	PlanSchema longtext,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_ADDON PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TenantAddon (
	Id int NOT NULL AUTO_INCREMENT,
	TenantInfoId char(38) NOT NULL,
	AddonId int NOT NULL,
	Quantity int NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	LastPaymentDate datetime NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTADDON PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_CustomPlan (
	Id int NOT NULL AUTO_INCREMENT,
	TenantInfoId char(38) NOT NULL,
	Price int NOT NULL,
	PlanInfo longtext,
	HasTrial tinyint(1) NOT NULL,
	TrialDays int NOT NULL,
	IsEnterprise tinyint(1) Null,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_CUSTOMPLAN PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_Country (
  Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Name nvarchar(100) NOT NULL,
  CountryCode nvarchar(2) NOT NULL,
  IsActive tinyint(1) NOT NULL
)
;
CREATE TABLE {database_name}.BOLDTC_ExternalIdP (
	Id char(38) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	Detail longtext NOT NULL,
	DirectoryTypeId int NOT NULL,
	CredentialTypeId int NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_EXTERNALIDP PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_IdPCredentialType (
	Id int NOT NULL AUTO_INCREMENT,
	CredentialType nvarchar(255) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_IDPCREDENTIALTYPE PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_SqlElasticPoolEdition (
	Id int NOT NULL AUTO_INCREMENT,
	PoolEditionName varchar(255) NOT NULL,
	PoolDtu int NOT NULL,
	PoolStorageinGB int NOT NULL,
	DatabaseDtuMinInGB int NOT NULL,
	DatabaseDtuMaxInGB int NOT NULL,
	DatabaseLimit int NOT NULL,
	Region varchar(255) NOT NULL,
	IsCurrent tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_ELASTICPOOLEDITION PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_SqlServerEdition (
	Id int NOT NULL AUTO_INCREMENT,
	Version varchar(255) NOT NULL,
	DatabaseLimit int NOT NULL,
	Region nvarchar(100) NOT NULL,
	IsCurrent tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SQLSERVEREDITION PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TMUser (
	Id int NOT NULL AUTO_INCREMENT,
	UserId char(38) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TMUSER PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_SqlServerType (
	Id int NOT NULL AUTO_INCREMENT,
	SqlServerType nvarchar(255) NOT NULL UNIQUE,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SQLSERVERTYPE PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_OAuthToken(
    Id int NOT NULL AUTO_INCREMENT,
	Token longtext NULL,
	Ticket longtext NULL,
	ModifiedDate datetime NULL,
	CONSTRAINT PK_BOLDTC_OAUTHTOKEN PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_InternalApps(
	Id int NOT NULL AUTO_INCREMENT,
	ClientId char(38) NOT NULL UNIQUE,
	ClientSecret longtext NOT NULL,
	Name nvarchar(100) NOT NULL,
	URL nvarchar(100) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	CONSTRAINT PK_BOLDTC_INTERNALAPPS PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_FormType (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(255) NOT NULL,
	Url nvarchar(4000) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_FORMTYPE PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_RegistrationFormVersion (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(255) NOT NULL,
	FormTypeId int NOT NULL,
	Location nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsLatest tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_REGISTRATIONFORMVERSION PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TermsOfUseVersion (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(255) NOT NULL,
	Location nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsLatest tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TermsOfUseVersion PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_PrivacyPolicyVersion (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(255) NOT NULL,
	Location nvarchar(255) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsLatest tinyint(1) NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_PRIVACYPOLICYVERSION PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_PrivacyAcceptance (
	Id char(38) NOT NULL,
	UserId char(38) NOT NULL,
	PrivacyPolicyVersion int NOT NULL,
	TermsOfUseVersion int NOT NULL,
	RegistrationFormVersion int NOT NULL,
	IpAddress nvarchar(50) NOT NULL,
	Country nvarchar(100) NOT NULL,
	Url nvarchar(4000) NOT NULL,
	HttpHeaders longtext NOT NULL,
	DateTime datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_PRIVACYACCEPTANCE PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_FeedBack (
	Id int NOT NULL AUTO_INCREMENT,
	UserId char(38) NOT NULL,
	IncidentId int NOT NULL,
	TenantInfoId char(38) NOT NULL,
	FeedbackFormId int NOT NULL,
	Experience Nvarchar(20) Null,
	FeedbackSubject Nvarchar(20) Null,
	CancelReason longtext Null,
	Comments longtext NULL,
	CanContact tinyint(1) NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_FEEDBACK PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_Support (
	Id int NOT NULL AUTO_INCREMENT,
	IncidentId int NOT NULL,
	UpdateId int NOT NULL,
	TenantInfoId char(38) NULL,
	IsConciergeSupport tinyint(1) NOT NULL,
	CreatedBy char(38) NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_Support PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_TenantActivity (
	Id int NOT NULL AUTO_INCREMENT,
	ItemId char(38) NULL,
	ChildId longtext NULL,
	TenantInfoId char(38) NOT NULL,
	UserId char(38) NOT NULL,
	ItemType longtext NOT NULL,
	ItemSubType longtext NOT NULL,
	Action longtext NOT NULL,
	DetailActionId int NOT NULL DEFAULT 0,
	ActivityLogInfo longtext NULL,
	LoggedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_TenantActivity PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_PreviewFeatures (
	Id int NOT NULL AUTO_INCREMENT,
	FeatureName nvarchar(255) NOT NULL,
	TenantInfoId char(38) NOT NULL,
	Value longtext NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_PreviewFeatures PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_KcTenants(
    Id char(38) NOT NULL,
    TenantInfoId char(38) NOT NULL,
    KcId int Not NULL,
    KcName nvarchar(1024) NOT NULL,
    CreatedDate datetime NULL,
    ModifiedDate datetime NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT BOLDTC_KcTenants_PK PRIMARY KEY (Id ASC) 	
)
;
CREATE TABLE {database_name}.BOLDTC_SSLCertificate(
    Id char(38) NOT NULL,
	ThumbPrint nvarchar(1024) NOT NULL,
	HostNames longtext NOT NULL,
	ExpirationDate datetime NOT NULL,
	CreatedById char(38) NOT NULL,
	ModifiedById char(38) NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT BOLDTC_SSLCertificate_PK PRIMARY KEY  (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_SSLMapping(
    Id int NOT NULL AUTO_INCREMENT,
	TenantId char(38) NOT NULL,
	CertificateId char(38) NOT NULL,
	CreatedById char(38) NOT NULL,
    CreatedDate datetime NOT NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT BOLDTC_SSLMapping_PK PRIMARY KEY  (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_SalesRequest (
	Id int NOT NULL AUTO_INCREMENT,
	TenantInfoId char(38) NOT NULL,
	UserId char(38) NOT NULL,
	CreatedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
	CONSTRAINT PK_BOLDTC_SALESREQUESTS PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_IntranetProductType(
    Id int NOT NULL AUTO_INCREMENT,
	ProductId int NOT NULL,
	ProductName nvarchar(1024) NOT NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT BOLDTC_IntranetProductType_PK PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_SourceType (
	Id int NOT NULL AUTO_INCREMENT,
	Name nvarchar(100) NOT NULL,
	URL nvarchar(100) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_SOURCETYPE PRIMARY KEY (Id ASC) 
)
;
CREATE TABLE {database_name}.BOLDTC_AuthType (
    Id int NOT NULL AUTO_INCREMENT,
    Name nvarchar (255) NOT NULL,
    ModifiedDate DateTime NOT NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_AuthType PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_AuthProvider (
    Id int NOT NULL AUTO_INCREMENT,
    Name nvarchar (255) NOT NULL,
    AuthTypeId int NOT NULL,
    ModifiedDate DateTime NOT NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_AuthProvider PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_GlobalAuthControl (
    Id int NOT NULL AUTO_INCREMENT,  
    TenantInfoId  char(38) NOT NULL,
	AuthTypeId int NOT NULL,
    IsEnabled tinyint(1) NOT NULL,
    CreatedBy char(38) NOT NULL,
    ModifiedBy char(38) NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_GlobalAuthControl PRIMARY KEY (Id ASC)
)
;
CREATE TABLE {database_name}.BOLDTC_AuthSettings (
    Id int NOT NULL AUTO_INCREMENT,  
    TenantInfoId char(38) NULL,
    AuthProviderId int NOT NULL,
    Settings longtext,
    IsEnabled tinyint(1) NOT NULL,
    CreatedBy char(38) NULL,
    ModifiedBy char(38) NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
	IsDefaultAuthentication tinyint(1) NOT NULL Default '0',
    IsActive tinyint(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_AuthSettings PRIMARY KEY (Id ASC)
)
;

CREATE TABLE {database_name}.BOLDTC_UserLog (
	Id int NOT NULL AUTO_INCREMENT, 
	LogAction nvarchar(255) NOT NULL,
	UserId char(38) NOT NULL,
	Message longtext NOT NULL,
	RequestedById char(38) NOT NULL,
	IpAddress nvarchar(100) NOT NULL,
	LogDate datetime NOT NULL,
	ReferrerUrl longtext NULL,
	IsActive tinyint(1) NOT NULL,
	AdditionalData longtext NULL,
  CONSTRAINT PK_BOLDTC_USERLOG PRIMARY KEY (Id ASC)
)
;

CREATE TABLE {database_name}.BOLDTC_AzureBlob (
	Id int NOT NULL AUTO_INCREMENT,
	TenantInfoId char(38) NOT NULL,
	AccountName nvarchar(1024) NOT NULL,
	AccessKey nvarchar(1024) NOT NULL,
	Uri nvarchar(1024) NULL,
	ContainerName nvarchar(1024) NOT NULL,
	ConnectionType nvarchar(1024) NOT NULL,
	ConnectionString nvarchar(4000) NOT NULL,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive tinyint(1) NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREBLOB PRIMARY KEY (Id ASC)
)
;

INSERT {database_name}.BOLDTC_TenantLogType (Name, IsActive) VALUES (N'Registration', 1);
INSERT {database_name}.BOLDTC_TenantLogType (Name, IsActive) VALUES (N'StatusUpdated', 1);
INSERT {database_name}.BOLDTC_TenantLogType (Name, IsActive) VALUES (N'PaymentUpdated', 1);
INSERT {database_name}.BOLDTC_TenantLogType (Name, IsActive) VALUES (N'SubscriptionUpdated', 1);
INSERT {database_name}.BOLDTC_TenantLogType (Name, IsActive) VALUES (N'BillingAddressUpdated', 1);

INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'AccountActivationPending', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'PaymentPending', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'SubscriptionCreationInProgress', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'SubscriptionCreationFailed', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'DeploymentPending', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'DBDeploymentInProgress', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'DBDeploymentFailed', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'StorageDeploymentInProgress', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'StorageDeploymentFailed', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'ServerDeploymentInProgress', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'ServerDeploymentFailed', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'DeploymentFailed', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'Active', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'SubscriptionCancelled', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'MarkedForSuspension', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'Suspended', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'MarkedForDeletion', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'Expired', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'SubscriptionDeleted', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'DBDeleted', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'StorageDeleted', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'Deleted', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'Trial', 1);
INSERT {database_name}.BOLDTC_TenantStatus (Name, IsActive) VALUES (N'ActivePaymentRequired', 1);

INSERT into {database_name}.BOLDTC_ScheduleStatus (Name,IsActive) VALUES (N'Success', 1);
INSERT into {database_name}.BOLDTC_ScheduleStatus (Name,IsActive) VALUES (N'Failure', 1);


INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'Daily', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'DailyWeekDay', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'Weekly', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'Monthly', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'MonthlyDOW', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'Yearly', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'YearlyDOW', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'Time', 1);
INSERT into {database_name}.BOLDTC_RecurrenceType (Name,IsActive) VALUES (N'Hourly',1);

INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'AccountActivationReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'PaymentDetailsUpdateReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'SuspendGraceReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'DeletionGraceReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'NewTenantListReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'SuspensionPendingTenantListReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'DeletionPendingTenantListReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'SuspendedTenantListReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'DeletedTenantListReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'SubscriptionCancelledTenantListReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'ServerAvailabilityCheckReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'ResourceDeletionGraceReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'ResourceDeletedReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'CreateBlobSnapshotReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'DeleteExpiredBlobSnapshotReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'MarkForSuspensionReminder', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'SubscriptionCancelled', 1);
INSERT into {database_name}.BOLDTC_ScheduleType (Name,IsActive) VALUES (N'KnownCompanyExcessStorageUsageReminder', 1);

INSERT into {database_name}.BOLDTC_CouponLogType (Name,IsActive) VALUES (N'Added',1);
INSERT into {database_name}.BOLDTC_CouponLogType (Name,IsActive) VALUES (N'Updated',1);
INSERT into {database_name}.BOLDTC_CouponLogType (Name,IsActive) VALUES (N'Used',1);
INSERT into {database_name}.BOLDTC_CouponLogType (Name,IsActive) VALUES (N'Suspended',1);
INSERT into {database_name}.BOLDTC_CouponLogType (Name,IsActive) VALUES (N'Deleted',1);

INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Local',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'AzureAD',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'ExternalDatabase',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'GSuite',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'WindowsAD',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Syncfusion',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'OAuth2',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'OpenIDConnect',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'LinkedIn',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Google',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'GitHub',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Facebook',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Twitter',1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'JWTSSO',1);

INSERT into {database_name}.BOLDTC_TMGroup (Name,Description,Color,DirectoryTypeId,ModifiedDate,IsActive) VALUES (N'System Administrator','Has administrative rights for the dashboards','#ff0000',1,UTC_TIMESTAMP(), 1);

INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) VALUES (N'5 Users', N'NA', CURDATE(), 0, 0);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) VALUES (N'25 Users', N'NA', CURDATE(), 0, 0);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) VALUES (N'50 Users', N'NA', CURDATE(), 0, 0);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) VALUES (N'75 Users', N'NA', CURDATE(), 0, 0);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) VALUES (N'100 Users', N'NA', CURDATE(), 0, 0);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) VALUES (N'KC Benefits', N'NA', CURDATE(), 1, 0);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) VALUES (N'Bold Bi', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgxyYJpSQ0aFq3fJQH8lY9dBEyuxDuN6o0St2yX46CmVbqz8JwG8rjHiUlw2FdR8y8vkmeUSFtf82U3fUq+8nemokA4r0JMk/K8mSkbAE6/2E9KodobNGV+uOQSgl4cmcaT4zH8fdfwbS+AeUB0jUmOYJpmOxGYJnRDcolin9CW6g8wv7FSEcYpIPST26ifmxGSLG+W+hVYNY7oXV3Pk4iqBirlGftktvkvaG1ua0xAKacjq0zND/JLWj2fmouQqGhZ1M+dvKyLiTcvIVBWkCxRXdFEaf7pCuGWuxVlhSgfBvq+ZWTuevkoerL6Dv3xANqnMs7rpSRJSF62B4q7MNSa5M/uvdiQ9d/chGsENg1YxS3ZSk6/tRtbP5H4Pmog0rFmkvvImEyGFmYrBo5rq5vHm7vj3O8RlBXWi7oaoNxopp5aoTAfEILO1E0+UGf6rzWDiyYa3JzPtRALnVbWi8fW7vNAGp+sYtcflwCf/EUbz4GJC1bYzU5GnL0y9ijQ+MywNJ4pZWLtA4wDIhrYCF9eB1/yViU/4EtAOWNUeav23T3miiurnc1DMHeM9KRDg/c7+QGhNySPcuYCjYlOsW+XqXTzsxji0okUEUvTk5seJIdqELLR42jNya5s4NW21Mc9lE7iGzOMeJWyWAHqV8Wnj3Rmmmf2F+9yKL3Qlx7GEeAD2Jswo3+iMPm54VGpiMuHOAm/WM63bxl9w/1EpXpM1vRZux8WBoRjH9BGMKSw0lQ==', CURDATE(), 1, 1);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) values ('Business 10', 'NA', CURDATE(), 0, 0);
INSERT {database_name}.BOLDTC_SaaSPlan (Name, PlanSchema, ModifiedDate, IsInternal, IsActive) values ('Business 25', 'NA', CURDATE(), 0, 0);

INSERT into {database_name}.BOLDTC_TenantType (Type,IsActive) VALUES (N'BoldBI',1);
INSERT into {database_name}.BOLDTC_TenantType (Type,IsActive) VALUES (N'BoldReports',1);
INSERT into {database_name}.BOLDTC_TenantType (Type,IsActive) VALUES (N'BoldBIOn-Premise',1);
INSERT into {database_name}.BOLDTC_TenantType (Type,IsActive) VALUES (N'BoldReportsOn-Premise',1);

INSERT {database_name}.BOLDTC_Addon (Name, StripePlanId, PlanSchema, ModifiedDate, IsActive) VALUES (N'AdditionalDataStorage', N'additional_data_storage', '', UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_Addon (Name, StripePlanId, PlanSchema, ModifiedDate, IsActive) VALUES (N'CustomDomain', N'custom_domain', '', UTC_TIMESTAMP(), 1);

INSERT INTO {database_name}.BOLDTC_SqlServerEdition (Version, DatabaseLimit, Region, IsCurrent, IsActive) VALUES('V12', 4000, 'East US', 1, 1)
;

INSERT INTO {database_name}.BOLDTC_SqlElasticPoolEdition (PoolEditionName,PoolDtu,PoolStorageinGB,DatabaseDtuMinInGB,DatabaseDtuMaxInGB,DatabaseLimit,IsCurrent,IsActive,Region) VALUES('Standard', 50, 50, 0, 50, 100, 1, 1, 'East US')
;

INSERT into {database_name}.BOLDTC_SqlServerType (SqlServerType,ModifiedDate,IsActive) VALUES (N'TenantSqlServer',UTC_TIMESTAMP(),1)
;
INSERT into {database_name}.BOLDTC_SqlServerType (SqlServerType,ModifiedDate,IsActive) VALUES (N'IntermediateSqlServer',UTC_TIMESTAMP(),1)
;

INSERT INTO {database_name}.BOLDTC_SqlServer (ServerName,UserName,Password,DatabaseLimit,SqlServerType,TenantType,IsAvailable,IsActive) VALUES (N'dev-boldbi-tenants',N'dashboard-admin',N'',3900,1,1,1,1)
;
INSERT INTO {database_name}.BOLDTC_SqlElasticPool (PoolName,SqlServerId,DatabaseLimit,SqlServerType,TenantType,IsAvailable,IsActive) VALUES (N'dev-boldbi-tenant-pool',1,95,1,1,1,1)
;
INSERT INTO {database_name}.BOLDTC_SqlServer (ServerName,UserName,Password,DatabaseLimit,SqlServerType,TenantType,IsAvailable,IsActive) VALUES (N'dev-boldbi-datastore',N'datastore-admin',N'',3900,2,1,1,1)
;
INSERT INTO {database_name}.BOLDTC_SqlElasticPool (PoolName,SqlServerId,DatabaseLimit,SqlServerType,TenantType,IsAvailable,IsActive) VALUES (N'dev-boldbi-data-pool',2,95,2,1,1,1)
;

INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'OAuth', UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'OIDC', UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'SAML', UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'DefaultAuth', UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'JWTSSO', UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'WindowsAD', UTC_TIMESTAMP(), 1);

INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'CustomOAuth', 1, UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'CustomOIDC', 2, UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'AzureAD', 3, UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'JWTSSO', 5, UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'WindowsAD', 6, UTC_TIMESTAMP(), 1);

ALTER TABLE {database_name}.BOLDTC_CouponLog ADD CONSTRAINT BOLDTC_CouponLog_fk0 FOREIGN KEY (CouponLogTypeId) REFERENCES {database_name}.BOLDTC_CouponLogType(Id)

;

ALTER TABLE {database_name}.BOLDTC_CouponLog ADD CONSTRAINT BOLDTC_CouponLog_fk1 FOREIGN KEY (PaymentLogId) REFERENCES {database_name}.BOLDTC_TenantPaymentLog(id)

;


ALTER TABLE {database_name}.BOLDTC_TenantPaymentSubscription ADD CONSTRAINT BOLDTC_TenantPaymentSubscription_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;


ALTER TABLE {database_name}.BOLDTC_TenantInvoiceDetails ADD CONSTRAINT BOLDTC_TenantInvoiceDetails_fk0 FOREIGN KEY (SubscriptionId) REFERENCES {database_name}.BOLDTC_TenantPaymentSubscription(Id)
;

ALTER TABLE {database_name}.BOLDTC_TenantPaymentLog ADD CONSTRAINT BOLDTC_TenantPaymentLog_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantPaymentLog ADD CONSTRAINT BOLDTC_TenantPaymentLog_fk1 FOREIGN KEY (SubscriptionId) REFERENCES {database_name}.BOLDTC_TenantPaymentSubscription(Id)

;

ALTER TABLE {database_name}.BOLDTC_SqlElasticPool ADD CONSTRAINT BOLDTC_SqlElasticPool_fk0 FOREIGN KEY (SqlServerId) REFERENCES {database_name}.BOLDTC_SqlServer(Id)

;



ALTER TABLE {database_name}.BOLDTC_Tenant ADD CONSTRAINT BOLDTC_Tenant_fk0 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id)

;


ALTER TABLE {database_name}.BOLDTC_TenantLog ADD CONSTRAINT BOLDTC_TenantLog_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantLog ADD CONSTRAINT BOLDTC_TenantLog_fk1 FOREIGN KEY (TenantLogType) REFERENCES {database_name}.BOLDTC_TenantLogType(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantLog ADD CONSTRAINT BOLDTC_TenantLog_fk2 FOREIGN KEY (ToStatus) REFERENCES {database_name}.BOLDTC_TenantStatus(Id)

;


ALTER TABLE {database_name}.BOLDTC_Coupon ADD CONSTRAINT BOLDTC_Coupon_fk0 FOREIGN KEY (CreatedById) REFERENCES {database_name}.BOLDTC_User(Id)

;

ALTER TABLE {database_name}.BOLDTC_Coupon ADD CONSTRAINT BOLDTC_Coupon_fk1 FOREIGN KEY (ModifiedById) REFERENCES {database_name}.BOLDTC_User(Id)

;


ALTER TABLE {database_name}.BOLDTC_UserPreference ADD CONSTRAINT BOLDTC_UserPreference_fk0 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id)

;


ALTER TABLE {database_name}.BOLDTC_User ADD CONSTRAINT BOLDTC_User_fk0 FOREIGN KEY (DirectoryTypeId) REFERENCES {database_name}.BOLDTC_DirectoryType(Id)

;

ALTER TABLE {database_name}.BOLDTC_UserLogin ADD CONSTRAINT BOLDTC_UserLogin_fk0 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id)
;

ALTER TABLE {database_name}.BOLDTC_UserLogin ADD CONSTRAINT BOLDTC_UserLogin_fk1 FOREIGN KEY (DirectoryTypeId) REFERENCES {database_name}.BOLDTC_DirectoryType(Id)
;


ALTER TABLE {database_name}.BOLDTC_TMUserGroup ADD CONSTRAINT BOLDTC_TMUserGroup_fk0 FOREIGN KEY (GroupId) REFERENCES {database_name}.BOLDTC_TMGroup(Id)

;

ALTER TABLE {database_name}.BOLDTC_TMUserGroup ADD CONSTRAINT BOLDTC_TMUserGroup_fk1 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id)

;


ALTER TABLE {database_name}.BOLDTC_TMGroup ADD CONSTRAINT BOLDTC_TMGroup_fk0 FOREIGN KEY (DirectoryTypeId) REFERENCES {database_name}.BOLDTC_DirectoryType(Id)

;


ALTER TABLE {database_name}.BOLDTC_TenantUser ADD CONSTRAINT BOLDTC_TenantUser_fk0 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantUser ADD CONSTRAINT BOLDTC_TenantUser_fk1 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;


ALTER TABLE {database_name}.BOLDTC_Schedule ADD CONSTRAINT BOLDTC_Schedule_fk0 FOREIGN KEY (RecurrenceTypeId) REFERENCES {database_name}.BOLDTC_RecurrenceType(Id)

;

ALTER TABLE {database_name}.BOLDTC_Schedule ADD CONSTRAINT BOLDTC_Schedule_fk1 FOREIGN KEY (ScheduleTypeId) REFERENCES {database_name}.BOLDTC_ScheduleType(id)

;

ALTER TABLE {database_name}.BOLDTC_ScheduleLog ADD CONSTRAINT BOLDTC_ScheduleLog_fk0 FOREIGN KEY (ScheduleId) REFERENCES {database_name}.BOLDTC_Schedule(id)

;

ALTER TABLE {database_name}.BOLDTC_ScheduleLog ADD CONSTRAINT BOLDTC_ScheduleLog_fk1 FOREIGN KEY (ScheduleStatusId) REFERENCES {database_name}.BOLDTC_ScheduleStatus(Id)

;


ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_TenantInfo_fk0 FOREIGN KEY (TenantId) REFERENCES {database_name}.BOLDTC_Tenant(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_TenantInfo_fk1 FOREIGN KEY (TenantTypeId) REFERENCES {database_name}.BOLDTC_TenantType(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_TenantInfo_fk2 FOREIGN KEY (SaaSPlanId) REFERENCES {database_name}.BOLDTC_SaaSPlan(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_TenantInfo_fk3 FOREIGN KEY (TenantSQLServerId) REFERENCES {database_name}.BOLDTC_SqlServer(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_TenantInfo_fk4 FOREIGN KEY (ElasticPoolId) REFERENCES {database_name}.BOLDTC_SqlElasticPool(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_TenantInfo_fk5 FOREIGN KEY (TenantStatus) REFERENCES {database_name}.BOLDTC_TenantStatus(Id)

;

ALTER TABLE {database_name}.BOLDTC_UserBillingAddress ADD CONSTRAINT BOLDTC_UserBillingAddress_fk1 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;

ALTER TABLE {database_name}.BOLDTC_TenantAddon ADD CONSTRAINT BOLDTC_TenantAddon_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;

ALTER TABLE {database_name}.BOLDTC_TenantAddon ADD CONSTRAINT BOLDTC_TenantAddon_fk1 FOREIGN KEY (AddonId) REFERENCES {database_name}.BOLDTC_Addon(Id)
;

ALTER TABLE {database_name}.BOLDTC_CustomPlan ADD CONSTRAINT BOLDTC_CustomPlan_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;

ALTER TABLE {database_name}.BOLDTC_ExternalIdP ADD CONSTRAINT BOLDTC_ExternalIdP_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;

ALTER TABLE {database_name}.BOLDTC_ExternalIdP ADD CONSTRAINT BOLDTC_ExternalIdP_fk1 FOREIGN KEY (DirectoryTypeId) REFERENCES {database_name}.BOLDTC_DirectoryType(Id)
;

ALTER TABLE {database_name}.BOLDTC_ExternalIdP ADD CONSTRAINT BOLDTC_ExternalIdP_fk2 FOREIGN KEY (CredentialTypeId) REFERENCES {database_name}.BOLDTC_IdPCredentialType(Id)
;

ALTER TABLE {database_name}.BOLDTC_SqlServer ADD CONSTRAINT BOLDTC_SqlServer_fk0 FOREIGN KEY (SqlServerType) REFERENCES {database_name}.BOLDTC_SqlServerType(Id)
;
ALTER TABLE {database_name}.BOLDTC_SqlElasticPool ADD CONSTRAINT BOLDTC_SqlElasticPool_fk1 FOREIGN KEY (SqlServerType) REFERENCES {database_name}.BOLDTC_SqlServerType(Id)
;
ALTER TABLE {database_name}.BOLDTC_SqlElasticPool ADD CONSTRAINT BOLDTC_SqlElasticPool_fk2 FOREIGN KEY (TenantType) REFERENCES {database_name}.BOLDTC_TenantType(Id)
;
ALTER TABLE {database_name}.BOLDTC_SqlServer ADD CONSTRAINT BOLDTC_SqlServer_fk1 FOREIGN KEY (TenantType) REFERENCES {database_name}.BOLDTC_TenantType(Id)
;
ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_ImDbElasticPoolId FOREIGN KEY (ImDbElasticPoolId) REFERENCES {database_name}.BOLDTC_SqlElasticPool(Id)
;
ALTER TABLE {database_name}.BOLDTC_TenantInfo ADD CONSTRAINT BOLDTC_IDbSqlServerId FOREIGN KEY (ImDbSqlServerId) REFERENCES {database_name}.BOLDTC_SqlServer(Id)
;
ALTER TABLE {database_name}.BOLDTC_RegistrationFormVersion ADD CONSTRAINT BOLDTC_RegistrationFormVersion_fk0 FOREIGN KEY (FormTypeId) REFERENCES {database_name}.BOLDTC_FormType(Id)

;

ALTER TABLE {database_name}.BOLDTC_PrivacyAcceptance ADD CONSTRAINT BOLDTC_PrivacyAcceptance_fk0 FOREIGN KEY (PrivacyPolicyVersion) REFERENCES {database_name}.BOLDTC_PrivacyPolicyVersion(Id)

;

ALTER TABLE {database_name}.BOLDTC_PrivacyAcceptance ADD CONSTRAINT BOLDTC_PrivacyAcceptance_fk1 FOREIGN KEY (TermsOfUseVersion) REFERENCES {database_name}.BOLDTC_TermsOfUseVersion(Id)

;

ALTER TABLE {database_name}.BOLDTC_PrivacyAcceptance ADD CONSTRAINT BOLDTC_PrivacyAcceptance_fk2 FOREIGN KEY (RegistrationFormVersion) REFERENCES {database_name}.BOLDTC_RegistrationFormVersion(Id)

;
ALTER TABLE {database_name}.BOLDTC_FeedBack ADD CONSTRAINT BOLDTC_FeedBack_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;

ALTER TABLE {database_name}.BOLDTC_Support ADD CONSTRAINT BOLDTC_Support_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;

ALTER TABLE {database_name}.BOLDTC_TenantActivity ADD CONSTRAINT BOLDTC_TenantActivity_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;

ALTER TABLE {database_name}.BOLDTC_PreviewFeatures ADD CONSTRAINT BOLDTC_PreviewFeatures_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;

ALTER TABLE {database_name}.BOLDTC_KcTenants ADD CONSTRAINT BOLDTC_KcTenant_FK0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)

;

ALTER TABLE {database_name}.BOLDTC_SSLMapping ADD CONSTRAINT BOLDTC_SSLMapping_fk1 FOREIGN KEY (TenantId) REFERENCES {database_name}.BOLDTC_Tenant(Id)

;

ALTER TABLE {database_name}.BOLDTC_SSLMapping ADD CONSTRAINT BOLDTC_SSLMapping_fk2 FOREIGN KEY (CertificateId) REFERENCES {database_name}.BOLDTC_SSLCertificate(Id)

;

ALTER TABLE {database_name}.BOLDTC_AuthProvider ADD CONSTRAINT BOLDTC_AuthProvider_fk0 FOREIGN KEY (AuthTypeId) REFERENCES {database_name}.BOLDTC_AuthType(Id)
;

ALTER TABLE {database_name}.BOLDTC_GlobalAuthControl ADD CONSTRAINT BOLDTC_GlobalAuthControl_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;
ALTER TABLE {database_name}.BOLDTC_GlobalAuthControl ADD CONSTRAINT BOLDTC_GlobalAuthControl_fk1 FOREIGN KEY (AuthTypeId) REFERENCES {database_name}.BOLDTC_AuthType(Id)
;
ALTER TABLE {database_name}.BOLDTC_GlobalAuthControl ADD CONSTRAINT BOLDTC_GlobalAuthControl_fk2 FOREIGN KEY (CreatedBy) REFERENCES {database_name}.BOLDTC_User(Id)
;
ALTER TABLE {database_name}.BOLDTC_GlobalAuthControl ADD CONSTRAINT BOLDTC_GlobalAuthControl_fk3 FOREIGN KEY (ModifiedBy) REFERENCES {database_name}.BOLDTC_User(Id)
;

ALTER TABLE {database_name}.BOLDTC_AuthSettings ADD CONSTRAINT BOLDTC_AuthSettings_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;
ALTER TABLE {database_name}.BOLDTC_AuthSettings ADD CONSTRAINT BOLDTC_AuthSettings_fk1 FOREIGN KEY (AuthProviderId) REFERENCES {database_name}.BOLDTC_AuthProvider(Id)
;
ALTER TABLE {database_name}.BOLDTC_AuthSettings ADD CONSTRAINT BOLDTC_AuthSettings_fk2 FOREIGN KEY (CreatedBy) REFERENCES {database_name}.BOLDTC_User(Id)
;
ALTER TABLE {database_name}.BOLDTC_AuthSettings ADD CONSTRAINT BOLDTC_AuthSettings_fk3 FOREIGN KEY (ModifiedBy) REFERENCES {database_name}.BOLDTC_User(Id)
;


ALTER TABLE {database_name}.BOLDTC_UserLog  ADD CONSTRAINT BOLDTC_UserLog_fk1 FOREIGN KEY (UserId) REFERENCES {database_name}.BOLDTC_User(Id)
;

ALTER TABLE {database_name}.BOLDTC_UserLog  ADD CONSTRAINT BOLDTC_UserLog_fk2 FOREIGN KEY (RequestedById) REFERENCES {database_name}.BOLDTC_User(Id)
;

ALTER TABLE {database_name}.BOLDTC_AzureBlob ADD CONSTRAINT BOLDTC_AzureBlob_fk0 FOREIGN KEY (TenantInfoId) REFERENCES {database_name}.BOLDTC_TenantInfo(Id)
;
