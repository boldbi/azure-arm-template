ALTER TABLE "SyncDS_ItemCommentLog" ADD "Url" VARCHAR2(4000) DEFAULT ' ' NOT NULL
;
ALTER TABLE "SyncDS_UserLogin" ADD "ClientToken_new" VARCHAR2(4000)
;
UPDATE "SyncDS_UserLogin" SET "ClientToken_new" = "ClientToken"
;
ALTER TABLE "SyncDS_UserLogin" DROP COLUMN "ClientToken"
;
ALTER TABLE "SyncDS_UserLogin" RENAME COLUMN "ClientToken_new" TO "ClientToken"
;
ALTER TABLE "SyncDS_UserLogin" MODIFY ("ClientToken" NOT NULL)
;

ALTER TABLE "SyncDS_UserPreference" ADD "Language_new" VARCHAR2(4000)
;
UPDATE "SyncDS_UserPreference" SET "Language_new" = "Language"
;
ALTER TABLE "SyncDS_UserPreference" DROP COLUMN "Language"
;
ALTER TABLE "SyncDS_UserPreference" RENAME COLUMN "Language_new" TO "Language"
;

ALTER TABLE "SyncDS_UserPreference" ADD "ItemSort_new" VARCHAR2(4000)
;
UPDATE "SyncDS_UserPreference" SET "ItemSort_new" = "ItemSort"
;
ALTER TABLE "SyncDS_UserPreference" DROP COLUMN "ItemSort"
;
ALTER TABLE "SyncDS_UserPreference" RENAME COLUMN "ItemSort_new" TO "ItemSort"
;

ALTER TABLE "SyncDS_UserPreference" ADD "ItemFilters_new" VARCHAR2(4000)
;
UPDATE "SyncDS_UserPreference" SET "ItemFilters_new" = "ItemFilters"
;
ALTER TABLE "SyncDS_UserPreference" DROP COLUMN "ItemFilters"
;
ALTER TABLE "SyncDS_UserPreference" RENAME COLUMN "ItemFilters_new" TO "ItemFilters"
;

ALTER TABLE "SyncDS_UserPreference" ADD "Notifications_new" VARCHAR2(4000)
;
UPDATE "SyncDS_UserPreference" SET "Notifications_new" = "Notifications"
;
ALTER TABLE "SyncDS_UserPreference" DROP COLUMN "Notifications"
;
ALTER TABLE "SyncDS_UserPreference" RENAME COLUMN "Notifications_new" TO "Notifications"
;

ALTER TABLE "SyncDS_ItemView" ADD "QueryString_new" VARCHAR2(4000)
;
UPDATE "SyncDS_ItemView" SET "QueryString_new" = "QueryString"
;
ALTER TABLE "SyncDS_ItemView" DROP COLUMN "QueryString"
;
ALTER TABLE "SyncDS_ItemView" RENAME COLUMN "QueryString_new" TO "QueryString"
;
ALTER TABLE "SyncDS_ItemView" MODIFY ("QueryString" NOT NULL)
;

ALTER TABLE "SyncDS_ScheduleDetail" ADD "RecurrenceInfo_new" VARCHAR2(4000)
;
UPDATE "SyncDS_ScheduleDetail" SET "RecurrenceInfo_new" = "RecurrenceInfo"
;
ALTER TABLE "SyncDS_ScheduleDetail" DROP COLUMN "RecurrenceInfo"
;
ALTER TABLE "SyncDS_ScheduleDetail" RENAME COLUMN "RecurrenceInfo_new" TO "RecurrenceInfo"
;
ALTER TABLE "SyncDS_ScheduleDetail" MODIFY ("RecurrenceInfo" NOT NULL)
;

ALTER TABLE "SyncDS_SubscrExtnRecpt" ADD "EmailIds_new" VARCHAR2(4000)
;
UPDATE "SyncDS_SubscrExtnRecpt" SET "EmailIds_new" = "EmailIds"
;
ALTER TABLE "SyncDS_SubscrExtnRecpt" DROP COLUMN "EmailIds"
;
ALTER TABLE "SyncDS_SubscrExtnRecpt" RENAME COLUMN "EmailIds_new" TO "EmailIds"
;
ALTER TABLE "SyncDS_SubscrExtnRecpt" MODIFY ("EmailIds" NOT NULL)
;

ALTER TABLE "SyncDS_SystemSettings" ADD "Value_new" VARCHAR2(4000)
;
UPDATE "SyncDS_SystemSettings" SET "Value_new" = "Value"
;
ALTER TABLE "SyncDS_SystemSettings" DROP COLUMN "Value"
;
ALTER TABLE "SyncDS_SystemSettings" RENAME COLUMN "Value_new" TO "Value"
;

ALTER TABLE "SyncDS_Comment" ADD "Comment_new" VARCHAR2(4000)
;
UPDATE "SyncDS_Comment" SET "Comment_new" = "Comment"
;
ALTER TABLE "SyncDS_Comment" DROP COLUMN "Comment"
;
ALTER TABLE "SyncDS_Comment" RENAME COLUMN "Comment_new" TO "Comment"
;
ALTER TABLE "SyncDS_Comment" MODIFY ("Comment" NOT NULL)
;

ALTER TABLE "SyncDS_ItemCommentLog" ADD "OldValue_new" VARCHAR2(4000)
;
UPDATE "SyncDS_ItemCommentLog" SET "OldValue_new" = "OldValue"
;
ALTER TABLE "SyncDS_ItemCommentLog" DROP COLUMN "OldValue"
;
ALTER TABLE "SyncDS_ItemCommentLog" RENAME COLUMN "OldValue_new" TO "OldValue"
;

ALTER TABLE "SyncDS_ItemCommentLog" ADD "NewValue_new" VARCHAR2(4000)
;
UPDATE "SyncDS_ItemCommentLog" SET "NewValue_new" = "NewValue"
;
ALTER TABLE "SyncDS_ItemCommentLog" DROP COLUMN "NewValue"
;
ALTER TABLE "SyncDS_ItemCommentLog" RENAME COLUMN "NewValue_new" TO "NewValue"
;

ALTER TABLE "SyncDS_User" ADD "UserTypeId" int DEFAULT 0 NOT NULL
;

UPDATE "SyncDS_User" SET "UserTypeId" = 1 WHERE "SyncDS_User"."Id" In (SELECT "SyncDS_User"."Id" from "SyncDS_User" INNER JOIN "SyncDS_ADUser" on "SyncDS_ADUser"."UserId" = "SyncDS_User"."Id")
;

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
	"IsEnabled" NUMBER(1) NOT NULL)
;

CREATE SEQUENCE "SyncDS_SAMLSettings_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

CREATE TABLE "SyncDS_UserType"(
	"Id" int primary key NOT NULL, 
	"Type" NVARCHAR2(100))
;

CREATE SEQUENCE "SyncDS_UserType_seq"
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

INSERT into "SyncDS_UserType" ("Id","Type") values("SyncDS_UserType_seq".nextval,'Server User')
;
INSERT into "SyncDS_UserType" ("Id","Type") values("SyncDS_UserType_seq".nextval,'Active Directory User')
;
INSERT into "SyncDS_UserType" ("Id","Type") values("SyncDS_UserType_seq".nextval,'Federation User')
;
INSERT into "SyncDS_ItemCommentLogType" ("Id","Name","IsActive") VALUES ("SyncDS_ItemCommentLogType_seq".nextval,'UserMention',1)
;