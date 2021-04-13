Update [dbo].[SystemSettings] set [SystemValue] = '<?xml version="1.0" encoding="UTF-8"?><NotificationInfo><Notification><ScheduleType>AccountActivationReminder</ScheduleType><Intervals><Days>1</Days></Intervals><ExpireDays>2</ExpireDays></Notification><Notification><ScheduleType>PaymentDetailsUpdateReminder</ScheduleType><Intervals><Days>10</Days><Days>8</Days><Days>5</Days><Days>2</Days><Days>1</Days></Intervals><ExpireDays>30</ExpireDays></Notification><Notification><ScheduleType>MarkForSuspensionReminder</ScheduleType><Intervals><Days>31</Days></Intervals><ExpireDays>31</ExpireDays></Notification><Notification><ScheduleType>SuspendGraceReminder</ScheduleType><Intervals><Days>2</Days><Days>4</Days><Days>6</Days></Intervals><ExpireDays>7</ExpireDays></Notification><Notification><ScheduleType>DeletionGraceReminder</ScheduleType><Intervals><Days>5</Days><Days>10</Days><Days>15</Days><Days>19</Days><Days>20</Days><Days>21</Days><Days>22</Days></Intervals><ExpireDays>23</ExpireDays></Notification><Notification><ScheduleType>ResourceDeletionGraceReminder</ScheduleType><Intervals><Days>15</Days><Days>29</Days></Intervals><ExpireDays>30</ExpireDays></Notification><Notification><ScheduleType>InActivityTenantsReminder</ScheduleType><Intervals><Days>30</Days><Days>45</Days><Days>55</Days><Days>58</Days><Days>59</Days><Days>60</Days></Intervals><ExpireDays>61</ExpireDays></Notification></NotificationInfo>' where id='39'

INSERT into [ScheduleType] (Name,IsActive) VALUES (N'InActivityTenantsReminder', 1)

INSERT [dbo].[Schedule] ([RecurrenceInfo], [RecurrenceTypeId], [ScheduleTypeId], [StartDate], [EndDate], [EndAfter], [NextSchedule], [IsEnabled], [CreatedById], [ModifiedById], [CreatedDate], [ModifiedDate], IsActive) VALUES (N'<?xml version="1.0"?><Schedule xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><CreatedDate>0001-01-01T00:00:00</CreatedDate><DailySchedule><DaysInterval>1</DaysInterval></DailySchedule><Enabled>true</Enabled><EndBoundary>9999-12-31T23:59:59.9999999</EndBoundary><EndType>NoEndDate</EndType><NextSchedule>2018-08-14T11:20:00Z</NextSchedule><Occurrences>0</Occurrences><StartBoundary>2018-08-07T22:20:00Z</StartBoundary><Type>Daily</Type></Schedule>', 1, 19, '01/04/18 19:53:00', '12/31/99 23:59:59', 1, '08/02/18 05:42:00', N'True', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '01/04/18 19:54:53', '01/04/18 19:54:53', N'True' )

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+JOc1m4WgST1aHnb8FNAPpiaLZjpY3jCn9usSQoqPTQ2OY4N6fvkfVFSNBYAP0WDJvLAyGkrzNLU4mxgRSYmqHhthZu945AW9EtSXlQZSdbkdyJO8Pc22XSHIRdG2gc5QrwhF410KR2UESa0DOkPWZUe48gywQPEtSCoRs/nCZkn+7zGkFFM6FEAScYIa+WuRZwahhz3M4sVPkifv8e06Yi37+x1u4yzAX/HLYPgLsyWvdRiXGrYzAXmbComjkOyRTH/ShpB4hF/spuMPrH/1xYVVylQO4GcEGANrvwU6G7nX4xihkQcz4foUJLsWm8TDgFBsHzZ98+SZgEt/exCyWVarXpdQo3gNkQplsZUfIGEzg0fwZ/Y0+BoS3+/lF0uRAenvULjD1BT4TaAT5TxmTTLkmdGXv0WhnScRKlvjMiys2UgmEq140DpOoY4QeGdFXPWtFcmFrkwGoUiHpabXDHfHshpeaRRGJXonQ9e7Dd6hwziWg5d8TDhdsR4KkO3ZIr9aWtI/UchdeYBWOzvDeBlSxWnzWDHg2w1o0ML57d1mLgnNhBx/vxXJQIt3gaDQn5Xuq9BYdWalSN9lNLin5bhsmCecmpl9XZtjP/Y64kR7zKl7Q7rSVYU0s05FwFZ735RA+zU5QKEM0VZ8lKUyEFNUPDSHXlGilx0SbqR7Ib8l25sqT+eVGWFwDdNoSTKFpGWil5IXnMJBh2443WYOXx9b1ThPvXncWDClV/6OFFo2HJ1qKDDOXBch2g52fYRfR', 15, 5, 4, GETDATE(), 0, 1)

