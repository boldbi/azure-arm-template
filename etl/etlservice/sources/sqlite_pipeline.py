import dlt
import sqlite3
import pandas as pd

def load_standalone_table_resource() -> None:
    file_path = '{3}'
    table_names = [{1}]

    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline",
        destination="{4}",
        dataset_name="{0}"
    )

    for table in table_names:
        df = load_sqlite_table(file_path, table)
        resource = dlt.resource(df, name=table)
        load_info = pipeline.run(resource, table_name=table, write_disposition="merge")
        print(load_info)

def load_sqlite_table(file_path: str, table_name: str) -> pd.DataFrame:
    conn = sqlite3.connect(file_path)
    df = pd.read_sql_query("SELECT * FROM " + table_name, conn)
    conn.close()
    return df

if __name__ == "__main__":
    load_standalone_table_resource()
