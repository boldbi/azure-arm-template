ALTER TABLE {database_name}.BOLDTC_UserLogin ADD SessionId char(38) NULL;
ALTER TABLE {database_name}.BOLDTC_UserLogin ADD Browser nvarchar(255) NULL;
ALTER TABLE {database_name}.BOLDTC_UserLogin ADD LastActive datetime NULL;