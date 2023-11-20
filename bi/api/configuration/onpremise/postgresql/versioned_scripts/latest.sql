INSERT INTO SyncDS_ItemLogType (Name, IsActive) SELECT N'Downloaded', 1
WHERE NOT EXISTS (SELECT Name FROM SyncDS_ItemLogType WHERE Name = N'Downloaded')
;