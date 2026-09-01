ALTER TABLE [BOLDTC_User] ADD [Status] int NULL;

CREATE TABLE [BOLDTC_UserStatus] (
	Id int IDENTITY(1,1) NOT NULL,
	Status nvarchar(100) NOT NULL,
	Value int NOT NULL UNIQUE,
	CreatedDate datetime NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_BOLDTC_USERSTATUS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
;

INSERT into [BOLDTC_UserStatus] ([Status],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'NotActivated', 0, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_UserStatus] ([Status],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Activated', 1, GETUTCDATE(), GETUTCDATE(), 1)
;
INSERT into [BOLDTC_UserStatus] ([Status],[Value],[CreatedDate],[ModifiedDate],[IsActive]) VALUES (N'Locked', 2, GETUTCDATE(), GETUTCDATE(), 1)
;



ALTER TABLE [BOLDTC_User] WITH CHECK ADD CONSTRAINT [BOLDTC_User_fk1] FOREIGN KEY ([Status]) REFERENCES [BOLDTC_UserStatus]([Value])
;
ALTER TABLE [BOLDTC_User] CHECK CONSTRAINT [BOLDTC_User_fk1]
;
