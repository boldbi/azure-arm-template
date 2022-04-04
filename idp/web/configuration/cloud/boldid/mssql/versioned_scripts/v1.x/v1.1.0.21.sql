INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Syncfusion',1)

ALTER TABLE [UserLogin] ADD [DirectoryTypeId] int NULL;

ALTER TABLE [UserLogin] WITH CHECK ADD CONSTRAINT [UserLogin_fk1] FOREIGN KEY ([DirectoryTypeId]) REFERENCES [DirectoryType]([Id])
GO

ALTER TABLE [UserLogin] CHECK CONSTRAINT [UserLogin_fk1]
GO