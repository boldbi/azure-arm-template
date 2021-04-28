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

INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Website', N'https://syncfusion.com', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Intranet', N'https://intranet.syncfusion.com', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Tenant Management', N'https://app.boldbi.com', GetDate(), 1)
INSERT [dbo].[SourceType] ([Name] ,[URL] ,[ModifiedDate], [IsActive]) VALUES (N'Dashboard Server', N'', GetDate(), 1)

ALTER TABLE TenantLog ADD SourceTypeId int NULL;

ALTER TABLE [TenantLog] WITH CHECK ADD CONSTRAINT [TenantLog_fk3] FOREIGN KEY ([SourceTypeId]) REFERENCES [SourceType]([Id])

GO
ALTER TABLE [TenantLog] CHECK CONSTRAINT [TenantLog_fk3]
GO

ALTER TABLE [User] ADD [Company] varchar(255) NULL;

--development & staging product ids
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7826, N'BoldBIAdditionalDataStorage', 1)

--production product ids - check with website team before using this query.
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [IsActive]) VALUES (7827, N'BoldBIAdditionalDataStorage', 1)

Update [SaaSPlan] Set [Planschema] = N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+PgxyYJpSQ0aFq3fJQH8lY9dBEyuxDuN6o0St2yX46CmVbqz8JwG8rjHiUlw2FdR8y8vkmeUSFtf82U3fUq+8nemokA4r0JMk/K8mSkbAE6/2E9KodobNGV+uOQSgl4cmcaT4zH8fdfwbS+AeUB0jUmOYJpmOxGYJnRDcolin9CW6g8wv7FSEcYpIPST26ifmxGSZ/PBabXQtV3+AIRydGnVzUeWOSTYA7KLiM+0FwnFO1J1TvH+QQoYTaT/hneIYnszYHsYQHlQYZw4OO46G5EhU4lXLTgpiSNTTNrfoxBjeMtDIn2ex2GtfZL1iODxkRy5DW8LiGLMgpdbdHlbfWOIRyXbGJ/hSi93uHsa8O2tv4Z3XhbW18cpYkr1kxb4Bzc+ZcdnSqXIPsJFrsdgbvMYO6Wk4P2Cxdb2F4duziDIZu3OSj8Oo+8MOxLjM3wcZBxksX2GmGLCM2n3TccdES7DbE3xuT4SZ6j0vXTXecAUwkubmJ0e3v2mzNKWDSr8xHKI6Pya2US0R0Olu6jPW7NlOJ2oPX6p3qC+VwX1cxka9oxJXY7gzInJwWEzWbxiZmpI+i387XqmFYzHLH9+rFt0CxXOarknVHlh2XKVfFA22QIR51MuQwNNbaaRe+8qjL7ktE+KUjzI9Cd3Hs02uCiMDBXbNvhws/9Y8oFPAfwSbX+Nq2U3g163BlFQ9Sc8WqzZV4UuC3zeC05HjF9cQtd3vMkBxd7PtxoSc+IHWcCqzgML74Xw0+lftd2IW00xTUAo=', [IsActive] = 1, [ModifiedDate] = GETDATE() Where Id = 6