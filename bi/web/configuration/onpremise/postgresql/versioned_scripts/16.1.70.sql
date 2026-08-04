ALTER TABLE SyncDS_Group ADD COLUMN IsAdminGroup SMALLINT DEFAULT 0 NOT NULL;

UPDATE SyncDS_Group SET IsAdminGroup = 1 WHERE Name = 'System Administrator';

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleDetail_ScheduleId"
ON boldbi_scheduledetail (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleLog_ScheduleId"
ON boldbi_schedulelog (scheduleid)
INCLUDE (executeddate, schedulestatusid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item"
ON boldbi_item (isactive, itemtypeid, parentid, isdraft)
INCLUDE (createdbyid, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_User_Email"
ON boldbi_user (email);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_User_Username"
ON boldbi_user (username);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_User_IsActive"
ON boldbi_user (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserLogin_UserId"
ON boldbi_userlogin (userid, loggedintime);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPreference_UserId"
ON boldbi_userpreference (userid)
INCLUDE (modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Group_IsActive"
ON boldbi_group (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserGroup_GroupId"
ON boldbi_usergroup (groupid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserGroup_UserId"
ON boldbi_usergroup (userid, groupid);


-- ========================
-- Item catalog, hierarchy, views, versions, trash
-- ========================
CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_ParentId"
ON boldbi_item (parentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_CreatedById"
ON boldbi_item (createdbyid)
INCLUDE (createddate, itemtypeid, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_ModifiedById"
ON boldbi_item (modifiedbyid)
INCLUDE (modifieddate, itemtypeid, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Item_ItemType_IsActive"
ON boldbi_item (itemtypeid, isactive)
INCLUDE (name, parentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemView_ItemId"
ON boldbi_itemview (itemid)
INCLUDE (userid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemView_UserId"
ON boldbi_itemview (userid)
INCLUDE (itemid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemTrash_ItemId"
ON boldbi_itemtrash (itemid)
INCLUDE (trashedbyid, trasheddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemTrashDeleted_ItemTrashId"
ON boldbi_itemtrashdeleted (itemtrashid)
INCLUDE (itemid, deletedbyid, deleteddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemVersion_ItemId"
ON boldbi_itemversion (itemid, iscurrentversion)
INCLUDE (versionnumber, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemVersion_Item_Version"
ON boldbi_itemversion (itemid, versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermission_User"
ON boldbi_userpermission (userid, isactive)
INCLUDE (permissionentityid, permissionaccessid, itemid, itemtypeid, settingstypeid, scopegroupid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermission_Item"
ON boldbi_userpermission (itemid, isactive)
INCLUDE (userid, permissionentityid, permissionaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermission_Group"
ON boldbi_grouppermission (groupid, isactive)
INCLUDE (permissionentityid, permissionaccessid, itemid, itemtypeid, settingstypeid, scopegroupid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermission_Item"
ON boldbi_grouppermission (itemid, isactive)
INCLUDE (groupid, permissionentityid, permissionaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionEntity_ItemType"
ON boldbi_permissionentity (itemtypeid, entitytype)
INCLUDE (name, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionAccEntity_PermissionEntityId"
ON boldbi_permissionaccentity (permissionentityid)
INCLUDE (permissionaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionAccEntity_PermissionAccessId"
ON boldbi_permissionaccentity (permissionaccessid)
INCLUDE (permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleDetail_ItemId"
ON boldbi_scheduledetail (itemid)
INCLUDE (scheduleid, name, isenabled, nextschedule, recurrencetypeid, exporttypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleDetail_IsEnabled_Next"
ON boldbi_scheduledetail (isenabled, nextschedule)
INCLUDE (scheduleid, itemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedUser_Schedule"
ON boldbi_subscribeduser (scheduleid)
INCLUDE (recipientuserid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedUser_Recipient"
ON boldbi_subscribeduser (recipientuserid)
INCLUDE (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedGroup_Schedule"
ON boldbi_subscribedgroup (scheduleid)
INCLUDE (recipientgroupid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscribedGroup_Recipient"
ON boldbi_subscribedgroup (recipientgroupid)
INCLUDE (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SubscrExtnRecpt_Schedule"
ON boldbi_subscrextnrecpt (scheduleid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleMissingLogs_Schedule"
ON boldbi_schedulemissinglogs (scheduleid, startdate, enddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleLogUser_Schedule"
ON boldbi_scheduleloguser (scheduleid, schedulestatusid, delivereddate)
INCLUDE (delivereduserid, isondemand);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleLogGroup_Schedule"
ON boldbi_scheduleloggroup (scheduleid, schedulestatusid, delivereddate)
INCLUDE (groupid, delivereduserid, isondemand);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SchdLogExtnRecpt_Schedule"
ON boldbi_schdlogextnrecpt (scheduleid, schedulestatusid, delivereddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleRunHistory_Schedule"
ON boldbi_schedulerunhistory (scheduleid, starteddate DESC)
INCLUDE (schedulestatusid, isondemand, message);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Comment_ItemId"
ON boldbi_comment (itemid, createddate DESC)
INCLUDE (userid, parentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Comment_ParentId"
ON boldbi_comment (parentid, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemCommentLog_CommentId"
ON boldbi_itemcommentlog (commentid)
INCLUDE (itemcommentlogtypeid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemCommentLog_CurrentUserId"
ON boldbi_itemcommentlog (currentuserid)
INCLUDE (commentid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemWatch_ItemUser"
ON boldbi_itemwatch (itemid, userid)
INCLUDE (iswatched);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_FavoriteItem_User"
ON boldbi_favoriteitem (userid, itemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardWidget_DashboardItemId"
ON boldbi_dashboardwidget (dashboarditemid)
INCLUDE (widgetitemid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardWidget_WidgetItemId"
ON boldbi_dashboardwidget (widgetitemid)
INCLUDE (dashboarditemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardDataSource_Dashboard"
ON boldbi_dashboarddatasource (dashboarditemid)
INCLUDE (datasourceitemid, versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DashboardDataSource_DataSource"
ON boldbi_dashboarddatasource (datasourceitemid)
INCLUDE (dashboarditemid, versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_MultiTabDashboard_Parent"
ON boldbi_multitabdashboard (parentdashboardid, ordernumber)
INCLUDE (childdashboardid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_MultiTabDashboard_Child"
ON boldbi_multitabdashboard (childdashboardid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PublishedItem_ItemId"
ON boldbi_publisheditem (itemid, isactive)
INCLUDE (destinationitemid, publishtype, createddate, externalsiteid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PublishJobs_PublishId"
ON boldbi_publishjobs (publishid, status)
INCLUDE (createddate, completeddate, type);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DeploymentDashboards_Item"
ON boldbi_deploymentdashboards (itemid)
INCLUDE (createdbyid, createddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemLog_Item"
ON boldbi_itemlog (itemid, modifieddate DESC)
INCLUDE (itemlogtypeid, itemversionid, updateduserid, sourcetypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemLog_Version"
ON boldbi_itemlog (itemversionid, modifieddate DESC);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserLog_Target"
ON boldbi_userlog (targetuserid, createddate DESC)
INCLUDE (userlogtypeid, sourcetypeid, logstatusid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupLog_Target"
ON boldbi_grouplog (targetgroupid, createddate DESC)
INCLUDE (grouplogtypeid, sourcetypeid, logstatusid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermissionLog_User"
ON boldbi_userpermissionlog (userid, createddate DESC)
INCLUDE (affecteduserid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserPermissionLog_Affected"
ON boldbi_userpermissionlog (affecteduserid, createddate DESC)
INCLUDE (userid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermissionLog_User"
ON boldbi_grouppermissionlog (userid, createddate DESC)
INCLUDE (affectedgroupid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupPermissionLog_Affected"
ON boldbi_grouppermissionlog (affectedgroupid, createddate DESC)
INCLUDE (userid, logtypeid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SystemLog_TypeStatusTime"
ON boldbi_systemlog (systemlogtypeid, logstatusid, createddate DESC);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EmailActivityLog_User"
ON boldbi_emailactivitylog (userid, createddate DESC)
INCLUDE (status, recipientemail, mailsubject);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EmailActivityLog_Item"
ON boldbi_emailactivitylog (itemid, createddate DESC)
INCLUDE (status, recipientemail, event);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Notification_CurrentUser"
ON boldbi_notification (currentuserid, isread, modifieddate DESC)
INCLUDE (itemid, commentid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Notification_Item"
ON boldbi_notification (itemid, modifieddate DESC)
INCLUDE (currentuserid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Webhook_User"
ON boldbi_webhook (userid)
INCLUDE (isenable, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_NotificationTrigger_Webhook"
ON boldbi_notificationtrigger (webhookid)
INCLUDE (nextscheduledate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_WebhookLog_Webhook"
ON boldbi_webhooklog (webhookid, createddate DESC)
INCLUDE (event, responsestatuscode);

-- ========================
CREATE INDEX IF NOT EXISTS "IX_BOLDBI_AzureADCredential_IsActive"
ON boldbi_azureadcredential (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ADCredential_IsActive"
ON boldbi_adcredential (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SAMLSettings_IsEnabled"
ON boldbi_samlsettings (isenabled);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SystemSettings_IsActive"
ON boldbi_systemsettings (isactive)
INCLUDE (modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ServerVersion_VersionNumber"
ON boldbi_serverversion (versionnumber);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomExpression_Dashboard"
ON boldbi_customexpression (dashboardid)
INCLUDE (widgetid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomExpression_Widget"
ON boldbi_customexpression (widgetid)
INCLUDE (dashboardid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomExpression_User"
ON boldbi_customexpression (userid)
INCLUDE (dashboardid, widgetid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DataNotification_Schedule"
ON boldbi_datanotification (scheduleid)
INCLUDE (datasourceid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_DataNotification_DataSource"
ON boldbi_datanotification (datasourceid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_TableRelation_Left"
ON boldbi_tablerelation (lefttablename, lefttableschema)
INCLUDE (lefttablecolumnname);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_TableRelation_Right"
ON boldbi_tablerelation (righttablename, righttableschema)
INCLUDE (righttablecolumnname);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Homepage_User"
ON boldbi_homepage (userid)
INCLUDE (isdefaulthomepage);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_HomepageItemFilter_HomepageId"
ON boldbi_homepageitemfilter (homepageid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemSettings_ItemId"
ON boldbi_itemsettings (itemid)
INCLUDE (modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemUserPreference_Item"
ON boldbi_itemuserpreference (itemid)
INCLUDE (userid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemUserPreference_User"
ON boldbi_itemuserpreference (userid)
INCLUDE (itemid, modifieddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserAttributes_User"
ON boldbi_userattributes (userid)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupAttributes_Group"
ON boldbi_groupattributes (groupid)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SiteAttributes_IsActive"
ON boldbi_siteattributes (isactive)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ExternalSites_IsActive"
ON boldbi_externalsites (isactive)
INCLUDE (name);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SettingsType_IsActive"
ON boldbi_settingstype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_NotificationEvents_IsActive"
ON boldbi_notificationevents (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EventPayloads_IsActive"
ON boldbi_eventpayloads (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EventPayloadsMapping_EventType"
ON boldbi_eventpayloadsmapping (eventtype)
INCLUDE (payloadtype);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_EventPayloadsMapping_PayloadType"
ON boldbi_eventpayloadsmapping (payloadtype)
INCLUDE (eventtype);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserSession_Idp"
ON boldbi_usersession (idpreferenceid)
INCLUDE (sessionid, loggedintime, isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserSession_SessionId"
ON boldbi_usersession (sessionid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_BackgroundJobs_Status"
ON boldbi_backgroundjobs (status, createddate)
INCLUDE (itemid, userid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UploadDataSourceMapping_DownloadedTenant"
ON boldbi_uploaddatasourcemapping (downloadedtenantid)
INCLUDE (uploadeditemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UploadDataSourceMapping_UploadedItem"
ON boldbi_uploaddatasourcemapping (uploadeditemid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_AICredentials_IsActive"
ON boldbi_aicredentials (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ApiKeyDetails_CreatedBy"
ON boldbi_apikeydetails (createdby)
INCLUDE (isactive, lastuseddate);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_CustomEmailTemplate_IsActive"
ON boldbi_customemailtemplate (isactive)
INCLUDE (language, templateid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ResourceFeatureAccess_IsActive"
ON boldbi_resourcefeatureaccess (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ResourceFeatureAccEntity_PermissionEntityId"
ON boldbi_resourcefeatureaccentity (permissionentityid)
INCLUDE (resourcefeatureaccessid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ResourceFeatureAccEntity_ResourceFeatureAccessId"
ON boldbi_resourcefeatureaccentity (resourcefeatureaccessid)
INCLUDE (permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserResourceFeaturePermission_User"
ON boldbi_userresourcefeaturepermission (userid)
INCLUDE (itemid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserResourceFeaturePermission_Item"
ON boldbi_userresourcefeaturepermission (itemid)
INCLUDE (userid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupResourceFeaturePermission_Group"
ON boldbi_groupresourcefeaturepermission (groupid)
INCLUDE (itemid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupResourceFeaturePermission_Item"
ON boldbi_groupresourcefeaturepermission (itemid)
INCLUDE (groupid, permissionentityid);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemType_IsActive"
ON boldbi_itemtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemLogType_IsActive"
ON boldbi_itemlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_RecurrenceType_IsActive"
ON boldbi_recurrencetype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ExportType_IsActive"
ON boldbi_exporttype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ScheduleStatus_IsActive"
ON boldbi_schedulestatus (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ItemCommentLogType_IsActive"
ON boldbi_itemcommentlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionAccess_IsActive"
ON boldbi_permissionaccess (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PermissionLogType_IsActive"
ON boldbi_permissionlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SystemLogType_IsActive"
ON boldbi_systemlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_LogStatus_IsActive"
ON boldbi_logstatus (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserLogType_IsActive"
ON boldbi_userlogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_GroupLogType_IsActive"
ON boldbi_grouplogtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_PublishType_IsActive"
ON boldbi_publishtype (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_UserType_Type"
ON boldbi_usertype (type);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_ConditionCategory_IsActive"
ON boldbi_conditioncategory (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_Source_IsActive"
ON boldbi_source (isactive);

CREATE INDEX IF NOT EXISTS "IX_BOLDBI_SlideshowInfo_SlideshowId"
ON boldbi_slideshowinfo (slideshowid);

CREATE INDEX IF NOT EXISTS "IXF_BOLDBI_Item_IsActive"
ON boldbi_item (itemtypeid, parentid)
INCLUDE (name, createddate)
WHERE isactive = 1;

CREATE INDEX IF NOT EXISTS "IXF_BOLDBI_UserPermission_Active"
ON boldbi_userpermission (userid, itemid, permissionentityid)
INCLUDE (permissionaccessid)
WHERE isactive = 1;

CREATE INDEX IF NOT EXISTS "IXF_BOLDBI_GroupPermission_Active" 
ON boldbi_grouppermission (groupid, itemid, permissionentityid)
INCLUDE (permissionaccessid)
WHERE isactive = 1;
