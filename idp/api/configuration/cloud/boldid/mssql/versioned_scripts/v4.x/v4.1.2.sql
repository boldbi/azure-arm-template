update [DirectoryType] set DirectoryName = 'AzureAD' where id = '2'

﻿update [DirectoryType] set [DirectoryName] = 'WindowsAD' where id = '5'

INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Syncfusion',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'OAuth2',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'OpenIDConnect',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'LinkedIn',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Google',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'GitHub',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Facebook',1)
INSERT into [DirectoryType] (DirectoryName,IsActive) VALUES (N'Twitter',1)

update [user] set [DirectoryTypeId] = '6' where [DirectoryTypeId] = '5'
update [userLogin] set [DirectoryTypeId] = '6' where [DirectoryTypeId] = '5'