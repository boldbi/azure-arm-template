IF NOT EXISTS (SELECT * FROM   INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'BOLDTC_QueryMetrics')
BEGIN
CREATE TABLE [BOLDTC_QueryMetrics] ( 
    Id int IDENTITY(1,1),
    DashboardID nvarchar(100),
    WidgetID nvarchar(100), 
    WidgetName nvarchar(100) , 
    QueryStartTime datetimeoffset, 
    QueryEndTime datetimeoffset, 
    Query nvarchar(max) , 
    QueryStatus nvarchar(100), 
    Rowsretrieved bigint, 
    QueryPlan nvarchar(max), 
    TrackingId nvarchar(100), 
    QueryType nvarchar(100), 
    QueryExecutiontime nvarchar(100), 
    DashboardName nvarchar(100), 
    UserName nvarchar(100), 
    TenantId uniqueidentifier, 
    UserId nvarchar(100), 
    DataSourceID nvarchar(100), 
    DataSourceName nvarchar(100),
    CONSTRAINT [PK_BOLDTC_QUERYMETRICS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)
)
;
END;