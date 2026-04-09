import dlt
import pandas as pd
import snowflake.connector

# Function to get data from a Snowflake table
def get_snowflake_table_data(user, password, account, database, schema, table_name):
    conn = snowflake.connector.connect(
        user=user,
        password=password,
        account=account,
        database=database,
        schema=schema
    )
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM " + table_name)
    df = cursor.fetch_pandas_all()
    cursor.close()
    conn.close()
    return df

# Main function to load data using DLT
def load_snowflake_tables():
    # Set your values here
    user = "{2}"
    password = "{3}"
    account = "{5}"
    database = "{4}"
    schema = "{6}"
    destination = "{7}"
    pipeline_name = "{0}_pipeline"
    dataset_name = "{0}"
    tables = [{1}]  # Add your table names here

    pipeline = dlt.pipeline(
        pipeline_name=pipeline_name,
        destination=destination,
        dataset_name=dataset_name
    )

    for table in tables:
        df = get_snowflake_table_data(user, password, account, database, schema, table)
        resource = dlt.resource(df, name=table)
        load_info = pipeline.run(resource, table_name=table)

if __name__ == "__main__":
    load_snowflake_tables()
