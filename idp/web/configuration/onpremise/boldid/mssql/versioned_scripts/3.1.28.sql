ALTER TABLE [BOLDTC_UserLogin] ADD SessionId uniqueidentifier NULL;
ALTER TABLE [BOLDTC_UserLogin] ADD Browser nvarchar(255) NULL;
ALTER TABLE [BOLDTC_UserLogin] ADD LastActive datetime NULL;