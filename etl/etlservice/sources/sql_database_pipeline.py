from typing import List

import dlt
from dlt.sources.credentials import ConnectionStringCredentials
from dlt.common import pendulum

from sql_database import sql_database, sql_table
def load_standalone_table_resource() -> None:
    """Load a few known tables with the standalone sql_table resource"""
    pipeline = dlt.pipeline(
        pipeline_name="{0}base", destination='{3}', staging = {4}, dataset_name="{0}"
    )
    #pipeline1 = dlt.pipeline(
    #    pipeline_name="{0}base", destination='postgres', dataset_name="{0}"
    #)

    # Load a table incrementally starting at a given date
    # Adding incremental via argument like this makes extraction more efficient
    # as only rows newer than the start date are fetched from the table
{1}

    # Load all data from another table
   # genome = sql_table(table="genome")
    table_info = {2}

    # Run the resources together
    for source_table, custom_name in table_info:
            info = pipeline.run([source_table], write_disposition="merge", table_name = custom_name)
            print(info)
    
    print(info)

if __name__ == "__main__":

    # Load tables with the standalone table resource
     load_standalone_table_resource()

  
