ALTER TABLE [BOLDTC_UserLogin] ADD DirectoryTypeId int not null
;
ALTER TABLE [BOLDTC_UserLogin] WITH CHECK ADD CONSTRAINT [BOLDTC_UserLogin_fk1] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [BOLDTC_DirectoryType]([Id])
;
ALTER TABLE [BOLDTC_UserLogin] CHECK CONSTRAINT [BOLDTC_UserLogin_fk1]
;

INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'Syncfusion',1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'OAuth2',1);
INSERT into [BOLDTC_DirectoryType] (DirectoryName,IsActive) VALUES (N'OpenIDConnect',1);

CREATE TABLE [BOLDTC_AuthType] (
    Id int IDENTITY(1,1) NOT NULL,
    Name nvarchar (255) NOT NULL UNIQUE,
    ModifiedDate DateTime NOT NULL,
    IsActive bit NOT NULL,
    CONSTRAINT [PK_BOLDTC_AuthType] PRIMARY KEY CLUSTERED
    (
    [Id] ASC
    ) WITH (IGNORE_DUP_KEY = OFF)
)
;

CREATE TABLE [BOLDTC_AuthProvider] (
    Id int IDENTITY(1,1) NOT NULL,
    Name nvarchar (255) NOT NULL UNIQUE,
    AuthTypeId int NOT NULL,
    ModifiedDate DateTime NOT NULL,
    IsActive bit NOT NULL,
    CONSTRAINT [PK_BOLDTC_AuthProvider] PRIMARY KEY CLUSTERED
    (
    [Id] ASC
    ) WITH (IGNORE_DUP_KEY = OFF)
)
;

CREATE TABLE [BOLDTC_GlobalAuthControl] (
    Id int IDENTITY(1,1) NOT NULL,  
    TenantInfoId  uniqueidentifier NOT NULL,
	AuthTypeId int NOT NULL,
    IsEnabled bit NOT NULL,
    CreatedBy uniqueidentifier NOT NULL,
    ModifiedBy uniqueidentifier NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive bit NOT NULL,
    CONSTRAINT [PK_BOLDTC_GlobalAuthControl] PRIMARY KEY CLUSTERED
    (
    [Id] ASC
    ) WITH (IGNORE_DUP_KEY = OFF)
)
;

CREATE TABLE [BOLDTC_AuthSettings] (
    Id int IDENTITY(1,1) NOT NULL,  
    TenantInfoId uniqueidentifier NULL,
    AuthProviderId int NOT NULL,
    Settings nvarchar(max),
    IsEnabled bit NOT NULL,
    CreatedBy uniqueidentifier NOT NULL,
    ModifiedBy uniqueidentifier NOT NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive bit NOT NULL,
    CONSTRAINT [PK_BOLDTC_AuthSettings] PRIMARY KEY CLUSTERED
    (
    [Id] ASC
    ) WITH (IGNORE_DUP_KEY = OFF)
)
;

INSERT [BOLDTC_AuthType] ([Name], [ModifiedDate], [IsActive]) VALUES ( N'OAuth', GETUTCDATE(), 1);
INSERT [BOLDTC_AuthType] ([Name], [ModifiedDate], [IsActive]) VALUES ( N'OIDC', GETUTCDATE(), 1);
INSERT [BOLDTC_AuthType] ([Name], [ModifiedDate], [IsActive]) VALUES ( N'SAML', GETUTCDATE(), 1);

INSERT [BOLDTC_AuthProvider] ([Name], [AuthTypeId], [ModifiedDate], [IsActive]) VALUES ( N'CustomOAuth', 1, GETUTCDATE(), 1);
INSERT [BOLDTC_AuthProvider] ([Name], [AuthTypeId], [ModifiedDate], [IsActive]) VALUES ( N'CustomOIDC', 2, GETUTCDATE(), 1);

ALTER TABLE [BOLDTC_AuthProvider] WITH CHECK ADD CONSTRAINT [BOLDTC_AuthProvider_fk0] FOREIGN KEY ([AuthTypeId]) REFERENCES [BOLDTC_AuthType]([Id])
;

ALTER TABLE [BOLDTC_GlobalAuthControl] WITH CHECK ADD CONSTRAINT [BOLDTC_GlobalAuthControl_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [BOLDTC_TenantInfo]([Id])
;
ALTER TABLE [BOLDTC_GlobalAuthControl] WITH CHECK ADD CONSTRAINT [BOLDTC_GlobalAuthControl_fk1] FOREIGN KEY ([AuthTypeId]) REFERENCES [BOLDTC_AuthType]([Id])
;
ALTER TABLE [BOLDTC_GlobalAuthControl] WITH CHECK ADD CONSTRAINT [BOLDTC_GlobalAuthControl_fk2] FOREIGN KEY ([CreatedBy]) REFERENCES [BOLDTC_User]([Id])
;
ALTER TABLE [BOLDTC_GlobalAuthControl] WITH CHECK ADD CONSTRAINT [BOLDTC_GlobalAuthControl_fk3] FOREIGN KEY ([ModifiedBy]) REFERENCES [BOLDTC_User]([Id])
;

ALTER TABLE [BOLDTC_AuthSettings] WITH CHECK ADD CONSTRAINT [BOLDTC_AuthSettings_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [BOLDTC_TenantInfo]([Id])
;
ALTER TABLE [BOLDTC_AuthSettings] WITH CHECK ADD CONSTRAINT [BOLDTC_AuthSettings_fk1] FOREIGN KEY ([AuthProviderId]) REFERENCES [BOLDTC_AuthProvider]([Id])
;
ALTER TABLE [BOLDTC_AuthSettings] WITH CHECK ADD CONSTRAINT [BOLDTC_AuthSettings_fk2] FOREIGN KEY ([CreatedBy]) REFERENCES [BOLDTC_User]([Id])
;
ALTER TABLE [BOLDTC_AuthSettings] WITH CHECK ADD CONSTRAINT [BOLDTC_AuthSettings_fk3] FOREIGN KEY ([ModifiedBy]) REFERENCES [BOLDTC_User]([Id])
;