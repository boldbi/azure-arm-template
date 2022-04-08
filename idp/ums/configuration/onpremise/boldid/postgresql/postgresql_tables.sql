CREATE TABLE BOLDTC_CouponLogType (
	Id SERIAL NOT NULL,
	Name varchar(1026) NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_COUPONLOGTYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_CouponLog (
	Id SERIAL NOT NULL,
	CouponLogTypeId int NOT NULL,
	PaymentLogId uuid,
	LogComments int NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_COUPONLOG PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantPaymentSubscription (
	Id uuid NOT NULL,
	TenantInfoId uuid NOT NULL,
	StripeCustomerId varchar(255) NOT NULL UNIQUE,
	SubscriptionId varchar(255) NOT NULL UNIQUE,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTPAYMENTSUBSCRIPTION PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantInvoiceDetails (
	Id uuid NOT NULL,
	SubscriptionId uuid NOT NULL,
	Amount int NOT Null,
	InvoiceId varchar(255) NOT NULL,
	ChargeId varchar(255) NOT NULL,
	PaymentDate timestamp NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTINVOICEDETIALS PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantPaymentLog (
	Id uuid NOT NULL,
	TenantInfoId uuid NOT NULL,
	SubscriptionId uuid NOT NULL,
	LogComments varchar(1026) NOT NULL,
	CreatedDate timestamp NOT NULL,
	Status varchar(255) NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTPAYMENTLOG PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_ServerVersion (
	 Id int PRIMARY KEY NOT NULL,
	 VersionNumber varchar (20) NOT NULL)
;
CREATE TABLE BOLDTC_SqlServer (
	Id SERIAL NOT NULL,
	ServerName varchar(255) NOT NULL UNIQUE,
	Username varchar(255) NOT NULL,
	Password varchar(255) NOT NULL,
	DatabaseLimit int NOT NULL,
	SqlServerType int NOT NULL,
	TenantType int NOT NULL,
	IsAvailable smallint NOT NULL DEFAULT '1',
	IsActive smallint NOT NULL DEFAULT '1',
  CONSTRAINT PK_BOLDTC_SQLSERVER PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_SqlElasticPool (
	Id SERIAL NOT NULL,
	PoolName varchar(255) NOT NULL UNIQUE,
	SqlServerId int NOT NULL,
	DatabaseLimit int NOT NULL,
	SqlServerType int NOT NULL,
	TenantType int NOT NULL,
	IsAvailable smallint NOT NULL DEFAULT '1',
	IsActive smallint NOT NULL DEFAULT '1',
  CONSTRAINT PK_BOLDTC_SQLELASTICPOOL PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_Tenant (
	Id uuid NOT NULL,
	DNS varchar(255) NOT NULL,
	Subdomain varchar(255) NULL,
	TenantIdentifier varchar(255) NULL,
	TenantName varchar(255)NOT NULL,
	CustomDomain varchar(255) NULL,
	UseSiteIdentifier smallint NOT NULL DEFAULT 1,
	UserId uuid NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
	IsDeleted smallint NOT NULL,
	IsInternal smallint NOT NULL DEFAULT 0,
  CONSTRAINT PK_BOLDTC_TENANT PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_SaaSPlan (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL,
	PlanSchema varchar(1026),
	ModifiedDate timestamp NOT NULL,
	IsInternal smallint NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SAASPLAN PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantLogType (
	Id SERIAL NOT NULL,
	Name varchar(100),
	IsActive smallint,
  CONSTRAINT PK_BOLDTC_TENANTLOGTYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantLog (
	Id uuid NOT NULL,
	TenantInfoId uuid NOT NULL,
	TenantLogType int NOT NULL,
	LogComments varchar(1026),
	IpAddress varchar(100) NULL,
	FromStatus int Null,
	ToStatus int Not Null,
	UpdatedUserId uuid NULL,
	SourceTypeId int Null,
	OptionalData varchar(1026) NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTLOG PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantStatus (
	Id SERIAL NOT NULL,
	Name varchar(100) NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTSTATUS PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_Coupon (
	Id SERIAL NOT NULL,
	Coupon varchar(255) NOT NULL UNIQUE,
	CouponLimit int NOT NULL,
	CouponDuration int NOT NULL,
	CouponExpirationDate int NOT NULL,
	CreateDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	CreatedById uuid NOT NULL,
	ModifiedById uuid NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_COUPON  PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_UserPreference (
	Id uuid NOT NULL,
	UserId uuid NOT NULL,
	Language varchar(4000),
	TimeZone varchar(100),
	RecordSize int,
	ItemSort varchar(4000),
	ItemFilters varchar(4000),
	Notifications varchar(4000),
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_USERPREFERENCE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_User (
	Id uuid NOT NULL,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255),
	DisplayName varchar(512),
	Username varchar(255) NOT NULL,
	Email varchar(350) NOT NULL UNIQUE,
	Password varchar(512) NOT NULL,
	Contact varchar(20),
	Company varchar(255) NULL,
	Picture varchar(100),
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp,
	LastLogin timestamp,
	PasswordChangedDate timestamp,
	ActivationExpirationDate timestamp NOT NULL,
	ActivationCode varchar(255) NOT NULL,
	VerificationCode varchar(100) NULL,
	ResetPasswordCode varchar(255),
	LastResetAttempt timestamp,
	ExternalProviderId varchar(512),
	DirectoryTypeId int NOT NULL,
	IsActivated smallint NOT NULL,
	IsActive smallint NOT NULL,
	IsDeleted smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_USER PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_UserLogin (
	Id uuid NOT NULL,
	UserId uuid NOT NULL,
	DirectoryTypeId int NOT NULL,
	ClientToken varchar(4000) NOT NULL,
	IpAddress varchar(50) NOT NULL,
	LoggedInDomain varchar(255) NOT NULL,
	LoggedInTime timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_USERLOGIN PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TMUserGroup (
	Id SERIAL NOT NULL,
	GroupId int NOT NULL,
	UserId uuid NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TMUSERGROUP PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TMGroup (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL,
	Description varchar(1026),
	Color varchar(255) NOT NULL,
	DirectoryTypeId int NOT NULL,
	ExternalProviderId varchar(512),
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TMGroup PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantUser (
	Id uuid NOT NULL,
	UserId uuid NOT NULL,
	TenantInfoId uuid NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTUSER PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_DirectoryType (
	Id SERIAL NOT NULL,
	DirectoryName varchar(100) NOT NULL UNIQUE,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_DIRECTORYTYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_RecurrenceType (
	Id SERIAL NOT NULL,
	Name varchar(100) NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_RECURRENCETYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_Schedule (
	Id SERIAL NOT NULL,
	RecurrenceInfo varchar(4000) NOT NULL,
	RecurrenceTypeId int NOT NULL,
	ScheduleTypeId int NOT NULL,
	StartDate timestamp NOT NULL,
	EndDate timestamp NOT NULL,
	EndAfter int NOT NULL,
	NextSchedule timestamp NOT NULL,
	IsEnabled smallint NOT NULL,
	CreatedById uuid NOT NULL,
	ModifiedById uuid NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_ScheduleType (
	Id SERIAL NOT NULL,
	Name varchar(100) NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULETYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_ScheduleLog (
	Id SERIAL NOT NULL,
	ScheduleId int NOT NULL,
	ScheduleStatusId int NOT NULL,
	ExecutedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULELOG PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_ScheduleStatus (
	Id SERIAL NOT NULL,
	Name varchar(100) NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SCHEDULESTATUS PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_SAMLSettings (
	Id SERIAL NOT NULL,
	ApplicationId varchar(100),
	ApplicationIdURI varchar(4000),
	TenantName varchar(100),
	MobileApplicationId varchar(100),
	IsEnabled smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SAMLSETTINGS PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_SystemSettings (
	Id SERIAL NOT NULL,
	SystemKey varchar(255) NOT NULL UNIQUE,
	SystemValue varchar(4000),
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SYSTEMSETTINGS PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_AzureADCredential (
	Id SERIAL NOT NULL,
	TenantName varchar(255),
	ClientId varchar(100),
	ClientSecret varchar(100),
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREADCREDENTIAL PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantType (
	Id SERIAL NOT NULL,
	Type varchar(255) NOT NULL UNIQUE,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTTYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantInfo (
	Id uuid NOT NULL,
	TenantId uuid NOT NULL,
	TenantTypeId int NOT NULL,
	ClientSecret varchar(512) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	SaaSPlanId int,
	DatabaseType int Default 0,
	BlobConnectionString varchar(1026),
	ConnectionString varchar(1026),
	AdditionalParameters varchar(1026),
	MaintenanceDatabase varchar(255) NULL,
	TenantSQLServerId int,
	ElasticPoolId int,
	ImDbDatabaseType int Default 0,
	ImDbConnectionString varchar(1026),
	ImDbSqlServerId int,
	ImDbElasticPoolId int,
	ImDbMaintenanceDatabase varchar(255) NULL,
	ImDbAdditionalParameters varchar(1026),
	TenantStatus int NOT NULL,
	BillingAddressId uuid,
	StatusUpdatedDate timestamp NOT NULL,
	PaymentStatus varchar(50),
	RecurringPaymentDate timestamp,
	IsTrialExpired smallint NOT NULL,
	IsActive smallint NOT NULL,
	IsDeleted smallint NOT NULL,
	IsMaster smallint NOT NULL,
	IsolationCode varchar(4000),
	IsTenantIsolationCodeEnabled smallint NOT NULL DEFAULT '0',
	UseCustomBranding smallint NOT NULL,
	IsNewImDbDatabase smallint NOT NULL,
	IsNewDatabase smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTINFO PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_UserBillingAddress (
	Id uuid NOT NULL,
	UserId uuid NOT NULL,
	TenantInfoId uuid NOT NULL,
	BillingEmail varchar(255) NOT NULL,
	BillingAddress varchar(1026) NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_USERBILLINGADDRESS PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_AccountDeleteRequest (
	Id uuid NOT NULL,
	UserId uuid NOT NULL,
	UserTenantStatus varchar(1026) NULL,
	RequestedTime timestamp NOT NULL,
	CancelledTime timestamp,
	DeletedTime timestamp,
	IsCancelled smallint,
	IsDeleted smallint NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_ACCOUNTDELETEREQUEST PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_Addon (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL,
	StripePlanId varchar(255) NOT NULL,
	PlanSchema varchar(1026),
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_ADDON PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantAddon (
	Id SERIAL NOT NULL,
	TenantInfoId uuid NOT NULL,
	AddonId int NOT NULL,
	Quantity int NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	LastPaymentDate timestamp NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TENANTADDON PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_CustomPlan (
	Id SERIAL NOT NULL,
	TenantInfoId uuid NOT NULL,
	Price int NOT NULL,
	PlanInfo text,
	HasTrial smallint NOT NULL,
	TrialDays int NOT NULL,
	IsEnterprise smallint Null,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_CUSTOMPLAN PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_Country (
   Id SERIAL PRIMARY KEY NOT NULL,
   Name varchar (100) NOT NULL,
   CountryCode varchar (2) NOT NULL,
   IsActive smallint  NOT NULL
)
;
CREATE TABLE BOLDTC_ExternalIdP (
	Id uuid NOT NULL,
	TenantInfoId uuid NOT NULL,
	Detail varchar(1026) NOT NULL,
	DirectoryTypeId int NOT NULL,
	CredentialTypeId int NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_EXTERNALIDP PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_IdPCredentialType (
	Id SERIAL NOT NULL,
	CredentialType varchar(255) NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_IDPCREDENTIALTYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_SqlElasticPoolEdition (
	Id SERIAL NOT NULL,
	PoolEditionName varchar(255) NOT NULL,
	PoolDtu int NOT NULL,
	PoolStorageinGB int NOT NULL,
	DatabaseDtuMinInGB int NOT NULL,
	DatabaseDtu1026InGB int NOT NULL,
	DatabaseLimit int NOT NULL,
	Region varchar(255) NOT NULL,
	IsCurrent smallint NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_ELASTICPOOLEDITION PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_SqlServerEdition (
	Id SERIAL NOT NULL,
	Version varchar(255) NOT NULL,
	DatabaseLimit int NOT NULL,
	Region varchar(100) NOT NULL,
	IsCurrent smallint NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SQLSERVEREDITION PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TMUser (
	Id SERIAL NOT NULL,
	UserId uuid NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TMUSER PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_SqlServerType (
	Id SERIAL NOT NULL,
	SqlServerType varchar(255) NOT NULL UNIQUE,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SQLSERVERTYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_OAuthToken (
     Id SERIAL NOT NULL,
	 Token varchar (1026) NULL,
	 Ticket varchar (1026) NULL,
	 ModifiedDate timestamp  NULL,
  CONSTRAINT PK_BOLDTC_OAUTHTOKEN PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_InternalApps (
	 Id SERIAL NOT NULL,
	 ClientId uuid NOT NULL UNIQUE,
	 ClientSecret varchar(1026) NOT NULL,
	 Name  varchar(100) NOT NULL,
	 URL  varchar(100) NOT NULL,
	 ModifiedDate timestamp NOT NULL,
	 IsActive  smallint NOT NULL,
	CONSTRAINT  PK_BOLDTC_INTERNALAPPS PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_FormType (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL,
	Url varchar(4000) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_FORMTYPE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_RegistrationFormVersion (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL,
	FormTypeId int NOT NULL,
	Location varchar(255) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsLatest smallint NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_REGISTRATIONFORMVERSION PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TERMSOFUSEVERSION (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL,
	Location varchar(255) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsLatest smallint NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TERMSOFUSEVERSION PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_PrivacyPolicyVersion (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL,
	Location varchar(255) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsLatest smallint NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_PRIVACYPOLICYVERSION PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_PrivacyAcceptance (
	Id uuid NOT NULL,
	UserId uuid NOT NULL,
	PrivacyPolicyVersion int NOT NULL,
	TermsOfUseVersion int NOT NULL,
	RegistrationFormVersion int NOT NULL,
	IpAddress varchar(50) NOT NULL,
	Country varchar(100) NOT NULL,
	Url varchar(4000) NOT NULL,
	HttpHeaders varchar(1026) NOT NULL,
	timestamp timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_PRIVACYACCEPTANCE PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_FeedBack (
	Id SERIAL NOT NULL,
	UserId uuid NOT NULL,
	IncidentId int NOT NULL,
	TenantInfoId uuid NOT NULL,
	FeedbackFormId int NOT NULL,
	Experience varchar(20) Null,
	FeedbackSubject varchar(20) Null,
	CancelReason varchar(1026) Null,
	Comments varchar(1026) NULL,
	CanContact smallint NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_FEEDBACK PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_Support (
	Id SERIAL NOT NULL,
	IncidentId int NOT NULL,
	UpdateId int NOT NULL,
	TenantInfoId uuid NULL,
	IsConciergeSupport smallint NOT NULL,
	CreatedBy uuid NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_Support PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_TenantActivity (
	Id SERIAL NOT NULL,
	ItemId uuid NULL,
	ChildId varchar(1026) NULL,
	TenantInfoId uuid NOT NULL,
	UserId uuid NOT NULL,
	ItemType varchar(1026) NOT NULL,
	ItemSubType varchar(1026) NOT NULL,
	Action varchar(1026) NOT NULL,
	DetailActionId int NOT NULL DEFAULT 0,
	ActivityLogInfo varchar(1026) NULL,
	LoggedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_TenantActivity PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_PreviewFeatures (
	Id SERIAL NOT NULL,
	FeatureName varchar(255) NOT NULL,
	TenantInfoId uuid NOT NULL,
	Value varchar(1026) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_PreviewFeatures PRIMARY KEY (Id)
)
;
CREATE TABLE BOLDTC_KcTenants (
     Id uuid  NOT NULL,
     TenantInfoId  uuid  NOT NULL,
     KcId   int  Not NULL,
     KcName  varchar(1024) NOT NULL,
     CreatedDate timestamp  NULL,
     ModifiedDate timestamp  NULL,
     IsActive smallint  NOT NULL,
    CONSTRAINT BOLDTC_KcTenants_PK PRIMARY KEY (Id)
	)
;
CREATE TABLE BOLDTC_SSLCertificate (
     Id uuid  NOT NULL,
	 ThumbPrint  varchar(1024) NOT NULL,
	 HostNames  varchar(1026) NOT NULL,
	 ExpirationDate   timestamp  NOT NULL,
	 CreatedById uuid NOT NULL,
	 ModifiedById uuid NOT NULL,
     CreatedDate timestamp  NOT NULL,
     ModifiedDate timestamp  NOT NULL,
     IsActive smallint  NOT NULL,
    CONSTRAINT BOLDTC_SSLCertificate_PK PRIMARY KEY (Id)
	)
;
CREATE TABLE  BOLDTC_SSLMapping (
     Id  SERIAL NOT NULL,
	 TenantId  uuid NOT NULL,
	 CertificateId  uuid NOT NULL,
	 CreatedById  uuid NOT NULL,
     CreatedDate timestamp  NOT NULL,
     IsActive smallint  NOT NULL,
    CONSTRAINT BOLDTC_SSLMapping_PK PRIMARY KEY (Id)
	)
;

CREATE TABLE BOLDTC_SalesRequests (
	Id SERIAL NOT NULL,
	TenantInfoId uuid NOT NULL,
	UserId uuid NOT NULL,
	CreatedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
	CONSTRAINT PK_BOLDTC_SALESREQUESTS PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_IntranetProductType(
     Id  SERIAL NOT NULL,
	 ProductId int NOT NULL,
	 ProductName varchar(1024) NOT NULL,
     IsActive smallint  NOT NULL,
    CONSTRAINT BOLDTC_IntranetProductType_PK PRIMARY KEY (Id)
	)
;

CREATE TABLE BOLDTC_SourceType (
	Id SERIAL NOT NULL,
	Name varchar(100) NOT NULL,
	URL varchar(100) NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_SOURCETYPE PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_AuthType (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL UNIQUE,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_AUTHTYPE PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_AuthProvider (
	Id SERIAL NOT NULL,
	Name varchar(255) NOT NULL UNIQUE,
	AuthTypeId int NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_AUTHPROVIDER PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_GlobalAuthControl (
	Id SERIAL NOT NULL,
	TenantInfoId uuid NOT NULL,
	AuthTypeId int NOT NULL,
	IsEnabled smallint NOT NULL,	
	CreatedBy uuid NOT NULL,
    ModifiedBy uuid NOT NULL,
    CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
    IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_GLOBALAUTHCONTROL PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_AuthSettings (
    Id SERIAL NOT NULL,
    TenantInfoId uuid NULL,
    AuthProviderId int NOT NULL,
    Settings varchar(1026),
    IsEnabled smallint NOT NULL,
    CreatedBy uuid NULL,
    ModifiedBy uuid NULL,
    CreatedDate timestamp NOT NULL,
    ModifiedDate timestamp NOT NULL,
	IsDefaultAuthentication smallint NOT NULL DEFAULT '0',
    IsActive smallint NOT NULL,
    CONSTRAINT PK_BOLDTC_AUTHSETTINGS PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_UserLog (
	Id SERIAL NOT NULL,
	LogAction varchar(255) NOT NULL,
	UserId uuid NULL,
	Message varchar(4000) NOT NULL,
	RequestedById uuid NULL,
	IpAddress varchar(100) NOT NULL,
	LogDate timestamp NOT NULL,
	ReferrerUrl varchar(4000) NULL,
	IsActive smallint NOT NULL,
	AdditionalData varchar(4000) NULL,
  CONSTRAINT PK_BOLDTC_UserLog PRIMARY KEY (Id)
)
;

CREATE TABLE BOLDTC_AzureBlob (
	Id SERIAL NOT NULL,
	TenantInfoId uuid NOT NULL,
	AccountName varchar(4000) NOT NULL,
	AccessKey varchar(4000) NOT NULL,
	Uri varchar(4000) NULL,
	ContainerName varchar(4000) NOT NULL,
	ConnectionType varchar(4000) NOT NULL,
	ConnectionString varchar(4000) NOT NULL,
	CreatedDate timestamp NOT NULL,
	ModifiedDate timestamp NOT NULL,
	IsActive smallint NOT NULL,
  CONSTRAINT PK_BOLDTC_AZUREBLOB PRIMARY KEY (Id)
)
;

INSERT into BOLDTC_TenantLogType  ( Name , IsActive ) VALUES (N'Registration', 1);
INSERT into BOLDTC_TenantLogType  ( Name ,  IsActive ) VALUES (N'StatusUpdated', 1);
INSERT into BOLDTC_TenantLogType  ( Name ,  IsActive ) VALUES (N'PaymentUpdated', 1);
INSERT into BOLDTC_TenantLogType  ( Name ,  IsActive ) VALUES (N'SubscriptionUpdated', 1);
INSERT into BOLDTC_TenantLogType  ( Name ,  IsActive ) VALUES (N'BillingAddressUpdated', 1);

INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'AccountActivationPending', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'PaymentPending', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'SubscriptionCreationInProgress', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'SubscriptionCreationFailed', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'DeploymentPending', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'DBDeploymentInProgress', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'DBDeploymentFailed', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'StorageDeploymentInProgress', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'StorageDeploymentFailed', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'ServerDeploymentInProgress', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'ServerDeploymentFailed', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'DeploymentFailed', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'Active', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'SubscriptionCancelled', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'MarkedForSuspension', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'Suspended', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'MarkedForDeletion', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'Expired', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'SubscriptionDeleted', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'DBDeleted', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'StorageDeleted', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'Deleted', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'Trial', 1);
INSERT into BOLDTC_TenantStatus  ( Name ,  IsActive ) VALUES (N'ActivePaymentRequired', 1);

INSERT into  BOLDTC_ScheduleStatus  (Name,IsActive) VALUES (N'Success', 1);
INSERT into  BOLDTC_ScheduleStatus  (Name,IsActive) VALUES (N'Failure', 1);

INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'Daily', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'DailyWeekDay', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'Weekly', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'Monthly', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'MonthlyDOW', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'Yearly', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'YearlyDOW', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'Time', 1);
INSERT into  BOLDTC_RecurrenceType  (Name,IsActive) VALUES (N'Hourly',1);

INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'AccountActivationReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'PaymentDetailsUpdateReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'SuspendGraceReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'DeletionGraceReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'NewTenantListReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'SuspensionPendingTenantListReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'DeletionPendingTenantListReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'SuspendedTenantListReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'DeletedTenantListReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'SubscriptionCancelledTenantListReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'ServerAvailabilityVALIDATEReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'ResourceDeletionGraceReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'ResourceDeletedReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'CreateBlobSnapshotReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'DeleteExpiredBlobSnapshotReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'MarkForSuspensionReminder', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'SubscriptionCancelled', 1);
INSERT into  BOLDTC_ScheduleType  (Name,IsActive) VALUES (N'KnownCompanyExcessStorageUsageReminder', 1);

INSERT into  BOLDTC_CouponLogType  (Name,IsActive) VALUES (N'Added',1);
INSERT into  BOLDTC_CouponLogType  (Name,IsActive) VALUES (N'Updated',1);
INSERT into  BOLDTC_CouponLogType  (Name,IsActive) VALUES (N'Used',1);
INSERT into  BOLDTC_CouponLogType  (Name,IsActive) VALUES (N'Suspended',1);
INSERT into  BOLDTC_CouponLogType  (Name,IsActive) VALUES (N'Deleted',1);

INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'Local',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'AzureAD',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'ExternalDatabase',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'GSuite',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'WindowsAD',1);
INSERT into BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'Syncfusion',1);
INSERT into BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'OAuth2',1);
INSERT into BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'OpenIDConnect',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'LinkedIn',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'Google',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'GitHub',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'Facebook',1);
INSERT into  BOLDTC_DirectoryType  (DirectoryName,IsActive) VALUES (N'Twitter',1);
INSERT into BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'JWTSSO',1);

INSERT into  BOLDTC_TMGroup  ( Name , Description , Color , DirectoryTypeId , ModifiedDate , IsActive ) VALUES (N'System Administrator','Has administrative rights for the dashboards','#ff0000',1,now() at time zone 'utc', 1);

INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) VALUES (N'5 Users', N'NA', now() at time zone 'utc', 0, 0);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) VALUES (N'25 Users', N'NA', now() at time zone 'utc', 0, 0);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) VALUES (N'50 Users', N'NA', now() at time zone 'utc', 0, 0);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) VALUES (N'75 Users', N'NA', now() at time zone 'utc', 0, 0);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) VALUES (N'100 Users', N'NA', now() at time zone 'utc', 0, 0);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) VALUES (N'KC Benefits', N'NA', now() at time zone 'utc', 1, 0);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) VALUES (N'Bold Bi', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgxyYJpSQ0aFq3fJQH8lY9dBEyuxDuN6o0St2yX46CmVbqz8JwG8rjHiUlw2FdR8y8vkmeUSFtf82U3fUq+8nemokA4r0JMk/K8mSkbAE6/2E9KodobNGV+uOQSgl4cmcaT4zH8fdfwbS+AeUB0jUmOYJpmOxGYJnRDcolin9CW6g8wv7FSEcYpIPST26ifmxGSLG+W+hVYNY7oXV3Pk4iqBirlGftktvkvaG1ua0xAKacjq0zND/JLWj2fmouQqGhZ1M+dvKyLiTcvIVBWkCxRXdFEaf7pCuGWuxVlhSgfBvq+ZWTuevkoerL6Dv3xANqnMs7rpSRJSF62B4q7MNSa5M/uvdiQ9d/chGsENg1YxS3ZSk6/tRtbP5H4Pmog0rFmkvvImEyGFmYrBo5rq5vHm7vj3O8RlBXWi7oaoNxopp5aoTAfEILO1E0+UGf6rzWDiyYa3JzPtRALnVbWi8fW7vNAGp+sYtcflwCf/EUbz4GJC1bYzU5GnL0y9ijQ+MywNJ4pZWLtA4wDIhrYCF9eB1/yViU/4EtAOWNUeav23T3miiurnc1DMHeM9KRDg/c7+QGhNySPcuYCjYlOsW+XqXTzsxji0okUEUvTk5seJIdqELLR42jNya5s4NW21Mc9lE7iGzOMeJWyWAHqV8Wnj3Rmmmf2F+9yKL3Qlx7GEeAD2Jswo3+iMPm54VGpiMuHOAm/WM63bxl9w/1EpXpM1vRZux8WBoRjH9BGMKSw0lQ==', now() at time zone 'utc', 1, 1);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) values ('Business 10', 'NA', now() at time zone 'utc', 0, 0);
INSERT into BOLDTC_SaaSPlan  ( Name ,  PlanSchema ,  ModifiedDate ,  IsInternal ,  IsActive ) values ('Business 25', 'NA', now() at time zone 'utc', 0, 0);

INSERT into  BOLDTC_TenantType  ( Type ,IsActive) VALUES (N'BoldBI',1);
INSERT into  BOLDTC_TenantType  ( Type ,IsActive) VALUES (N'BoldReports',1);
INSERT into  BOLDTC_TenantType  ( Type ,IsActive) VALUES (N'BoldBIOn-Premise',1);
INSERT into  BOLDTC_TenantType  ( Type ,IsActive) VALUES (N'BoldReportsOn-Premise',1);

INSERT into BOLDTC_Addon  ( Name ,  StripePlanId ,  PlanSchema ,  ModifiedDate ,  IsActive ) VALUES (N'AdditionalDataStorage', N'additional_data_storage', '', now() at time zone 'utc', 1);
INSERT into BOLDTC_Addon  ( Name ,  StripePlanId ,  PlanSchema ,  ModifiedDate ,  IsActive ) VALUES (N'CustomDomain', N'custom_domain', '', now() at time zone 'utc', 1);

INSERT INTO  BOLDTC_SqlServerEdition (Version, DatabaseLimit, Region, IsCurrent, IsActive) VALUES('V12', 4000, 'East US', 1, 1);
;

INSERT INTO  BOLDTC_SqlElasticPoolEdition  ( PoolEditionName , PoolDtu , PoolStorageinGB , DatabaseDtuMinInGB , DatabaseDtu1026InGB , DatabaseLimit , IsCurrent , IsActive , Region ) VALUES('Standard', 50, 50, 0, 50, 100, 1, 1, 'East US')
;

INSERT into  BOLDTC_SqlServerType  ( SqlServerType , ModifiedDate , IsActive ) VALUES (N'TenantSqlServer',now() at time zone 'utc',1)
;
INSERT into  BOLDTC_SqlServerType  ( SqlServerType , ModifiedDate , IsActive ) VALUES (N'IntermediateSqlServer',now() at time zone 'utc',1)
;

INSERT INTO  BOLDTC_SqlServer  ( ServerName , UserName , Password , DatabaseLimit , SqlServerType , TenantType , IsAvailable , IsActive ) VALUES (N'dev-boldbi-tenants',N'dashboard-admin',N'',3900,1,1,1,1);
;
INSERT INTO  BOLDTC_SqlElasticPool  ( PoolName , SqlServerId , DatabaseLimit , SqlServerType , TenantType , IsAvailable , IsActive ) VALUES (N'dev-boldbi-tenant-pool',1,95,1,1,1,1);
;
INSERT INTO  BOLDTC_SqlServer  ( ServerName , UserName , Password , DatabaseLimit , SqlServerType , TenantType , IsAvailable , IsActive ) VALUES (N'dev-boldbi-datastore',N'datastore-admin',N'',3900,2,1,1,1);
;
INSERT INTO  BOLDTC_SqlElasticPool  ( PoolName , SqlServerId , DatabaseLimit , SqlServerType , TenantType , IsAvailable , IsActive ) VALUES (N'dev-boldbi-data-pool',2,95,2,1,1,1);
;

INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'OAuth', now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'OIDC', now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'SAML', now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES( N'DefaultAuth', now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'JWTSSO', now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'WindowsAD', now() at time zone 'utc', 1);

INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'CustomOAuth', 1, now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'CustomOIDC', 2, now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'AzureAD', 3, now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'JWTSSO', 5, now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'WindowsAD', 6, now() at time zone 'utc', 1);


ALTER TABLE  BOLDTC_CouponLog  ADD CONSTRAINT  BOLDTC_CouponLog_fk0  FOREIGN KEY ( CouponLogTypeId ) REFERENCES  BOLDTC_CouponLogType ( Id )
;
ALTER TABLE  BOLDTC_CouponLog  VALIDATE CONSTRAINT  BOLDTC_CouponLog_fk0 
;
ALTER TABLE  BOLDTC_CouponLog  ADD CONSTRAINT  BOLDTC_CouponLog_fk1  FOREIGN KEY ( PaymentLogId ) REFERENCES  BOLDTC_TenantPaymentLog ( id )
;
ALTER TABLE  BOLDTC_CouponLog  VALIDATE CONSTRAINT  BOLDTC_CouponLog_fk1 
;

ALTER TABLE  BOLDTC_TenantPaymentSubscription  ADD CONSTRAINT  BOLDTC_TenantPaymentSubscription_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_TenantPaymentSubscription  VALIDATE CONSTRAINT  BOLDTC_TenantPaymentSubscription_fk0 
;

ALTER TABLE  BOLDTC_TenantInvoiceDetails  ADD CONSTRAINT  BOLDTC_TenantInvoiceDetails_fk0  FOREIGN KEY ( SubscriptionId ) REFERENCES  BOLDTC_TenantPaymentSubscription ( Id )
;
ALTER TABLE  BOLDTC_TenantInvoiceDetails  VALIDATE CONSTRAINT  BOLDTC_TenantInvoiceDetails_fk0 
;

ALTER TABLE  BOLDTC_TenantPaymentLog  ADD CONSTRAINT  BOLDTC_TenantPaymentLog_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_TenantPaymentLog  VALIDATE CONSTRAINT  BOLDTC_TenantPaymentLog_fk0 
;

ALTER TABLE  BOLDTC_TenantPaymentLog  ADD CONSTRAINT  BOLDTC_TenantPaymentLog_fk1  FOREIGN KEY ( SubscriptionId ) REFERENCES  BOLDTC_TenantPaymentSubscription ( Id )
;
ALTER TABLE  BOLDTC_TenantPaymentLog  VALIDATE CONSTRAINT  BOLDTC_TenantPaymentLog_fk1 
;

ALTER TABLE  BOLDTC_SqlElasticPool  ADD CONSTRAINT  BOLDTC_SqlElasticPool_fk0  FOREIGN KEY ( SqlServerId ) REFERENCES  BOLDTC_SqlServer ( Id )
;
ALTER TABLE  BOLDTC_SqlElasticPool  VALIDATE CONSTRAINT  BOLDTC_SqlElasticPool_fk0 
;

ALTER TABLE  BOLDTC_Tenant  ADD CONSTRAINT  BOLDTC_Tenant_fk0  FOREIGN KEY ( UserId ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_Tenant  VALIDATE CONSTRAINT  BOLDTC_Tenant_fk0 
;

ALTER TABLE  BOLDTC_TenantLog  ADD CONSTRAINT  BOLDTC_TenantLog_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_TenantLog  VALIDATE CONSTRAINT  BOLDTC_TenantLog_fk0 
;

ALTER TABLE  BOLDTC_TenantLog  ADD CONSTRAINT  BOLDTC_TenantLog_fk1  FOREIGN KEY ( TenantLogType ) REFERENCES  BOLDTC_TenantLogType ( Id )
;
ALTER TABLE  BOLDTC_TenantLog  VALIDATE CONSTRAINT  BOLDTC_TenantLog_fk1 
;

ALTER TABLE  BOLDTC_TenantLog  ADD CONSTRAINT  BOLDTC_TenantLog_fk2  FOREIGN KEY ( ToStatus ) REFERENCES  BOLDTC_TenantStatus ( Id )
;
ALTER TABLE  BOLDTC_TenantLog  VALIDATE CONSTRAINT  BOLDTC_TenantLog_fk2 
;

ALTER TABLE  BOLDTC_Coupon  ADD CONSTRAINT  BOLDTC_Coupon_fk0  FOREIGN KEY ( CreatedById ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_Coupon  VALIDATE CONSTRAINT  BOLDTC_Coupon_fk0 
;

ALTER TABLE  BOLDTC_Coupon  ADD CONSTRAINT  BOLDTC_Coupon_fk1  FOREIGN KEY ( ModifiedById ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_Coupon  VALIDATE CONSTRAINT  BOLDTC_Coupon_fk1 
;

ALTER TABLE  BOLDTC_UserPreference  ADD CONSTRAINT  BOLDTC_UserPreference_fk0  FOREIGN KEY ( UserId ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_UserPreference  VALIDATE CONSTRAINT  BOLDTC_UserPreference_fk0 
;

ALTER TABLE  BOLDTC_User  ADD CONSTRAINT  BOLDTC_User_fk0  FOREIGN KEY ( DirectoryTypeId ) REFERENCES  BOLDTC_DirectoryType ( Id )
;
ALTER TABLE  BOLDTC_User  VALIDATE CONSTRAINT  BOLDTC_User_fk0 
;

ALTER TABLE  BOLDTC_UserLogin  ADD CONSTRAINT  BOLDTC_UserLogin_fk0  FOREIGN KEY ( UserId ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_UserLogin  VALIDATE CONSTRAINT  BOLDTC_UserLogin_fk0 
;
ALTER TABLE BOLDTC_UserLogin ADD CONSTRAINT BOLDTC_UserLogin_fk1 FOREIGN KEY (DirectoryTypeId) REFERENCES BOLDTC_DirectoryType(Id)
;
ALTER TABLE BOLDTC_UserLogin VALIDATE CONSTRAINT BOLDTC_UserLogin_fk1
;

ALTER TABLE  BOLDTC_TMUserGroup  ADD CONSTRAINT  BOLDTC_TMUserGroup_fk0  FOREIGN KEY ( GroupId ) REFERENCES  BOLDTC_TMGroup ( Id )
;
ALTER TABLE  BOLDTC_TMUserGroup  VALIDATE CONSTRAINT  BOLDTC_TMUserGroup_fk0 
;

ALTER TABLE  BOLDTC_TMUserGroup  ADD CONSTRAINT  BOLDTC_TMUserGroup_fk1  FOREIGN KEY ( UserId ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_TMUserGroup  VALIDATE CONSTRAINT  BOLDTC_TMUserGroup_fk1 
;

ALTER TABLE  BOLDTC_TMGroup  ADD CONSTRAINT  BOLDTC_TMGroup_fk0  FOREIGN KEY ( DirectoryTypeId ) REFERENCES  BOLDTC_DirectoryType ( Id )
;
ALTER TABLE  BOLDTC_TMGroup  VALIDATE CONSTRAINT  BOLDTC_TMGroup_fk0 
;

ALTER TABLE  BOLDTC_TenantUser  ADD CONSTRAINT  BOLDTC_TenantUser_fk0  FOREIGN KEY ( UserId ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_TenantUser  VALIDATE CONSTRAINT  BOLDTC_TenantUser_fk0 
;

ALTER TABLE  BOLDTC_TenantUser  ADD CONSTRAINT  BOLDTC_TenantUser_fk1  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_TenantUser  VALIDATE CONSTRAINT  BOLDTC_TenantUser_fk1 
;

ALTER TABLE  BOLDTC_Schedule  ADD CONSTRAINT  BOLDTC_Schedule_fk0  FOREIGN KEY ( RecurrenceTypeId ) REFERENCES  BOLDTC_RecurrenceType ( Id )
;
ALTER TABLE  BOLDTC_Schedule  VALIDATE CONSTRAINT  BOLDTC_Schedule_fk0 
;

ALTER TABLE  BOLDTC_Schedule  ADD CONSTRAINT  BOLDTC_Schedule_fk1  FOREIGN KEY ( ScheduleTypeId ) REFERENCES  BOLDTC_ScheduleType ( id )
;
ALTER TABLE  BOLDTC_Schedule  VALIDATE CONSTRAINT  BOLDTC_Schedule_fk1 
;

ALTER TABLE  BOLDTC_ScheduleLog  ADD CONSTRAINT  BOLDTC_ScheduleLog_fk0  FOREIGN KEY ( ScheduleId ) REFERENCES  BOLDTC_Schedule ( id )
;
ALTER TABLE  BOLDTC_ScheduleLog  VALIDATE CONSTRAINT  BOLDTC_ScheduleLog_fk0 
;

ALTER TABLE  BOLDTC_ScheduleLog  ADD CONSTRAINT  BOLDTC_ScheduleLog_fk1  FOREIGN KEY ( ScheduleStatusId ) REFERENCES  BOLDTC_ScheduleStatus ( Id )
;
ALTER TABLE  BOLDTC_ScheduleLog  VALIDATE CONSTRAINT  BOLDTC_ScheduleLog_fk1 
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_TenantInfo_fk0  FOREIGN KEY ( TenantId ) REFERENCES  BOLDTC_Tenant ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_TenantInfo_fk0 
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_TenantInfo_fk1  FOREIGN KEY ( TenantTypeId ) REFERENCES  BOLDTC_TenantType ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_TenantInfo_fk1 
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_TenantInfo_fk2  FOREIGN KEY ( SaaSPlanId ) REFERENCES  BOLDTC_SaaSPlan ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_TenantInfo_fk2 
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_TenantInfo_fk3  FOREIGN KEY ( TenantSQLServerId ) REFERENCES  BOLDTC_SqlServer ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_TenantInfo_fk3 
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_TenantInfo_fk4  FOREIGN KEY ( ElasticPoolId ) REFERENCES  BOLDTC_SqlElasticPool ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_TenantInfo_fk4 
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_TenantInfo_fk5  FOREIGN KEY ( TenantStatus ) REFERENCES  BOLDTC_TenantStatus ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_TenantInfo_fk5 
;

ALTER TABLE  BOLDTC_UserBillingAddress  ADD CONSTRAINT  BOLDTC_UserBillingAddress_fk1  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_UserBillingAddress  VALIDATE CONSTRAINT  BOLDTC_UserBillingAddress_fk1 
;

ALTER TABLE  BOLDTC_TenantAddon  ADD CONSTRAINT  BOLDTC_TenantAddon_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_TenantAddon  VALIDATE CONSTRAINT  BOLDTC_TenantAddon_fk0 
;

ALTER TABLE  BOLDTC_TenantAddon  ADD CONSTRAINT  BOLDTC_TenantAddon_fk1  FOREIGN KEY ( AddonId ) REFERENCES  BOLDTC_Addon ( Id )
;
ALTER TABLE  BOLDTC_TenantAddon  VALIDATE CONSTRAINT  BOLDTC_TenantAddon_fk1 
;

ALTER TABLE  BOLDTC_CustomPlan  ADD CONSTRAINT  BOLDTC_CustomPlan_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_CustomPlan  VALIDATE CONSTRAINT  BOLDTC_CustomPlan_fk0 
;

ALTER TABLE  BOLDTC_ExternalIdP  ADD CONSTRAINT  BOLDTC_ExternalIdP_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_ExternalIdP  VALIDATE CONSTRAINT  BOLDTC_ExternalIdP_fk0 
;

ALTER TABLE  BOLDTC_ExternalIdP  ADD CONSTRAINT  BOLDTC_ExternalIdP_fk1  FOREIGN KEY ( DirectoryTypeId ) REFERENCES  BOLDTC_DirectoryType ( Id )
;
ALTER TABLE  BOLDTC_ExternalIdP  VALIDATE CONSTRAINT  BOLDTC_ExternalIdP_fk1 
;

ALTER TABLE  BOLDTC_ExternalIdP  ADD CONSTRAINT  BOLDTC_ExternalIdP_fk2  FOREIGN KEY ( CredentialTypeId ) REFERENCES  BOLDTC_IdPCredentialType ( Id )
;
ALTER TABLE  BOLDTC_ExternalIdP  VALIDATE CONSTRAINT  BOLDTC_ExternalIdP_fk2 
;

ALTER TABLE  BOLDTC_SqlServer  ADD CONSTRAINT  BOLDTC_SqlServer_fk0  FOREIGN KEY ( SqlServerType ) REFERENCES  BOLDTC_SqlServerType ( Id )
;
ALTER TABLE  BOLDTC_SqlServer  VALIDATE CONSTRAINT  BOLDTC_SqlServer_fk0 
;

ALTER TABLE  BOLDTC_SqlElasticPool  ADD CONSTRAINT  BOLDTC_SqlElasticPool_fk1  FOREIGN KEY ( SqlServerType ) REFERENCES  BOLDTC_SqlServerType ( Id )
;
ALTER TABLE  BOLDTC_SqlElasticPool  VALIDATE CONSTRAINT  BOLDTC_SqlElasticPool_fk1 
;

ALTER TABLE  BOLDTC_SqlElasticPool  ADD CONSTRAINT  BOLDTC_SqlElasticPool_fk2  FOREIGN KEY ( TenantType ) REFERENCES  BOLDTC_TenantType ( Id )
;
ALTER TABLE  BOLDTC_SqlElasticPool  VALIDATE CONSTRAINT  BOLDTC_SqlElasticPool_fk2 
;

ALTER TABLE  BOLDTC_SqlServer  ADD CONSTRAINT  BOLDTC_SqlServer_fk1  FOREIGN KEY ( TenantType ) REFERENCES  BOLDTC_TenantType ( Id )
;
ALTER TABLE  BOLDTC_SqlServer  VALIDATE CONSTRAINT  BOLDTC_SqlServer_fk1 
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_ImDbElasticPoolId  FOREIGN KEY ( ImDbElasticPoolId ) REFERENCES  BOLDTC_SqlElasticPool ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_ImDbElasticPoolId
;

ALTER TABLE  BOLDTC_TenantInfo  ADD CONSTRAINT  BOLDTC_IDbSqlServerId  FOREIGN KEY ( ImDbSqlServerId ) REFERENCES  BOLDTC_SqlServer ( Id )
;
ALTER TABLE  BOLDTC_TenantInfo  VALIDATE CONSTRAINT  BOLDTC_IDbSqlServerId 
;

ALTER TABLE  BOLDTC_RegistrationFormVersion  ADD CONSTRAINT  BOLDTC_RegistrationFormVersion_fk0  FOREIGN KEY ( FormTypeId ) REFERENCES  BOLDTC_FormType ( Id )
;
ALTER TABLE  BOLDTC_RegistrationFormVersion  VALIDATE CONSTRAINT  BOLDTC_RegistrationFormVersion_fk0 
;

ALTER TABLE  BOLDTC_PrivacyAcceptance  ADD CONSTRAINT  BOLDTC_PrivacyAcceptance_fk0  FOREIGN KEY ( PrivacyPolicyVersion ) REFERENCES  BOLDTC_PrivacyPolicyVersion ( Id )
;
ALTER TABLE  BOLDTC_PrivacyAcceptance  VALIDATE CONSTRAINT  BOLDTC_PrivacyAcceptance_fk0 
;

ALTER TABLE  BOLDTC_PrivacyAcceptance  ADD CONSTRAINT  BOLDTC_PrivacyAcceptance_fk1  FOREIGN KEY ( TermsOfUseVersion ) REFERENCES  BOLDTC_TermsOfUseVersion ( Id )
;
ALTER TABLE  BOLDTC_PrivacyAcceptance  VALIDATE CONSTRAINT  BOLDTC_PrivacyAcceptance_fk1 
;

ALTER TABLE  BOLDTC_PrivacyAcceptance  ADD CONSTRAINT  BOLDTC_PrivacyAcceptance_fk2  FOREIGN KEY ( RegistrationFormVersion ) REFERENCES  BOLDTC_RegistrationFormVersion ( Id )
;
ALTER TABLE  BOLDTC_PrivacyAcceptance  VALIDATE CONSTRAINT  BOLDTC_PrivacyAcceptance_fk2 
;

ALTER TABLE  BOLDTC_FeedBack  ADD CONSTRAINT  BOLDTC_FeedBack_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_FeedBack  VALIDATE CONSTRAINT  BOLDTC_FeedBack_fk0 
;

ALTER TABLE  BOLDTC_Support  ADD CONSTRAINT  BOLDTC_Support_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_Support  VALIDATE CONSTRAINT  BOLDTC_Support_fk0 
;

ALTER TABLE  BOLDTC_TenantActivity  ADD CONSTRAINT  BOLDTC_TenantActivity_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_TenantActivity  VALIDATE CONSTRAINT  BOLDTC_TenantActivity_fk0 
;

ALTER TABLE  BOLDTC_PreviewFeatures  ADD CONSTRAINT  BOLDTC_PreviewFeatures_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_PreviewFeatures  VALIDATE CONSTRAINT  BOLDTC_PreviewFeatures_fk0 
;

ALTER TABLE  BOLDTC_KcTenants  ADD CONSTRAINT  BOLDTC_KcTenant_FK0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_KcTenants  VALIDATE CONSTRAINT  BOLDTC_KcTenant_FK0 
;

ALTER TABLE  BOLDTC_SSLMapping  ADD CONSTRAINT  BOLDTC_SSLMapping_fk1  FOREIGN KEY ( TenantId ) REFERENCES  BOLDTC_Tenant ( Id )
;
ALTER TABLE  BOLDTC_SSLMapping  VALIDATE CONSTRAINT  BOLDTC_SSLMapping_fk1 
;

ALTER TABLE  BOLDTC_SSLMapping  ADD CONSTRAINT  BOLDTC_SSLMapping_fk2  FOREIGN KEY ( CertificateId ) REFERENCES  BOLDTC_SSLCertificate ( Id )
;
ALTER TABLE  BOLDTC_SSLMapping  VALIDATE CONSTRAINT  BOLDTC_SSLMapping_fk2 
;

ALTER TABLE  BOLDTC_AuthProvider  ADD CONSTRAINT  BOLDTC_AuthProvider_fk0  FOREIGN KEY ( AuthTypeId ) REFERENCES  BOLDTC_AuthType ( Id )
;
ALTER TABLE  BOLDTC_AuthProvider  VALIDATE CONSTRAINT  BOLDTC_AuthProvider_fk0 
;

ALTER TABLE  BOLDTC_GlobalAuthControl  ADD CONSTRAINT  BOLDTC_GlobalAuthControl_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_GlobalAuthControl  VALIDATE CONSTRAINT  BOLDTC_GlobalAuthControl_fk0 
;
ALTER TABLE  BOLDTC_GlobalAuthControl  ADD CONSTRAINT  BOLDTC_GlobalAuthControl_fk1  FOREIGN KEY ( AuthTypeId ) REFERENCES  BOLDTC_AuthType ( Id )
;
ALTER TABLE  BOLDTC_GlobalAuthControl  VALIDATE CONSTRAINT  BOLDTC_GlobalAuthControl_fk1
;
ALTER TABLE  BOLDTC_GlobalAuthControl  ADD CONSTRAINT  BOLDTC_GlobalAuthControl_fk2  FOREIGN KEY ( CreatedBy ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_GlobalAuthControl  VALIDATE CONSTRAINT  BOLDTC_GlobalAuthControl_fk2
;
ALTER TABLE  BOLDTC_GlobalAuthControl  ADD CONSTRAINT  BOLDTC_GlobalAuthControl_fk3  FOREIGN KEY ( ModifiedBy ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_GlobalAuthControl  VALIDATE CONSTRAINT  BOLDTC_GlobalAuthControl_fk3
;

ALTER TABLE  BOLDTC_AuthSettings  ADD CONSTRAINT  BOLDTC_AuthSettings_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_AuthSettings  VALIDATE CONSTRAINT  BOLDTC_AuthSettings_fk0
;
ALTER TABLE  BOLDTC_AuthSettings  ADD CONSTRAINT  BOLDTC_AuthSettings_fk1  FOREIGN KEY ( AuthProviderId ) REFERENCES  BOLDTC_AuthProvider ( Id )
;
ALTER TABLE  BOLDTC_AuthSettings  VALIDATE CONSTRAINT  BOLDTC_AuthSettings_fk1
;
ALTER TABLE  BOLDTC_AuthSettings  ADD CONSTRAINT  BOLDTC_AuthSettings_fk2  FOREIGN KEY ( CreatedBy ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_AuthSettings  VALIDATE CONSTRAINT  BOLDTC_AuthSettings_fk2
;
ALTER TABLE  BOLDTC_AuthSettings  ADD CONSTRAINT  BOLDTC_AuthSettings_fk3  FOREIGN KEY ( ModifiedBy ) REFERENCES  BOLDTC_User ( Id )
;
ALTER TABLE  BOLDTC_AuthSettings  VALIDATE CONSTRAINT  BOLDTC_AuthSettings_fk3
;

ALTER TABLE BOLDTC_UserLog  ADD CONSTRAINT BOLDTC_UserLog_fk1 FOREIGN KEY (UserId) REFERENCES BOLDTC_User(Id)
;
ALTER TABLE BOLDTC_UserLog  VALIDATE CONSTRAINT BOLDTC_UserLog_fk1
;
ALTER TABLE BOLDTC_UserLog  ADD CONSTRAINT BOLDTC_UserLog_fk2 FOREIGN KEY (RequestedById) REFERENCES BOLDTC_User(Id)
;
ALTER TABLE BOLDTC_UserLog  VALIDATE CONSTRAINT BOLDTC_UserLog_fk2
;
ALTER TABLE  BOLDTC_AzureBlob  ADD CONSTRAINT  BOLDTC_AzureBlob_fk0  FOREIGN KEY ( TenantInfoId ) REFERENCES  BOLDTC_TenantInfo ( Id )
;
ALTER TABLE  BOLDTC_AzureBlob  VALIDATE CONSTRAINT  BOLDTC_AzureBlob_fk0
;