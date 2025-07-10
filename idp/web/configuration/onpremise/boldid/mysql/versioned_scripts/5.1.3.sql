CREATE TABLE {database_name}.BoldTC_AICredentials(
    Id char(38) NOT NULL,
    AIModel INT NOT NULL,
    AIConfiguration varchar(4000) NULL,
    CreatedById char(38) NULL,
    ModifiedById char(38) NULL,
    CreatedDate datetime NOT NULL,
    ModifiedDate datetime NOT NULL,
    IsActive tinyint NOT NULL,
    PRIMARY KEY (Id)) ROW_FORMAT=DYNAMIC
;