ALTER TABLE [SalesRequests] WITH CHECK ADD CONSTRAINT [SalesRequests_fk0] FOREIGN KEY ([TenantInfoId]) REFERENCES [TenantInfo]([Id])
Go
ALTER TABLE [SalesRequests] WITH CHECK ADD CONSTRAINT [SalesRequests_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
Go


CREATE TABLE [UserLogType] (
	Id int IDENTITY(1,1) NOT NULL,
	Type nvarchar (100) NOT NULL,
	ModifiedDate datetime NOT NULL,
	IsActive bit NOT NULL,
	CONSTRAINT [PK_USERLOGTYPE] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

INSERT INTO [UserLogType] ([Type],[ModifiedDate],[IsActive]) VALUES (N'ADDED',GETDATE(),1)
INSERT INTO [UserLogType] ([Type],[ModifiedDate],[IsActive]) VALUES (N'UPDATED',GETDATE(),1)
INSERT INTO [UserLogType] ([Type],[ModifiedDate],[IsActive]) VALUES (N'DELETED',GETDATE(),1)
INSERT INTO [UserLogType] ([Type],[ModifiedDate],[IsActive]) VALUES (N'REQUESTED',GETDATE(),1)
GO

CREATE TABLE [UserLog] (
	Id int IDENTITY(1,1) NOT NULL,
	LogTypeId int NOT NULL,
	LogAction nvarchar(255) NOT NULL,
	UserId uniqueidentifier NOT NULL,
	Message nvarchar(max) NOT NULL,
	RequestedById uniqueidentifier NOT NULL,
	IpAddress nvarchar(100) NOT NULL,
	LogDate datetime NOT NULL,
	IsActive bit NOT NULL,
  CONSTRAINT [PK_USERLOG] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
GO

ALTER TABLE [UserLog] WITH CHECK ADD CONSTRAINT [UserLog_fk0] FOREIGN KEY ([LogTypeId]) REFERENCES [UserLogType]([Id])
Go
ALTER TABLE [UserLog] WITH CHECK ADD CONSTRAINT [UserLog_fk1] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
Go
ALTER TABLE [UserLog] WITH CHECK ADD CONSTRAINT [UserLog_fk2] FOREIGN KEY ([RequestedById]) REFERENCES [User]([Id])
Go

INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'ActiveBenefits', 1)
Go

CREATE TABLE [LicenseBenefits] (
	Id int IDENTITY(1,1) NOT NULL,
	TenantInfoId UNIQUEIDENTIFIER NOT NULL,
	Notes nvarchar(max) NOT NULL,
	ExpiryDate DATETIME NOT NULL,
	CreatedDate DATETIME NOT NULL,
	ModifiedDate DATETIME NOT NULL,
	IsActive BIT NOT NUll
	CONSTRAINT [PF_LICENSEBENEFITS] PRIMARY KEY CLUSTERED
	(
	[Id] ASC
	) WITH (IGNORE_DUP_KEY = OFF)
)
Go

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTQX5JNu2cMfIeKt1jUBfm7fGOEbNxuakPlpWMBnk2piZ0DwBzGE6xKwORaNbmhltEgHGK01uQdPgvniOJ18LwNrJnQtzaeEyDw9qKedpX6jKAAku9OmILxStgz+KUZWKstLwkIxHEDMjrO6X/R3k//MYy0IPUNH3HzJIcZHLJdanvUljEjyUzzwEreoEm3cm1WM/dohT4ffDDb4j9kW8KTjki8xeDt7LFsCLUi7opT9prA++70XzB7vwfp6YxwYO8DHD6MZb4rJgpNYLtJlgD/wAqydcvEx/PG8jaCUrEwVWSd7kuyXPVjMFbb1f5dcvJw==', 15, 6, 4, GETDATE(), 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Startup', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTR1bWir6SP9Xvw8vtfy1GRJyQzhofQwtWCmtlyX0WxhtEFnYxPzHcFglYpnUniOElcsD3HlCsS3mAXGVV0+/9JbmPwdWF80kg/8+lUKnb3nNzukB6/4h/FHcKQNNF/UbFpiNMXQddB/lixcBN0bEkPjFr+WwxJmAeF37N6RExl5WWClXz38BRud4tatIxzqUfCfKszClZX5LQrjIfpYs1FbuXeA9buW7lDaYpEQlb4Y0WWpf6m3wZH8U3yYtSroY9foGZyGNDkpfSRK2SpJGIqb77+TXXcEI0XNKqfhulrUl', 15, 0, 4, GETDATE(), 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Small Business', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTSLnuEvIEHfaN784ntCQfy+Rw93T5R+kCAvoH5PHhy9gv1Ax/gm2Vd9KFBIJ+7M+oPUrramubE8eiPeu6rsTAt6qjLtm2Y5Dl5GEQi3BZkJ4ewqbjVIURuKsf2VNwN1Bj1yOgCsLl0UZQPY4htnQPLHUi33AtE5782rjy02YqZCbTUQ2MCqOnIH+NU1JCsDQA8JOePZ8Ow+ZxcARzETHzUwISQs0HL+fx3QbZdwTS6AzX2aOROKzZbROfg6CFLX02G1mnn1b5W1u9gyp55uRcKv3Yu3dt37EgAIPmqQ1ycHClzR+lW7LTmQg4ZfjrZzOGg==', 15, 0, 4, GETDATE(), 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Startup Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTXNL6YOMokewe8B3a9VUNZ1V3WYAWe6EHXT5KuS2nNIEJKQu0KqPBPbsTpMZd5s8AHwkutZPZViu5N6jQf8tGJjzatBxS9pvxFBs6T7MSGMKx9YqKUEL/RZs8MGGaJtByjkxVPjn83NAtjk7up4DnIlGAGOIkFqBMW4/Q5NwhW9pg/BqgtYlqcmVf0eS4fS5fm/cEaKdvthoiEQv5ciq8r2BCbdEqghM/LwFQVFXvJv6Nm0YPtNW+wEENr9W0C4lZc7yB9LW2s5or1O2XgE39Dr6bKjF0+WfORbuKdYLOSzAOQi/YYoXWPOMAoijNaz7bg==', 15, 0, 4, GETDATE(), 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) VALUES (N'Small Business Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTSLnuEvIEHfaN784ntCQfy8zjVVLkWOhKQt3n4j/shq2RZ7arSJRmD1H8USTwWvzI/X36pK/2nvjwUk+xDTuXPLYfInQlMffd2DP0UA5UYyy3n442kw/wkiCD08lWkLmgO826N3qB6VHMSAFH0mqY8wYd8zSuyi1eDb564bMYhbVCQOIxhl2RSCvocU4baX9wqz5J292c5fCWstcoMxngto8MdL8SmLMa5ALxbfu3f+7x5OwRxrNvCxf/SPs/ZDpBHp9iy5G2xrWjPJyxd0JMn59VmILpCnOb4zZalhfSpLrlTPiFVPuU5Ea/gbiBdzVeAoANVZTSl81jllqni+3V5o=', 15, 0, 4, GETDATE(), 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Enterprise - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTeuRdzvb1QxXW9jiB9O6RnWXrQxSkriOWmMtC9/apjxpVmki43zIQI1WTlCZ0pUPFBlHQW0UTibH3X53rFRSdrDq03Q2z7xC6Dt8eAVNOBq1zEE18VhWqCA3/AAUYG/f+UJHw1L0VJA7SyErUaQCt34euLY/VBr29sTu8zs0RmPDrmWuefGl2VZX5sML7eKzQwyzOfCIh1Y+5znkaxcIBBk3G2p9J3QhsKSWxWP3ddzG4YgacH4ipIL/amDsG6CIiTpeVuEc+gWTrDR/maklL82iAU+81PboHZqIKsx4O8L05AjhwFMawIgMjSOYAVfCL1fLncvoWCa/ndkNHGVBs7Q=', 15, 7, 4, GETDATE(), 0, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Startup - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTXNL6YOMokewe8B3a9VUNZ3i/dD4/9r7eTKGs5wf7OqW+9aLUY2A1sIqpVpXbZvOdOVvREyTbVYWYxki8O+aXq3tH7Prv6jbGXeDYK6bbnYhTZpvnQoVDZ5cvzB6jDFLteds31VfTr+Bup9NkkRCarJ2hjbc+LbQ7dKm+FnATyesEfrk8aJhuL8D1K3PzLfNEffT6Bpnm7yLmV1LU66/P6DKwyu3AaSzhvbBv1cppnPIANkZ2h1+7IDSB24aUAtwuDDHx5n7t54I6qjGgDaSzRoolUn4VRx1lrFY5OVEcp7OV6RItrFBsmVZDb5a54uzMg==', 15, 0, 4, GETDATE(), 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Small Business - Multi-tenant', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTSLnuEvIEHfaN784ntCQfy+Ig+60MDtrGPezXyWGV68uv2a+qBFDMXg+0YGxLzuIwwHV1SKnYvstYEfdTdwFIv7aPWmot2DNCQ2HZCWPSM+faWYf+HiwCh3FG4xhxc3CJsm6kZku6dEIjJfqdtZDiHnzQujfkzscLEsf3AMTwhnVzjFtSeKPTaXkqs3Tqnn/q7/03KmRNmEAssBVOuKbZH1RhXYB3ior4F0EynUlQHLvoYlV7TMeqDBVwtmLhzbgMlxjH6V1/rKbCwWxP1wS5b9FUuIn+WWmNMC6DtEY9UgKAgpzePAbyEI+MFs8Q6R3T3zT0+sb15DzsbI7rGQIKfg=', 15, 0, 4, GETDATE(), 1, 1)

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Bold Reports Viewer SDK', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTTWmNBgnpOmK/s0DBonIDdFGis8zSTKf+Nv14u7t8g9xONQ4VPrendYK7w1V5vnGpVU3n49gpEMiazH/72z6QLCWWiKLZ+MXXKpnKBcowdixd79wVouNatYndRZhAjEyanT3uMUBRxV/iPA+aok0SVfjoVTi908N6sCWHooBSo2V4O9E/uJrQmgAXaVemEUDdhazhj7riKJU5kV6xwSioeD7mBc9Ww3Cf6Hsh7VtW1RaDMDtzAY5jtY+eOT6lZ9M58COq0904NHGnsxP84UFfKYcHwdzl3ZHe5RDrwapU1WjGvGkiIKOGuS32ftxfgVhAw==', 15, 0, 4, GETDATE(), 0, 1)

Go

--Staging Product Id

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7894, N'BoldReportsOnPremiseSingleTenantCustom', 1, 33, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7895, N'BoldReportsOnPremiseSingleTenantCustomSubscription', 2, 33, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7896, N'Bold Reports Embedded', 1, 34, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7897, N'Bold Reports Embedded Subscription', 2, 34, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7898, N'Bold Reports Startup', 1, 35, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7899, N'Bold Reports Startup Subscription', 2, 35, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7900, N'Bold Reports Small Business', 1, 36, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7901, N'Bold Reports Small Business Subscription', 2, 36, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7902, N'Bold Reports Startup Embedded', 1, 37, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7903, N'Bold Reports Startup Embedded Subscription', 2, 37, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7904, N'Bold Reports Small Business Embedded', 1, 38, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7905, N'Bold Reports Small Business Embedded Subscription', 2, 38, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7906, N'Bold Reports Multi-tenant - Enterprise', 1, 39, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7907, N'Bold Reports Multi-tenant - Enterprise Subscription', 2, 39, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7908, N'Bold Reports Multi-tenant - Startup', 1, 40, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7909, N'Bold Reports Multi-tenant - Startup Subscription', 2, 40, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7910, N'Bold Reports Multi-tenant - Small Business', 1, 41, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7911, N'Bold Reports Multi-tenant - Small Business Subscription', 2, 41, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7916, N'Bold Reports On-Premise Viewer SDK', 1, 42, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7915, N'Bold Reports On-Premise Viewer SDK Subscription', 2, 42, 1)
Go


