CREATE TABLE IF NOT EXISTS {database_name}.BOLDTC_QueryMetrics ( 
    Id int AUTO_INCREMENT, 
    DashboardID varchar(100), 
    WidgetID varchar(100), 
    WidgetName varchar(100), 
    QueryStartTime datetime, 
    QueryEndTime datetime, 
    Query longtext, 
    QueryStatus varchar(100), 
    Rowsretrieved bigint, 
    QueryPlan longtext, 
    TrackingId varchar(100), 
    QueryType varchar(100), 
    QueryExecutiontime varchar(100), 
    DashboardName varchar(100), 
    UserName varchar(100), 
    TenantId char(38), 
    UserId varchar(100), 
    DataSourceID varchar(100), 
    DataSourceName varchar(100),
    CONSTRAINT PK_BOLDTC_QUERYMETRICS PRIMARY KEY (Id ASC) 
)
;