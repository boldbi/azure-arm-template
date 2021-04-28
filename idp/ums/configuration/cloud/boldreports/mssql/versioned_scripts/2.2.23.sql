INSERT into [BOLDRS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) Values (2,N'EnableReportScheduleNotification',N'NotificationSettings.ReportScheduleNotification.DefaultSetting',GETDATE(),1)
;
INSERT into [BOLDRS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) Values (2,N'EnableUserScheduleNotification',N'NotificationSettings.UserScheduleNotification.DefaultSetting',GETDATE(),1)
;
INSERT into [BOLDRS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableReportScheduleNotification',N'NotificationSettings.ReportScheduleNotification.Allow',GETDATE(),1)
;
INSERT into [BOLDRS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (3,N'EnableUserScheduleNotification',N'NotificationSettings.UserScheduleNotification.Allow',GETDATE(),1)
;
INSERT into [BOLDRS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableReportScheduleNotification',N'Report Schedule Notification',GETDATE(),1)
;
INSERT into [BOLDRS_LogField] (ModuleId,Field,Description,ModifiedDate,IsActive) VALUES (14,N'EnableUserScheduleNotification',N'User Schedule Notification',GETDATE(),1)
;
ALTER TABLE [BOLDRS_ScheduleDetail] ADD Subject [nvarchar] (4000) NULL
;