CREATE TABLE "SyncDS_User"(
	"Id" int primary key NOT NULL,
	"UserName" NVARCHAR2(100) NOT NULL,
	"FirstName" NVARCHAR2(255) NOT NULL,
	"LastName" NVARCHAR2(255) NULL,
	"DisplayName" NVARCHAR2(512) NULL,
	"Email" NVARCHAR2(255) NOT NULL,
	"Password" NVARCHAR2(255) NOT NULL,
	"Contact" NVARCHAR2(20) NULL,
	"Picture" NVARCHAR2(100) NOT NULL,	
	"CreatedDate" DATE NOT NULL,
	"ModifiedDate" DATE NULL,
	"LastLogin" DATE NULL,
	"PasswordChangedDate" DATE NULL,
	"ActivationExpirationDate" DATE NULL,
	"ActivationCode" NVARCHAR2(255) NOT NULL,
	"ResetPasswordCode" NVARCHAR2(255) NULL,
	"LastResetAttempt" DATE NULL,
	"UserTypeId" int DEFAULT 0 NOT NULL,
	"IsActivated" NUMBER(1) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL,
	"IsDeleted" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_User_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_Group"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(255) NOT NULL,
	"Description" NVARCHAR2(1026) NULL,
	"Color" NVARCHAR2(255) DEFAULT 'White' NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_Group_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_UserGroup"(
	"Id" int PRIMARY KEY NOT NULL,
	"GroupId" int NOT NULL,
	"UserId" int NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_UserGroup_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_UserGroup"  ADD FOREIGN KEY("GroupId") REFERENCES "SyncDS_Group" ("Id")
;
ALTER TABLE "SyncDS_UserGroup"  ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_UserLogType"(
	"Id" int primary key NOT NULL,
	"Name" NVARCHAR2(100) NOT NULL UNIQUE,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_UserLogType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_UserLog"(
	"Id" int primary key NOT NULL,
	"UserLogTypeId" int NOT NULL,	
	"GroupId" int NULL,
	"OldValue" int NULL,
	"NewValue" int NULL,
	"UpdatedUserId" int NOT NULL,
	"TargetUserId" int NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_UserLog_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_UserLog"  ADD  FOREIGN KEY("UserLogTypeId") REFERENCES "SyncDS_UserLogType" ("Id")
;
ALTER TABLE "SyncDS_UserLog"  ADD  FOREIGN KEY("GroupId") REFERENCES "SyncDS_Group" ("Id")
;
ALTER TABLE "SyncDS_UserLog"  ADD  FOREIGN KEY("TargetUserId") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_UserLog"  ADD  FOREIGN KEY("UpdatedUserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_UserLogin"(
	"Id" int PRIMARY KEY NOT NULL,
	"UserId" int NOT NULL,
	"ClientToken" VARCHAR2(4000) NOT NULL,
	"IpAddress" NVARCHAR2(50) NOT NULL,
	"LoggedInTime" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_UserLogin_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_UserLogin"  ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_UserPreference"(
	"Id" int PRIMARY KEY NOT NULL,
	"UserId" int NOT NULL,
	"Language" VARCHAR2(4000) NULL,
	"TimeZone" NVARCHAR2(100) NULL,
	"RecordSize" int NULL,
	"ItemSort" VARCHAR2(4000) NULL,
	"ItemFilters" VARCHAR2(4000) NULL,
	"Notifications" VARCHAR2(4000) NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_UserPreference_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_UserPreference" ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_SystemLogType"(
	"Id" int primary key NOT NULL,
	"Name" NVARCHAR2(100) NOT NULL UNIQUE,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SystemLogType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_SystemLog"(
	"LogId" int primary key NOT NULL,
	"SystemLogTypeId" int NOT NULL,
	"UpdatedUserId" int NOT NULL,
	"TargetUserId" int NOT NULL,		
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SystemLog_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_SystemLog"  ADD FOREIGN KEY("SystemLogTypeId") REFERENCES "SyncDS_SystemLogType" ("Id")
;
ALTER TABLE "SyncDS_SystemLog"  ADD FOREIGN KEY("UpdatedUserId") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_SystemLog"  ADD FOREIGN KEY("TargetUserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ItemType"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(100) NOT NULL UNIQUE,
	"IsActive" NUMBER(1) NULL)
;

CREATE SEQUENCE "SyncDS_ItemType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_Item"(
	"Id" NCHAR(36) PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(255) NOT NULL,
	"Description" NVARCHAR2(1026) NULL,
	"ItemTypeId" int NOT NULL,
	"ParentId" NCHAR(36) NULL,
	"Extension" NVARCHAR2(30) NULL,
	"CloneItemId" NCHAR(36) NULL,
	"CreatedById" int NOT NULL,
	"ModifiedById" int NOT NULL,
	"CreatedDate" DATE NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsPublic" NUMBER(1) DEFAULT (0) NOT NULL,
	"IsActive" NUMBER(1) NULL)
;
CREATE SEQUENCE "SyncDS_Item_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;


ALTER TABLE "SyncDS_Item"  ADD FOREIGN KEY("ItemTypeId") REFERENCES "SyncDS_ItemType" ("Id")
;
ALTER TABLE "SyncDS_Item"  ADD FOREIGN KEY("ParentId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_Item"  ADD FOREIGN KEY("CreatedById") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_Item"  ADD FOREIGN KEY("ModifiedById") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ItemView"(
	"Id" int PRIMARY KEY NOT NULL,
	"ItemId" NCHAR(36) NOT NULL,
	"UserId" int NOT NULL,
	"ItemViewId" NCHAR(36) NOT NULL,
	"QueryString" VARCHAR2(4000) NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ItemView_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ItemView"  ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemView"  ADD FOREIGN KEY("ItemViewId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemView"  ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ItemLogType"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(100) NULL UNIQUE,
	"IsActive" NUMBER(1) NULL)
;

CREATE SEQUENCE "SyncDS_ItemLogType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;


CREATE TABLE "SyncDS_ItemTrash"(
	"Id" int PRIMARY KEY NOT NULL,
	"ItemId" NCHAR(36) NOT NULL,
	"TrashedById" int NOT NULL,
	"TrashedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ItemTrash_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ItemTrash"  ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemTrash"  ADD FOREIGN KEY("TrashedById") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ItemTrashDeleted"(
	"Id" int PRIMARY KEY NOT NULL,
	"ItemId" NCHAR(36) NOT NULL,
	"ItemTrashId" int NOT NULL,
	"DeletedById" int NOT NULL,
	"DeletedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ItemTrashDeleted_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ItemTrashDeleted"  ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemTrashDeleted"  ADD FOREIGN KEY("ItemTrashId") REFERENCES "SyncDS_ItemTrash" ("Id")
;
ALTER TABLE "SyncDS_ItemTrashDeleted"  ADD FOREIGN KEY("DeletedById") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ItemVersion"(
	"Id" int PRIMARY KEY NOT NULL,
	"ItemId" NCHAR(36) NOT NULL,
	"ItemTypeId" int NOT NULL,
	"ItemName" NVARCHAR2(265) NULL,
	"VersionNumber" int NOT NULL,
	"RolledbackVersionNumber" int NULL,
	"Comment" NVARCHAR2(1026) NULL,
	"IsCurrentVersion" NUMBER(1) NOT NULL,
	"CreatedById" int NOT NULL,
	"CreatedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ItemVersion_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ItemVersion"  ADD FOREIGN KEY("ItemTypeId") REFERENCES "SyncDS_ItemType" ("Id")
;
ALTER TABLE "SyncDS_ItemVersion"  ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemVersion"  ADD FOREIGN KEY("CreatedById") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ItemLog"(
	"Id" int PRIMARY KEY NOT NULL,
	"ItemLogTypeId" int NOT NULL,
	"ItemId" NCHAR(36) NOT NULL,
	"ItemVersionId" int NOT NULL,
	"ParentId" NCHAR(36) NULL,
	"FromCategoryId" NCHAR(36) NULL,
	"ToCategoryId" NCHAR(36) NULL,
	"UpdatedUserId" int NOT NULL,	
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ItemLog_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ItemLog"  ADD FOREIGN KEY("ItemVersionId") REFERENCES "SyncDS_ItemVersion" ("Id")
;
ALTER TABLE "SyncDS_ItemLog"  ADD FOREIGN KEY("ItemLogTypeId") REFERENCES "SyncDS_ItemLogType" ("Id")
;
ALTER TABLE "SyncDS_ItemLog"  ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemLog"  ADD FOREIGN KEY("ParentId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemLog"  ADD FOREIGN KEY("FromCategoryId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemLog"  ADD FOREIGN KEY("ToCategoryId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemLog"  ADD FOREIGN KEY("UpdatedUserId") REFERENCES "SyncDS_User" ("Id")
;


CREATE TABLE "SyncDS_PermissionEntity"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(100) NOT NULL UNIQUE,
	"EntityType" int NOT NULL,
	"ItemTypeId" int NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;
ALTER TABLE "SyncDS_PermissionEntity"  ADD FOREIGN KEY("ItemTypeId") REFERENCES "SyncDS_ItemType" ("Id")
;

CREATE SEQUENCE "SyncDS_PermissionEntity_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_UserPermission"(
	"Id" int PRIMARY KEY NOT NULL,
	"PermissionAccessId" int NOT NULL,
	"PermissionEntityId" int NOT NULL,
	"ItemId" NCHAR(36) NULL,
	"UserId" int NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_UserPermission_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_UserPermission"  ADD  FOREIGN KEY("PermissionEntityId") REFERENCES "SyncDS_PermissionEntity" ("Id")
;
ALTER TABLE "SyncDS_UserPermission"  ADD  FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_UserPermission" ADD  FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_GroupPermission"(
	"Id" int PRIMARY KEY NOT NULL,
	"PermissionAccessId" int NOT NULL,
	"PermissionEntityId" int NOT NULL,
	"ItemId" NCHAR(36) NULL,
	"GroupId" int NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_GroupPermission_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_GroupPermission"  ADD  FOREIGN KEY("PermissionEntityId") REFERENCES "SyncDS_PermissionEntity" ("Id")
;
ALTER TABLE "SyncDS_GroupPermission"  ADD  FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_GroupPermission"  ADD  FOREIGN KEY("GroupId") REFERENCES "SyncDS_Group" ("Id")
;

CREATE TABLE "SyncDS_RecurrenceType"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(30) NOT NULL UNIQUE,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_RecurrenceType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_ExportType"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(20) NOT NULL UNIQUE,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ExportType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_ScheduleDetail"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"ItemId" NCHAR(36) NOT NULL,
	"Name" NVARCHAR2(150) NOT NULL,
	"RecurrenceTypeId" int NULL,
	"RecurrenceInfo" VARCHAR2(4000) NULL,
	"EmailContent" VARCHAR2(4000) NULL,
	"IsDataChanges" NUMBER(1) DEFAULT (0) NOT NULL,
	"IsTimeInterval" NUMBER(1) DEFAULT (0) NOT NULL,
	"StartDate" DATE NULL,
	"EndDate" DATE NULL,
	"EndAfter" int DEFAULT 0 NULL,
	"NextSchedule" DATE NULL,
	"ExportTypeId" int NOT NULL,
	"IsEnabled" NUMBER(1) NOT NULL,
	"CreatedById" int NOT NULL,
	"ModifiedById" int NOT NULL,
	"CreatedDate" DATE NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ScheduleDetail_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ScheduleDetail"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ScheduleDetail"  ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ScheduleDetail"  ADD FOREIGN KEY("RecurrenceTypeId") REFERENCES "SyncDS_RecurrenceType" ("Id")
;
ALTER TABLE "SyncDS_ScheduleDetail"  ADD FOREIGN KEY("ExportTypeId") REFERENCES "SyncDS_ExportType" ("Id")
;
ALTER TABLE "SyncDS_ScheduleDetail"  ADD FOREIGN KEY("CreatedById") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_ScheduleDetail"  ADD FOREIGN KEY("ModifiedById") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_SubscribedUser"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"SubscribedById" int NOT NULL,
	"RecipientUserId" int NOT NULL,
	"SubscribedDate" DATE NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SubscribedUser_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_SubscribedUser"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_SubscribedUser"  ADD FOREIGN KEY("SubscribedById") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_SubscribedUser"  ADD FOREIGN KEY("RecipientUserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_SubscribedGroup"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"SubscribedById" int NOT NULL,
	"RecipientGroupId" int NOT NULL,
	"SubscribedDate" DATE NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SubscribedGroup_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_SubscribedGroup"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_SubscribedGroup"  ADD FOREIGN KEY("SubscribedById") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_SubscribedGroup"  ADD FOREIGN KEY("RecipientGroupId") REFERENCES "SyncDS_Group" ("Id")
;

CREATE TABLE "SyncDS_SubscrExtnRecpt"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"SubscribedById" int NOT NULL,
	"EmailIds" VARCHAR2(4000) NOT NULL,
	"SubscribedDate" DATE NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SubscrExtnRecpt_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;
	
ALTER TABLE "SyncDS_SubscrExtnRecpt"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_SubscrExtnRecpt"  ADD FOREIGN KEY("SubscribedById") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ScheduleStatus"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(100) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ScheduleStatus_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_ScheduleLogUser"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"ScheduleStatusId" int NOT NULL,
	"DeliveredUserId" int NOT NULL,
	"DeliveredDate" DATE NOT NULL,
	"IsOnDemand" NUMBER(1) NOT NULL,	
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ScheduleLogUser_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ScheduleLogUser"  ADD FOREIGN KEY("ScheduleStatusId") REFERENCES "SyncDS_ScheduleStatus" ("Id")
;
ALTER TABLE "SyncDS_ScheduleLogUser"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ScheduleLogUser"  ADD FOREIGN KEY("DeliveredUserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_ScheduleLogGroup"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"ScheduleStatusId" int NOT NULL,
	"GroupId" int NOT NULL,
	"DeliveredUserId" int NOT NULL,
	"DeliveredDate" DATE NOT NULL,
	"IsOnDemand" NUMBER(1) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ScheduleLogGroup_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ScheduleLogGroup"  ADD FOREIGN KEY("ScheduleStatusId") REFERENCES "SyncDS_ScheduleStatus" ("Id")
;
ALTER TABLE "SyncDS_ScheduleLogGroup"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ScheduleLogGroup"  ADD FOREIGN KEY("GroupId") REFERENCES "SyncDS_Group" ("Id")
;
ALTER TABLE "SyncDS_ScheduleLogGroup"  ADD FOREIGN KEY("DeliveredUserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_SchdLogExtnRecpt"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"ScheduleStatusId" int NOT NULL,
	"DeliveredEmailId" NVARCHAR2(150) NOT NULL,
	"DeliveredDate" DATE NOT NULL,
	"IsOnDemand" NUMBER(1) NOT NULL,	
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SchdLogExtnRecpt_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;
	
ALTER TABLE "SyncDS_SchdLogExtnRecpt"  ADD FOREIGN KEY("ScheduleStatusId") REFERENCES "SyncDS_ScheduleStatus" ("Id")
;
ALTER TABLE "SyncDS_SchdLogExtnRecpt"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;

CREATE TABLE "SyncDS_ScheduleLog"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleStatusId" int NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"ExecutedDate" DATE NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsOnDemand" NUMBER(1) DEFAULT (0) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ScheduleLog_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ScheduleLog"  ADD FOREIGN KEY("ScheduleStatusId") REFERENCES "SyncDS_ScheduleStatus" ("Id")
;
ALTER TABLE "SyncDS_ScheduleLog"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;

CREATE TABLE "SyncDS_SystemSettings"(
	"Id" int PRIMARY KEY NOT NULL,
	"Key" NVARCHAR2(255) NOT NULL,
	"Value" VARCHAR2(4000) NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL,
	CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE ("Key"))
;

CREATE SEQUENCE "SyncDS_SystemSettings_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_ServerVersion"(
	"Id" int PRIMARY KEY NOT NULL,
	"VersionNumber" NVARCHAR2(20) NOT NULL)
;
CREATE SEQUENCE "SyncDS_ServerVersion_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

create table "SyncDS_ADUser"(
	"Id" int primary key NOT NULL,
	"UserId" int not null,
	"ActiveDirectoryUserId" NCHAR(36) not null,
	"IsActive" NUMBER(1) not null)
;

CREATE SEQUENCE "SyncDS_ADUser_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ADUser" ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

create table "SyncDS_ADGroup"(
	"Id" int primary key NOT NULL,
	"GroupId" int not null,
	"ActiveDirectoryGroupId" NCHAR(36) not null,
	"IsActive" NUMBER(1) not null)
;

CREATE SEQUENCE "SyncDS_ADGroup_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ADGroup" ADD FOREIGN KEY("GroupId") REFERENCES "SyncDS_Group" ("Id")
;

create table "SyncDS_ADCredential"(
	"Id" int primary key NOT NULL,
	"Username" NVARCHAR2(100),
	"Password" NVARCHAR2(100),
	"LdapUrl" NVARCHAR2(255),
	"EnableSsl" NUMBER(1) not null,
	"DistinguishedName" NVARCHAR2(150),
	"PortNo" int not null,
	"IsActive" NUMBER(1) not null)
;

CREATE SEQUENCE "SyncDS_ADCredential_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_Comment"(
    "Id" int primary key NOT NULL,
    "Comment" VARCHAR2(4000) NOT NULL,
    "ItemId" NCHAR(36) NOT NULL,
    "UserId" int NOT NULL,
    "ParentId" int NULL,
    "CreatedDate" DATE NOT NULL,
    "ModifiedDate" DATE NOT NULL,
    "ModifiedById" int NOT NULL,
    "IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_Comment_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_Comment" ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_Comment" ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_Comment" ADD FOREIGN KEY("ModifiedById") REFERENCES "SyncDS_User" ("Id")
; 

CREATE TABLE "SyncDS_ItemWatch"(
            "Id" int PRIMARY KEY NOT NULL,
            "ItemId" NCHAR(36) NOT NULL,
            "UserId" int NOT NULL,
            "ModifiedDate" DATE NOT NULL,
			"IsWatched" NUMBER(1) NOT NULL,
            "IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ItemWatch_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;
 
ALTER TABLE "SyncDS_ItemWatch" ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_ItemWatch" ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
; 

CREATE TABLE "SyncDS_ItemCommentLogType"(
    "Id" int PRIMARY KEY NOT NULL,
    "Name" NVARCHAR2(100) NULL UNIQUE,
    "IsActive" NUMBER(1) NULL)
;

CREATE SEQUENCE "SyncDS_ItemCommentLogType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_ItemCommentLog"(
    "Id" int PRIMARY KEY NOT NULL,
    "ItemCommentLogTypeId" int NOT NULL,
    "CurrentUserId" int NOT NULL,    
    "CommentId" int NOT NULL,
	"Url" VARCHAR2(4000) NOT NULL,
    "ClubId" NVARCHAR2(100) NOT NULL,
    "RepliedFor" int NULL,
    "OldValue" VARCHAR2(4000) NULL,
    "NewValue" VARCHAR2(4000) NULL,
    "NotificationTo" int NULL,    
    "ModifiedDate" DATE NOT NULL,
    "IsRead" NUMBER(1) NOT NULL,
    "IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_ItemCommentLog_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_ItemCommentLog"  ADD FOREIGN KEY("CurrentUserId") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_ItemCommentLog"  ADD FOREIGN KEY("ItemCommentLogTypeId") REFERENCES "SyncDS_ItemCommentLogType" ("Id")
;
ALTER TABLE "SyncDS_ItemCommentLog"  ADD FOREIGN KEY("CommentId") REFERENCES "SyncDS_Comment" ("Id")
;
ALTER TABLE "SyncDS_ItemCommentLog"  ADD FOREIGN KEY("RepliedFor") REFERENCES "SyncDS_Comment" ("Id")
;
ALTER TABLE "SyncDS_ItemCommentLog"  ADD FOREIGN KEY("NotificationTo") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_FavoriteItem" (
	"Id" int PRIMARY KEY NOT NULL,
	"UserId" int NOT NULL,
	"ItemId" NCHAR(36) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_FavoriteItem_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_FavoriteItem"  ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;
ALTER TABLE "SyncDS_FavoriteItem"  ADD FOREIGN KEY("ItemId") REFERENCES "SyncDS_Item" ("Id")
;

CREATE TABLE "SyncDS_DashboardWidget" (
	"Id" int PRIMARY KEY NOT NULL,
	"DashboardItemId" NCHAR(36) NOT NULL,
	"WidgetItemId" NCHAR(36) NOT NULL,
	"WidgetDesignerId" NCHAR(36) NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;
CREATE SEQUENCE "SyncDS_DashboardWidget_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_AzureADCredential"(
	"Id" int primary key NOT NULL,
	"TenantName" NVARCHAR2(255),
	"ClientId" NVARCHAR2(100),
	"ClientSecret" NVARCHAR2(100),
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_AzureADCredential_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_AzureADUser"(
	"Id" int primary key NOT NULL,
	"UserId" int NOT NULL,
	"AzureADUserId" NCHAR(36) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_AzureADUser_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_AzureADUser" ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_AzureADGroup"(
	"Id" int primary key NOT NULL,
	"GroupId" int NOT NULL,
	"AzureADGroupId" NCHAR(36) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_AzureADGroup_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_AzureADGroup" ADD FOREIGN KEY("GroupId") REFERENCES "SyncDS_Group" ("Id")
;


CREATE TABLE "SyncDS_SAMLSettings"(
	"Id" int primary key NOT NULL, 
	"MetadataURI" VARCHAR2(4000),
	"Authority" VARCHAR2(4000),
	"DesignerClientId" VARCHAR2(100),
	"TenantName" VARCHAR2(100), 	
	"MobileAppId" VARCHAR2(100),
	"IsEnabled" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SAMLSettings_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_UserType"(
	"Id" int primary key NOT NULL, 
	"Type" NVARCHAR2(100) UNIQUE)
;

CREATE SEQUENCE "SyncDS_UserType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_DashboardWidget"  ADD FOREIGN KEY("DashboardItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_DashboardWidget"  ADD FOREIGN KEY("WidgetItemId") REFERENCES "SyncDS_Item" ("Id")
;

CREATE TABLE "SyncDS_DashboardDataSource"(
	"Id" int PRIMARY KEY NOT NULL,
	"DashboardItemId" NCHAR(36) NOT NULL,
	"DataSourceName" NVARCHAR2(255) NOT NULL,
	"DataSourceItemId" NCHAR(36) NOT NULL,
	"VersionNumber" int NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_DashboardDataSource_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_DashboardDataSource"  ADD FOREIGN KEY("DashboardItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_DashboardDataSource"  ADD FOREIGN KEY("DataSourceItemId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_DashboardDataSource"  ADD FOREIGN KEY("VersionNumber") REFERENCES "SyncDS_ItemVersion" ("Id")
;

CREATE TABLE "SyncDS_Homepage"(
	"Id" NCHAR(36) primary key NOT NULL,
	"Name" NVARCHAR2(255) NOT NULL,
	"UserId" int NOT NULL,
	"ItemInfo" VARCHAR2(4000) NOT NULL,
	"ItemType" VARCHAR2(100) NOT NULL,
	"IsDefaultHomepage" NUMBER(1) NOT NULL,
    "CreatedDate" DATE NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

ALTER TABLE "SyncDS_Homepage"  ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;

CREATE TABLE "SyncDS_HomepageItemFilter"(
	"Id" int primary key NOT NULL,
	"HomepageId" NCHAR(36) NOT NULL,
	"FilterId" int NOT NULL,
	"QueryString" VARCHAR2(4000) NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_HomepageItemFilter_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_HomepageItemFilter"  ADD FOREIGN KEY("HomepageId") REFERENCES "SyncDS_Homepage" ("Id")
;

INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'Category',1)
;
INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'Dashboard',1)
;
INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'Report',1)
;
INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'Datasource',1)
;
INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'Dataset',1)
;
INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'File',1)
;
INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'Schedule',1)
;
INSERT into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'Widget',1)
;
insert into "SyncDS_ItemType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemType_seq".nextval,'ItemView',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Added',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Edited',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Deleted',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Moved',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Copied',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Cloned',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Trashed',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Restored',1)
;
INSERT into "SyncDS_ItemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemLogType_seq".nextval,'Rollbacked',1)
;

INSERT into "SyncDS_SystemLogType" ("Id","Name","IsActive") VALUES ("SyncDS_SystemLogType_seq".nextval,'Updated',1)
;

INSERT into "SyncDS_UserLogType" ("Id","Name","IsActive") VALUES ("SyncDS_UserLogType_seq".nextval,'Added',1)
;
INSERT into "SyncDS_UserLogType" ("Id","Name","IsActive") VALUES ("SyncDS_UserLogType_seq".nextval,'Updated',1)
;
INSERT into "SyncDS_UserLogType" ("Id","Name","IsActive") VALUES ("SyncDS_UserLogType_seq".nextval,'Deleted',1)
;
INSERT into "SyncDS_UserLogType" ("Id","Name","IsActive") VALUES ("SyncDS_UserLogType_seq".nextval,'Changed',1)
;

INSERT into "SyncDS_ExportType" ("Id","Name","IsActive") VALUES ("SyncDS_ExportType_seq".nextval,'Excel', 1)
;
INSERT into "SyncDS_ExportType" ("Id","Name","IsActive") VALUES ("SyncDS_ExportType_seq".nextval,'HTML', 1)
;
INSERT into "SyncDS_ExportType" ("Id","Name","IsActive") VALUES ("SyncDS_ExportType_seq".nextval,'PDF', 1)
;
INSERT into "SyncDS_ExportType" ("Id","Name","IsActive") VALUES ("SyncDS_ExportType_seq".nextval,'Word', 1)
;
INSERT into "SyncDS_ExportType" ("Id","Name","IsActive") VALUES ("SyncDS_ExportType_seq".nextval,'Image', 1)
;

INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'Daily', 1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'DailyWeekDay', 1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'Weekly', 1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'Monthly', 1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'MonthlyDOW', 1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'Yearly', 1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'YearlyDOW', 1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'Time', 1)
;

INSERT into "SyncDS_ScheduleStatus" ("Id","Name","IsActive") VALUES ("SyncDS_ScheduleStatus_seq".nextval,'Success', 1)
;
INSERT into "SyncDS_ScheduleStatus" ("Id","Name","IsActive") VALUES ("SyncDS_ScheduleStatus_seq".nextval,'Failure', 1)
;

INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Reports',1,3, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Reports in Category',2,1, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific Report',0,3, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Categories',1,1, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific Category',0,1, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Data Sources',1,4, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific Data Source',0,4, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Files',1,6, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific File',0,6, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Schedules',1,7, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific Schedule',0,7, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Dashboards',1,2, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Dashboards in Category',2,1, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific Dashboard',0,2, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Widgets',1,8, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific Widget',0,8, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All Datasets',1,5, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific Dataset',0,5, 1)
; 
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'Specific ItemView',0,9, 1)
;
INSERT into "SyncDS_PermissionEntity" ("Id","Name","EntityType","ItemTypeId","IsActive") VALUES ("SyncDS_PermissionEntity_seq".nextval,'All ItemViews',1,9, 1)
;
INSERT into "SyncDS_Group" ("Id","Name","Description","Color","ModifiedDate","IsActive") VALUES ("SyncDS_Group_seq".nextval,'System Administrator','Has administrative rights for the dashboard server','#ff0000',SYSDATE, 1)
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'Added',1)
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'Edited',1)
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'Deleted',1)
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'Upvoted',1)
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'Downvoted',1)
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'Replied',1)
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'UserMention',1)
;
INSERT into "SyncDS_UserType" ("Id","Type") values("SyncDS_UserType_seq".nextval,'Server User')
;
INSERT into "SyncDS_UserType" ("Id","Type") values("SyncDS_UserType_seq".nextval,'Active Directory User')
;
INSERT into "SyncDS_UserType" ("Id","Type") values("SyncDS_UserType_seq".nextval,'Federation User')
;

