INSERT into BOLDTC_AuthType  (Name, ModifiedDate, IsActive) VALUES (N'AzureADB2C', now() at time zone 'utc', 1);
INSERT into BOLDTC_AuthProvider  (Name, AuthTypeId, ModifiedDate, IsActive) VALUES (N'AzureADB2C', 7, now() at time zone 'utc', 1);
INSERT into BOLDTC_DirectoryType (DirectoryName,IsActive) VALUES (N'AzureADB2C',1);