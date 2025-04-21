import firebolt.db 
from firebolt.client import DEFAULT_API_URL
from firebolt.client.auth import ClientCredentials
from datetime import datetime
import duckdb
import pandas as pd
import numpy as np
import datetime

# Function to get DuckDB table schema
def get_duckdb_schema(duck_connection, table_name):
    query = f"DESCRIBE {table_name}"
    result = duck_connection.execute(query).fetchdf()
    return result

# Function to convert DuckDB column types to firebolt compatible types
def map_to_firebolt_type(duckdb_type):
    type_mapping = {
        "INTEGER": "INT",
        "BIGINT": "BIGINT",
        "FLOAT": "FLOAT",
        "DOUBLE": "DOUBLE",
        "VARCHAR": "VARCHAR(8000)",  # Adjust length as needed
        "TEXT": "CLOB",
        "DATE": "DATE",
        "TIMESTAMP": "TIMESTAMP",
        "BOOLEAN": "BOOLEAN"
    }
    return type_mapping.get(duckdb_type.upper(), "VARCHAR(8000)")  # Default to VARCHAR

# Function to generate CREATE TABLE statement for firebolt
def generate_create_table_query(duck_table_schema, firebolt_table_name):
    create_query = f"CREATE TABLE {firebolt_table_name} ("
    columns = []
    
    for index, row in duck_table_schema.iterrows():
        column_name = row['column_name']
        duckdb_type = row['column_type']
        firebolt_type = map_to_firebolt_type(duckdb_type)
        columns.append(f"\"{column_name}\" {firebolt_type}")
    
    create_query += ", ".join(columns) + ")"
    return create_query

# Function to generate INSERT INTO statement for firebolt
def generate_insert_query(duck_table_schema, firebolt_table_name):
    # Wrap each column name with double quotes
    column_names = ", ".join([f'"{col}"' for col in duck_table_schema['column_name']])
    
    # Create placeholders for each value
    placeholders = ", ".join(["?" for _ in duck_table_schema['column_name']])
    
    # Generate the INSERT INTO query
    insert_query = f"INSERT INTO {firebolt_table_name} ({column_names}) VALUES ({placeholders})"
    
    return insert_query
    

# Defining the credentials
firebolt_account_name = "account_firebolt"
firebolt_database_name = "database_firebolt"
firebolt_engine_name = "engine_firebolt"
firebolt_client_id = "firebolt_id"
firebolt_client_secret = "firebolt_secret"

# Step 1: Connect to DuckDB and get schema
duck_connection = duckdb.connect(database='duckdbpath', read_only=True)

# Define your DuckDB table
duck_table_name = "src_tablename"

# Get schema from DuckDB
duck_table_schema = get_duckdb_schema(duck_connection, duck_table_name)

# Step 2: Generate the CREATE TABLE and INSERT INTO queries for firebolt
firebolt_table_name = "dest_tablename"  # The table name in firebolt

create_query = generate_create_table_query(duck_table_schema, firebolt_table_name)
insert_query = generate_insert_query(duck_table_schema, firebolt_table_name)

# Step 3: Connect to firebolt and insert data
firebolt_connection = firebolt.db.connect(auth=ClientCredentials(f'{firebolt_client_id}', f'{firebolt_client_secret}'), account_name=f'{firebolt_account_name}', engine_name=f'{firebolt_engine_name}', database=f'{firebolt_database_name}')

cursor = firebolt_connection.cursor()
duck_query = f"SELECT * FROM {duck_table_name}"
df = duck_connection.execute(duck_query).fetchdf()
try:
    stmt = cursor.execute(f"DROP TABLE IF EXISTS {firebolt_table_name}")
except Exception as e:
    print(f"Error in drop table: {e}")
    # Optionally, print more details about the row and columns involved
try:
    stmt = cursor.execute(create_query)
except Exception as e:
    print(f"Error creating table: {e}")
    # Optionally, print more details about the row and columns involved
# Query data from DuckDB


isDataMoved = True
# Insert data into Firebolt
for index, row in df.iterrows():
    # Debugging: print the data being inserted
    for col_name in duck_table_schema['column_name']:
        if isinstance(row[col_name], float) and np.isnan(row[col_name]):
            row[col_name] = None  # Replace NaN with None
        elif isinstance(row[col_name], str):
            row[col_name] = row[col_name].replace("'", " ")
        elif isinstance(row[col_name], datetime.time):
                    row[col_name] = row[col_name].isoformat()

    # Prepare the row as a tuple for execution
    row_values = tuple(row[col_name] for col_name in duck_table_schema['column_name'])

    try:
        # Execute the insert statement
        cursor.execute(insert_query, row_values)
        isDataMoved = True
    except Exception as e:
        print(f"Error executing insert for row {index}: {e}")
        isDataMoved = True
        # Optionally, log more details about the row and columns involved
        continue

# Close the Firebolt connection
if firebolt_connection:
    firebolt_connection.close()
cursor.close()
duck_connection.close()
if isDataMoved:
    print(f"Table moved to the destination, {firebolt_table_name}")