CREATE TABLE "SyncDS_DBCredential"(
    "Id" int PRIMARY KEY NOT NULL,
    "DatabaseType" NVARCHAR2(255) NOT NULL,
    "ConnectionString" VARCHAR2(4000) NOT NULL,
    "Status"  NVARCHAR2(255) NOT NULL,
    "ActiveStatusValue"  NVARCHAR2(255) NOT NULL,
    "UserNameSchema" NVARCHAR2(255) NOT NULL,
    "UserNameTable" NVARCHAR2(255) NOT NULL,
    "UserNameColumn" NVARCHAR2(255) NOT NULL,
    "FirstNameSchema" NVARCHAR2(255) NOT NULL,
    "FirstNameTable" NVARCHAR2(255) NOT NULL,
    "FirstNameColumn" NVARCHAR2(255) NOT NULL,
    "LastNameSchema" NVARCHAR2(255) NOT NULL,
    "LastNameTable" NVARCHAR2(255) NOT NULL,
    "LastNameColumn" NVARCHAR2(255) NOT NULL,
    "EmailSchema" NVARCHAR2(255) NOT NULL,
    "EmailTable" NVARCHAR2(255) NOT NULL,
    "EmailColumn" NVARCHAR2(255) NOT NULL,
    "IsActiveColumn" NVARCHAR2(255) NOT NULL,
    "IsActiveSchema" NVARCHAR2(255) NOT NULL,
    "IsActiveTable" NVARCHAR2(255) NOT NULL,
    "EmailRelationId" int NULL,
    "FirstNameRelationId" int NULL,
    "IsActiveRelationId" int NULL,
    "LastNameRelationId" int NULL,
    "IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_DBCredential_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_TableRelation"(
    "Id" int PRIMARY KEY NOT NULL,
    "LeftTable" NVARCHAR2(255) NOT NULL,
    "LeftTableColumnName" NVARCHAR2(255) NOT NULL,	
    "LeftTableCondition"  NVARCHAR2(255) NOT NULL,
    "LeftTableName"  NVARCHAR2(255) NOT NULL,
    "LeftTableSchema" NVARCHAR2(255) NOT NULL,
    "Relationship" NVARCHAR2(255) NOT NULL,
    "RightTable" NVARCHAR2(255) NOT NULL,
    "RightTableColumnName" NVARCHAR2(255) NOT NULL,	
    "RightTableCondition"  NVARCHAR2(255) NOT NULL,
    "RightTableName"  NVARCHAR2(255) NOT NULL,
    "RightTableSchema" NVARCHAR2(255) NOT NULL)
;

CREATE SEQUENCE "SyncDS_TableRelation_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_MultiTabDashboard"(
	"Id" int PRIMARY KEY NOT NULL,
	"ParentDashboardId" NCHAR(36) NOT NULL,
	"ChildDashboardId" NCHAR(36) NOT NULL,
	"DashboardDesignerId" NCHAR(36) NOT NULL,
	"ModifiedDate" DATE NOT NULL,
	"IsActive" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_MultiTabDashboard_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_MultiTabDashboard"  ADD FOREIGN KEY("ParentDashboardId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_MultiTabDashboard"  ADD FOREIGN KEY("ChildDashboardId") REFERENCES "SyncDS_Item" ("Id")
;

CREATE TABLE "SyncDS_DataNotification"(
	"Id" int PRIMARY KEY NOT NULL,
	"ScheduleId" NCHAR(36) NOT NULL,
	"Frequency" int NULL,
	"ConditionCategory" int NOT NULL,
	"PreviousValue" CLOB NULL,
	"PreviousData" CLOB NULL,
	"IsActive" NUMBER(1) NOT NULL,
	"ColumnInfo" CLOB NOT NULL,
	"ConditionInfo" CLOB NULL,
	"ItemName" NVARCHAR2(255) NOT NULL)
;

ALTER TABLE "SyncDS_DataNotification"  ADD FOREIGN KEY("ScheduleId") REFERENCES "SyncDS_Item" ("Id")
;

CREATE TABLE "SyncDS_ConditionCategory"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" VARCHAR2(255) NULL UNIQUE,
	"IsActive" NUMBER(1) NOT NULL)
	;

CREATE SEQUENCE "SyncDS_ConditionCategory_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

INSERT into "SyncDS_ConditionCategory" ("Id","Name","IsActive") VALUES ("SyncDS_ConditionCategory_seq".nextval,'Increases',1)
;
INSERT into "SyncDS_ConditionCategory" ("Id","Name","IsActive") VALUES ("SyncDS_ConditionCategory_seq".nextval,'Continuously Increases',1)
;
INSERT into "SyncDS_ConditionCategory" ("Id","Name","IsActive") VALUES ("SyncDS_ConditionCategory_seq".nextval,'Decreases',1)
;
INSERT into "SyncDS_ConditionCategory" ("Id","Name","IsActive") VALUES ("SyncDS_ConditionCategory_seq".nextval,'Continuously Decreases',1)
;
INSERT into "SyncDS_ConditionCategory" ("Id","Name","IsActive") VALUES ("SyncDS_ConditionCategory_seq".nextval,'Value Changes',1)
;
INSERT into "SyncDS_RecurrenceType" ("Id","Name","IsActive") VALUES ("SyncDS_RecurrenceType_seq".nextval,'Hourly',1)
;
CREATE SEQUENCE "SyncDS_DataNotification_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_PermissionAccess"(
	"Id" int PRIMARY KEY NOT NULL,
	"Name" NVARCHAR2(100) NOT NULL UNIQUE,
	"AccessId" int NOT NULL,
	"IsActive" NUMBER(1) NOT NULL )
;

CREATE SEQUENCE "SyncDS_PermissionAccess_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_PermissionAccEntity"(
	"Id" int PRIMARY KEY NOT NULL,
	"PermissionEntityId" int NOT NULL,
	"PermissionAccessId" int NOT NULL,
	"IsActive" NUMBER(1) NOT NULL )
;

CREATE SEQUENCE "SyncDS_PermissionAccEntity_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_PermissionAccEntity"  ADD FOREIGN KEY("PermissionEntityId") REFERENCES "SyncDS_PermissionEntity" ("Id")
;
ALTER TABLE "SyncDS_PermissionAccEntity"  ADD FOREIGN KEY("PermissionAccessId") REFERENCES "SyncDS_PermissionAccess" ("Id")
;

INSERT into "SyncDS_PermissionAccess" ("Id","Name","AccessId","IsActive") VALUES ("SyncDS_PermissionAccess_seq".nextval,'Create',1,1)
;
INSERT into "SyncDS_PermissionAccess" ("Id","Name","AccessId","IsActive") VALUES ("SyncDS_PermissionAccess_seq".nextval,'Read',2,1)
;
INSERT into "SyncDS_PermissionAccess" ("Id","Name","AccessId","IsActive") VALUES ("SyncDS_PermissionAccess_seq".nextval,'Read, Write',6,1)
;
INSERT into "SyncDS_PermissionAccess" ("Id","Name","AccessId","IsActive") VALUES ("SyncDS_PermissionAccess_seq".nextval,'Read, Write, Delete',14,1)
;
INSERT into "SyncDS_PermissionAccess" ("Id","Name","AccessId","IsActive") VALUES ("SyncDS_PermissionAccess_seq".nextval,'Read, Download',18,1)
;
INSERT into "SyncDS_PermissionAccess" ("Id","Name","AccessId","IsActive") VALUES ("SyncDS_PermissionAccess_seq".nextval,'Read, Write, Download',22,1)
;
INSERT into "SyncDS_PermissionAccess" ("Id","Name","AccessId","IsActive") VALUES ("SyncDS_PermissionAccess_seq".nextval,'Read, Write, Delete, Download',30,1)
;

INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,4,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,6,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,10,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,12,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,13,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,15,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,12,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,13,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,14,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,4,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,5,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,10,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,11,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,15,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,16,2,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,4,3,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,5,3,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,10,3,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,11,3,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,4,4,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,5,4,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,10,4,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,11,4,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,12,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,13,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,14,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,15,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,16,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,6,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,7,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,9,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,12,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,13,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,14,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,15,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,16,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,6,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,7,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,9,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,12,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,13,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,14,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,6,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,7,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,9,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,15,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,16,7,1)
;

CREATE TABLE "SyncDS_CustomExpression"(
	"Id" int PRIMARY KEY NOT NULL,
	"DashboardId" NCHAR(36) NOT NULL,
	"WidgetId" NCHAR(36) NOT NULL,
	"DatasourceId" NVARCHAR2(255) NOT NULL,
	"UserId" int NOT NULL,
	"Name" NVARCHAR2(255) NOT NULL,
	"Expression" VARCHAR2(4000) NOT NULL,
	"ColumnInfo" VARCHAR2(4000) NOT NULL,
	"IsActive" NUMBER(1) NOT NULL )
;

CREATE SEQUENCE "SyncDS_CustomExpression_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

ALTER TABLE "SyncDS_CustomExpression"  ADD FOREIGN KEY("DashboardId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_CustomExpression"  ADD FOREIGN KEY("WidgetId") REFERENCES "SyncDS_Item" ("Id")
;
ALTER TABLE "SyncDS_CustomExpression"  ADD FOREIGN KEY("UserId") REFERENCES "SyncDS_User" ("Id")
;