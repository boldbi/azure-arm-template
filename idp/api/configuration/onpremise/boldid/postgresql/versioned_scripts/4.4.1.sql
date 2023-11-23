CREATE TABLE IF NOT EXISTS BOLDTC_QueryMetrics ( 
    Id SERIAL,
    DashboardID varchar(100),
    WidgetID varchar(100),
    WidgetName varchar(100),
    QueryStartTime timestamp,
    QueryEndTime timestamp,
    Query text, 
    QueryStatus varchar(100), 
    Rowsretrieved bigint, 
    QueryPlan varchar(100), 
    TrackingId varchar(100), 
    QueryType varchar(100), 
    QueryExecutiontime varchar(100), 
    DashboardName varchar(100), 
    UserName varchar(100), 
    TenantId uuid, 
    UserId varchar(100), 
    DataSourceID varchar(100), 
    DataSourceName varchar(100),
    CONSTRAINT PK_BOLDTC_QUERYMETRICS PRIMARY KEY (Id)
)
;