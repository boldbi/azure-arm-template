INSERT INTO [BOLDBI_ItemLogType] (Name, IsActive) SELECT 'Downloaded', 1
WHERE NOT EXISTS (SELECT Name FROM [BOLDBI_ItemLogType] WHERE Name = 'Downloaded')
;