--Live Product Id

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7893, N'BoldReportsOnPremiseSingleTenantCustom', 1, 33, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7894, N'BoldReportsOnPremiseSingleTenantCustomSubscription', 2, 33, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7895, N'Bold Reports Embedded', 1, 34, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7896, N'Bold Reports Embedded Subscription', 2, 34, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7897, N'Bold Reports Startup', 1, 35, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7898, N'Bold Reports Startup Subscription', 2, 35, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7899, N'Bold Reports Small Business', 1, 36, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7900, N'Bold Reports Small Business Subscription', 2, 36, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7901, N'Bold Reports Startup Embedded', 1, 37, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7902, N'Bold Reports Startup Embedded Subscription', 2, 37, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7903, N'Bold Reports Small Business Embedded', 1, 38, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7904, N'Bold Reports Small Business Embedded Subscription', 2, 38, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7905, N'Bold Reports Multi-tenant - Enterprise', 1, 39, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7906, N'Bold Reports Multi-tenant - Enterprise Subscription', 2, 39, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7907, N'Bold Reports Multi-tenant - Startup', 1, 40, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7908, N'Bold Reports Multi-tenant - Startup Subscription', 2, 40, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7909, N'Bold Reports Multi-tenant - Small Business', 1, 41, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7910, N'Bold Reports Multi-tenant - Small Business Subscription', 2, 41, 1)

INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7913, N'Bold Reports On-Premise Viewer SDK', 1, 42, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7914, N'Bold Reports On-Premise Viewer SDK Subscription', 2, 42, 1)
Go

INSERT [dbo].[SaaSPlan] ([Name], [PlanSchema], [TrialDays], [PriorityOrder], [TenantTypeId], [ModifiedDate], [IsInternal], [IsActive]) values (N'Custom-Embedded', N'jOS8fQeRafN+OmuhkdZzib0vs/mdtxFFcqEvSrU+Pgx2QJF/USUQO+x5MbgT4GUjq4oAyDjZDnf5Z4UM9QDqnazGmJw+/45VCpaPCbEnwVa+f1wsm7TbmoaIi/8oRq7HTQTtxYgE86RQgdJyA4/XT/Om0Fv+GPZJt7mOZTqzqXVMKcHzoxQsQgQOTM6x1T+J+ntEcyO4HcUpEqqPg7vrKj2zIpyUTvDr34WDI9bwRtVlrOQoWiUT3ExL68RVcUq6rnR+7Xt8h5A2rQ/Q7CMo5+s8w3arhaP/mn8r7f0sHkfWDaDOvlNdB8qNlOMB7iY3SOPLINIaNn3B6G7Yq5EbEtS4yb63k+DFUSrl5iDVJ1171RfbY7yTQns6xZHISkF0fQyEYcpYoUK1+68MLkrz3O7eHMLMbiutXP179LCVJn3rKcIuz/lqsnzDVCrVHwLrbM+C7mUZcseMwcdp1FsCloDn22KLiDZVSf8kSOC1hWtm6lzKtcn6jEyTyanqKdqUPIvcVFkcEiEzXQ8u5QWAFgopEH0dF7sCO2fCTGa670aPW4KSpQxiJ/hFUc59ehNILeOEGSpFy71XWGo47+ufTRgDnU0GhGYRoHGtsCmvTzRwpbf2T4fIoKxbtQ8JT+y+hbWpnAB7PLOdsGRWWtVGguJEFEMBwKeVk7VF1MmeHp0GNE2fq8z5MIiFDOLT8chfB0Ivy/VDn1JQYwJXEB6fFgF9GGE8IyUraYUl1QBP5p1hoQ5UPk0lCMU9aL1CW7ejM02jo3Fi4UT3XvuEfCi1IieUVs8a/KNcK8bojQn3k/+IPiLxyNXhal2K8AYUUeTtSSAOrwgYvu7AEAzLneLi3N0G3lCnyOHrDo3j0pgwvQ13oOyO/fgS4kmIm0gH7SHqcAJgt5CAslj3D7qMi/1ZeQ==', 15, 0, 4, GETDATE(), 1, 1)

--development & staging product ids
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7917, N'Bold Reports On-Premise Embedded - Custom', 1, 43, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7918, N'Bold Reports On-Premise Embedded - Custom Subscription', 2, 43, 1)

--production product ids - check with website team before using this query.
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7915, N'Bold Reports On-Premise Embedded - Custom', 1, 43, 1)
INSERT [dbo].[IntranetProductType] ([ProductId], [ProductName], [OrderTypeId], [PlanId], [IsActive]) VALUES (7916, N'Bold Reports On-Premise Embedded - Custom Subscription', 2, 43, 1)