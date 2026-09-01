CREATE TABLE IF NOT EXISTS BOLDTC_BackUp (
    Id SERIAL primary key NOT NULL,
    ConfigurationData text NOT NULL,
    PrivateKey text NOT NULL,
    ModifiedDate timestamp NOT NULL,
    IsActive smallint NOT NULL
);