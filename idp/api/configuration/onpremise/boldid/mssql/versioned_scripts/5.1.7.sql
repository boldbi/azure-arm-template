IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'BOLDTC_BackUp')
BEGIN
CREATE TABLE [BOLDTC_BackUp](
    Id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    ConfigurationData nvarchar(max) NOT NULL,
    PrivateKey nvarchar(max) NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive bit NOT NULL
)
END;