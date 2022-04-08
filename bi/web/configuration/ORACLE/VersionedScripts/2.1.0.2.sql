ALTER TABLE "SyncDS_User" ADD "PasswordChangedDate" DATE NULL
;
ALTER TABLE "SyncDS_SAMLSettings" ADD "Authority" VARCHAR2(4000)
;
ALTER TABLE "SyncDS_SAMLSettings" ADD "DesignerClientId" VARCHAR2(100)
;
ALTER TABLE "SyncDS_SAMLSettings" ADD "TenantName" VARCHAR2(100)
;
ALTER TABLE "SyncDS_PermissionEntity" ADD  "ItemTypeId" INT
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=3 WHERE "SyncDS_PermissionEntity"."Id" =1
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=1 WHERE "SyncDS_PermissionEntity"."Id" =2
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=3 WHERE "SyncDS_PermissionEntity"."Id" =3
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=1 WHERE "SyncDS_PermissionEntity"."Id" =4
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=1 WHERE "SyncDS_PermissionEntity"."Id" =5
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=4 WHERE "SyncDS_PermissionEntity"."Id" =6
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=4 WHERE "SyncDS_PermissionEntity"."Id" =7
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=6 WHERE "SyncDS_PermissionEntity"."Id" =8
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=6 WHERE "SyncDS_PermissionEntity"."Id" =9
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=7 WHERE "SyncDS_PermissionEntity"."Id" =10
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=7 WHERE "SyncDS_PermissionEntity"."Id" =11
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=2 WHERE "SyncDS_PermissionEntity"."Id" =12
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=1 WHERE "SyncDS_PermissionEntity"."Id" =13
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=2 WHERE "SyncDS_PermissionEntity"."Id" =14
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=8 WHERE "SyncDS_PermissionEntity"."Id" =15
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=8 WHERE "SyncDS_PermissionEntity"."Id" =16
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=5 WHERE "SyncDS_PermissionEntity"."Id" =17
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=5 WHERE "SyncDS_PermissionEntity"."Id" =18
;
UPDATE "SyncDS_PermissionEntity" SET "ItemTypeId"=9 WHERE "SyncDS_PermissionEntity"."Id" =19
;
ALTER TABLE "SyncDS_PermissionEntity" MODIFY "ItemTypeId" INT NOT NULL
;
ALTER TABLE "SyncDS_PermissionEntity" ADD Foreign key("ItemTypeId") references "SyncDS_ItemType" ("Id")
;

DROP TABLE "SyncDS_ReportDataSource"
;
DROP SEQUENCE "SyncDS_ReportDataSource_seq"
;
DROP TABLE "SyncDS_DataSourceDetail"
;
DROP SEQUENCE "SyncDS_DataSourceDetail_seq"
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
ALTER TABLE "SyncDS_SystemSettings" ADD CONSTRAINT UK_SyncDS_SystemSettings_Key UNIQUE ("Key")
;