from typing import List

import dlt
from dlt.sources.credentials import ConnectionStringCredentials
from dlt.common import pendulum
from sqlalchemy import create_engine
from sql_database import sql_database, sql_table
from urllib.parse import quote_plus
def load_standalone_table_resource() -> None:
 
    pipeline = dlt.pipeline(
        pipeline_name="{0}base", destination='{3}', dataset_name="{0}"
    )
    password = quote_plus("{12}")
    engine = create_engine(f"{1}"{10}, echo=True)
    isincremental = {11}
    query = ""
    if isincremental:
       start_date = pendulum.parse('{5}')
    
       # Add days to the start date (e.g., add 1 day)
       end_date = {6}
    
       # Format the dates for SQL
       start_date_str = start_date.to_datetime_string()  # '2023-01-01 00:00:00'
       end_date_str = end_date.to_datetime_string()      # '2023-01-02 00:00:00'
       query = f""" {9} """
    else:
        query = f""" {9} """
    with engine.connect() as conn:
    # Select genome table, stream data in batches of 100 {2} elements
        rows = conn.execution_options(yield_per=100).exec_driver_sql(query)

       

  
        load_info = pipeline.run(map(lambda row: dict(row._mapping), rows), table_name="{7}")
        print(load_info)

if __name__ == "__main__":

    # Load tables with the standalone table resource
     load_standalone_table_resource()

  
