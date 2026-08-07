import pg8000
import pandas as pd
import duckdb

def fetch_from_redshift_table(conn1: dict, table_name: str, schema_name: str) -> pd.DataFrame:
    query = "SELECT * FROM {8}." + table_name
    df = pd.read_sql(query, conn1)
    return df

def create_or_replace_duckdb_table(conn, schema_name: str, table_name: str, df: pd.DataFrame):
    conn.execute("CREATE SCHEMA IF NOT EXISTS {0}")
    conn.execute("CREATE OR REPLACE TABLE {0}." +table_name+ " AS SELECT * FROM df")
    print(f"Data written to DuckDB table " + table_name)

def migrate_redshift_to_duckdb():
    schema_name = "{8}"
     # Replace with your actual table names
    table_names = [{6}] 
    conn1 = pg8000.connect(
        host="{1}",
        port="{2}",
        user="{3}",
        password="{4}",
        database="{5}"
    )
    duckdb_path = "{7}"
    conn = duckdb.connect(duckdb_path)
    
    for table_name in table_names:
        df = fetch_from_redshift_table(conn1, table_name, schema_name)
        create_or_replace_duckdb_table(conn, "{0}", table_name, df)

    conn1.close()
    conn.close()

if __name__ == "__main__":
    migrate_redshift_to_duckdb()
