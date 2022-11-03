ALTER TABLE [SyncDS_ItemCommentLog] ADD [Url] nvarchar(4000) NULL
;

UPDATE [SyncDS_ItemCommentLog] set [Url]=''
;

ALTER TABLE [SyncDS_ItemCommentLog] ALTER COLUMN [Url] nvarchar(4000) NOT NULL
;

ALTER TABLE [SyncDS_User] ADD [UserTypeId] [int] NOT NULL DEFAULT 0
;

UPDATE [SyncDS_User] SET UserTypeId = 1 WHERE [SyncDS_User].Id In (SELECT [SyncDS_User].Id from [SyncDS_User] INNER JOIN [SyncDS_ADUser] on [SyncDS_ADUser].UserId = [SyncDS_User].Id)
;

CREATE TABLE [SyncDS_AzureADCredential](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[TenantName] [nvarchar](255),
[ClientId] [nvarchar](100),
[ClientSecret] [nvarchar](100),
[IsActive] [bit] NOT NULL)
;

CREATE TABLE [SyncDS_AzureADUser](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[UserId] [int] NOT NULL,
[AzureADUserId] [uniqueidentifier] NOT NULL,
[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_AzureADUser] ADD FOREIGN KEY([UserId]) REFERENCES [SyncDS_User] ([Id])
;

CREATE TABLE [SyncDS_AzureADGroup](
[Id] [int] IDENTITY(1,1) primary key NOT NULL,
[GroupId] [int] NOT NULL,
[AzureADGroupId] [uniqueidentifier] NOT NULL,
[IsActive] [bit] NOT NULL)
;

ALTER TABLE [SyncDS_AzureADGroup] ADD FOREIGN KEY([GroupId]) REFERENCES [SyncDS_Group] ([Id])
;


CREATE TABLE [SyncDS_SAMLSettings](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL, 
	[MetadataURI] nvarchar(4000), 
	[IsEnabled] bit NOT NULL)
;

CREATE TABLE [SyncDS_UserType](
	[Id] [int] IDENTITY(1,1) primary key NOT NULL, 
	[Type] nvarchar(100))
;

INSERT into [SyncDS_UserType](Type) values(N'Server User')
;
INSERT into [SyncDS_UserType](Type) values(N'Active Directory User')
;
INSERT into [SyncDS_UserType](Type) values(N'Federation User')
;
INSERT into [SyncDS_ItemCommentLogType] (Name,IsActive) VALUES ( N'UserMention',1)
;