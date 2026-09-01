ALTER TABLE SyncDS_Group ADD COLUMN IsAdminGroup SMALLINT DEFAULT 0 NOT NULL;

UPDATE SyncDS_Group SET IsAdminGroup = 1 WHERE Name = 'System Administrator';

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleDetail_ScheduleId"
ON SyncDS_scheduledetail (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleLog_ScheduleId"
ON SyncDS_schedulelog (scheduleid)
INCLUDE (executeddate, schedulestatusid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item"
ON SyncDS_item (isactive, itemtypeid, parentid, isdraft)
INCLUDE (createdbyid, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_User_Email"
ON SyncDS_user (email);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_User_Username"
ON SyncDS_user (username);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_User_IsActive"
ON SyncDS_user (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserLogin_UserId"
ON SyncDS_userlogin (userid, loggedintime);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPreference_UserId"
ON SyncDS_userpreference (userid)
INCLUDE (modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Group_IsActive"
ON SyncDS_group (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserGroup_GroupId"
ON SyncDS_usergroup (groupid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserGroup_UserId"
ON SyncDS_usergroup (userid, groupid);


-- ========================
-- Item catalog, hierarchy, views, versions, trash
-- ========================
CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_ParentId"
ON SyncDS_item (parentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_CreatedById"
ON SyncDS_item (createdbyid)
INCLUDE (createddate, itemtypeid, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_ModifiedById"
ON SyncDS_item (modifiedbyid)
INCLUDE (modifieddate, itemtypeid, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_ItemType_IsActive"
ON SyncDS_item (itemtypeid, isactive)
INCLUDE (name, parentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemView_ItemId"
ON SyncDS_itemview (itemid)
INCLUDE (userid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemView_UserId"
ON SyncDS_itemview (userid)
INCLUDE (itemid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemTrash_ItemId"
ON SyncDS_itemtrash (itemid)
INCLUDE (trashedbyid, trasheddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemTrashDeleted_ItemTrashId"
ON SyncDS_itemtrashdeleted (itemtrashid)
INCLUDE (itemid, deletedbyid, deleteddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemVersion_ItemId"
ON SyncDS_itemversion (itemid, iscurrentversion)
INCLUDE (versionnumber, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemVersion_Item_Version"
ON SyncDS_itemversion (itemid, versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermission_User"
ON SyncDS_userpermission (userid, isactive)
INCLUDE (permissionentityid, permissionaccessid, itemid, itemtypeid, settingstypeid, scopegroupid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermission_Item"
ON SyncDS_userpermission (itemid, isactive)
INCLUDE (userid, permissionentityid, permissionaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermission_Group"
ON SyncDS_grouppermission (groupid, isactive)
INCLUDE (permissionentityid, permissionaccessid, itemid, itemtypeid, settingstypeid, scopegroupid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermission_Item"
ON SyncDS_grouppermission (itemid, isactive)
INCLUDE (groupid, permissionentityid, permissionaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionEntity_ItemType"
ON SyncDS_permissionentity (itemtypeid, entitytype)
INCLUDE (name, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionAccEntity_PermissionEntityId"
ON SyncDS_permissionaccentity (permissionentityid)
INCLUDE (permissionaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionAccEntity_PermissionAccessId"
ON SyncDS_permissionaccentity (permissionaccessid)
INCLUDE (permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleDetail_ItemId"
ON SyncDS_scheduledetail (itemid)
INCLUDE (scheduleid, name, isenabled, nextschedule, recurrencetypeid, exporttypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleDetail_IsEnabled_Next"
ON SyncDS_scheduledetail (isenabled, nextschedule)
INCLUDE (scheduleid, itemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedUser_Schedule"
ON SyncDS_subscribeduser (scheduleid)
INCLUDE (recipientuserid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedUser_Recipient"
ON SyncDS_subscribeduser (recipientuserid)
INCLUDE (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedGroup_Schedule"
ON SyncDS_subscribedgroup (scheduleid)
INCLUDE (recipientgroupid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedGroup_Recipient"
ON SyncDS_subscribedgroup (recipientgroupid)
INCLUDE (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscrExtnRecpt_Schedule"
ON SyncDS_subscrextnrecpt (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleMissingLogs_Schedule"
ON SyncDS_schedulemissinglogs (scheduleid, startdate, enddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleLogUser_Schedule"
ON SyncDS_scheduleloguser (scheduleid, schedulestatusid, delivereddate)
INCLUDE (delivereduserid, isondemand);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleLogGroup_Schedule"
ON SyncDS_scheduleloggroup (scheduleid, schedulestatusid, delivereddate)
INCLUDE (groupid, delivereduserid, isondemand);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SchdLogExtnRecpt_Schedule"
ON SyncDS_schdlogextnrecpt (scheduleid, schedulestatusid, delivereddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleRunHistory_Schedule"
ON SyncDS_schedulerunhistory (scheduleid, starteddate DESC)
INCLUDE (schedulestatusid, isondemand);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Comment_ItemId"
ON SyncDS_comment (itemid, createddate DESC)
INCLUDE (userid, parentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Comment_ParentId"
ON SyncDS_comment (parentid, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemCommentLog_CommentId"
ON SyncDS_itemcommentlog (commentid)
INCLUDE (itemcommentlogtypeid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemCommentLog_CurrentUserId"
ON SyncDS_itemcommentlog (currentuserid)
INCLUDE (commentid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemWatch_ItemUser"
ON SyncDS_itemwatch (itemid, userid)
INCLUDE (iswatched);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_FavoriteItem_User"
ON SyncDS_favoriteitem (userid, itemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardWidget_DashboardItemId"
ON SyncDS_dashboardwidget (dashboarditemid)
INCLUDE (widgetitemid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardWidget_WidgetItemId"
ON SyncDS_dashboardwidget (widgetitemid)
INCLUDE (dashboarditemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardDataSource_Dashboard"
ON SyncDS_dashboarddatasource (dashboarditemid)
INCLUDE (datasourceitemid, versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardDataSource_DataSource"
ON SyncDS_dashboarddatasource (datasourceitemid)
INCLUDE (dashboarditemid, versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_MultiTabDashboard_Parent"
ON SyncDS_multitabdashboard (parentdashboardid, ordernumber)
INCLUDE (childdashboardid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_MultiTabDashboard_Child"
ON SyncDS_multitabdashboard (childdashboardid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PublishedItem_ItemId"
ON SyncDS_publisheditem (itemid, isactive)
INCLUDE (destinationitemid, publishtype, createddate, externalsiteid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PublishJobs_PublishId"
ON SyncDS_publishjobs (publishid, status)
INCLUDE (createddate, completeddate, type);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DeploymentDashboards_Item"
ON SyncDS_deploymentdashboards (itemid)
INCLUDE (createdbyid, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemLog_Item"
ON SyncDS_itemlog (itemid, modifieddate DESC)
INCLUDE (itemlogtypeid, itemversionid, updateduserid, sourcetypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemLog_Version"
ON SyncDS_itemlog (itemversionid, modifieddate DESC);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserLog_Target"
ON SyncDS_userlog (targetuserid, createddate DESC)
INCLUDE (userlogtypeid, sourcetypeid, logstatusid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupLog_Target"
ON SyncDS_grouplog (targetgroupid, createddate DESC)
INCLUDE (grouplogtypeid, sourcetypeid, logstatusid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermissionLog_User"
ON SyncDS_userpermissionlog (userid, createddate DESC)
INCLUDE (affecteduserid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermissionLog_Affected"
ON SyncDS_userpermissionlog (affecteduserid, createddate DESC)
INCLUDE (userid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermissionLog_User"
ON SyncDS_grouppermissionlog (userid, createddate DESC)
INCLUDE (affectedgroupid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermissionLog_Affected"
ON SyncDS_grouppermissionlog (affectedgroupid, createddate DESC)
INCLUDE (userid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SystemLog_TypeStatusTime"
ON SyncDS_systemlog (systemlogtypeid, logstatusid, createddate DESC);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EmailActivityLog_User"
ON SyncDS_emailactivitylog (userid, createddate DESC)
INCLUDE (status, recipientemail, mailsubject);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EmailActivityLog_Item"
ON SyncDS_emailactivitylog (itemid, createddate DESC)
INCLUDE (status, recipientemail, event);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Notification_CurrentUser"
ON SyncDS_notification (currentuserid, isread, modifieddate DESC)
INCLUDE (itemid, commentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Notification_Item"
ON SyncDS_notification (itemid, modifieddate DESC)
INCLUDE (currentuserid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Webhook_User"
ON SyncDS_webhook (userid)
INCLUDE (isenable, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_NotificationTrigger_Webhook"
ON SyncDS_notificationtrigger (webhookid)
INCLUDE (nextscheduledate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_WebhookLog_Webhook"
ON SyncDS_webhooklog (webhookid, createddate DESC)
INCLUDE (event, responsestatuscode);

-- ========================
CREATE INDEX IF NOT EXISTS "IX_BOLDBI_AzureADCredential_IsActive"
ON SyncDS_azureadcredential (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ADCredential_IsActive"
ON SyncDS_adcredential (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SAMLSettings_IsEnabled"
ON SyncDS_samlsettings (isenabled);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SystemSettings_IsActive"
ON SyncDS_systemsettings (isactive)
INCLUDE (modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ServerVersion_VersionNumber"
ON SyncDS_serverversion (versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomExpression_Dashboard"
ON SyncDS_customexpression (dashboardid)
INCLUDE (widgetid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomExpression_Widget"
ON SyncDS_customexpression (widgetid)
INCLUDE (dashboardid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomExpression_User"
ON SyncDS_customexpression (userid)
INCLUDE (dashboardid, widgetid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DataNotification_Schedule"
ON SyncDS_datanotification (scheduleid)
INCLUDE (datasourceid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DataNotification_DataSource"
ON SyncDS_datanotification (datasourceid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_TableRelation_Left"
ON SyncDS_tablerelation (lefttablename, lefttableschema)
INCLUDE (lefttablecolumnname);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_TableRelation_Right"
ON SyncDS_tablerelation (righttablename, righttableschema)
INCLUDE (righttablecolumnname);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Homepage_User"
ON SyncDS_homepage (userid)
INCLUDE (isdefaulthomepage);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_HomepageItemFilter_HomepageId"
ON SyncDS_homepageitemfilter (homepageid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemSettings_ItemId"
ON SyncDS_itemsettings (itemid)
INCLUDE (modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemUserPreference_Item"
ON SyncDS_itemuserpreference (itemid)
INCLUDE (userid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemUserPreference_User"
ON SyncDS_itemuserpreference (userid)
INCLUDE (itemid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserAttributes_User"
ON SyncDS_userattributes (userid)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupAttributes_Group"
ON SyncDS_groupattributes (groupid)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SiteAttributes_IsActive"
ON SyncDS_siteattributes (isactive)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ExternalSites_IsActive"
ON SyncDS_externalsites (isactive)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SettingsType_IsActive"
ON SyncDS_settingstype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_NotificationEvents_IsActive"
ON SyncDS_notificationevents (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EventPayloads_IsActive"
ON SyncDS_eventpayloads (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EventPayloadsMapping_EventType"
ON SyncDS_eventpayloadsmapping (eventtype)
INCLUDE (payloadtype);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EventPayloadsMapping_PayloadType"
ON SyncDS_eventpayloadsmapping (payloadtype)
INCLUDE (eventtype);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserSession_Idp"
ON SyncDS_usersession (idpreferenceid)
INCLUDE (sessionid, loggedintime, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserSession_SessionId"
ON SyncDS_usersession (sessionid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_BackgroundJobs_Status"
ON SyncDS_backgroundjobs (status, createddate)
INCLUDE (itemid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UploadDataSourceMapping_DownloadedTenant"
ON SyncDS_uploaddatasourcemapping (downloadedtenantid)
INCLUDE (uploadeditemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UploadDataSourceMapping_UploadedItem"
ON SyncDS_uploaddatasourcemapping (uploadeditemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_AICredentials_IsActive"
ON SyncDS_aicredentials (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ApiKeyDetails_CreatedBy"
ON SyncDS_apikeydetails (createdby)
INCLUDE (isactive, lastuseddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomEmailTemplate_IsActive"
ON SyncDS_customemailtemplate (isactive)
INCLUDE (language, templateid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ResourceFeatureAccess_IsActive"
ON SyncDS_resourcefeatureaccess (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ResourceFeatureAccEntity_PermissionEntityId"
ON SyncDS_resourcefeatureaccentity (permissionentityid)
INCLUDE (resourcefeatureaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ResourceFeatureAccEntity_ResourceFeatureAccessId"
ON SyncDS_resourcefeatureaccentity (resourcefeatureaccessid)
INCLUDE (permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserResourceFeaturePermission_User"
ON SyncDS_userresourcefeaturepermission (userid)
INCLUDE (itemid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserResourceFeaturePermission_Item"
ON SyncDS_userresourcefeaturepermission (itemid)
INCLUDE (userid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupResourceFeaturePermission_Group"
ON SyncDS_groupresourcefeaturepermission (groupid)
INCLUDE (itemid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupResourceFeaturePermission_Item"
ON SyncDS_groupresourcefeaturepermission (itemid)
INCLUDE (groupid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemType_IsActive"
ON SyncDS_itemtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemLogType_IsActive"
ON SyncDS_itemlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_RecurrenceType_IsActive"
ON SyncDS_recurrencetype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ExportType_IsActive"
ON SyncDS_exporttype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleStatus_IsActive"
ON SyncDS_schedulestatus (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemCommentLogType_IsActive"
ON SyncDS_itemcommentlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionAccess_IsActive"
ON SyncDS_permissionaccess (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionLogType_IsActive"
ON SyncDS_permissionlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SystemLogType_IsActive"
ON SyncDS_systemlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_LogStatus_IsActive"
ON SyncDS_logstatus (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserLogType_IsActive"
ON SyncDS_userlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupLogType_IsActive"
ON SyncDS_grouplogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PublishType_IsActive"
ON SyncDS_publishtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserType_Type"
ON SyncDS_usertype (type);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ConditionCategory_IsActive"
ON SyncDS_conditioncategory (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Source_IsActive"
ON SyncDS_source (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SlideshowInfo_SlideshowId"
ON SyncDS_slideshowinfo (slideshowid);

CREATE INDEX IF NOT EXISTS "IXF_BOLDBI_Item_IsActive"
ON SyncDS_item (itemtypeid, parentid)
INCLUDE (name, createddate)
WHERE isactive = 1;

CREATE INDEX IF NOT EXISTS "IXF_BOLDBI_UserPermission_Active"
ON SyncDS_userpermission (userid, itemid, permissionentityid)
INCLUDE (permissionaccessid)
WHERE isactive = 1;

CREATE INDEX IF NOT EXISTS "IXF_BOLDBI_GroupPermission_Active" 
ON SyncDS_grouppermission (groupid, itemid, permissionentityid)
INCLUDE (permissionaccessid)
WHERE isactive = 1;
