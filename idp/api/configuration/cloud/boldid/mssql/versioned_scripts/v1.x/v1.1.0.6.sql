UPDATE [dbo].[TenantInfo] SET [TenantStatus]= 5 WHERE [TenantStatus] = 2
;
UPDATE [dbo].[TenantStatus] SET [IsActive]=N'False' WHERE [Id] =2
;
INSERT [dbo].[TenantStatus] ([Name], [IsActive]) VALUES (N'Trial', 1)
;
UPDATE [dbo].[SystemSettings] SET [SystemValue]=N'<?xml version="1.0" encoding="UTF-8"?><NotificationInfo><Notification><ScheduleType>AccountActivationReminder</ScheduleType><Intervals><Days>1</Days></Intervals><ExpireDays>2</ExpireDays></Notification><Notification><ScheduleType>PaymentDetailsUpdateReminder</ScheduleType><Intervals><Days>15</Days><Days>20</Days><Days>25</Days><Days>28</Days><Days>29</Days></Intervals><ExpireDays>30</ExpireDays></Notification><Notification><ScheduleType>SuspendGraceReminder</ScheduleType><Intervals><Days>1</Days><Days>4</Days></Intervals><ExpireDays>7</ExpireDays></Notification><Notification><ScheduleType>DeletionGraceReminder</ScheduleType><Intervals><Days>5</Days><Days>10</Days><Days>15</Days><Days>19</Days><Days>20</Days><Days>21</Days><Days>22</Days></Intervals><ExpireDays>23</ExpireDays></Notification><Notification><ScheduleType>ResourceDeletionGraceReminder</ScheduleType><Intervals><Days>15</Days><Days>29</Days></Intervals><ExpireDays>30</ExpireDays></Notification></NotificationInfo>' WHERE [SystemKey] = N'NotificationInfo'
;