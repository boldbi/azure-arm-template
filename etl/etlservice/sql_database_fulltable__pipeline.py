from typing import List

import dlt
from dlt.sources.credentials import ConnectionStringCredentials
from dlt.common import pendulum

from sql_database import sql_database, sql_table

def load_entire_table(start_date) -> None:
    """Use the sql_database source to completely load all tables in a database"""
    pipeline = dlt.pipeline(
        pipeline_name="{0}_database", destination='duckdb', dataset_name="{0}"
    )    
    edt = std.add({4}={5})
    table_ = sql_table(
    table="{1}",
    incremental=dlt.sources.incremental("{2}", initial_value=start_date, end_value=edt),)
    info = pipeline.run(table_, write_disposition="merge")
    print(info)
    # By default the sql_database source reflects all tables in the schema
    # The database credentials are sourced from the `.dlt/secrets.toml` configuration

    
if __name__ == "__main__":

     utc = pendulum.timezone('UTC')
    # Load tables with the standalone table resource
     std = pendulum.parse('{3}', tz=utc)
   

     load_entire_table(std)

  