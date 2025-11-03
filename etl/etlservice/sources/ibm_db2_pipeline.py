import os

# Add the clidriver\bin path to the DLL search path
os.add_dll_directory("{9}")

import dlt
import duckdb
import ibm_db

# IBM Db2 connection details
database = "{5}"
hostname = "{1}"
port = "{2}"
username = "{3}"
password = "{4}"
security = "SSL"
schema = "{8}"  # Assuming schema is passed here

# Create DLT pipeline
pipeline = dlt.pipeline(pipeline_name="{0}_pipeline", destination="duckdb", dataset_name="{0}")

# Function to extract data from a specific table
def extract_table_data(table_name):
    dsn = (
        f"DATABASE={{database}};"
        f"HOSTNAME={{hostname}};"
        f"PORT={{port}};"
        f"UID={{username}};"
        f"PWD={{password}};"
        f"SECURITY={{security}};"
    )
    conn = ibm_db.connect(dsn, "", "")
    query = f"SELECT * FROM {{schema}}.{{table_name}}"
    stmt = ibm_db.exec_immediate(conn, query)

    rows = []
    row = ibm_db.fetch_assoc(stmt)
    while row:
        rows.append(row)
        row = ibm_db.fetch_assoc(stmt)

    ibm_db.close(conn)
    return rows

# List of table names to process
table_names = {6}  # Replace with your actual table names

# Loop through each table and run the pipeline
for table in table_names:
    print(f"Processing table: {{table}}")
    data = extract_table_data(table)
    pipeline.run(data=data, table_name=table)

# Verify in DuckDB
con = duckdb.connect("{7}")
print("Data loaded into DuckDB for all tables.")
