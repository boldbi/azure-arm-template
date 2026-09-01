from sqlalchemy import create_engine
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
import duckdb
import os
from datetime import datetime

# PostgreSQL connection using SQLAlchemy
pg_conn_str = "{1}"
engine = create_engine(pg_conn_str)


parquet_file = "temp_chunk.parquet"
chunk_size = 1_000_000
pipeline_name = "{0}"
pg_schema_name = "{2}"
duckdb_filepath = "{3}"
{4}

def migrate_table(engine, duckdb_conn, table_name):
    """Stream a single PostgreSQL table into DuckDB via Parquet."""
    first_chunk = True
    sql = f"SELECT * FROM {{pg_schema_name}}.{{table_name}}"

    for chunk in pd.read_sql(sql, con=engine, chunksize=chunk_size):
        # 1) Dump chunk to Parquet
        table = pa.Table.from_pandas(chunk)
        pq.write_table(table, parquet_file)

        # 2) Load into DuckDB
        if first_chunk:
            duckdb_conn.execute(f"CREATE TABLE {{pipeline_name}}.{{table_name}} AS SELECT * FROM read_parquet('{{parquet_file}}')")
            first_chunk = False
        else:
            duckdb_conn.execute(f"INSERT INTO {{pipeline_name}}.{{table_name}} SELECT * FROM read_parquet('{{parquet_file}}')")

        # 3) Clean up
        os.remove(parquet_file)

    print(f"Data moved to duckdb, table name - {{table_name}}.")
    
def main():
    start_time = datetime.now()
    # Set up connections
    first_chunk = True
    engine = create_engine(pg_conn_str)
    duckdb_conn = duckdb.connect(duckdb_filepath)

    duckdb_conn.execute(f"CREATE SCHEMA IF NOT EXISTS '{{pipeline_name}}'")
    for tbl in TABLES:
        migrate_table(engine, duckdb_conn, tbl)
    duckdb_conn.close()
    
    import time
    time.sleep(1)
    
    end_time = datetime.now()
    
    # Duration
    print("Duration:", end_time - start_time)

if __name__ == "__main__":
    main()
    
