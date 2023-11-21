ALTER TABLE "SyncDS_ItemCommentLogType" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_ConditionCategory" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_ExportType" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_ItemLogType" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_ItemType" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_PermissionEntity" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_RecurrenceType" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_SystemLogType" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_UserLogType" ADD UNIQUE ("Name")
;
ALTER TABLE "SyncDS_UserType" ADD UNIQUE ("Type")
;

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

INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,4,1,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,6,1,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,10,1,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,12,1,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,13,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,15,1,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,12,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,13,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,14,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,4,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,5,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,10,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,11,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,15,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,16,2,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,4,3,1)
;																														  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,5,3,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,10,3,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,11,3,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,4,4,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,5,4,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,10,4,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,11,4,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,12,5,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,13,5,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,14,5,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,15,5,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,16,5,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,6,5,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,7,5,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,12,6,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,13,6,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,14,6,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,15,6,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,16,6,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,6,6,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,7,6,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,12,7,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,13,7,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,14,7,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,6,7,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,7,7,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,15,7,1)
;																											  
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES ("SyncDS_PermissionAccEntity_seq".nextval,16,7,1)
;

INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,1,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,9,5,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,9,6,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,8,7,1)
;
INSERT INTO "SyncDS_PermissionAccEntity" ("Id","PermissionEntityId", "PermissionAccessId", "IsActive") VALUES("SyncDS_PermissionAccEntity_seq".nextval,9,7,1)
;

UPDATE "SyncDS_UserPermission" SET "PermissionAccessId"='18' WHERE "PermissionAccessId"='2' AND "PermissionEntityId" NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE "SyncDS_UserPermission" SET "PermissionAccessId"='22' WHERE "PermissionAccessId"='6' AND "PermissionEntityId" NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE "SyncDS_UserPermission" SET "PermissionAccessId"='30' WHERE "PermissionAccessId"='14' AND "PermissionEntityId" NOT IN ('4', '5', '10', '11', '19', '20')
;

UPDATE "SyncDS_GroupPermission" SET "PermissionAccessId"='18' WHERE "PermissionAccessId"='2' AND "PermissionEntityId" NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE "SyncDS_GroupPermission" SET "PermissionAccessId"='22' WHERE "PermissionAccessId"='6' AND "PermissionEntityId" NOT IN ('4', '5', '10', '11', '19', '20')
;
UPDATE "SyncDS_GroupPermission" SET "PermissionAccessId"='30' WHERE "PermissionAccessId"='14' AND "PermissionEntityId" NOT IN ('4', '5', '10', '11', '19', '20')
;

RENAME "SyncDS_MultiDashboardMap" TO "SyncDS_MultiTabDashboard"
;
RENAME "SyncDS_MultiDashboardMap_seq" TO "SyncDS_MultiTabDashboard_seq"
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