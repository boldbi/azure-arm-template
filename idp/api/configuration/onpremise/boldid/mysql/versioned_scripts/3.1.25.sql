INSERT {database_name}.BOLDTC_AuthType (Name, ModifiedDate, IsActive) VALUES ( N'AzureADB2C', UTC_TIMESTAMP(), 1);
INSERT {database_name}.BOLDTC_AuthProvider (Name, AuthTypeId, ModifiedDate, IsActive) VALUES ( N'AzureADB2C', 7, UTC_TIMESTAMP(), 1);
INSERT into {database_name}.BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'AzureADB2C',1);
