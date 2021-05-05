ALTER TABLE [Tenant] ADD [CustomDomain] varchar(255) NULL;

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

ALTER TABLE [SSLCertificate] WITH CHECK ADD CONSTRAINT [SSLCertificate_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])

GO

CREATE TABLE [SSLMapping](
    [Id] int IDENTITY(1,1) NOT NULL,
	[TenantId] uniqueidentifier NOT NULL,
	[CertificateId] uniqueidentifier NOT NULL,
	[CreatedById] uniqueidentifier NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [SSLMapping_PK] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (IGNORE_DUP_KEY = OFF))
Go

ALTER TABLE [SSLMapping] WITH CHECK ADD CONSTRAINT [SSLMapping_fk0] FOREIGN KEY ([CreatedById]) REFERENCES [User]([Id])

GO

ALTER TABLE [SSLMapping] WITH CHECK ADD CONSTRAINT [SSLMapping_fk1] FOREIGN KEY ([TenantId]) REFERENCES [Tenant]([Id])

GO

ALTER TABLE [SSLMapping] WITH CHECK ADD CONSTRAINT [SSLMapping_fk2] FOREIGN KEY ([CertificateId]) REFERENCES [SSLCertificate]([Id])

GO