ALTER TABLE [BOLDBI_Group] ADD [IsAdminGroup] [bit] NOT NULL DEFAULT 0;

UPDATE [BOLDBI_Group] SET [IsAdminGroup] = 1 WHERE [Name] = 'System Administrator';