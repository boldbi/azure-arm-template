ALTER TABLE BOLDBI_Group ADD IsAdminGroup NUMBER(1, 0) DEFAULT 0 NOT NULL;

UPDATE BOLDBI_Group SET IsAdminGroup = 1 WHERE Name = 'System Administrator';