from typing import List

import dlt
from dlt.sources.credentials import ConnectionStringCredentials
from dlt.common import pendulum

from sql_database import sql_database, sql_table
def load_standalone_table_resource() -> None:
    """Load a few known tables with the standalone sql_table resource"""
    pipeline = dlt.pipeline(
        pipeline_name="{0}_database", destination='duckdb', dataset_name="{0}"
    )

    # Load a table incrementally starting at a given date
    # Adding incremental via argument like this makes extraction more efficient
    # as only rows newer than the start date are fetched from the table
    utc = pendulum.timezone('UTC')
{1}

    # Load all data from another table
   # genome = sql_table(table="genome")

    # Run the resources together
    info = pipeline.run({2}, write_disposition="merge")
    print(info)


if __name__ == "__main__":

    # Load tables with the standalone table resource
     load_standalone_table_resource()

  